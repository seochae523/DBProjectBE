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

router.post("/", function (req, res) {
  const name = req.body.name;

  connection.query(
    "SELECT id from user where name = '" + name + "';",
    function (err, row) {
      if (err) throw err;

      if (row.length === 0 || row[0].id == "") {
        res.json({
          message: "please check your name",
          isFound: false,
        });
      } else {
        res.json({
          isFound: true,
          id: row[0].id,
        });
        console.log(row);
      }
    }
  );
});

module.exports = router;
