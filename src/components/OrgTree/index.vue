<template>
  <div>
    <el-select class="filter-item" placeholder="请选择" v-model="org" @change="emitChange(org)">
      <span v-for="item in  orgList">
        <el-option class="top-level" :key="item.id" :label="item.label" :value="type == 'name'?item.label:item.id">
          <div @click="isOpen" :class="item.children.length > 0 ?'open-icon':'no_child'"></div>
          {{item.label}}
        </el-option>
        <span v-for="chird in  item.children">
          <el-option class="chird" :key="chird.id" :label="chird.label" :value="type == 'name'?chird.label:chird.id">
            <div @click="isOpen" :class="chird.children.length > 0 ?'open-icon':'no_child'"></div>
            {{chird.label}}
          </el-option>
          <span v-for="chird1 in  chird.children">
            <el-option class="chird_1" :key="chird1.id" :label="chird1.label" :value="type == 'name'?chird1.label:chird1.id">
              <div :class="chird1.children.length > 0 ?'open-icon':'no_child'"></div>
              {{chird1.label}}
            </el-option>
            <span v-for="chird2 in  chird1.children">
            <el-option  class="chird_2" :key="chird2.id" :label="chird2.label" :value="type == 'name'?chird2.label:chird2.id">
              <div class="no_child"></div>
              {{chird2.label}}
            </el-option>
          </span>
          </span>
        </span>
      </span>
    </el-select>
  </div>
</template>

<script>
  import fetch from '@/utils/fetch'

  export default {
    name: 'orgTree',
    model: {
      prop: 'selected',
      event: 'change'
    },
    props: {
      type: String
    },
    data() {
      return {
        org: null,
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
      })
    },
    methods: {
      emitChange(value) {
        this.$emit('change', value)
      },
      build(list) {

      },
      isOpen() {
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
