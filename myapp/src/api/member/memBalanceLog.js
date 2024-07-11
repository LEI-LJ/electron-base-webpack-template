import request from '@/utils/request'

// 查询账户余额明细列表
export function listMemBalanceLog(query) {
  return request({
    url: '/member/memBalanceLog/list',
    method: 'get',
    params: query
  })
}

// 查询账户余额明细详细
export function getMemBalanceLog(id) {
  return request({
    url: '/member/memBalanceLog/' + id,
    method: 'get'
  })
}
