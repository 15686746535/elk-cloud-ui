import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/basis/dict/dictPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return request({
    url: '/basis/dict',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/basis/dict/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/basis/dict/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/basis/dict',
    method: 'put',
    data: obj
  })
}

export function remote(type) {
  return fetch({
    url: '/basis/dict/getByType/' + type,
    method: 'get'
  })
}
