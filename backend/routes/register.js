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
  const user = {
    id: req.body.user.id,
    name: req.body.user.name,
    password: req.body.user.password,
  };
  console.log(user);
  connection.query(
    "SELECT signUp('" +
      user.id +
      "', '" +
      user.name +
      "', '" +
      user.password +
      "') as message;",
    function (err, row) {
      if (err) throw err;
      res.json({
        message: row[0].message,
      });
    }
  );
});

module.exports = router;
