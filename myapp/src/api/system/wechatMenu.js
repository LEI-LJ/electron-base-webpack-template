import request from '@/utils/request'

// 查询微信公众号自定义菜单列表
export function listWechatMenu(query) {
  return request({
    url: '/system/wechatMenu/list',
    method: 'get',
    params: query
  })
}

// 查询微信公众号自定义菜单详细
export function getWechatMenu(id) {
  return request({
    url: '/system/wechatMenu/' + id,
    method: 'get'
  })
}

// 新增微信公众号自定义菜单
export function addWechatMenu(data) {
  return request({
    url: '/system/wechatMenu',
    method: 'post',
    data: data
  })
}

// 发布微信公众号自定义菜单
export function publishMenuSubmit(data) {
  return request({
    url: '/system/wechatMenu/publishMenuSubmit',
    method: 'post',
    data: data
  })
}

// 修改微信公众号自定义菜单
export function updateWechatMenu(data) {
  return request({
    url: '/system/wechatMenu',
    method: 'put',
    data: data
  })
}

// 删除微信公众号自定义菜单
export function delWechatMenu(id) {
  return request({
    url: '/system/wechatMenu/' + id,
    method: 'delete'
  })
}
