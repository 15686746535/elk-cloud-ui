import request from '@/utils/request'

export function roleList(id) {
  return request({
    url: '/upms/role/roleList?orgId=' + id,
    method: 'get'
  })
}

export function fetchList(query) {
  return request({
    url: '/upms/role/rolePage',
    method: 'get',
    params: query
  })
}

export function getObj(id) {
  return request({
    url: '/upms/role/' + id,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/upms/role',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/upms/role',
    method: 'put',
    data: obj
  })
}

export function delObj(id) {
  return request({
    url: '/upms/role/' + id,
    method: 'delete'
  })
}

export function permissionUpd(roleId, menuIds) {
  return request({
    url: '/upms/role/roleMenuUpd',
    method: 'put',
    params: {
      roleId: roleId,
      menuIds: menuIds
    }
  })
}

export function fetchRoleTree(roleName) {
  return request({
    url: '/upms/menu/roleTree/' + roleName,
    method: 'get'
  })
}
