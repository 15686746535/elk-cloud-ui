import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/upms/user/userPage',
    method: 'get',
    params: query
  })
}
export function userList(query) {
  return request({
    url: '/upms/user/userList',
    method: 'get',
    params: query
  })
}
// isCoach
export function addObj(obj) {
  return request({
    url: '/upms/user',
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
    url: '/upms/user/quit',
    method: 'put',
    data: id
  })
}

export function rePassword(userId) {
  return request({
    url: '/upms/user/initialize',
    method: 'put',
    data: { 'userId': userId }
  })
}

export function putObj(obj) {
  return request({
    url: '/upms/user',
    method: 'put',
    data: obj
  })
}

