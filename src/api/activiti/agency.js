import request from '@/utils/request'

export function busPage(query) {
  return request({
    url: '/activiti/agency/getPage',
    method: 'get',
    params: query
  })
}

