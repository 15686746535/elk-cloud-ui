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
      </div>
    </el-card>
  </div>
</template>
<script>
  import request from '@/utils/request'
  import MyTree from '@/components/MyTree'
  import TreeSelect from '@/components/TreeSelect'

  export default {
    name: 'index',
    computed: {
    },
    components: {
      MyTree,
      TreeSelect
    },
    data() {
      return {
        // 树形图
        treeData: [],
        aaa: null,
        test: null
      }
    },
    created() {
      this.getOrgList()
    },
    methods: {
      searchClick() {
        console.log('v-model结果===> ' + this.test)
      },
      updata() {
        this.test = 13
        this.aaa = 13
      },
      nodeList(list) {
        console.log('选中集合')
        console.log(list)
      },
      getOrgList() {
        request({
          url: '/upms/org/tree',
          method: 'get'
        }).then(response => {
          console.log(response)
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
