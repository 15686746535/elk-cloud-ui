<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>部门招生量统计 &nbsp;&nbsp;&nbsp;</label>
      <el-row class="enrolment-view">
        <div id="enrolmentChart">
          <echarts :option="option" :width="width+'px'" style="height: 280px;"></echarts>
        </div>
      </el-row>

      <div  style="position: absolute;right: 0;top:100px; width: 120px;height: 115px;" >
        <pie-chart :data="pieData" width="100px" height="120px" ></pie-chart>
      </div>

      <el-row class="main-table">
        <table>
          <thead>
          <tr>
            <th>部门招生量</th>
            <th v-for='item in months'>{{item}}月</th>
            <!--<th>累计占比</th>-->
          </tr>
          </thead>
          <tbody>
          <tr>
            <td title="市场部(人)" >培训部(人)</td>
            <td v-for='it in shichangbu'>{{it}}</td>
            <!--<th>{{sum(lastList)}}</th>-->
            <!--<td>1</td>-->
          </tr>
          <tr>
            <td title="培训部(人)" >市场部(人)</td>
            <td v-for='it in peixunbu'>{{it}}</td>
            <!--<th>{{sum(lastList)}}</th>-->
            <!--<td>1</td>-->
          </tr>
          <tr>
            <td title="办公室(人)" style="min-width: 105px;overflow: hidden;white-space:nowrap">办公室(人)</td>
            <td v-for='it in bangongshi'>{{it}}</td>
            <!--<th>{{sum(lastList)}}</th>-->
            <!--<td>1</td>-->
          </tr>
          <tr>
            <td title="财务部(人)" >财务部(人)</td>
            <td v-for='it in caiwubu'>{{it}}</td>
            <!--<th>{{sum(currList)}}</th>-->
            <!--<td>1</td>-->
          </tr>
          <tr>
            <td title="校区人事(人)">校区人事(人)</td>
            <td v-for='it in xiaoqurenshi'>{{it}}</td>
            <!--<td>1</td>-->
          </tr>
          <tr>
            <td title="校区负责(人)">校区负责(人)</td>
            <td v-for='it in xiaoqufuze'>{{it}}</td>
            <!--<td>1</td>-->
          </tr>
          </tbody>

        </table>
      </el-row>
      <div class="rank-month-table">
        <table>
          <thead>
          <tr>
            <th>月度招生排名</th>
            <th v-for="it in  months">{{it}}</th>
          </tr>
          </thead>
          <tbody>
          <!--<tr v-for="(rank,i) in ranks">-->
            <!--<td>{{i==0?'第一':'第二'}}</td>-->
            <!--<td>{{rank}}</td>-->
          <!--</tr>-->
          <tr>
            <td>第一</td>
            <td v-for="it in months">{{it}}</td>
          </tr>
          <tr>
            <td>第二</td>
            <td v-for="it in months">{{it}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="rank-cumulative-table">
        <table>
          <thead>
          <tr>
            <th>累计占比排名</th>
            <th v-for="it in  months">{{it}}</th>
          </tr>
          </thead>
          <tbody>
          <!--<tr v-for="(rank,i) in ranks">-->
            <!--<td>{{i==0?'第一':'第二'}}</td>-->
            <!--<td>{{rank}}</td>-->
          <!--</tr>-->
          <tr>
            <td>第一</td>
            <td v-for="it in months">{{it}}</td>
          </tr>
          <tr>
            <td>第二</td>
            <td v-for="it in months">{{it}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </el-row>
  </div>
</template>

<script>
  /*
  *部门招生量统计
  * 页面高度：520px
  * */
  import Echarts from '@/components/Echarts';
  import PieChart from '@/components/PieChart'
  import {queryDeptRecuritByOrgId} from '@/api/visualization/api'
  import options from  '@/utils/options'
  export default {
    name: "view-org-amount-enrolment",
    components: {
      Echarts,PieChart
    },
    props: {
      params: {
        type: Object,
        default: {}
      },
      width: {
        type: Number,
        default: 1200
      },
    },
    data() {
      return {
        months: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        list:[34,12,56,78,36.98,45,11,4,78,45,66],
        ranks:["","",""],
       peixunbu:[],
       shichangbu:[],
       bangongshi:[],
       caiwubu:[],
       xiaoqurenshi:[],
       xiaoqufuze:[],
        totalnum:0,
        option:null,
        pieData: {
          name: '',
          legend: [],
          value: []
        },
        listQuery:{
          orgId:4,
          year:2018
        }
      };
    },
    created() {
      this.init();
      this.getList();
    },
    methods: {
      getList(){
        let _this=this;
        queryDeptRecuritByOrgId(this.listQuery).then(res=>{
          if(res.data.code==0){
           var peixunbu=[];
            var  shichangbu=[];
             var bangongshi=[];
            var  caiwubu=[];
             var xiaoqurenshi=[];
             var xiaoqufuze=[];
             var total=0;
             var totalarr=[];
            console.log("!!!!!!!!!",res.data.data)
            res.data.data.forEach(function(e,v) {
              if(e.name=="培训部"){
               peixunbu=e.deptRecutitList;
                e.deptRecutitList.forEach(i=>{
                  total+=i;
                })

              }
               if(e.name=="市场部"){
                 shichangbu=e.deptRecutitList;
                 e.deptRecutitList.forEach(i=>{
                   total+=i;
                 })
                 console.log("peixunbu",shichangbu)
              } if(e.name=="办公室"){
                 bangongshi=e.deptRecutitList;
                e.deptRecutitList.forEach(i=>{
                  total+=i;
                })
              }if(e.name=="财务部"){
                caiwubu=e.deptRecutitList;
                e.deptRecutitList.forEach(i=>{
                  total+=i;
                })
              }if(e.name=="校区人事"){
                xiaoqurenshi=e.deptRecutitList;
                e.deptRecutitList.forEach(i=>{
                  total+=i;
                })
              }if(e.name=="校区负责"){
                xiaoqufuze=e.deptRecutitList;
                e.deptRecutitList.forEach(i=>{
                  total+=i;
                })
              }
            })
            _this.peixunbu=peixunbu;
            this.shichangbu=shichangbu;
            this.bangongshi=bangongshi;
            this.caiwubu=caiwubu;
            this.xiaoqurenshi=xiaoqurenshi;
            this.xiaoqufuze=xiaoqufuze;
            this.totalnum=total
            console.log("$$$$",_this.totalnum)
            this.init();
          }
        })


        // this.pieData = {
        //   name: '通过率',
        //   legend: ['通过人数', '失败人数'],
        //   value: [
        //     { name: '通过人数', value: 1, selected: true },
        //     { name: '失败人数', value: 2 }
        //   ]
        // }
      },
      init() {
        var label={
          normal: {
            show: true,
            position: 'insideBottom',
            distance: 15,
            align: 'left',
            verticalAlign: 'middle',
            rotate:  90,
            formatter:  '{name|{c}'+'人'+'}',
            rich: {
              name: {
                // color:'#000',
                textBorderColor: '#fff'
              }
            }
          }
        }
        var data = {
          xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], // X轴数据
          yName:'人数',            // Y轴名字
          unit:'人',               // 单位
          mark:100,                // 平均线
          series:[                 // 图形集合
            {
              name:'市场部',
              type:'bar',
              stack:'11',
              label:label,
              color:'#7773ff',
              data:this.shichangbu//[15,25,40,67,80,88,91,80,99,100,88,99],
            },
            {
              name:'培训部',
              type:'bar',
              stack:'11',
              label:label,
              color:'#f976c6',
              data:this.peixunbu//[17,65,80,27,45,88,21,38,72,42,22,41],
            },
            {
              name:'服务中心',
              type:'bar',
              stack:'11',
              label:label,
              color:'#ffa351',
              data:this.bangongshi//[17,65,80,27,45,88,21,38,72,42,22,41],
            },
            {
              name:'网销部',
              type:'bar',
              stack:'11',
              label:label,
              color:'#fe8888',
              data:this.caiwubu//[17,65,80,27,45,88,21,38,72,42,22,41],
            },
            {
              name:'其他校区',
              type:'bar',
              stack:'11',
              label:label,
              color:'#7773ff',
              data:this.xiaoqurenshi//[17,65,80,27,45,88,21,38,72,42,22,41],
            },
            {
              name:'其他来源',
              type:'bar',
              stack:'11',
              label:label,
              color:'#a2d27f',
              data:this.xiaoqufuze//[17,65,80,27,45,88,21,38,72,42,22,41],
            }
          ]
        }
        this.option = options.config(data)
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*主体白色*/
  $White: #fff;
  /*主体红色*/
  $Danger: #c50202;
  /*灰白色*/
  $DDD: #ddd;
  .view-enrolment {
    height: 800px;
    table {
      border-collapse: collapse;
      border-spacing: 0;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-family: Arial, Helvetica, sans-serif;
      font-size: 14px;
      color: #444;
      border: 1px solid #ccc;
      border-radius: 6px;

      th, td {
        border-left: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 5px;
        text-align: center;
        overflow: hidden;
        white-space: nowrap;
        min-width: 50px;
      }

      tr:hover {
        background-color: #fbf8e9;
        transition: all 0.1s ease-in-out;
      }

    }

    .main-table{
      margin-top: 330px;
      /*max-width: 800px;*/
      margin-left: 10px;
      /*width: 600px;*/
      overflow: hidden;
    }
    .rank-month-table,.rank-cumulative-table{
      margin-top: 10px;
      margin-left: 10px;
    }

  }
</style>
