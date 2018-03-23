import request from '@/utils/request'

export function busTree() {
  return request({
    url: '/activiti/business/busTree',
    method: 'get'
  })
}

