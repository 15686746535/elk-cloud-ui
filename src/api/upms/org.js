import request from '@/utils/request'

export function fetchTree() {
  return request({
    url: '/upms/org/tree',
    method: 'get'
  })
}
