<template>
  <div id="aaa">
    <div v-for="item in data">
      {{item}}
    </div>
    <div>
      {{data2}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'aaa',
    data() {
      return {
        data: [],
        data2: 'aaaaaaa'
      }
    },
    created() {
      this.test()
    },
    methods: {
      // 改变当前页
      test() {
        this.data = [1, 2, 3, 4]
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #aaa {
    .h{

    }
  }
</style>
