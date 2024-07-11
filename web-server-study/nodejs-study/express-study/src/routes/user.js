var express = require('express');
var router = express.Router();
var connection = require('../db/connection.js')
var tools = require('../utils/tools.js')

/**
 * 单表增删查改处理
 * // 多表联表类似，仅需拼接对应的sql即可
 */ 
/* 查询用户列表数据 */
router.get('/list', function(req, res) {
  const { userName } = req.query
  let sql = `select * from sys_user`
  if(userName){
    sql = sql + ` where user_name like '%${userName}%'`
  }
  // 执行sql语句查询sys_user表中所有数据，最纯粹的方式就是自己拼sql语句
  try {
    connection.query(sql, function(error,results){
      tools.responseInterceptor(res,error,results)
    })
  }catch{
    throw Error('请求失败')
  }
  
})

/* 查询用户详情数据 */
router.get('/detail', function(req, res) {
  let userId = req.query.userId
  let sql = `select * from sys_user where user_id = ${userId}`
  try{
    // 执行sql语句查询sys_user表中指定id的所有数据，路径为http://localhost:8081/user/detail?userId=1
    connection.query(sql, function(error,results){
      tools.responseInterceptor(res,error,results)
    })
  }catch{
    throw Error('请求失败')
  }

})

/* 新增用户数据 */
router.post('/add', function(req, res) {
  let body = req.body
  console.log('body', body)
  let sql = `insert into sys_user (user_name,user_phone) values ('${body.userName}','${body.userPhone}')`
  try{
    // sql语句查找拼接即可
    connection.query(sql, function(error,results){
      tools.responseInterceptor(res,error,results)
    })
  }catch{
    throw Error('请求失败')
  }
})
/* 修改用户数据 */
router.post('/edit', function(req, res) {
  let body = req.body
  console.log('body', body)
  let sql = `update sys_user set 
  user_name='${body.userName}',user_phone=${body.userPhone}
  where user_id=${body.userId}`
  // sql语句查找拼接即可
  connection.query(sql, function(error,results){
    tools.responseInterceptor(res,error,results)
  })
})

/* 删除用户数据 */
router.get('/delete', function(req, res) {
  let userId = req.query.userId
  if(!userId){
    res.send({
      code: 500,
      msg: '请输入用户id'
    })
  }
  let sql = `delete from sys_user where user_id=${userId}`
  // 路径为http://localhost:8081/user/delete?userId=1
  connection.query(sql, function(error,results){
    tools.responseInterceptor(res,error,results)
  })
})

module.exports = router;
