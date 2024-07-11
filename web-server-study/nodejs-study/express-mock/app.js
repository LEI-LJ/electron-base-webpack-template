var createError = require('http-errors');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");
var app = express();

/**
 * 全局公共中间件
 */
// 处理json中间件
app.use(bodyParser.json());
// url中间件
app.use(bodyParser.urlencoded({ extended: false }));
// 跨域支持
app.use(cors());

/* 
 *注册路由
**/
var userRouter = require('./mock/user');
var userJsonRouter = require('./mock/user_json');
app.use('/', userRouter);
app.use('/json', userJsonRouter);

// 404问题处理
app.use(function(req, res, next) {
  next(createError(404));
});

// 未知错误统一返回处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 配置并且启动服务
var server = app.listen(3001, '127.0.0.1', function () {
  // 127.0.0.1 等同于 localhost
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例启动成功，访问地址为 http://%s:%s", host, port)

})
