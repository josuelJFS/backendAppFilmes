const express = require('express');
const router = express.Router();
const {querySync}  = require("../mysql");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const jwt = require('jsonwebtoken');
const {createToken,altenticarToken} = require('../token/token');
var mysql = require('mysql');
const {queryCliente} = require('../sql/mysqlClientes');




router.get('/selecionar',altenticarToken,(req,res)=>{
    const {site} = req.token;
    const {CodigoAluno} = req.query;
    if(!CodigoAluno) return res.json({error:'parametro GET CodigoAluno não definido'})
    queryCliente(site,
        `select t.Codigo as TurmaCodigo, a.RespCPF,a.Nome,m.AnoBase,a.Codigo as CodigoAluno,m.Codigo as MatriculaCodigo,l.login,l.nivel,l.senha,t.Turma,t.Turno,t.Turma_Tipo,t.Curso_Grau,t.Serie from logins_alunos as l
        join TblMatricula as m on m.Codigo = l.matricula
        and (m.Excluir is null or not m.Excluir)
        join TblAluno as a on a.Codigo = m.AlunoCodigo
        and (a.Status_Inativo is null or not a.Status_Inativo)
        and (a.Excluir is null or not a.Excluir)
        join TblTurma as t on t.Codigo = m.TurmaCodigo
        and (t.Excluir is null or not t.Excluir)
        where a.Codigo = ?
        group by a.Codigo
        order by m.Codigo desc`,
        [CodigoAluno]).then(result=>{
            if(result.length > 0){
                res.json(
                    {
                        resultado:result,
                        status:true
                    }
                );
            }else{
                res.json(
                    {
                        resultado:result,
                        status:false,
                        error:'CodigoAluno incorreto!'
                    }
                );
            }
        
        }).catch(error=>{res.send(error)})
})



router.get('/',(req,res)=>{
    var {site,login,senha} = req.query;
    site = site.replace(/http:\/\/(.*)\//,'$1')
    site = '%'+site+'%';
    var siteBD = null;
    querySync('select * from clientes where site_1 like ?',[site]).then(result=>{
        siteBD = result
    })
    queryCliente(site,
        `select t.Codigo as TurmaCodigo, a.RespCPF, a.Responsavel ,a.Nome,m.AnoBase,a.Codigo as CodigoAluno,m.Codigo as MatriculaCodigo,l.login,l.nivel,l.senha,t.Turma,t.Turno,t.Turma_Tipo,t.Curso_Grau,t.Serie from logins_alunos as l
        join TblMatricula as m on m.Codigo = l.matricula
        and (m.Excluir is null or not m.Excluir)
        join TblAluno as a on a.Codigo = m.AlunoCodigo
        and (a.Status_Inativo is null or not a.Status_Inativo)
        and (a.Excluir is null or not a.Excluir)
        join TblTurma as t on t.Codigo = m.TurmaCodigo
        and (t.Excluir is null or not t.Excluir)
        where l.login = ? 
        and l.senha = password(?)`,
        [login,senha]).then(result=>{
            if(result.length > 0){
                res.json(
                    {
                        token:createToken({site:site,login:login,senha:senha}),
                        siteEscolaDados:siteBD,
                        resultado:result,
                        status:true
                    }
                );
            }else{
                res.json(
                    {
                        resultado:result,
                        status:false,
                        error:'login ou senha incorreto!'
                    }
                );
            }
        
        }).catch(error=>{res.send(error)})
})




module.exports = router;