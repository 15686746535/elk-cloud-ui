import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/upms/dict/dictPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/upms/user/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/upms/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/upms/user/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/upms/user/',
    method: 'put',
    data: obj
  })
}

export function remote(type) {
  return fetch({
    url: '/upms/dict/type/' + type,
    method: 'get'
  })
}
