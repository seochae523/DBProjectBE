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
    id: req.body.info.id,
    start: req.body.info.start,
    end: req.body.info.end,
    coupon: req.body.info.coupon,
  };
  console.log(user);
  connection.query(
    'SELECT room_number FROM rooms WHERE room_number NOT IN (SELECT room_number FROM reservation WHERE start <= "' +
      user.end +
      '"AND end >= "' +
      user.start +
      '");',
    function (err, row) {
      if (err) throw err;
      res.json({
        abilable: row,
      });
    }
  );
});

// 예약까지 완료!
router.post("/reservation", function (req, res) {
  const info = {
    id: req.body.info.id,
    start: req.body.info.start,
    end: req.body.info.end,
    coupon: req.body.info.coupon.name,
    room_number: req.body.info.room_number,
    reservation_number: 0,
    payment: req.body.info.payment,
    price: req.body.info.price,
    date: req.body.info.date,
  };
  connection.query(
    "CALL process_reservation(" +
      info.room_number +
      ", '" +
      info.id +
      "', '" +
      info.start +
      "', '" +
      info.end +
      "', '" +
      info.coupon +
      "', '" +
      info.payment +
      "', " +
      info.price +
      ", '" +
      info.date +
      "'); ",
    function (err, row) {
      if (err) throw err;
      res.json({
        message: "reservation success!",
      });
    }
  );
});

router.post("/price", function (req, res) {
  const info = {
    id: req.body.info.id,
    start: req.body.info.start,
    end: req.body.info.end,
    coupon: req.body.info.coupon,
    room_number: req.body.info.room_number,
  };
  connection.query(
    "SELECT price * (DATEDIFF('" +
      info.end +
      "', '" +
      info.start +
      "')+1) AS price FROM room_price WHERE room_number = " +
      info.room_number +
      " ;",
    function (err, row) {
      if (err) throw err;
      res.json({
        price: row[0],
      });
    }
  );
});
module.exports = router;
