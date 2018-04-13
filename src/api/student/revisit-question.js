import request from '@/utils/request'
// 查询集合
export function getQuestion(id) {
  return request({
    url: '/stu/revisitquestion/' + id,
    method: 'get'
  })
}
// 添加
export function addQuestion(obj) {
  return request({
    url: '/stu/revisitquestion',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getQbj(id) {
  return request({
    url: '/stu/revisitquestion/' + id,
    method: 'get'
  })
}
// 删除
export function delQuestion(id) {
  return request({
    url: '/stu/revisitquestion/' + id,
    method: 'delete'
  })
}
// 更新
export function putQuestion(obj) {
  return request({
    url: '/student/revisitquestion',
    method: 'put',
    data: obj
  })
}
