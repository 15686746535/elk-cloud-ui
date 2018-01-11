<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎登陆</div>
    <div class="dashboard-text">用户名：{{name}}</div>
    <div class="dashboard-text">角色名：<span v-for='role in roles' :key='role'>{{role}}</span></div>
    <br/>
    <br/>
    <br/>
    <span>字典标签,自定义标签</span>
    <dict type="dict_sex" v-model="dict" ></dict>
    <org></org>
    <el-button style="width: 174px;" @click="getDict">取值</el-button>

    <span>值为：{{dict}}</span>
    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"   multiple :limit="3" >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Dict from '@/components/Dict'
import Org from '@/components/OrgTree'

export default {
  components: {
    Dict,
    Org
  },
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      dict: null,
      disabled: true,
      hidden: true
    }
  },
  methods: {
    getDict() {
      console.log(this.dict)
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
</style>
