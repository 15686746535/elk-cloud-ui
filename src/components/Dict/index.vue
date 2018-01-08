<template>
  <div>
      <el-select class="filter-item" placeholder="请选择" v-model="dict" @change="emitChange(dict)">
        <el-option v-for="item in  dictList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
  </div>
</template>

<script>
  import fetch from '@/utils/fetch'

  export default {
    name: 'dict',
    model: {
      prop: 'selected',
      event: 'change'
    },
    props: {
      type: String
    },
    data() {
      return {
        dict: null,
        dictList: []
      }
    },
    // 数据请求
    created() {
      fetch({
        url: '/basis/dict/type/' + this.type,
        method: 'get'
      }).then(response => {
        this.dictList = response.data.data
      })
    },
    methods: {
      emitChange(value) {
        this.$emit('change', value)
      }
    }
  }
</script>
