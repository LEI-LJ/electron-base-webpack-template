
const mysql = require('mysql')
let connection = mysql.createConnection({
    host:'localhost',
    port: 3306,
    user:'root',
    password:'123456',
    database:'test' //数据库名称
})
module.exports = connection