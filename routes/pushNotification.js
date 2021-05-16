const express = require('express');
const router = express.Router();
const {createToken,altenticarToken} = require('../token/token');
var mysql = require('mysql');
const {queryCliente} = require('../sql/mysqlClientes');
const { Expo } = require('expo-server-sdk');



router.post('/',altenticarToken,(req,res)=>{
    const {pushToken,AlunoCodigo,tipo,sistema} = req.body;
    const {site} = req.token;
    if(!pushToken) return res.json({error:'parametro GET pushToken não definido'})
    queryCliente(site,
        `insert into  PushNotification  (token,AlunoCodigo,tipo,sistema) values (?,?,?,?)`,
        [pushToken,AlunoCodigo,tipo,sistema]).then(result=>{
            res.json(
                {
                    resultado:result,
                    status:true
                }
            );
        
        }).catch(error=>{res.send(error)})
})


router.get('/todo',altenticarToken,(req,res)=>{
    
    var tokenPust = [];
    const {titulo,mensagem} = req.query;
    if(!titulo || !mensagem) return res.json({error:'parametro GET titulo ou mensagem  não definido'})
    const {site} = req.token;
    queryCliente(site,
        `select * from PushNotification`,
        []).then(result=>{
            result.forEach(e=>{
                tokenPust.push(e.token)
            })

            if(tokenPust.length == 0){
                res.json(
                    {
                        tokenPust,
                        status:true
                    }
                );
            }else
                {
          

                        let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

                        // Create the messages that you want to send to clients
                        let messages = [];
                        for (let pushToken of tokenPust) {
                        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

                        // Check that all your push tokens appear to be valid Expo push tokens
                        if (!Expo.isExpoPushToken(pushToken)) {
                            console.error(`Push token ${pushToken} is not a valid Expo push token`);
                            continue;
                        }

                        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
                        messages.push({
                            to: pushToken,
                            sound: 'default',
                            title:titulo,
                            body: mensagem,
                            vibrate:'true'
                          
                        })
                        }

                        // The Expo push notification service accepts batches of notifications so
                        // that you don't need to send 1000 requests to send 1000 notifications. We
                        // recommend you batch your notifications to reduce the number of requests
                        // and to compress them (notifications with similar content will get
                        // compressed).
                        let chunks = expo.chunkPushNotifications(messages);
                        let tickets = [];
                        (async () => {
                        // Send the chunks to the Expo push notification service. There are
                        // different strategies you could use. A simple one is to send one chunk at a
                        // time, which nicely spreads the load out over time:
                        for (let chunk of chunks) {
                            try {
                            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                            tickets.push(...ticketChunk);
                            // NOTE: If a ticket contains an error code in ticket.details.error, you
                            // must handle it appropriately. The error codes are listed in the Expo
                            // documentation:
                            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                            } catch (error) {
                            console.error(error);
                            }
                        }
                        })();

                        res.json({status:'ok'})
                }
        
        }).catch(error=>{res.send(error)})
})

router.get('/turma',altenticarToken,(req,res)=>{
    
    var tokenPust = [];
    var {titulo,mensagem,AnoBase,TurmaCodigo,tipo} = req.query;
    if(!titulo || !mensagem || !AnoBase || !TurmaCodigo || !tipo ) return res.json({error:'parametro GET titulo ou mensagem ou AnoBase ou TurmaCodigo ou tipo  não definido'})
    const {site} = req.token;
    if(tipo == '1' || tipo == '2'){
    }else{
        tipo = ['1','2']
    }
    queryCliente(site,
        `select pn.AlunoCodigo,pn.token,pn.tipo,m.AnoBase from  TblMatricula as m
        join PushNotification as pn on m.AlunoCodigo = pn.AlunoCodigo 
        and pn.tipo in (?)
        where m.TurmaCodigo = ?
        and m.AnoBase = ?`,
        [tipo,TurmaCodigo,AnoBase]).then(result=>{
            result.forEach(e=>{
                tokenPust.push(e.token)
            })

            if(tokenPust.length == 0){
                res.json(
                    {
                        tokenPust,
                        status:true
                    }
                );
            }else
                {
          

                        let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

                        // Create the messages that you want to send to clients
                        let messages = [];
                        for (let pushToken of tokenPust) {
                        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

                        // Check that all your push tokens appear to be valid Expo push tokens
                        if (!Expo.isExpoPushToken(pushToken)) {
                            console.error(`Push token ${pushToken} is not a valid Expo push token`);
                            continue;
                        }

                        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
                        messages.push({
                            to: pushToken,
                            sound: 'default',
                            title:titulo,
                            body: mensagem,
                            vibrate:'true'
                          
                        })
                        }

                        // The Expo push notification service accepts batches of notifications so
                        // that you don't need to send 1000 requests to send 1000 notifications. We
                        // recommend you batch your notifications to reduce the number of requests
                        // and to compress them (notifications with similar content will get
                        // compressed).
                        let chunks = expo.chunkPushNotifications(messages);
                        let tickets = [];
                        (async () => {
                        // Send the chunks to the Expo push notification service. There are
                        // different strategies you could use. A simple one is to send one chunk at a
                        // time, which nicely spreads the load out over time:
                        for (let chunk of chunks) {
                            try {
                            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                            tickets.push(...ticketChunk);
                            // NOTE: If a ticket contains an error code in ticket.details.error, you
                            // must handle it appropriately. The error codes are listed in the Expo
                            // documentation:
                            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                            } catch (error) {
                            console.error(error);
                            }
                        }
                        })();

                        res.json({status:result})
                }
        
        }).catch(error=>{res.send(error)})
})


router.get('/selecionados',altenticarToken,(req,res)=>{
    
    var tokenPust = [];
    var {titulo,mensagem,AlunoCodigo,tipo} = req.query;
    AlunoCodigo = AlunoCodigo.split(',');
    
    if(!titulo || !mensagem || !AlunoCodigo || !tipo) return res.json({error:'parametro GET titulo ou mensagem ou AlunoCodigo  não definido'})
    if(tipo == '1' || tipo == '2'){
    }else{
        tipo = ['1','2']
    }
    const {site} = req.token;
    queryCliente(site,
        `select * from PushNotification 
        where AlunoCodigo in (?)
        and tipo in (?)`,
        [AlunoCodigo,tipo]).then(result=>{ 
            result.forEach(e=>{
                tokenPust.push(e.token)
            })

            if(tokenPust.length == 0){
                res.json(
                    {
                        tokenPust,
                        status:true
                    }
                );
            }else
                {
          

                        let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

                        // Create the messages that you want to send to clients
                        let messages = [];
                        for (let pushToken of tokenPust) {
                        // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

                        // Check that all your push tokens appear to be valid Expo push tokens
                        if (!Expo.isExpoPushToken(pushToken)) {
                            console.error(`Push token ${pushToken} is not a valid Expo push token`);
                            continue;
                        }

                        // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
                        messages.push({
                            to: pushToken,
                            sound: 'default',
                            title:titulo,
                            body: mensagem,
                            vibrate:'true'
                          
                        })
                        }

                        // The Expo push notification service accepts batches of notifications so
                        // that you don't need to send 1000 requests to send 1000 notifications. We
                        // recommend you batch your notifications to reduce the number of requests
                        // and to compress them (notifications with similar content will get
                        // compressed).
                        let chunks = expo.chunkPushNotifications(messages);
                        let tickets = [];
                        (async () => {
                        // Send the chunks to the Expo push notification service. There are
                        // different strategies you could use. A simple one is to send one chunk at a
                        // time, which nicely spreads the load out over time:
                        for (let chunk of chunks) {
                            try {
                            let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                            tickets.push(...ticketChunk);
                            // NOTE: If a ticket contains an error code in ticket.details.error, you
                            // must handle it appropriately. The error codes are listed in the Expo
                            // documentation:
                            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
                            } catch (error) {
                            console.error(error);
                            }
                        }
                        })();

                        res.json({status:'ok'})
                }
        
        }).catch(error=>{res.send(error)})
})

module.exports = router;
