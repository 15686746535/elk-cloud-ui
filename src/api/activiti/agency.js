import request from '@/utils/request'

export function queryAgency(query) {
  return request({
    url: '/activiti/agency/queryAgency',
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

export function saveAgency(obj) {
  return request({
    url: '/activiti/agency',
    method: 'post',
    data: obj
  })
}

