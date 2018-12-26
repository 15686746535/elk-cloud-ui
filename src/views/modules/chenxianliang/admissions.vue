<template>
  <div>
  <el-col :span="3">
    <el-menu default-active="2" class="el-menu-vertical-demo" mode="vertical" >
      <!--@open="handleOpen" @close="handleClose"-->
      <el-menu-item  index="1">
          <i class="el-icon-location"></i>
          <span>学员管理</span>
      </el-menu-item >
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">车辆管理</span>
      </el-menu-item>
      <el-menu-item index="3" >
        <i class="el-icon-document"></i>
        <span slot="title">人力资源</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">数据统计</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-message"></i>
        <span slot="title">客户管理</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-tickets"></i>
        <span slot="title">财务管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-goods"></i>
        <span slot="title">服务管理</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-setting"></i>
        <span slot="title">系统设置</span>
      </el-menu-item>
    </el-menu>
    </el-col>
    <div style="margin: 15px 15px 15px 150px;width: 1300px;height: auto ">
      <el-button type="primary">不知道写啥</el-button>
      <el-input style="float: right;  width: 200px;border-bottom: #303133" suffix-icon="el-icon-search" ></el-input>
      <div>
        <el-card style="margin-left: 10px;height: 750px">
      <el-tabs value="third"  type="card"  tab-position="left" style="width: auto;height: auto;">
        <!--@tab-click="handleClick"-->
        <el-tab-pane label="公海数据" name="first">
          <el-row>
            <el-col :style="{width: $store.state.app.client.width - 40 + 'px'}">
              <bar-pile-chart :data="data" :style="{height: ($store.state.app.client.height-170) + 'px',width: $store.state.app.client.width - 40 + 'px'}" ></bar-pile-chart>
              <!--:hasDown="hasDown" @callback="down"-->
              <!--<div id="myChart" :style="{height: ($store.state.app.client.height-170) + 'px',width: $store.state.app.client.width - 40 + 'px'}"></div>-->
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="意向数据" name="second">意向数据</el-tab-pane>
        <el-tab-pane label="招生数据" name="third">
          <div><el-radio style="padding-top: 25px; " fill="#D80000">招生数据</el-radio></div>

          <el-card style="float: left; width:400px;height: 550px">
            <div>
              <label>招生完成率</label>
              <el-select  style="width: 120px" placeholder="校区"></el-select>
              <el-select  style="width: 115px" placeholder="年份"></el-select>
              <el-button style="background-color:#D80000;color: #fff;position: relative; left: 208px;top:5px" icon="el-icon-circle-plus-outline" >添加对比</el-button>
            </div>

            <div>
              <el-progress align="center" style="position: relative; left: 120px;top: 50px;" type="circle" :percentage="78" color="#D80000" stroke-width="10"></el-progress>
            </div>

            <div style=" bottom: -125px;position: relative; left: 120px;" >
              <span>招生目标人数：200</span><br>
              <span>招生完成人数：150</span>
            </div>
          </el-card>

          <div >
          <el-card style="margin-left: 425px; width:400px;height: 550px">
            <el-button style="background-color: #D80000;float: right;color: #fff;margin-top: 45px" icon="el-icon-circle-plus-outline" >添加对比</el-button>
            <div>
              <el-progress align="center" style="position: relative; left: 120px;top: 125px;" type="circle" :percentage="50" color="#D80000" stroke-width="10"></el-progress>
            </div>

            <div style=" bottom: -200px;position: relative; left: 120px;">
              <span>招生目标金额：14000</span><br>
              <span>招生完成金额：7000</span>
            </div>
          </el-card>
          </div>
          <div style="width: 100px;float: right;margin-top: -550px" >
            <el-card style="float: right;width: 120px;height: 120px" >
              <el-progress style="padding: 10px 15px" align="center" type="circle" width="50" :percentage="50" color="#D80000"  stroke-width="2"></el-progress>
             <span style="padding:0px 1px 1px 10px">某某校区</span>
            </el-card>
            <el-card style="float: right;width: 120px;height: 120px" >
              <el-progress style="padding: 10px 15px" align="center" type="circle" width="50" :percentage="50" color="#D80000"  stroke-width="2"></el-progress>
              <label>某某校区</label>
            </el-card>
            <el-card style="float: right;width: 120px;height: 120px;" >
              <el-progress style="padding: 10px 15px" align="center" type="circle" width="50" :percentage="50" color="#D80000"  stroke-width="2"></el-progress>
              <label >某某校区</label>
            </el-card>
            <el-card style="float: right;width: 120px;height: 120px" >
              <el-progress style="padding: 10px 15px" align="center" type="circle" width="50" :percentage="50" color="#D80000"  stroke-width="2"></el-progress>
              <label>某某校区</label>
            </el-card>
            <el-button style="background-color:#D80000;color: #fff;width: 120px;margin-left: 9px;margin-top: 10px;margin-left: -20px;" >对比</el-button>
            <el-button style="background-color:#D80000;color: #fff;margin-top: 10px;width: 120px;margin-left: -20px ">全部取消</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>

        </el-card>

      </div>

    </div>

  </div>


</template>

<script>
  import BarPileChart from '@/components/BarPileChart'
  import { queryRecruit, queryCampus } from '@/api/visualization/api'
  import echarts from 'echarts'


  export default {
    name: 'recruit', // 每月招生
    components: {
      BarPileChart
    },
    data() {
      var myDate = new Date();
      labelOption:{}
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
          xAxis:[],
          seriesList: [ ]
        },
        legend: {
          data:[]
        },
      }

    },
    created() {
      this.getList()
    },
    computed: {
    },
    mounted(){
      this.drawLine();
    },
    methods: {
      getList(){
      this.loading = true
      queryRecruit(this.listQuery).then(response => {
    var data = response.data.data
    this.hasDown = true
    this.loading = false
    // this.data = {
    //   colors: ['#409eff'],
    //   xAxis: data.axisList,
    //   seriesList: data.columnarGraphList
    // }
        this.data={
      colors:['#003366', '#006699', '#4cabce', '#e5323e'],
          xAxis:data.axisList,
          seriesList:[{},{},{},{}]
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
          this.loading = false
          this.hasDown = false
          this.data = {
            colors: ['#14e9ff'],
            xAxis: data.axisList,
            seriesList: data.columnarGraphList
          }
        })
      },
      onChange() {
        this.labelOption ={
            normal: {
              rotate: 90,
              align: 'center',
              verticalAlign: 'middle',
              //position: insideBottom,
              distance: 15
            }
          }
          },
      // setListData() {
      //
      //   var series=[];
      //   this.data.seriesList.forEach(function(e){
      //     series:e.name
      //   })
      //   this.legend.data.push(series);
      //   this.data = {
      //     colors: ['#003366'], //, '#006699', '#4cabce', '#e5323e'
      //     xAxis: [ '一月', '二月', '三月', '四月', '五月'],
      //     seriesList: [{
      //       name: '全悦校区',
      //       type: 'bar',
      //       label: labelOption,
      //       data: [320, 332, 301, 334, 390]
      //     },
      //       {
      //         name: '华通校区',
      //         type: 'bar',
      //         label: labelOption,
      //         data: [220, 182, 191, 234, 290]
      //       },
      //       {
      //         name: '壹路北碚校区',
      //         type: 'bar',
      //         label: labelOption,
      //         data: [150, 232, 201, 154, 190]
      //       },
      //       {
      //         name: '壹路校区',
      //         type: 'bar',
      //         label: labelOption,
      //         data: [98, 77, 101, 99, 40]
      //       }]
      //   }
      // },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: { text: '在Vue中使用echarts' },
          tooltip: {},
          xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      }
    }

  }
</script>
<!--<script>-->
  <!--import BarPileChart from '@/components/BarPileChart'-->
  <!--export default {-->
    <!--methods: {-->
      <!--handleOpen(key, keyPath) {-->
        <!--console.log(key, keyPath);-->
      <!--},-->
      <!--handleClose(key, keyPath) {-->
        <!--console.log(key, keyPath);-->
      <!--}-->
    <!--}-->
  <!--};-->
<!--</script>-->


<style>

</style>
