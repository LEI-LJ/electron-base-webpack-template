var express = require('express');
var router = express.Router();
var tools = require('../utils/tools.js')

/* 文件上传 */
router.post('/upload', function(req, res) {
  // 安装express-fileupload之后可以从req.files中找到multipart/form-data上传的文件file
  // 上传方式参考public图片
  try {
    let file = req.files.file
    if(!file) {
      res.send({
        code: 500,
        message: '请选择文件'
      });
    } else {
      file.mv('./public/' + file.name,function(error){
        tools.responseInterceptor(res,error,{})
      })
    }
  } catch (err) {
    res.send({
      code: 500,
      msg: '文件上传失败'
  });
  }
})
module.exports = router;