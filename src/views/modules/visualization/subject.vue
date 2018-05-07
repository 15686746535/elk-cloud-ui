<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
      <el-card>
        <el-row>
          <el-col>
            <el-date-picker value-format="timestamp" v-model="interval" type="daterange" align="left" style="margin-bottom: 0px;"
                            unlink-panels range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary"  @click="getList" ><i class="el-icon-search"></i>搜索</el-button>
          </el-col>
          <el-col>
            <bar-pile-chart :data="data" :style="{height: ($store.state.app.client.height-80) + 'px'}" ></bar-pile-chart>
          </el-col>
        </el-row>

      </el-card>
  </div>
</template>

<script>
  import BarPileChart from '@/components/BarPileChart'
  import { querySubject } from '@/api/visualization/api'

  export default {
    name: 'subject',
    components: {
      BarPileChart
    },
    data() {
      return {
        listQuery: {
          beginTime: null,
          endTime: null
        },
        interval: [],
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
        if (this.interval) {
          this.listQuery.beginTime = this.interval[0]
          this.listQuery.endTime = this.interval[1]
        }
        querySubject(this.listQuery).then(response => {
          var data = response.data.data
          this.data = {
            colors: ['#409eff'],
            xAxis: data.axisList,
            seriesList: data.columnarGraphList
          }
        })
      }
    }
  }
</script>
