<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <el-row class="panel-group" :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div>

        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">

      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">

      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">

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
  .panel-group {
    margin-top: 18px;
    .card-panel-col{
      margin-bottom: 32px;
    }
  }
</style>
