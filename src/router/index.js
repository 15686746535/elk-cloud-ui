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
    id: 3,
    name: '个人办公',
    content: null,
    icon: getIcon('icon_user'),
    childItem: []
  },
  {
    id: 10,
    name: '行政办公',
    icon: getIcon('icon_userList'),
    childItem: []
  },
  {
    id: 11,
    name: '人力资源',
    icon: getIcon('icon_users'),
    childItem: []
  },
  {
    id: 9,
    name: '知识交流',
    icon: getIcon('icon_community'),
    childItem: []
  },
  {
    id: 58,
    name: '系统设置',
    icon: getIcon('icon_sys'),
    childItem: []
  }
]
/**
 * 应用 测试用
 * @type {*[]}
 */
export const appMap = [
  {
    id: 123,
    name: '学员管理',
    content: _import('modules/stu/student'),
    icon: getIcon('icon_one_note'),
    msgCount: 0,
    childItem: []
  },
  {
    id: 456,
    name: '学员缴费',
    content: _import('modules/stu/serviceNote'),
    icon: getIcon('icon_one_note'),
    msgCount: 0,
    childItem: []
  },
  {
    id: 789,
    name: '考试安排',
    content: _import('modules/stu/batch'),
    icon: getIcon('icon_one_note'),
    msgCount: 0,
    childItem: []
  },
  {
    id: 777,
    name: '成绩登记',
    content: _import('modules/stu/grade'),
    icon: getIcon('icon_one_note'),
    msgCount: 0,
    childItem: []
  },
  {
    id: 888,
    name: '毕业学员',
    content: _import('modules/stu/graduation'),
    icon: getIcon('icon_one_note'),
    msgCount: 0,
    childItem: []
  },
  {
    id: 999,
    name: '学员回访',
    content: _import('modules/stu/revisit'),
    icon: getIcon('icon_one_note'),
    msgCount: 0,
    childItem: []
  },
  {
    id: -10086,
    name: '添加',
    content: _import('modules/stu/revisit'),
    icon: getIcon('icon_add'),
    msgCount: 0,
    childItem: []
  }
]

export const addApp = {
  id: -10086,
  name: '添加',
  content: _import('modules/stu/revisit'),
  icon: getIcon('icon_add'),
  msgCount: 0,
  childItem: []
}

/**
 * 格式化组件
 * @param list
 */
export function appFormat(list) {
  list.forEach(function(item, index) {
    item.content = _import(item.content)
    item.icon = getIcon(item.icon)
  })
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
