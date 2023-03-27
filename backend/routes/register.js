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
      'email': req.body.user.email,
      'name': req.body.user.name,
      'password': req.body.user.password
    };
    console.log(user);
    connection.query('SELECT userid FROM users WHERE userid = "' + user.email + '"', function (err, row) {
      if (row[0] == undefined){ //  동일한 아이디가 없을경우,
        const salt = bcrypt.genSaltSync();
        const encryptedPassword = bcrypt.hashSync(user.password, salt);
        connection.query('INSERT INTO users (userid,name,password) VALUES ("' + user.email + '","' + user.name + '","' + encryptedPassword + '")', user, function (err, row2) {
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
          message: 'Sign Up Failed Please use anoter ID'
        })
      }
    });
  });

  module.exports = router;