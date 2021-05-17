const express = require('express');
const router = express.Router();
const {querySync}  = require("../mysql");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const jwt = require('jsonwebtoken');
const {createToken,altenticarToken} = require('../token/token');
var mysql = require('mysql');
const {queryCliente} = require('../sql/mysqlClientes');


router.get('/',(req,res)=>{
   // const ResultQuery = await querySync('select * from Filmes');

     querySync('select * from Filmes').then(result=>{
            res.send(result)
        
        }).catch(error=>{res.send(error)})

   
})

router.get('/',(send)=>{
	try{
       querySync(
		'INSERT INTO Filmes (titulo,descricao,img_url,categoria,data_postagem,data_lancamento,elenco,class_indicativa) VALUES ("?","? ","?","?",now(),"?","?","?")').then(result=>{
		res.send(result)
	})
	}catch(error){
        res.send(error);
	}
})


module.exports = router;