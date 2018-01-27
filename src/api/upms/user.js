import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/upms/user/userPage',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  console.log('========== 这里是保存接口  ============')
  console.log(obj)
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
  console.log('========== 这里是修改接口  ============')
  console.log(obj)
  return request({
    url: '/upms/user',
    method: 'put',
    data: obj
  })
}

