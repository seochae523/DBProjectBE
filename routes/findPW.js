var express = require("express");
var router = express.Router();
var mysql = require("mysql");
router;
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
  const info = req.body.info;

  connection.query(
    "SELECT password from user where name = '" +
      info.name +
      "' and id ='" +
      info.id +
      "';",
    function (err, row) {
      if (err) throw err;
      console.log(row);
      if (row.length === 0 || row[0].password == "") {
        res.json({
          message: "please check your name or ID",
          isFound: false,
        });
      } else {
        res.json({
          isFound: true,
          password: row[0].password,
        });
      }
    }
  );
});

module.exports = router;
