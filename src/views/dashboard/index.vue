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
        <div style="height: 180px;width: 100%;background-color: crimson;border-radius: 5px">
          <barTickAlign :data="[12,21,32,22,12,54,42]"></barTickAlign>
        </div>
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
    <el-row>
      <tree-select url="/upms/org/tree"  v-model="select" ></tree-select>
      <div style="background-color: #fff">

        <my-tree url="/upms/org/tree" v-model="dict"></my-tree>
      </div>

     <!-- <dict dictType="dict_customer_type" v-model="dict" ></dict>
      {{dict}}
      <el-button @click="dict = 'A类'">修改</el-button>-->
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import barTickAlign from '@/components/barTickAlign'

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
  components: {
    barTickAlign
  },
  data() {
    return {
      select: null,
      dict: null
    }
  },
  methods: {
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
