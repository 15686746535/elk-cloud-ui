<template>
  <tree :list="orgList" :open="true" :choiceType="choiceType" @node-click="nodeClick"></tree>
</template>

<script>
  import fetch from '@/utils/fetch'
  import Tree from '@/components/Tree'
  export default {
    name: 'org-tree',
    components: {
      Tree
    },
    data() {
      return {
        org: null,
        choiceType: 'folder',
        orgList: []
      }
    },
    // 数据请求
    created() {
      fetch({
        url: '/upms/org/tree',
        method: 'get'
      }).then(response => {
        this.orgList = response.data.data
        console.log(response.data.data)
      })
    },
    methods: {
      nodeClick(value) {
        this.org = value
        console.log(value)
        this.$emit('node-click', value)
      }
    }
  }
</script>
<style scoped>
.open-icon{
  width: 0px;
  height: 0px;
  border-style: solid;
  border-color: rgb(80, 82, 84) transparent;
  border-width: 10px 6px 0px;
  display: inline-block;
  margin-right: 3px;
}
.cl-icon{
  width: 0px;
  height: 0px;
  border-style: solid;
  border-color: transparent rgb(80, 82, 84);
  border-width: 6px 0px 6px 10px;
  display: inline-block;
  margin-right: 3px;
}
.no_child{
  width: 0px;
  height: 0px;
  border-style: solid;
  border-color: transparent;
  border-width: 6px 0px 6px 10px;
  display: inline-block;
  margin-right: 3px;
}
.chird>div{
  margin-left: 10px;
}
.chird_1>div{
  margin-left: 25px;
}
.chird_2>div{
  margin-left: 40px;
}
.chird_3>div{
  margin-left: 55px;
}
.chird_4>div{
  margin-left: 70px;
}
</style>
