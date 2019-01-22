<template>
  <div id="xzy-app">
    <div id="xzy-title">
      <span>导出</span>
      <span>添加</span>
      <span>编辑</span>
      <span>删除</span>
    </div>
    <div class="xzy-title-wire"></div>
    <div class="xzy-app-top">
      <p>重庆壹鹿企业管理咨询有限公司</p>
    </div>
    <div id="app333">
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
  </div>

</template>

<style>
  #xzy-title{
    height: 50px;
    width: 100%;
    line-height: 60px;
  }
  #xzy-title>span{
    margin-left: 50px;
    color: #A0A0A0;
  }
  .xzy-title-wire{
    width: 100%;
    height: 1px;
    background-color: #F3F3F3;
  }
  .xzy-app-top{
    height: 70px;
    width: 100%;
    line-height: 40px;
    margin-left: 50px;
  }
  .xzy-app-content{
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #f6f6f6;

  }
  .xzy-app-content>div{
    margin-left: 50px;
  }
  .xzy-app-content>div>span>a{
    color: #9e9e9e;
  }
  .el-tree-node__content {
    width: 100%;
    height: 50px;
    margin-left: 50px;
    color: #000;
  }
  .el-tree-node__content>.el-tree-node__expand-icon {
    display: none;
  }
</style>


<script>
  export default {
    data() {
      return {
        data: [{
          label: '集团总部',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '壹鹿驾校',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '华通驾校',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }, {
          label: '壹鹿北碚校区',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }, {
          label: '全悦驾校',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleNodeClick(data) {
        console.log(data)
      }
    }
  }
</script>

