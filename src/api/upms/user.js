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
export function getUserList(query) {
  return request({
    url: '/upms/user/introList',
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

export function quit(value) {
  return request({
    url: '/upms/user/quit',
    method: 'put',
    params: value
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
    url: '/export/user',
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

export function getPlan(params) {
  return request({
    url: '/upms/user/getPlan',
    method: 'get',
    params: params
  })
}
export function savePlan(plan) {
  return request({
    url: '/upms/user/savePlan/' + plan,
    method: 'put'
  })
}

export function getPlanList(query) {
  return request({
    url: '/upms/user/getPlanList',
    method: 'get',
    params: query
  })
}

