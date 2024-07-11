import request from '@/utils/request'

// 查询账户余额列表
export function listMemBalance(query) {
  return request({
    url: '/member/memBalance/list',
    method: 'get',
    params: query
  })
}

// 查询账户余额详细
export function getMemBalance(userId) {
  return request({
    url: '/member/memBalance/' + userId,
    method: 'get'
  })
}

// 获取支付码
export function getPayCode(data) {
  return request({
    url: '/member/memBalance/getPayCode',
    method: 'post',
    data: data
  })
}

// 查询充值支付状态
export function searchRechargePayStatus(serialNo) {
  return request({
    url: '/member/memBalance/searchRechargePayStatus/' + serialNo,
    method: 'get'
  })
}
