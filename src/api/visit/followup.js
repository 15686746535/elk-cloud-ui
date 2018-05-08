import request from '@/utils/request'
// 查询集合
export function followUpList(query) {
  return request({
    url: '/visit/intention/followup/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addFollowUp(obj) {
  return request({
    url: '/visit/intention/followup',
    method: 'post',
    data: obj
  })
}
