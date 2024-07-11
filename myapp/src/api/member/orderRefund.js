import request from '@/utils/request'

// 查询订单退款列表
export function listOrderRefund(query) {
  return request({
    url: '/member/orderRefund/list',
    method: 'get',
    params: query
  })
}

// 查询订单退款详细
export function getOrderRefund(id) {
  return request({
    url: '/member/orderRefund/' + id,
    method: 'get'
  })
}

// 新增订单退款
export function addOrderRefund(data) {
  return request({
    url: '/member/orderRefund',
    method: 'post',
    data: data
  })
}

// 修改订单退款
export function updateOrderRefund(data) {
  return request({
    url: '/member/orderRefund',
    method: 'put',
    data: data
  })
}

// 删除订单退款
export function delOrderRefund(id) {
  return request({
    url: '/member/orderRefund/' + id,
    method: 'delete'
  })
}
