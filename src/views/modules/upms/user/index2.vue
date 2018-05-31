<template>
  <div class="app-container calendar-list-container"  :style="{height: $store.state.app.client.height + 'px'}">
    <el-card>
      <div style="float: left;width: 500px">
          <my-tree url="/upms/org/tree" v-model="test"  @nodeList="nodeList"></my-tree>
          <input class="ran-input el-input__inner hover " v-model.number="test"/>
        <el-button class="filter-item" type="primary" @click="searchClick">取值</el-button>
          <el-button class="filter-item" type="primary" @click="updata">修改</el-button>
      </div>
      <div style="float: left;border-left: #1f2d3d solid 2px;width: 400px;">
        <tree-select url="/upms/org/tree" v-model="aaa"></tree-select>
        <div v-for="(user,index) in userList">
          <input class="ran-input el-input__inner hover " v-model="user.name"/>
          <el-button class="filter-item" type="primary" @click="del(index2)">del</el-button>
          <el-button v-if="index2 + 1 === userList.length" class="filter-item" type="primary" @click="add(index2)">add</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  import request from '@/utils/request'

  export default {
    name: 'index',
    computed: {
    },
    data() {
      return {
        // 树形图
        treeData: [],
        userList: [],
        aaa: null,
        test: null
      }
    },
    created() {
      this.userList.push({ 'name': '选项_1' })
      this.getOrgList()
    },
    methods: {
      searchClick() {
      },
      updata() {
        this.test = 13
        this.aaa = 13
      },
      del(index) {
        this.userList.splice(index2, 1)
      },
      add(index) {
        this.userList.splice(index2 + 1, 0, { 'name': '选项_' + (index2 + 2) })
      },
      nodeList(list) {
      },
      getOrgList() {
        request({
          url: '/upms/org/tree',
          method: 'get'
        }).then(response => {
          this.treeData = response.data.data
          this.treeData[0].selected = true
        })
      }
    }
  }
</script>


<style scoped>
  .img{
    width: 150px;
    height: 150px;
    float: left;
  }
  .userInfo{
    float: left;
    padding: 0 0 0 20px;
  }

  .image {
    margin-bottom: 20px;
    margin-right: 50px;
    max-width: 200px;
    max-height: 200px;
    display: block;
    float: left;
  }
  .text_css{
    color:#495060;
    font-size: 16px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
