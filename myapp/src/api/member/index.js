import request from '@/utils/request'

// 获取静态统计数据
export function getStaticsData() {
  return request({
    url: '/member/index/getStaticsData',
    method: 'get'
  })
}

// 获取订单统计数据
export function getOrderStaticsData() {
  return request({
    url: '/member/index/getOrderStaticsData',
    method: 'get'
  })
}

// 获取网吧产品统计数据
export function getInternetBarProductStaticsData() {
  return request({
    url: '/member/index/getInternetBarProductStaticsData',
    method: 'get'
  })
}

// 客户端统计数据
export function getCleintTotalData(query) {
  return request({
    url: '/member/index/getCleintTotalData',
    method: 'get',
    params: query
  })
}

// 客户端防御折线图数据
export function getLineChartData(query) {
  return request({
    url: '/member/index/getLineChartData',
    method: 'get',
    params: query
  })
}

// 客户端日活和max在线图数据
export function getBarChartData(query) {
  return request({
    url: '/member/index/getBarChartData',
    method: 'get',
    params: query
  })
}

// 网维下拉选数据
export function getSelectMemUserData(query) {
  return request({
    url: '/member/index/getSelectMemUserData',
    method: 'get',
    params: query
  })
}

// 网吧下拉选数据
export function getSelectMemInternetBarData(query) {
  return request({
    url: '/member/index/getSelectMemInternetBarData',
    method: 'get',
    params: query
  })
}


