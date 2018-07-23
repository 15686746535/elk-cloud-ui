import request from '@/utils/request'

export function test() {
  return request({
    url: '/app/coach/contacts/contactsMerge',
    method: 'get'
  })
}
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

export function quit(id) {
  return request({
    url: '/upms/user/quit/' + id,
    method: 'put'
  })
}

export function rePassword(userId) {
  return request({
    url: '/upms/user/initialize',
    method: 'put',
    params: { 'userId': userId }
  })
}
export function findUserByCondition(condition) {
  return request({
    url: '/upms/user/findUserByCondition',
    method: 'get',
    params: condition
  })
}

export function putObj(obj) {
  return request({
    url: '/upms/user',
    method: 'put',
    data: obj
  })
}

/* 导出同事信息 */
export function exportUser(query) {
  return request({
    url: '/upms/user/exportUser',
    method: 'get',
    params: query,
    responseType: 'arraybuffer'
  })
}
/* 修改个人信息 */
export function editInfo(query) {
  return request({
    url: '/upms/user/editInfo',
    method: 'put',
    data: query
  })
}
