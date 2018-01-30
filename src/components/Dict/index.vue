<template>
  <el-select class="filter-item" :style="{height:height,width:width}" :placeholder=placeholder v-model="value" @change="emitChange(value)">
    <el-option v-for="item in  dictList" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
  import fetch from '@/utils/fetch'

  export default {
    name: 'dict',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      dictType: {
        type: String,
        default: null
      },
      value: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        dictList: []
      }
    },
    // 数据请求
    created() {
      if (this.dictType) {
        fetch({
          url: '/basis/dict/type/' + this.dictType,
          method: 'get'
        }).then(response => {
          this.dictList = response.data.data
        })
      }
    },
    methods: {
      emitChange(value) {
        this.$emit('change', value)
      }
    }
  }
</script>
