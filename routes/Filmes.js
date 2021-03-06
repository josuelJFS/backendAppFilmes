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
	const result = await querySync('SELECT * FROM Filmes limit 100');
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

router.post('/',async(eq,res)=>{
	try {
	    const {titulo,descricao,url_img,categoria,data_postagem,data_lancamento,elenco,class_indicativa,url_video} = eq.body;
		const result = await querySync('insert into Filmes (titulo,descricao,url_img,categoria,data_postagem,ano_lancamento,elenco,class_indicativa,url_video) values (?,?,?,?,now(),?,?,?,?)',[titulo,descricao,url_img,categoria,data_lancamento,elenco,class_indicativa,url_video]);
		res.json({
			result:result,
			status:true
		});
		
	   } catch (error) {
		res.json({
			error:error,
			status:false
		});
	   }
})

router.get('/update',async(req,res)=>{
	try{
       
       const result = await  querySync('UPDATE Filmes SET titulo = "?",descricao = "?",img_url = "?",categoria = "?",data_lancamento = "?",elenco = "?",class_indicativa = "?" WHERE id = "?";')
	    if(result.length >0){
          res.json({
          	result:result,
          	status:true
          })
	    }else{
           res.json({
           	result:result,
           	status:false
           })
	    }
	}catch(error){
		res.json({
			error:error,
			status:false
		})
	}
})

router.get('/delete',async(req,res)=>{
	try{
       const result = await querySync('UPDATE Filmes SET exibir = "?" WHERE id = "?" ');
       if(result.length >0){
          res.json({
          	result:result,
          	status:true
          })
	    }else{
           res.json({
           	result:result,
           	status:false
           })
	    }
	}catch(error){
		res.json({
			error:error,
			status:false
		})
	}
})

module.exports = router;