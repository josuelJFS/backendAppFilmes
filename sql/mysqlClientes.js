const mysql = require('mysql')
const {querySync}  = require("../mysql");



exports.queryCliente = (site,query,data) => {
  return new Promise((ressover,rej) => {
      site = site.replace(/http:\/\/(.*)\//,'$1')
      site = '%'+site+'%';
     querySync('select * from clientes where site_1 like ?',[site]).then( result => {
        const {host_bd,user_bd,banco,pass_bd,escola,site_1} = result[0] ? result[0] : result[0] = false;
        if(!result[0]){return rej({site: site.replace(/%/g,''), error:'site não encontrado',status:false})}
        const conexao = mysql.createConnection({
            host: host_bd,
            user:user_bd,
            password:pass_bd,
            port:3306,
            database:banco,
            timezone:'utc',
            charset:'utf8'
        })
        conexao.connect(error => {
            if(error){
                conexao.end()
                return rej(error)
            }
            conexao.query(query,data,(error, result) => {
                if(error){
                    conexao.end()
                    return rej({error:error,status:false})
                }
                ressover(result);
                conexao.end()
            })
        })
    
    })
})

}
    
   
    





