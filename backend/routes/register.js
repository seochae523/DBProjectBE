var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'skeksk1960!',
  database:'mydb'
});

connection.connect(function (err){
  if (err){
    console.error('mysql connection error');
    console.error(err);
    throw err;
  }
});


router.post('/', function (req, res) {
    const user = {
      'id': req.body.user.id,
      'name': req.body.user.name,
      'password': req.body.user.password
    };
    console.log(user);
    connection.query('SELECT user_id FROM customers WHERE user_id = "' + user.id + '"', function (err, row) {
      if (row[0] == undefined){ //  동일한 아이디가 없을경우,
        connection.query('INSERT INTO customers (user_id, name, password) VALUES ("' + user.id + '","' + user.name + '","' + user.password + '")', user, function (err, row2) {
          if (err) throw err;
        });
        res.json({
          success: true,
          message: 'Sing Up Success!'
        })
      }
      else {
        res.json({
          success: false,
          message: 'Please use another email'
        })
      }
    });
  });

  module.exports = router;