require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "vegist",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = "DROP TABLE if exists favourites; DROP TABLE if exists notes; CREATE TABLE favorites (id INT NOT NULL AUTO_INCREMENT, title varchar(255) NOT NULL, source_url varchar(255) NOT NULL, PRIMARY KEY (id)); CREATE TABLE notes (id INT NOT NULL AUTO_INCREMENT, favoritesId INT NOT NULL, notes varchar(255) NOT NULL,PRIMARY KEY (id)); ALTER TABLE notes ADD CONSTRAINT notes_fk0 FOREIGN KEY (favoritesId) REFERENCES favorites(id);";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation `favorites` was successful!");

    console.log("Closing...");
  });

  con.end();
});


