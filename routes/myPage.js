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
    password: req.body.user.password,
  };
  console.log(user);
  connection.query(
    'UPDATE user SET password = "' +
      user.password +
      '" WHERE id = "' +
      user.id +
      '";',
    function (err, row) {
      res.json({
        message: "change Complete!",
      });
    }
  );
});

router.post("/reservation/delete", function (req, res) {
  const info = req.body.key;
  console.log(res.body);
  connection.query(
    "DELETE FROM reservation WHERE room_number = " +
      info.room_number +
      " and start = '" +
      info.start +
      "' and end = '" +
      info.end +
      "';",
    function (err, row) {
      if (err) throw err;
      res.json({
        message: "delete complite",
      });
    }
  );
});

router.post("/data", function (req, res) {
  const user = {
    id: req.body.info.id,
  };
  connection.query(
    'SELECT room_number, start, end FROM reservation WHERE user_id = "' +
      user.id +
      '";',
    function (err, row) {
      if (err) throw err;
      res.json({
        info: row,
      });
    }
  );
});
module.exports = router;
