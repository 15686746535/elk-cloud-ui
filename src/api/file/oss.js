import request from '@/utils/request'
// 查询集合
export function upload(file) {
  return request({
    url: '/oss/upload',
    method: 'post',
    data: file
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  })
}
