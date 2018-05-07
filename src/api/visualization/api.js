import request from '@/utils/request'

export function queryIndex() {
  return request({
    url: '/visualization/index',
    method: 'get'
  })
}

export function queryWorry(params) {
  return request({
    url: '/visualization/queryWorry',
    method: 'get',
    params: params
  })
}

