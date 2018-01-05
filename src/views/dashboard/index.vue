<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎登陆</div>
    <div class="dashboard-text">用户名：{{name}}</div>
    <div class="dashboard-text">角色名：<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <br/>
    <br/>
    <br/>
    <span>字典标签,自定义标签</span>
    <dict type="dict_leng"></dict>
    <myComponents></myComponents>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Dict from '@/components/Dict'
import Test from '@/components/Test'

export default {
  components: {
    Dict,
    Test
  },
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
