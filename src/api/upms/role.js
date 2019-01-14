import request from '@/utils/request'

export function roleList() {
  return request({
    url: '/upms/role/roleList',
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

export function menuPermissionUpd(roleId, menuIds) {
  return request({
    url: '/upms/role/roleMenuUpd',
    method: 'put',
    params: {
      roleId: roleId,
      menuIds: menuIds
    }
  })
}

export function dataPermissionUpd(roleId, orgIds) {
  return request({
    url: '/upms/role/roleOrgUpd',
    method: 'put',
    params: {
      roleId: roleId,
      orgIds: orgIds
    }
  })
}

export function fetchRoleTree(roleName) {
  return request({
    url: '/upms/menu/roleTree/' + roleName,
    method: 'get'
  })
}

export function findWorkMobile(params) {
  return request({
    url: '/upms/user/findWorkMobile',
    method: 'get',
    params: params
  })
}

export function batchAddMoblie(obj) {
  return request({
    url: '/upms/user/batchAddMobile',
    method: 'post',
    data: obj
  })
}

export function deleteWorkMobile(obj) {
  return request({
    url: '/upms/user/deleteWorkMobile',
    method: 'post',
    data: obj
  })
}
export function saveWorkMobile(obj) {
  return request({
    url: '/upms/user/saveWorkMobile',
    method: 'post',
    data: obj
  })
}
