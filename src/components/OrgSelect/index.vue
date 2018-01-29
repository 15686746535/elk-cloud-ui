<template>
  <div>
    <div style="position: relative;width: 200px;">
      <el-input placeholder="请选择"></el-input>
      <i class="ran-select el-icon-arrow-up"></i>
    </div>
  </div>
</template>

<script>
  import fetch from '@/utils/fetch'

  export default {
    name: 'org-select',
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
  .ran-select{
    position: absolute;
    z-index: 33;
    color: #bab9c1;
    top: 32%;
    right: 10px;
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
  }
</style>
