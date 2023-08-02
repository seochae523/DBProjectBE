var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;


// 니가 궁금한거

// 웹페이지는 html js css 이게 끝이야
// 근데 바닐라로 짜면 머리 뜨겁잖아
// 그래서 쉽게 만들게 해주는게 .js 프레임워크 리엑트, 뷰 통신관련 js 