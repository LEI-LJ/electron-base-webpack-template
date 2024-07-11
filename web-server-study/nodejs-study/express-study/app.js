var fileUpload = require('express-fileupload');
var createError = require('http-errors');
var logger = require('morgan');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require("cors");
var app = express();

/**
 * 全局公共中间件
 */
// 日志中间件
app.use(logger('dev'));
// 处理json中间件
app.use(bodyParser.json());
// url中间件
app.use(bodyParser.urlencoded({ extended: false }));
// 设置public静态资源文件访问 localhost:3000/test.jpg
app.use('/public', express.static('public'));
// 跨域支持
app.use(cors());
// 配置文件上传模块
app.use(fileUpload());

// 创建自己的第一个中间件，仅作示例
const firstmiddleware = (req, res, next) => {
  console.log('这是一个最简单的自定义中间件函数，每次路由请求都会调用到');
  //注意: 在当前中间件的业务处理完毕后 必须调用next函数
  //表示把流转关系交给下一个中间件或路由
  next()
}
app.use(firstmiddleware)

/* 
 *注册路由
**/
var userRouter = require('./src/routes/user');
var fileRouter = require('./src/routes/file');
app.use('/user', userRouter);
app.use('/file', fileRouter);

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
var server = app.listen(3000, '127.0.0.1', function () {
  // 127.0.0.1 等同于 localhost
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例启动成功，访问地址为 http://%s:%s", host, port)

})
