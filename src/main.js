import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters' // 全局filter
import '@/icons' // icon
import '@/permission' // 权限
import MyTree from './components/MyTree'
import Dict from './components/Dict'
import TreeSelect from './components/TreeSelect'

Vue.use(ElementUI, { locale })
// 引入自定义组件。index.js是组件的默认入口

Vue.use(TreeSelect)
Vue.use(MyTree)
Vue.use(Dict)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
