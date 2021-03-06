import request from '@/utils/request'
// 查询集合
export function getBatchList(query) {
  return request({
    url: '/stu/exam/getPage',
    method: 'get',
    params: query
  })
}// 查询集合
export function getBatchs(query) {
  return request({
    url: '/stu/exam/queryBatchList',
    method: 'get',
    params: query
  })
}
export function getBatch(id) {
  return request({
    url: '/stu/exam/getBatch/' + id,
    method: 'get'
  })
}
// 添加
export function createBatchs(obj) {
  return request({
    url: '/stu/exam/createBatchs',
    method: 'post',
    data: obj
  })
}
// 添加
export function addObj(obj) {
  return request({
    url: '/stu/exam/save',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getObj(id) {
  return request({
    url: '/stu/exam/' + id,
    method: 'get'
  })
}
// 删除
export function delObj(id) {
  return request({
    url: '/stu/exam/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/stu/exam/update',
    method: 'put',
    data: obj
  })
}
/* 考试名单导出接口 */
export function exportExamList(query) {
  return request({
    url: '/export/exam',
    method: 'get',
    params: query,
    responseType: 'arraybuffer'
  })
}
export function getSuperviseInfo(query) {
  return request({
    url: '/supervise/stuInfo',
    method: 'get',
    params: query
  })
}
export function getSupervisePush(obj) {
  return request({
    url: '/supervise/push',
    method: 'get',
    params: obj
  })
}
export function getFieldList(type) {
  return request({
    url: '/basis/dict/getByType/' + type,
    method: 'get'
  })
}
