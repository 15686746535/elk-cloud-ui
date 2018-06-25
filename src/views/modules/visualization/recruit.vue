<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
      <el-card>
        <el-row>
          <el-col v-show="hasDown">
             <dict  v-model="listQuery.campus" dictType="dict_campus" style="width: 220px;"  placeholder="校区"></dict>
              <el-date-picker v-model="listQuery.year" type="year" placeholder="选择年"></el-date-picker>
            <el-button type="primary"  @click="getList"  :loading="loading"><i class="el-icon-search"></i>搜索</el-button>
          </el-col>
          <el-col v-show="!hasDown">
            <el-button type="primary"  @click="getList" :loading="loading"><i class="el-icon-d-arrow-left"></i>返回</el-button>
          </el-col>
          <el-col style="margin-top: 20px;">
            <bar-pile-chart :data="data" :style="{height: ($store.state.app.client.height-180) + 'px'}" :hasDown="hasDown" @callback="down" ></bar-pile-chart>
          </el-col>
        </el-row>

      </el-card>
  </div>
</template>

<script>
  import BarPileChart from '@/components/BarPileChart'
  import { queryRecruit, queryCampus } from '@/api/visualization/api'

  export default {
    name: 'recruit', // 每月招生
    components: {
      BarPileChart
    },
    data() {
      var myDate = new Date()
      return {
        listQuery: {
          campus: '',
          year: myDate.getFullYear() + '',
          time: ''
        },
        hasDown: false,
        loading: false,
        data: {
          colors: [],
          xAxis: [],
          seriesList: []
        }
      }
    },
    created() {
      this.getList()
    },
    computed: {
    },
    methods: {
      getList() {
        this.loading = true
        queryRecruit(this.listQuery).then(response => {
          var data = response.data.data
          this.hasDown = true
          this.loading = false
          this.data = {
            colors: ['#409eff'],
            xAxis: data.axisList,
            seriesList: data.columnarGraphList
          }
        })
      },
      down(params) {
        // 控制台打印数据的名称
        this.loading = true
        switch (params.name) {
          case '一月':
            this.listQuery.time = this.listQuery.year + '-01'
            break
          case '二月':
            this.listQuery.time = this.listQuery.year + '-02'
            break
          case '三月':
            this.listQuery.time = this.listQuery.year + '-03'
            break
          case '四月':
            this.listQuery.time = this.listQuery.year + '-04'
            break
          case '五月':
            this.listQuery.time = this.listQuery.year + '-05'
            break
          case '六月':
            this.listQuery.time = this.listQuery.year + '-06'
            break
          case '七月':
            this.listQuery.time = this.listQuery.year + '-07'
            break
          case '八月':
            this.listQuery.time = this.listQuery.year + '-08'
            break
          case '九月':
            this.listQuery.time = this.listQuery.year + '-09'
            break
          case '十月':
            this.listQuery.time = this.listQuery.year + '-10'
            break
          case '十一月':
            this.listQuery.time = this.listQuery.year + '-11'
            break
          case '十二月':
            this.listQuery.time = this.listQuery.year + '-12'
            break
        }
        queryCampus(this.listQuery).then(response => {
          var data = response.data.data
          console.log(data)
          this.loading = false
          this.hasDown = false
          this.data = {
            colors: ['#14e9ff'],
            xAxis: data.axisList,
            seriesList: data.columnarGraphList
          }
        })
      }
    }
  }
</script>
