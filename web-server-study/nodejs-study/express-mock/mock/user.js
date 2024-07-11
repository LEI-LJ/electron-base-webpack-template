var express = require('express');
var router = express.Router();
var Mock = require("mockjs")
var tools = require('./utils/tools')

//调用mock方法模拟初始化列表数据
// mockjs示例文档http://mockjs.com/examples.html
var datas = Mock.mock({
  // 属性 data 的值是一个数组，其中含有 1 到 10 个元素
  'data|12': [
    {
      id: '@increment',
      name: '@cname()',
      address: '@city(true)',
      date: '@date(yyyy-MM-dd)'
    }
  ]
});

// 分页列表与查询
router.get('/user/list', function(req, res) {
  let { pageNum=1, pageSize=10, name=null } = req.query
  const startIndex = (pageNum - 1) * pageSize
  const endIndex = pageSize * pageNum
  const total = datas.data.length
  let currentData = datas.data
  // 筛选条件
  if(name){
    currentData = datas.data.filter(item => {
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
  let user = datas.data.find(item => {
    return id == item.id
  })
  tools.responseInterceptor(res,user)
})
// 新增
router.post('/user/add', function(req, res) {
  let body = req.body
  let user = Mock.mock({
    id: '@increment',
    name: body.name,
    address: body.address,
    date: body.date
  })
  tools.responseInterceptor(res,datas.data.unshift(user))
})
// 修改
router.post('/user/update', function(req, res) {
  let body = req.body
  let idx = datas.data.findIndex(item => {
    return body.id == item.id
  }) 
  datas.data.splice(idx, 1, body)
  tools.responseInterceptor(res)
})
// 删除
router.post('/user/remove', function(req, res) {
  let { id } = req.query
  let idx = datas.data.findIndex(item => {
    return id == item.id
  }) 
  datas.data.splice(idx, 1)
  tools.responseInterceptor(res)
})

module.exports = router;
