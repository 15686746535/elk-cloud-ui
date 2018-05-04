<template>
  <el-select class="filter-item " style="margin-bottom: 0px;" :style="{height:height,width:width}" :size="size" clearable :placeholder=placeholder v-model="coach"
             @change="emitChange(coach)">
    <el-option v-for="item in coachList" :key="item.userId" :label="item.name" :value="item.userId"></el-option>
  </el-select>
</template>

<script>
  import request from '@/utils/request'

  export default {
    name: 'coach',
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
      coachType: {
        type: String,
        default: null
      },
      value: {
        type: Number,
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
      value(val) {
        this.coach = val
      }
    },
    data() {
      return {
        coach: this.value,
        coachList: [],
        query: {
          iscoach: 48
        }
      }
    },
    // 数据请求
    created() {
      if (this.coachType === 'field') {
        this.query.iscoach = 16
        this.getCoachList()
      }
      if (this.coachType === 'road') {
        this.query.iscoach = 32
        this.getCoachList()
      }
    },
    methods: {
      getCoachList() {
        request({
          url: '/upms/user/userList',
          method: 'get',
          params: this.query
        }).then(response => {
          this.coachList = response.data.data
        })
      },
      // testaaaa() {
      //   console.log('===============aaa=============')
      //   this.$emit(['blur', 'change'], true)
      // },
      emitChange(value) {
        if (value === '') value = null
        for (var i = 0; i < this.coachList.length; i++) {
          if (this.coachList[i].userId === value) {
            this.$emit('selectCoach', this.coachList[i])
          }
        }
        this.$emit('change', value)
      }
    }
  }
</script>
