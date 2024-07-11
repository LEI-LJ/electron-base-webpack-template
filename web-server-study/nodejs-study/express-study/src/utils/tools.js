
// 统一返回格式
function responseInterceptor(res, err, data){
  console.log('sqlerr', err)
  if(err){
    return res.send({
      code:500,
      msg: 'fail',
    })
  }else{
    return res.send({
      code: 200,
      msg: 'success',
      data: data 
    })
  }
}
module.exports = {
  responseInterceptor: responseInterceptor
}
