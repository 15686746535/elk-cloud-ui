<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label style="margin-right: 10px">招生人数同比增长率统计</label>
      <!--<el-select v-model="listQuery.campus" filterable remote clearable reserve-keyword placeholder="校区"-->
      <!--style="margin-right: 5px;width: 200px;">-->
      <!--<el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>-->
      <!--</el-select>-->
      <!--&lt;!&ndash;<el-date-picker v-model="listQuery.year" type="year" placeholder="年份"&ndash;&gt;-->
      <!--&lt;!&ndash;style="margin-right: 5px;width: 200px;"></el-date-picker>&ndash;&gt;-->
      <!--<el-button icon="el-icon-search" type="danger" @click="search">确认搜索</el-button>-->
    </el-row>
    <el-row class="enrolment-view">
      <div id="enrolmentChart">
        <echarts :option="option" :width="width+'px'" style="height: 280px;"></echarts>
      </div>
    </el-row>
    <el-row class="enrolment-table">
      <table>
        <thead>
        <tr>
          <th>月份</th>
          <th v-for='item in months'>{{item}}月</th>
          <th>合计</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td title="去年招生额(万)" style="min-width: 105px;overflow: hidden;white-space:nowrap">去年招生额(万)</td>
          <td v-for='it in lastList'>{{it}}万</td>
          <th>{{sum(lastList)}}</th>
        </tr>
        <tr>
          <td title="今年招生额(万)" style="min-width: 105px;overflow: hidden;white-space:nowrap">今年招生额(万)</td>
          <td v-for='it in currList'>{{it}}万</td>
          <th>{{sum(currList)}}</th>
        </tr>
        <tr>
          <td title="同比增长率(%)">同比增长率(%)</td>
          <td v-for='it in list'>{{it}}%</td>
          <th></th>
        </tr>
        </tbody>

      </table>
    </el-row>
  </div>
</template>

<script>
  /*
   * 招生人数同比增长率统计
   * 页面高度：420px
   */
  import Echarts from '@/components/Echarts';
  import {queryFactStuCount} from '@/api/visualization/api'
  import options from  '@/utils/options'
  export default {
    name: "view-amount-growth-rate",
    components: {
      Echarts
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
        list: [], // 同比增长率
        cumulativeList: [], // 累计同比增长率
        currList:[], // 今年 招生人数
        lastList:[], // 去年年 招生人数
        campusList: [
          { name: "壹路校区", id: 1 },
          { name: "华通校区", id: 2 }
        ],
        queryList:{
          orgId:4,
          year:2018
        },
        listQuery:{
          orgId:4,
        },
        option:null
      };
    },
    created() {
      this.getList();
    },
    methods: {
      sum(list){
        var count = 0;
        list.forEach(function (v,i) {
          count += v;
        })
        return count;
      },
      getList(){
        let _this=this
        // this.currList = [2.01,3.03,4.12,5.00,3.11,5.23,2.11,4.00,1.45,3.78,2.99,2.00];
        // this.lastList = [2.01,2.11,4.12,2.00,4.00,1.45,5.00,3.03,5.23,2.99,3.11,3.78];
        // this.currList =[] ;
        // this.lastList =[] ;
        // 计算
        // var growthRate = options.growthRate(this.currList,this.lastList);


        queryFactStuCount(this.listQuery).then(res=>{
          if(res.data.code==0)
          {
            _this.currList=res.data.data.factStudent;
            queryFactStuCount(this.queryList).then(re=>{
              if(res.data.code==0) {
                _this.lastList = re.data.data.factStudent;
              }
            })
            let growthRate = options.growthRate(this.currList,this.lastList);
            console.log("*********",growthRate)
            this.list = growthRate.list;
            this.cumulativeList = growthRate.cumulativeList;
            this.init();
          }
        })
        // 第一步 查询去年每月/人数集合
        // _this.queryList.orgId=_this.listQuery.orgId;
        // _this.queryList.year=--_this.listQuery.year;
        // var lastYeatFactStudent=[];
        // var lastYeatFactMoney=[];
        // var thisYeatFactStudent=[];
        // var thisYeatFactMoney=[];
        // var lastYeatFactStudentTotal=0;
        // var lastYeatFactSFactMoneyToatal=0;
        // var thisYeatFactStudentTotal=0;
        // var thisYeatFactFactMoneyTotal=0;
        // var rstongbiTotal=[];
        // var jetongbiTotal=[];
        // queryEnrolment (this.listQuery).then(res=>{
        //   if(res.data.code==0){
        //     thisYeatFactStudent=res.data.data.factStudent;
        //     thisYeatFactMoney=res.data.data.factMoney;
        //   }
        // })
        // queryEnrolment(_this.queryList).then(response=>{
        //   if(response.data.code==0){
        //     lastYeatFactStudent=response.data.data.factStudent;
        //     lastYeatFactMoney=response.data.data.factMoney;
        //     thisYeatFactStudent.forEach(function(v,i) {
        //       thisYeatFactStudentTotal+=v;
        //       thisYeatFactFactMoneyTotal+=thisYeatFactMoney[i];
        //       lastYeatFactStudentTotal+=lastYeatFactStudent[i];
        //       lastYeatFactSFactMoneyToatal+=lastYeatFactMoney[i];
        //       rstongbiTotal.push((((thisYeatFactStudentTotal-lastYeatFactStudentTotal)/lastYeatFactStudentTotal)*100).toFixed(2));
        //       jetongbiTotal.push((((thisYeatFactFactMoneyTotal-lastYeatFactSFactMoneyToatal)/lastYeatFactSFactMoneyToatal)*100).toFixed(2));
        //     })
        //     _this.zsltbList=rstongbiTotal;
        //     _this.jeltbList=jetongbiTotal;
        //     _this.init();
        //   }
        // })
      },
      init() {
        var data = {
          xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], // X轴数据
          yName:'增长率',            // Y轴名字
          unit:'%',               // 单位
          mark:66,                // 平均线
          series:[                 // 图形集合
            {
              name: '增长率',
              type:'line',
              smooth:false,
              lineWidth:3,
              color:'#A4D482',
              data:this.list
            },
            {
              name: '累计增长率',
              type:'line',
              smooth:false,
              lineWidth:3,
              color:'#fe8888',
              data:this.cumulativeList
            }
          ]
        }
        this.option = options.config(data)
      },
      search(){
        console.log(111)
        // 根据当前条件
        // 1、查询 今年每月/招生人数/额
        // 2、查询去年每月/招生人数/额
        // 3、计算人数/额  同比
        // 4、init
        this.list = [1, 0, 4, 66, 45, 66, 35, 69, 78, 99, 24, 6];
        this.init();
      }
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
    height: 525px;

  }
</style>
