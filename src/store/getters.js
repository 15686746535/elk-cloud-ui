const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  loading: state => state.app.loading,
  client: state => state.app.client,
  motorcycleType: state => state.app.motorcycleType,
  iFrameUrl: state => state.app.iFrameUrl,
  spread: state => state.app.spread,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  notice: state => state.user.notice,
  name: state => state.user.name,
  roles: state => state.user.roles,
  defaultList: state => state.user.defaultList,
  startList: state => state.user.startList,
  appList: state => state.user.appList,
  permissions: state => state.user.permissions
  // introduction: state => state.user.introduction,
  // status: state => state.user.status,
  // setting: state => state.user.setting,
  // permission_routers: state => state.permission.routers
  // addRouters: state => state.permission.addRouters
}
export default getters
