import request from '@/utils/request'

export function searchMatchList(data) {
  return request.get('/member/wgFeature/searchMatchList', {params: data})
}


