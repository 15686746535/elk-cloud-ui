<template>
  <div class="view-enrolment view-container">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label>招生量同比增长率 &nbsp;&nbsp;&nbsp;</label>
      <el-select v-model="listQuery.campus" filterable remote clearable reserve-keyword placeholder="校区"
                 style="margin-right: 5px;width: 200px;">
        <el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>
      </el-select>
      <el-date-picker v-model="listQuery.year" type="year" placeholder="年份"
                      style="margin-right: 5px;width: 200px;"></el-date-picker>
      <el-button icon="el-icon-search" type="danger">确认搜索</el-button>
    </el-row>
    <el-row class="enrolment-view">
      <div id="enrolmentChart">
      </div>
    </el-row>
    <el-row class="enrolment-table">
      <table>
        <thead>
        <tr>
          <th>月份</th>
          <th v-for='item in zsmonths'>{{item}}</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>同比增长率(%)</td>
          <td v-for='it in zsltbList'>{{it}}</td>
        </tr>
        <tr>
          <td>招生额月度同比增长率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        <tr>
          <td>招生量年度同比增长率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        <tr>
          <td>招生额年度同比增长率</td>
          <td v-for='it in zsrslist'>{{it}}</td>
        </tr>
        </tbody>

      </table>
    </el-row>

    <div class="right-text">
      <p style="color: #c50202">指数解读：</p>
      <p class="text-body">三月份的招生量明显异常三月份的招生量明显异常三月份的招生量明显异常</p>
    </div>
  </div>
</template>

<script>
  /*
 * 同比增长率
 * 页面高度：420px
 * */
  import Echarts from '@/components/Echarts';
  import {queryEnrolment } from '@/api/visualization/api'
  import options from  '@/utils/options'
  export default {
    name: "view-amount-completion-rate",
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
        zsmonths: ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"],
        zsrslist: [350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350, 350],
        zsltbList:[0,0,0,0,0,0,0,0,0,0,0,0],
        lastYear:[0,0,0,0,0,0,0,0,0,0,0,0],
        thisYear:[0,0,0,0,0,0,0,0,0,0,0,0],
        campusList: [
          { name: "壹路校区", id: 1 },
          { name: "华通校区", id: 2 }
        ],
        listQuery: {
          orgId: 4,
          year: 2018
        },
        queryList:{
          orgId:null,
          year: null
        }
      };
    },
    created() {
      this.init();
    },
    methods: {
      getList(){
        let _this=this
        _this.queryList.orgId=_this.listQuery.orgId;
        _this.queryList.year=--_this.listQuery.year;
        var lastYeat=[];
        var thisYeat=[];
        var lastTotal=0;
        var thisTotal=0;
        var tongbiTotal=[];
        queryEnrolment (this.listQuery).then(res=>{
          if(res.data.code==0){
            thisYeat=res.data.data.factStudent;
          }
        })
        queryEnrolment(_this.queryList).then(response=>{
          if(response.data.code==0){
            lastYeat=response.data.data.factStudent;
            thisYeat.forEach(function(v,i) {
              thisTotal+=v;
              lastTotal+=lastYeat[i];
              tongbiTotal.push(((thisTotal/lastTotal)*100).toFixed(2));
            })
            _this.init();
          }
        })
        _this.zsltbList=tongbiTotal;

      },
      init() {
        var data = {
          xData:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'], // X轴数据
          yName:'百分比',            // Y轴名字
          unit:'%',               // 单位
          mark:88,                // 平均线
          series:[                 // 图形集合
            {
              name:'今年招生人数',
              type:'line',
              smooth:true,
              lineWidth:3,
              color:'#7773ff',
              data:this.zswclList
            },
            {
              name:'去年招生人数',
              type:'line',
              smooth:true,
              lineWidth:3,
              color:'#7773ff',
              data:this.zswclList
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
    height: 420px;
.right-text{
  position: absolute;
  width: 200px;
  top: 80px;
  right: 20px;
  .text-body{
    font-size: small;
    color: #666;
  }
}


     }
</style>
