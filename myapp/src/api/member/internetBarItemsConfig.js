import request from '@/utils/request'

// 查询网吧客户端功能配置详细
export function getInternetBarItemsConfig(id) {
  return request({
    url: '/member/internetBarItemsConfig/' + id,
    method: 'get'
  })
}

// 查询网吧客户端功能配置详细根据网吧ID
export function getInternetBarItemsConfigByInternetBarId(internetBarId) {
  return request({
    url: '/member/internetBarItemsConfig/getCurrentConfigVal/' + internetBarId,
    method: 'get'
  })
}

// 修改网吧客户端功能配置
export function updateInternetBarItemsConfig(data) {
  return request({
    url: '/member/internetBarItemsConfig',
    method: 'put',
    data: data
  })
}

// 保存发布网吧客户端功能配置
export function publishConfig(data) {
  return request({
    url: '/member/internetBarItemsConfig/publishConfig',
    method: 'put',
    data: data
  })
}
