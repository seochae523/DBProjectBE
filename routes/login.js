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
    password: req.body.user.pw,
  };

  connection.query(
    'SELECT id, password FROM user WHERE id = "' + user.id + '"',
    function (err, row) {
      if (row[0] == undefined) {
        //  동일한 아이디가 없을경우,
        res.json({
          success: false,
          message: "Please cheak your ID",
        });
      } else {
        // 동일한 아이디가 있을 경우
        if (row[0].password == user.password) {
          // 비번이 맞으면
          res.json({
            success: true,
            message: "login success",
          });
        } else {
          res.json({
            // 비번이 틀리면
            success: false,
            message: "Please cheak your password",
          });
        }
      }
    }
  );
});

module.exports = router;
