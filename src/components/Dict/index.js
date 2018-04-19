import MyDict from './dict.vue'

// 这里是重点
const Dict = {
  install: function(Vue) {
    Vue.component('dict', MyDict)
  }
}

// 导出组件
export default Dict
