var express = require('express');
var router = express.Router();
var Mock = require("mockjs")
var tools = require('./utils/tools')

// 使用json的方式储存数据，不过初始化数据要自己手动处理相较而言麻烦一些，但清晰明确
var userJson = require("./json/user.json")  // userJson 可以看作一个对象

// 分页列表与查询 路径为/json/user/list
router.get('/user/list', function(req, res) {
  let { pageNum=1, pageSize=10, name=null } = req.query
  const startIndex = (pageNum - 1) * pageSize
  const endIndex = pageSize * pageNum
  const total = userJson.data.length
  let currentData = userJson.data
  // 筛选条件
  if(name){
    currentData = userJson.data.filter(item => {
      return item.name.indexOf(name) != -1
    })
  }
  tools.responseInterceptor(res, {
    list: currentData.slice(startIndex, endIndex),
    total: total,
    pageNum: pageNum,
    pageSize: pageSize
  })
})
// 详情
router.get('/user/detail', function(req, res) {
  let { id } = req.query
  // 根据id获取数据详情
  let user = userJson.data.find(item => {
    return id == item.id
  })
  tools.responseInterceptor(res,user)
})
// 新增
router.post('/user/add', function(req, res) {
  let body = req.body
  let user = {
    id: userJson.data.length + 1,
    name: body.name,
    address: body.address,
    date: body.date
  }
  tools.responseInterceptor(res,userJson.data.unshift(user))
})
// 修改
router.post('/user/update', function(req, res) {
  let body = req.body
  let idx = userJson.data.findIndex(item => {
    return body.id == item.id
  }) 
  userJson.data.splice(idx, 1, body)
  tools.responseInterceptor(res)
})
// 删除
router.post('/user/remove', function(req, res) {
  let { id } = req.query
  let idx = userJson.data.findIndex(item => {
    return id == item.id
  }) 
  userJson.data.splice(idx, 1)
  tools.responseInterceptor(res)
})

module.exports = router;
