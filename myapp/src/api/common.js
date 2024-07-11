import request from '@/utils/request'

// 获取oss身份上传资格信息
export function getOssTokenInfo(query) {
  return request({
    url: '/member/common/getOssTokenInfo',
    method: 'get',
    params: query
  })
}
