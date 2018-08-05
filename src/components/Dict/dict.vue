<template>
  <el-select class="filter-item" :style="{height:height,width:width}" :size="size" clearable filterable :placeholder=placeholder v-model="dict" @change="emitChange(dict)">
    <el-option v-for="item in  dictList" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>

<script>
  import request from '@/utils/request'

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
      size: {
        type: String,
        default: ''
      },
      value: {
        type: String,
        default: null
      }
    },
    watch: {
      value(val) {
        this.dict = val
      }
    },
    data() {
      return {
        dict: this.value,
        dictList: []
      }
    },
    // 数据请求
    created() {
      if (this.dictType) {
        request({
          url: '/basis/dict/getByType/' + this.dictType,
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
