const mysql = require('mysql')
require('dotenv').config()

const HOST = process.env.BD_HOST || 'localhost';
const USER = process.env.BD_USER || 'digital';
const PASSWORD = process.env.BD_PASSWORD || 'ykk578on';
const PORT = Number( process.env.BD_PORT || 3306 );
const DATABASE = process.env.BD_DATABASE || 'clientes';
const TIMEZONE = process.env.TIMEZONE || 'utc';
const CHARSET = process.env.CHARSET || 'utf8';

console.log(HOST,USER,PASSWORD)
const createConnection = () => {
    return mysql.createConnection({
        host:HOST,
        user:USER,
        password:PASSWORD,
        port:PORT,
        database:DATABASE,
        timezone:TIMEZONE,
        charset:CHARSET
    })
}


exports.querySync = (query, data, {}={}) =>
    new Promise((res,rej) => {
        const connection = createConnection()
        connection.connect(error => {
            if(error){
                connection.end()
                return rej(error)
            }
            connection.query(query,data,(error, result) => {
                if(error){
                    connection.end()
                    return rej(error)
                }
                res(result)
                connection.end()
            })
        })
    })