<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <el-row :gutter="20" style="height: 200px;">
      <el-col :span="6">
        <div style="height: 180px;width: 100%;background-color: crimson;border-radius: 5px"></div>
      </el-col>
      <el-col :span="6">
        <div style="height: 180px;width: 100%;background-color: crimson;border-radius: 5px"></div>
      </el-col>
      <el-col :span="6">
        <div style="height: 180px;width: 100%;background-color: crimson;border-radius: 5px"></div>
      </el-col>
      <el-col :span="6">
        <div style="height: 180px;width: 100%;background-color: crimson;border-radius: 5px"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="height: 340px;">
      <el-col :span="16">
        <div style="height: 320px;width: 100%;background-color: crimson;border-radius: 5px"></div>
      </el-col>
      <el-col :span="8">
        <div style="height: 320px;width: 100%;background-color: crimson;border-radius: 5px"></div>
      </el-col>
    </el-row>
    <el-row></el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'permissions',
      'client'
    ])
  },
  data() {
    return {
    }
  },
  methods: {
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
