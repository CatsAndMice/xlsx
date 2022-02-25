const { connection } = require('./index');
connection.query('show tables', (err, results, fields) => {
    console.log(results);
})