import request from '@/utils/request'
// 查询集合
export function fetchStudentList(query) {
  return request({
    url: '/stu/student/getPage',
    method: 'get',
    params: query
  })
}
// 查询集合
export function queryEnrollStudents(query) {
  return request({
    url: '/stu/student/queryEnrollStudents',
    method: 'get',
    params: query
  })
}
// 添加
export function saveStudent(obj) {
  return request({
    url: '/stu/student/save',
    method: 'post',
    data: obj
  })
}
// 根据ID获取
export function getStudent(id) {
  return request({
    url: '/stu/student/' + id,
    method: 'get'
  })
}
// 判断身份证或者手机是否已结存在
export function isExistence(condition) {
  return request({
    url: '/stu/student/isExistence/' + condition,
    method: 'get'
  })
}
// 删除
export function delStudent(id) {
  return request({
    url: '/stu/student/' + id,
    method: 'delete'
  })
}
// 更新
export function putStudent(obj) {
  return request({
    url: '/stu/student',
    method: 'put',
    data: obj
  })
}

export function superviseInfo(obj) {
  return request({
    url: '/supervise/stuInfo',
    method: 'get',
    params: obj
  })
}

export function supervisePush(obj) {
  return request({
    url: '/supervise/push',
    method: 'get',
    params: obj
  })
}

/* 学员信息导出 */
export function exportStudent(query) {
  return request({
    url: '/export/student',
    method: 'get',
    params: query,
    responseType: 'arraybuffer'
  })
}

/*  获取意向 */
export function getIntention(id) {
  return request({
    url: '/visit/intention/' + id,
    method: 'get'
  })
}

export function push122(obj) {
  return request({
    url: '/stu/student/push122',
    method: 'post',
    params: obj
  })
}

export function getFinanceByStudentId(id) {
  return request({
    url: '/finance/service/charge/' + id,
    method: 'get'
  })
}

/* 修改科目状态 */
export function editSubState(obj) {
  return request({
    url: '/stu/student/editSubState',
    method: 'post',
    data: obj
  })
}

/* 学员信息导出 */
export function quaryCourseList(id) {
  return request({
    url: '/stu/student/quaryCourseList/' + id,
    method: 'get'
  })
}

/* 修改学员微信绑定的手机号 */
export function bindWechartUser(params) {
  return request({
    url: '/stu/student/bindWechartUser',
    method: 'get',
    params: params
  })
}

/* 获取补考险管理 */

export function getInsurance(params) {
  return request({
    url: '/stu/insurance/getPage',
    ethod: 'get',
    params: params
  })
}

/* 补考险管理-查询 */

export function searchInsurance(params) {
  return request({
    url: '/stu/insurance/getList',
    ethod: 'get',
    params: params
  })
}

/* 补考险管理-添加*/
export function addInsurance(obj) {
  return request({
    url: '/stu/insurance/save',
    method: 'post',
    data: obj
  })
}
/* 补考险管理-添加*/
export function editInsurance(obj) {
  return request({
    url: '/stu/insurance/update',
    method: 'put',
    data: obj
  })
}

/* 学员约车反馈获取列表 */
export function getFeedBack(params) {
  return request({
    url: '/stu/student/queryFeedbackList',
    method: 'get',
    params: params
  })
}

/* 学员约车反馈标记 */
export function setFeedback(obj) {
  return request({
    url: '/stu/student/setFeedback',
    method: 'put',
    data: obj
  })
}

/* 量子保导出 */
export function lzbExportExcel(params) {
  return request({
    url: '/excel/api/export/lianzibao',
    method: 'get',
    params: params,
    responseType: 'arraybuffer'
  })
}

/* 人寿保险导出 */
export function rsbExportExcel(params) {
  return request({
    url: '/excel/api/export/renshou',
    method: 'get',
    params: params,
    responseType: 'arraybuffer'
  })
}
