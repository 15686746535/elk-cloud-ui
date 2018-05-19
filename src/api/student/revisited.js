import request from '@/utils/request'
// 查询集合
export function getRevisitedList(query) {
  return request({
    url: '/stu/revisit/note/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addRevisited(obj) {
  return request({
    url: '/stu/revisit/note',
    method: 'post',
    data: obj
  })
}

// 删除
export function delRevisited(id) {
  return request({
    url: '/stu/revisit/note/' + id,
    method: 'delete'
  })
}
// 更新
export function putObj(obj) {
  return request({
    url: '/stu/revisit/note',
    method: 'put',
    data: obj
  })
}
