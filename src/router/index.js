import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', name: '登陆', component: _import('login/index'), hidden: true },
  { path: '/404', name: '404', component: _import('404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [
      { path: 'dashboard', component: _import('dashboard/index'), name: '首页', meta: { title: '首页', icon: 'dashboard', noCache: true }}]
  }
]

export default new Router({
  // mode: 'history', // 后端支持可开
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    menuId: 1,
    path: '/upms',
    component: Layout,
    name: '系统管理',
    hidden: false,
    meta: {
      title: '系统管理',
      icon: 'table'
    },
    children: [
      { menuId: 2, path: 'user', component: _import('upms/user/index'), name: '用户管理', meta: { title: '用户管理', icon: 'user' }},
      { menuId: 3, path: 'menu', component: _import('upms/menu/index'), name: '菜单管理', meta: { title: '菜单管理', icon: 'tree' }},
    ]
  }
]

export function setComponent(myMenus) {
  console.log('myMenus<====================')
  console.log(myMenus)
  console.log(JSON.stringify(myMenus))
  myMenus.forEach(function(item, index) {
    item.meta = {
      title: item.name,
      icon: item.icon
    }
    if (item.component === 'Layout') {
      item.component = Layout
    } else {
      item.component = _import(item.component)
    }
    setComponent(item.children)
  })
  console.log('end')
  return myMenus
}
