const config = require('./mysql.config');
const mysql = require('mysql2');
const connection = mysql.createConnection(config);

connection.connect(function (err) {
    if (err) {
        console.error('连接失败: ' + err.stack);
        return;
    }
    console.log('连接成功 id ' + connection.threadId);
});


const mysqlClose = () => {
    connection.end();
}

module.exports = {
    mysqlClose,
    connection
}