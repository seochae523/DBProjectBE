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

router.post("/coupon", function (req, res) {
  const info = {
    user_id: req.body.info.id,
  };
  connection.query(
    "with c(name, user_id, discount_rate) as(SELECT name, user_id, discount_rate from coupon)" +
      "select DISTINCT c.name, c.discount_rate from c, user where '" +
      info.user_id +
      "' = c.user_id;",
    function (err, row) {
      if (err) throw err;
      res.json({
        coupons: row,
      });
    }
  );
});

module.exports = router;
