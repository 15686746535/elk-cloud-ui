import request from '@/utils/request'
// 查询集合
export function getFinanceList(query) {
  return request({
    url: '/finance/service/category/getPage',
    method: 'get',
    params: query
  })
}
// 添加
export function addFinance(obj) {
  return request({
    url: '/finance/service/category',
    method: 'post',
    data: obj
  })
}
// 删除
export function delFinance(id) {
  return request({
    url: '/finance/service/category/' + id,
    method: 'delete'
  })
}
// 删除
// export function disableFinance(id) {
//   return request({
//     url: '/finance/service/category/' + id,
//     method: 'update'
//   })
// }
// 更新
export function putFinance(obj) {
  return request({
    url: '/finance/service/category',
    method: 'put',
    data: obj
  })
}
