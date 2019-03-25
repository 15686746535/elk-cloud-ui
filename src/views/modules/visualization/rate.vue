<template>
  <div style="height: 100%">
    <div v-show="isRate" style="height: 100%">
      <div style="height: 40px; width:100%;padding: 20px">
        <el-date-picker value-format="timestamp" size="mini" v-model="interval" type="daterange" align="left" range-separator="-"
                        start-placeholder="开始日期" end-placeholder="结束日期" :default-value="new Date()">
        </el-date-picker>
        <el-select style="width: 160px;" size="mini" v-model="query.coach"  clearable filterable placeholder="教练">
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.name"
            :value="item.userId">
          </el-option>
        </el-select>
        <el-select style="width: 250px;" size="mini" v-model="query.exam"  clearable filterable placeholder="考试场次">
          <el-option
            v-for="item in batchList"
            :key="item.examId"
            :label="item.lable"
            :value="item.examId">
          </el-option>
        </el-select>
        <!--<el-col span="6">-->
        <!--<tree-select  style="font-size: 12px;display: inline-block;" v-show="true" url="/upms/org/tree" v-model="query.org" placeholder="所属部门1"></tree-select>-->
        <!--</el-col>-->
        <el-button type="primary"  size="mini" @click="getData">搜索</el-button>
    </div>
      <div align="center" style="width: 100%;overflow: hidden;line-height: 100%;" :style="{height: tableHeight-80+ 'px'}">
        <pie-chart :data="pieData" width="800px" height="600px" @callback="down"></pie-chart>
      </div>
    </div>
    <div v-show="!isRate" style="height: 100%;padding: 20px">
      <el-button type="primary" icon="el-icon-d-arrow-left" @click="isRate = true" size="mini" style="margin-bottom: 20px" >返回</el-button>
      <el-table :height="tableHeight-120" :data="tableList" v-loading="loading" :stripe="true" :fit="false" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%" >
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <el-table-column align="center" label="姓名"  prop='name'></el-table-column>
        <el-table-column align="center" label="电话"  prop='mobile'></el-table-column>
        <el-table-column align="center" label="身份证"  prop='idNumber'></el-table-column>
        <el-table-column align="center" label="当前科目">
          <template slot-scope="scope">
            <span>{{scope.row.state | subjectFilter}}</span>
          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
  import PieChart from '@/components/PieChart'
  import { userList } from '@/api/upms/user'
  import { queryRate } from '@/api/visualization/api'
  import { getBatchList } from '@/api/student/batch'
  import { parseTime, parseSubject } from '@/utils/index'

  export default {
    name: 'table_vehicle_period',
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      },
      'query.exam': function(val) {
        if (!val || val === '') {
          this.query.exam = null
        }
      },
      'query.coach': function(val) {
        if (!val || val === '') {
          this.query.coach = null
        }
      },
      interval: function(val) {
        if (val && val.length > 0) {
          this.query.beginTime = val[0]
          this.query.endTime = val[1]
          this.batchListQuery.beginTime = val[0]
          this.batchListQuery.endTime = val[1]
        } else {
          this.query.beginTime = null
          this.query.endTime = null
          this.batchListQuery.beginTime = null
          this.batchListQuery.endTime = null
        }
        this.getBatchList()
      }
    },
    components: {
      PieChart
    },
    data() {
      return {
        tableHeight: this.area[1],
        userList: [],
        batchList: [],
        studentList: [],
        tableList: [],
        isRate: true,
        batchListQuery: {
          page: 1,
          limit: 0,
          /* 今天以前传 before   今天之后传 after */
          scope: 'before',
          beginTime: null,
          endTime: null
        },
        loading: false,
        // 本月转换率
        pieData: {
          name: '',
          legend: [],
          value: []
        },
        interval: [],
        query: {
          coach: null,
          exam: null,
          beginTime: null,
          endTime: null
        }
      }
    },
    created() {
      var now = new Date() // 当前日期
      var nowMonth = now.getMonth() // 当前月
      var nowYear = now.getFullYear() // 当前年
      var monthStartDate = new Date(nowYear, nowMonth, 1)
      var monthEndDate = new Date(nowYear, nowMonth + 1, 1)
      this.interval = [monthStartDate.getTime(), monthEndDate.getTime()]
      this.getData()
      this.getUserList()
      this.getBatchList()
    },
    methods: {
      filterList(examState) {
        return this.studentList.filter(function(stu) {
          if (examState === '1') {
            return stu.examState === '1'
          } else {
            return stu.examState !== '1'
          }
        })
      },
      down(params) {
        this.isRate = false
        this.loading = true
        switch (params.name) {
          case '通过人数':
            console.log('查询通过人数')
            this.tableList = this.filterList('1')
            this.loading = false
            break
          case '失败人数':
            this.tableList = this.filterList('2')
            this.loading = false
            break
        }
      },
      getUserList() {
        userList().then(response => {
          this.userList = response.data.data
        })
      },
      getBatchList() {
        getBatchList(this.batchListQuery).then(response => {
          if (response.data.code === 0) {
            var list = response.data.data.list
            list.forEach(function(item) {
              item.lable = '【' + parseSubject(item.subject) + '】' + item.examField + '(' + parseTime(item.examTime, '{y}-{m}-{d}') + ')'
            })
            this.batchList = list
          }
        })
      },
      /* 获取数据 */
      getData() {
        queryRate(this.query).then(response => {
          if (response.data.code === 0) {
            this.studentList = response.data.data
            this.pieData = {
              name: '通过率',
              legend: ['通过人数', '失败人数'],
              value: [
                { name: '通过人数', value: this.filterList('1').length, selected: true },
                { name: '失败人数', value: this.filterList('2').length }
              ]
            }
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
