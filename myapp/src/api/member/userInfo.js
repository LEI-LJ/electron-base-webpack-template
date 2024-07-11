import request from '@/utils/request'

// 查询网维数据信息列表
export function listUserInfo(query) {
  return request({
    url: '/member/userInfo/list',
    method: 'get',
    params: query
  })
}

// 查询网维数据信息详细
export function getUserInfo(id) {
  return request({
    url: '/member/userInfo/' + id,
    method: 'get'
  })
}

// 新增网维数据信息
export function addUserInfo(data) {
  return request({
    url: '/member/userInfo',
    method: 'post',
    data: data
  })
}

// 修改网维数据信息
export function updateUserInfo(data) {
  return request({
    url: '/member/userInfo',
    method: 'put',
    data: data
  })
}

// 修改网维状态
export function changeStatus(data) {
  return request({
    url: '/member/userInfo/changeStatus',
    method: 'put',
    data: data
  })
}

// 重置网维密码
export function resetPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return request({
    url: '/member/userInfo/resetPwd',
    method: 'put',
    data: data
  })
}

// 删除网维数据信息
export function delUserInfo(id) {
  return request({
    url: '/member/userInfo/' + id,
    method: 'delete'
  })

}// 下拉选网维列表数据
export function selectAllList() {
  return request({
    url: '/member/userInfo/select/listData',
    method: 'get'
  })
}
