const express = require('express');
const app = express();
const port = 3000;
const dbConfig = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(dbConfig);

// Dropa e recria a tabela inserindo os valores
connection.query('DROP TABLE IF EXISTS nodedb.people')
connection.query(
        `CREATE TABLE IF NOT EXISTS nodedb.people (
        id INT(11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
        )`
    )
connection.query(`insert into people (name) values ('Bruno'), ('Marcos'), ('Antonio')`)
connection.end()

app.get('/', (req,res) => {
    const connection = mysql.createConnection(dbConfig);

    connection.query('SELECT * FROM people', (error, results) => {
        let html = '';
        html += '<ul>';
            results.forEach((result) => {
                html += '<li>' + result.name + '</li>';
            });
        html += '</ul>';
        
        res.send('<h1> Lista da tabela People: </h1>' + html);
      });

    connection.end()
})

app.listen(port, () => {
  console.log(`Rodando na porta ${port}`);
});