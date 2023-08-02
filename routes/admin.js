var express = require("express");
var router = express.Router();
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "skeksk1960!",
  database: "mydb",
});

connection.connect(function (err) {
  if (err) {
    console.error("mysql connection error");
    console.error(err);
    throw err;
  }
});

router.get("/review/score", function (req, res) {
  connection.query(
    "SELECT user_id, AVG(score) as score from reviews GROUP BY user_id;",
    function (err, row) {
      if (err) throw err;
      console.log(row);
      res.json({
        info: row,
      });
    }
  );
});

module.exports = router;
