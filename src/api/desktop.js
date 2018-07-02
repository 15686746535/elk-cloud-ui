import request from '@/utils/request'

// 保存桌面排序
export function saveApps(obj) {
  return request({
    url: '/upms/user/saveApps',
    method: 'post',
    data: obj
  })
}
export function saveBg(bg) {
  return request({
    url: '/upms/user/saveBg/' + bg,
    method: 'post'
  })
}
