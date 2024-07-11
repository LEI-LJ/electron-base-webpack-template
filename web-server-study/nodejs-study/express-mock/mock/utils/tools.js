// 统一返回格式
function responseInterceptor(res,data={}){
  const result = {
    code: 200,
    msg: '请求成功',
    data: data
  }
  return res.json(result)
}

module.exports = {
  responseInterceptor: responseInterceptor
}