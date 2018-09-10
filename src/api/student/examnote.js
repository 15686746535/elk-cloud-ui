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
// 更新
export function putRowExamNote(obj) {
  return request({
    url: '/stu/exam/note/update',
    method: 'put',
    data: obj
  })
}
// 更新
export function updateCoach(obj) {
  return request({
    url: '/stu/exam/note/updateCoach',
    method: 'put',
    data: obj
  })
}

// 更新
export function putExamBespeak(obj, url) {
  return request({
    url: '/stu/exam/note/' + url,
    method: 'put',
    data: obj
  })
}
// 添加
export function batchSave(obj) {
  return request({
    url: '/stu/exam/note/save',
    method: 'post',
    data: obj
  })
}

/* 学员成绩导出 */
export function exportAchievement(query) {
  return request({
    url: '/export/score',
    method: 'get',
    params: query,
    responseType: 'arraybuffer'
  })
}
