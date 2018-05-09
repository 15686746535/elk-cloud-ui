import request from '@/utils/request'

export function busPage(query) {
  return request({
    url: '/activiti/agency/getPage',
    method: 'get',
    params: query
  })
}
export function isDown(query) {
  return request({
    url: '/activiti/agency/isDown',
    method: 'get',
    params: query
  })
}
export function updateAgency(obj) {
  return request({
    url: '/activiti/agency',
    method: 'put',
    data: obj
  })
}

