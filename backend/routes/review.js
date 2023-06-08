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

router.get("/data", function (req, res) {
  connection.query(
    "SELECT DISTINCT * from user as u join reviews as r where u.id = r.user_id order by date desc;",
    function (err, row) {
      if (err) throw err;
      //console.log(row); 여기서 review 목록을 프론트에 review리스트에 보내기~~~~>~>~>~?~?~??~?~?~
      res.json({
        reviews: row,
      });
    }
  );
});

router.get("/data/roomNumber", function (req, res) {
  connection.query(
    "SELECT * from reservation where NOW() > end order by start desc;",
    function (err, row) {
      if (err) throw err;
      res.json({
        room_number: row[0].room_number,
      });
    }
  );
});

router.post("/data/delete", function (req, res) {
  const key = {
    user_id: req.body.key.user_id,
    date: req.body.key.date,
  };
  connection.query(
    "DELETE FROM reviews WHERE user_id = '" +
      key.user_id +
      "' and date = '" +
      key.date +
      "';",
    function (err, row) {
      if (err) throw err;
      res.json({
        message: "delete success",
      });
    }
  );
});

router.post("/data/confirm", function (req, res) {
  const key = {
    user_id: req.body.key.user_id,
    date: req.body.key.date,
    contents: req.body.key.contents,
  };
  console.log(key.user_id);
  console.log(key.date);
  connection.query(
    "UPDATE reviews SET contents = '" +
      key.contents +
      "' where user_id = '" +
      key.user_id +
      "' and date = '" +
      key.date +
      "';",
    function (err, row) {
      if (err) throw err;
      res.json({
        message: "modifiy success",
      });
    }
  );
});

router.post("/data", function (req, res) {
  const info = {
    contents: req.body.info.contents,
    user_id: req.body.info.user_id,
    user_name: req.body.info.name,
    date: req.body.info.date,
    room_number: 0,
    score: req.body.info.score,
  };

  connection.query(
    "SELECT * FROM reservation WHERE NOW() > end and user_id = '" +
      info.user_id +
      "' ORDER BY start DESC;",
    function (err, row) {
      if (err) {
        throw err;
      }
      if (row.length == 0 || row[0].room_number == undefined) {
        res.json({
          message: "please check your reservation",
          submitted: false,
        });
      } else {
        info.room_number = row[0].room_number;
        connection.query(
          'INSERT INTO reviews (contents, user_id, date, room_number, score) VALUES ("' +
            info.contents +
            '","' +
            info.user_id +
            '","' +
            info.date +
            '","' +
            info.room_number +
            '","' +
            info.score +
            '")',
          function (err, row2) {
            if (err) throw err;
            connection.query(
              "SELECT name from user where id = '" + info.user_id + "';",
              function (err, row3) {
                if (err) throw err;
                info.user_name = row3[0].name;
                console.log(info.user_name);
                res.json({
                  room_number: row[0].room_number,
                  message: "success",
                  name: info.user_name,
                  submitted: true,
                });
              }
            );
          }
        );
      }
    }
  );
});

module.exports = router;
