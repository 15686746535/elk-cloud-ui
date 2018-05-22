import request from '@/utils/request'
// 查询集合
export function getQuestion(id) {
  return request({
    url: '/stu/revisit/question/' + id,
    method: 'get'
  })
}
// 添加
export function addQuestion(obj) {
  return request({
    url: '/stu/revisit/question',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getQbj(id) {
  return request({
    url: '/stu/revisit/question/' + id,
    method: 'get'
  })
}
// 根据ID获取
export function queryExamNoted(obj) {
  return request({
    url: '/stu/revisit/question/queryExamNoted',
    method: 'get',
    params: obj
  })
}
// 删除
export function delQuestion(id) {
  return request({
    url: '/stu/revisit/question/' + id,
    method: 'delete'
  })
}
// 更新
export function putQuestion(obj) {
  return request({
    url: '/student/revisit/question',
    method: 'put',
    data: obj
  })
}
