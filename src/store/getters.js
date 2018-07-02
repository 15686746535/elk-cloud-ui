const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  loading: state => state.app.loading,
  client: state => state.app.client,
  motorcycleType: state => state.app.motorcycleType,
  iFrameUrl: state => state.app.iFrameUrl,
  spread: state => state.app.spread,
  token: state => state.user.token,
  desktopBg: state => state.user.desktopBg,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  defaultList: state => state.user.defaultList,
  startList: state => state.user.startList,
  desktopOneList: state => state.user.desktopOneList,
  desktopTwoList: state => state.user.desktopTwoList,
  hasAppList: state => state.user.hasAppList,
  desktopList: state => state.user.desktopList,
  permissions: state => state.user.permissions
  // introduction: state => state.user.introduction,
  // status: state => state.user.status,
  // setting: state => state.user.setting,
  // permission_routers: state => state.permission.routers
  // addRouters: state => state.permission.addRouters
}
export default getters
