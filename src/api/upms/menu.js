import request from '@/utils/request'

export function fetchTree(query) {
  return request({
    url: '/upms/menu/tree',
    method: 'get',
    params: query
  })
}

// 通过角色查询用户菜单 主页菜单
export function findMenuByRole(role) {
  console.log(role)
  return request({
    url: '/upms/menu/findMenuByRole/' + role,
    method: 'get'
  })
}

export function fetchUserTree() {
  return request({
    url: '/upms/menu/userTree/',
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/upms/menu/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/upms/menu/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/upms/menu/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/upms/menu/',
    method: 'put',
    data: obj
  })
}
