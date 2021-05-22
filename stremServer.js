const express = require("express");
const app = express();
const bodyParser = require('body-parser');


const Filmes = require('./routes/Filmes');
const robo = require('./routes/roboCapiture');

const cors = require('cors');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/filmes',Filmes);
app.use('/robo',robo);


app.use((req,res,next)=>{
    res.send({
        error:"rota não encontrada"
    });
});






app.listen(3333,()=>{console.log('rodando na porta:3333')})