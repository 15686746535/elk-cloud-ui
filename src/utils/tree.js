const _import = require('../router/_import_' + process.env.NODE_ENV)
import Layout from '../views/layout/Layout'

/**
 *  递归生成首页菜单
 * @param menuList 拥有的菜单集合
 * @param pid 递归父级id
 * @returns {Array} 首页菜单
 */
export function getMenuTree(menuList, pid) {
  const menus = []
  menuList.forEach(function(item, index) {
    if (item.parentId === pid && item.type === '0') {
      const menu = {
        menuId: item.menuId,
        path: item.path,
        name: item.name,
        component: null,
        meta: { title: item.name, icon: item.icon },
        children: null
      }
      if (item.component === 'Layout') {
        menu.component = Layout
      } else {
        menu.component = _import(item.component)
      }
      menu.children = getMenuTree(menuList, item.menuId)
      menus.push(menu)
    }
  })
  return menus
}
