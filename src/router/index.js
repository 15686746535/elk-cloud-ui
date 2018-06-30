/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
import Vue from 'vue'
import Router from 'vue-router'

import { getIcon } from './icon.js'
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/**
 * 默认任务栏 无需验权
 * @type {*[]}
 */
export const defaultMap = [
  {
    id: 'menu17',
    name: '短消息',
    content: _import('modules/stu/student'),
    icon: getIcon('icon_msg'),
    msgCount: 0,
    childItem: []
  },
  {
    id: 'menu20',
    name: '工作日志',
    content: _import('modules/stu/student'),
    icon: getIcon('icon_journal'),
    msgCount: 0,
    childItem: []
  },
  {
    id: 'menu21',
    name: '日程安排',
    content: _import('modules/stu/student'),
    icon: getIcon('icon_schedule'),
    msgCount: 0,
    childItem: []
  },
  {
    id: 'menu31',
    name: '任务管理',
    content: _import('modules/stu/student'),
    icon: getIcon('icon_task'),
    msgCount: 0,
    childItem: []
  }
]
/**
 * 开始菜单
 * @type {*[]}
 */
export const startMenuMap = [
  {
    id: 20000,
    name: '学员管理',
    content: null,
    icon: getIcon('icon_user'),
    childItem: [
    ]
  },
  {
    id: 30000,
    name: '客户管理',
    icon: getIcon('icon_userList'),
    childItem: [
    ]
  },
  {
    id: 50000,
    name: '车辆管理',
    icon: getIcon('icon_car'),
    childItem: [
    ]
  },
  {
    id: 60000,
    name: '人力资源',
    icon: getIcon('icon_users'),
    childItem: [
    ]
  },
  {
    id: 99999,
    name: '系统设置',
    icon: getIcon('icon_sys'),
    childItem: [
    ]
  }
]
/**
 * 应用
 * @type {*[]}
 */
export const appMap = [
  { id: 20100, pid: 20000, params: [], name: '学员管理', content: _import('modules/stu/student'), icon: iconFormat('app_stu_student'), msgCount: 0, childItem: [] },
  { id: 20900, pid: 20000, params: [], name: '学费收取', content: _import('modules/stu/serviceNote'), icon: iconFormat('app_stu_service'), msgCount: 0, childItem: [] },
  { id: 20300, pid: 20000, params: [], name: '考试安排', content: _import('modules/stu/batch'), icon: iconFormat('app_stu_batch'), msgCount: 0, childItem: [] },
  { id: 20400, pid: 20000, params: [], name: '成绩登记', content: _import('modules/stu/grade'), icon: iconFormat('app_stu_grade'), msgCount: 0, childItem: [] },
  { id: 20600, pid: 20000, params: [], name: '毕业学员', content: _import('modules/stu/graduation'), icon: iconFormat('app_stu_graduation'), msgCount: 0, childItem: [] },
  { id: 20700, pid: 20000, params: [], name: '学员回访', content: _import('modules/stu/revisit'), icon: iconFormat('app_stu_revisit'), msgCount: 0, childItem: [] },
  { id: 20800, pid: 20000, params: [], name: '回访信息', content: _import('modules/stu/revisited'), icon: iconFormat('app_stu_revisited'), msgCount: 0, childItem: [] },
  { id: 30200, pid: 30000, params: [], name: '意向信息', content: _import('modules/visit/intention'), icon: iconFormat('app_visit_intention'), msgCount: 0, childItem: [] },
  { id: 30100, pid: 30000, params: [], name: '意向分配', content: _import('modules/visit/distribution'), icon: iconFormat('app_visit_distribution'), msgCount: 0, childItem: [] },
  { id: 30300, pid: 30000, params: [], name: '入学意向', content: _import('modules/visit/enrolled'), icon: iconFormat('app_visit_enrolled'), msgCount: 0, childItem: [] },
  { id: 30400, pid: 30000, params: [], name: '关闭意向', content: _import('modules/visit/close'), icon: iconFormat('app_visit_close'), msgCount: 0, childItem: [] },
  { id: 50100, pid: 50000, params: [], name: '车辆信息', content: _import('modules/vehicle/car'), icon: iconFormat('app_car'), msgCount: 0, childItem: [] },
  { id: 60100, pid: 60000, params: [], name: '同事信息', content: _import('modules/upms/user'), icon: iconFormat('app_user'), msgCount: 0, childItem: [] },
  { id: 60400, pid: 60000, params: [], name: '离职同事', content: _import('modules/upms/quitUser'), icon: iconFormat('app_quit_user'), msgCount: 0, childItem: [] },
  { id: 60200, pid: 60000, params: [], name: '部门设置', content: _import('modules/upms/org'), icon: iconFormat('app_org'), msgCount: 0, childItem: [] },
  { id: 60300, pid: 60000, params: [], name: '职位设置', content: _import('modules/upms/role'), icon: iconFormat('app_role'), msgCount: 0, childItem: [] },
  { id: 10001, pid: 99999, params: [], name: '密码修改', content: _import('modules/stu/student'), icon: getIcon('icon_password'), msgCount: 0, childItem: [] },
  { id: 10004, pid: 99999, params: [], name: '系统配置', content: _import('modules/sys/configure'), icon: getIcon('icon_config'), msgCount: 0, childItem: [] },
  { id: 10005, pid: 99999, params: [], name: '定时任务', content: _import('modules/quartz/job'), icon: getIcon('icon_timing'), msgCount: 0, childItem: [] },
  { id: 10006, pid: 99999, params: [], name: '流程设置', content: _import('modules/activiti/model'), icon: getIcon('icon_activiti'), msgCount: 0, childItem: [] },
  { id: 10007, pid: 99999, params: [], name: '待办配置', content: _import('modules/activiti/business'), icon: getIcon('icon_message'), msgCount: 0, childItem: [] },
  { id: 10008, pid: 99999, params: [], name: '退出系统', content: _import('modules/stu/student'), icon: getIcon('icon_out_red'), msgCount: 0, childItem: [] },
  { id: -1086, pid: -9999, params: [], name: '添加', content: _import('modules/stu/revisit'), icon: getIcon('icon_add'), msgCount: 0, childItem: [] }
]

/**
 * 应用图标补齐
 * @param suffix
 * @returns {*}
 */
export function iconFormat(suffix) {
  // 图片齐全后
  // return getIcon('icon_' + suffix)
  // 测试
  return getIcon('icon_one_note')
}

/**
 * 格式化应用组件
 * @param list
 */
export function appFormat(list) {
  list.forEach(function(item, index) {
    item.content = _import(item.content)
    item.icon = getIcon(item.icon)
  })
  list.push(addApp)
  return list
}

/**
 * 格式化开始菜单
 * @param list
 * @returns {*}
 */
export function startFormat(menuIds, roles) {
  startMenuMap.forEach(function(item, index) {
    item.content = _import(item.content)
    item.icon = getIcon(item.icon)
  })
  list.push(addApp)
  return list
}

/**
 * 桌面
 * @type {*[]}
 */
export const constantRouterMap = [
  { path: '/login', name: '登陆', component: _import('login/index') },
  { path: '/404', name: '404' },
  { path: '/', name: '首页', redirect: '/home', component: _import('desktop/index'), children: [{ path: 'home', component: _import('dashboard/index'), name: '首页' }] }
]
/**
 * 注册路由
 */
export default new Router({
  routes: constantRouterMap
})
