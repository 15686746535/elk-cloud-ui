<template>
  <div class="dashboard-container">
    <el-row>
      <div class="dashboard-text">欢迎登陆</div>
    </el-row>
      <!--
        参数：
        dictType:字典类型
        方法：
        selectDict ：字典发生改变是触发，返回字典对象
       {{dict}}
      -->
      <dict dictType="dict_customer_type" v-model="dict" ></dict>
    {{dict}}
    <el-button @click="toggle">修改</el-button>
  </div>
</template>

<script>
import Dict from '@/components/Dict'

export default {
  components: {
    Dict
  },
  name: 'dashboard',
  computed: {
  },
  data() {
    return {
      dict: 'B类'
    }
  },
  methods: {
    toggle() {
      this.dict = 'D类'
    }
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>
