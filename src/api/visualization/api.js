import request from '@/utils/request'

export function queryIndex() {
  return request({
    url: '/visualization/index',
    method: 'get'
  })
}
