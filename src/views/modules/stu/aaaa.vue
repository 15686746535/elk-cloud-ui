<template>
    <div id="aaaa">
      <div style="width: 350px;height: 50px;margin: 0 auto">{{asd}}</div>
      <div v-on:mouseover="ss">ff</div>

      <div id="app">
        <div class="block">
          <span class="demonstration">好嗨哟~ 评个分儿撒</span>
          <br/> <br/>
          <el-rate v-model="value2" :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
          </el-rate>
        </div>
      </div>

    </div>
</template>

<!--<script src="//unpkg.com/vue/dist/vue.js"></script>-->
<!--<script src="//unpkg.com/element-ui@2.4.11/lib/index.js"></script>-->
<script>
  export default {
    name: 'aaaa',
    components: {},
    data() { // 数据
      return {
        asd: '像我一样机智的人，都已经考上了清华大学'
      }
    },
    created() { // 初始化
    },
    computed: { // 计算属性
    },
    methods: { // 方法定义
      ss: function() {
        alert(this.asd)
        console.log('ghhhhh')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    #aaaa>h1 {
      color: red;
    }
    #app{
      margin: 0 auto;
      width: 300px;
    }
</style>
