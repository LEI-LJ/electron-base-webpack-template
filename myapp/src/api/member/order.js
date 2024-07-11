import request from '@/utils/request'

// 查询充值订单列表
export function listOrder(query) {
  return request({
    url: '/member/order/list',
    method: 'get',
    params: query
  })
}

// 查询充值订单详细
export function getOrder(id) {
  return request({
    url: '/member/order/' + id,
    method: 'get'
  })
}

// 新增充值订单
export function addOrder(data) {
  return request({
    url: '/member/order',
    method: 'post',
    data: data
  })
}


// 创建订单生成支付二维码
export function getPayCode(data) {
  return request({
    url: '/member/order/createOrder/getPayCode',
    method: 'post',
    data: data
  })
}

// 查询充值订单支付状态
export function searchOrderPayStatus(orderSn) {
  return request({
    url: '/member/order/searchOrderPayStatus/' + orderSn,
    method: 'get'
  })
}

// 查询充值订单申请退款信息
export function getRefundOrderInfo(orderSn) {
  return request({
    url: '/member/order/getRefundOrderInfo/' + orderSn,
    method: 'get'
  })
}


// 订单退款申请
export function refundApplySubmit(data) {
  return request({
    url: '/member/order/refundOrder/submit',
    method: 'put',
    data: data
  })
}

// 订单退款申请审核
export function refundAuditSubmit(data) {
  return request({
    url: '/member/order/refundAudit/submit',
    method: 'put',
    data: data
  })
}

// 修改充值订单
export function updateOrder(data) {
  return request({
    url: '/member/order',
    method: 'put',
    data: data
  })
}

// 删除充值订单
export function delOrder(id) {
  return request({
    url: '/member/order/' + id,
    method: 'delete'
  })
}
