var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var registerRouter = require("./routes/register");
var loginRouter = require("./routes/login");
var reviewRouter = require("./routes/review");
var myPageRouter = require("./routes/myPage");
var reservationRouter = require("./routes/reservation");
var couponRouter = require("./routes/coupon");
var findIDRouter = require("./routes/findID");
var findPWRouter = require("./routes/findPW");
var adminRouter = require("./routes/admin");

var app = express();
var history = require("connect-history-api-fallback");
var middleware = express.static(path.join(__dirname, "public"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", usersRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/review", reviewRouter);
app.use("/myPage", myPageRouter);
app.use("/findID", findIDRouter);
app.use("/findPW", findPWRouter);
app.use("/", reservationRouter);
app.use("/", couponRouter);
app.use("/admin", adminRouter);

app.use(middleware);
app.use(history());
app.use(middleware);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
