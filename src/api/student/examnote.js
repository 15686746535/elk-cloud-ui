import request from '@/utils/request'
// 查询集合
export function examFetchList(query) {
  return request({
    url: '/stu/exam/note/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addExam(obj) {
  return request({
    url: '/stu/exam/note/',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getExam(id) {
  return request({
    url: '/stu/exam/note/' + id,
    method: 'get'
  })
}
// 删除
export function delExam(id) {
  return request({
    url: '/stu/exam/note/' + id,
    method: 'delete'
  })
}
// 更新
export function putExamNote(obj) {
  return request({
    url: '/stu/exam/note',
    method: 'put',
    data: obj
  })
}
