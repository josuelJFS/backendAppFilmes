const express = require('express');
const router = express.Router();
const {querySync}  = require("../mysql");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const jwt = require('jsonwebtoken');
const {createToken,altenticarToken} = require('../token/token');
var mysql = require('mysql');
const {queryCliente} = require('../sql/mysqlClientes');


router.get('/recente',async(req,res)=>{

   try {
	const result = await querySync('SELECT * FROM Filmes WHERE exibir = TRUE limite 100');
	if(result.lenght > 0){
		res.json({
			result:result,
			status:true
		});
	}else{
		res.json({
			result:result,
			status:false
		});
	}
	
   } catch (error) {
	res.json({
		error:error,
		status:false
	});
   }


   
})

router.get('/insert',(send)=>{
	try{
       querySync(
		'INSERT INTO Filmes (titulo,descricao,img_url,categoria,data_postagem,data_lancamento,elenco,class_indicativa) VALUES ("?","? ","?","?",now(),"?","?","?")').then(result=>{
		res.send(result);
	})
	}catch(error){
        res.send(error);
	}
})

router.get('/update',(res,send)=>{
	try{
       querySync('UPDATE Filmes SET titulo = "?",descricao = "?",img_url = "?",categoria = "?",data_lancamento = "?",elenco = "?",class_indicativa = "?" WHERE id = ?;').then(result=>{
       	res.send(result);
       })
	}catch(error){
		res.send(error)
	}
})

router.get('/delete',(res,send)=>{
	try{
       querySync('UPDATE Filmes SET exibir = "?" WHERE id = "?" ').then(result=>{
       	res.send(result);
       })
	}catch(error){
		res.send(error)
	}
})

module.exports = router;