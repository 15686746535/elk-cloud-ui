import request from '@/utils/request'

export function fetchTree() {
  return request({
    url: '/upms/org/treeList',
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/upms/org',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/upms/org/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/upms/org/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/upms/org',
    method: 'put',
    data: obj
  })
}
