<template>
  <el-select class="filter-item" :style="{height:height,width:width}" :size="size" clearable :placeholder=placeholder v-model="dict" @change="emitChange(dict)">
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
      },
      result: {
        type: String,
        default: null
      },
      size: {
        type: String,
        default: ''
      }
    },
    watch: {
      result(val) {
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
        fetch({
          url: '/basis/dict/getByType/' + this.dictType,
          method: 'get'
        }).then(response => {
          this.dictList = response.data.data.list
        })
      }
    },
    updated() {
      console.log('修改了')
    },
    methods: {
      emitChange(value) {
        for (var i = 0; i < this.dictList.length; i++) {
          if (this.dictList[i].value === value) {
            this.$emit('selectDict', this.dictList[i])
          }
        }
        this.$emit('change', value)
      },
      getDict(did) {

      }
    }
  }
</script>
