import request from '@/utils/request'
// 查询集合
export function fetchStudentList(query) {
  return request({
    url: '/stu/student/getPage',
    method: 'get',
    params: query
  })
}
// 查询集合
export function queryEnrollStudents(query) {
  return request({
    url: '/stu/student/queryEnrollStudents',
    method: 'get',
    params: query
  })
}
// 添加
export function saveStudent(obj) {
  return request({
    url: '/stu/student/save',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getStudent(id) {
  return request({
    url: '/stu/student/' + id,
    method: 'get'
  })
}
// 判断身份证或者手机是否已结存在
export function isExistence(condition) {
  return request({
    url: '/stu/student/isExistence/' + condition,
    method: 'get'
  })
}
// 删除
export function delStudent(id) {
  return request({
    url: '/stu/student/' + id,
    method: 'delete'
  })
}
// 更新
export function putStudent(obj) {
  return request({
    url: '/stu/student',
    method: 'put',
    data: obj
  })
}

/* 学员信息导出 */
export function exportStudent(query) {
  return request({
    url: '/stu/student/exportStudent',
    method: 'get',
    params: query,
    responseType: 'arraybuffer'
  })
}

/*  获取意向 */
export function getIntention(id) {
  return request({
    url: '/visit/intention/' + id,
    method: 'get'
  })
}

export function push122(obj) {
  return request({
    url: '/stu/student/push122',
    method: 'post',
    params: obj
  })
}

