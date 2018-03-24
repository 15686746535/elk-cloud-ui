<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.setClientSize()
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.setClientSize()
      })()
    }
  },
  methods: {
    setClientSize() {
      var height = document.documentElement.clientHeight - 84 || document.body.clientHeight - 84
      var width = document.documentElement.clientWidth - 220 || document.body.clientWidth - 220
      this.$store.dispatch('setClientHeight', height)
      this.$store.dispatch('setClientWidth', width)
    }
  }
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
</style>
