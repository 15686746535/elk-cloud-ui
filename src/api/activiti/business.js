import request from '@/utils/request'

export function busPage(query) {
  return request({
    url: '/activiti/business/busPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/activiti/business',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/activiti/business',
    method: 'put',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/activiti/business/' + id,
    method: 'delete'
  })
}
