<template>
  <div class="view-enrolment view-container view-individual-enrollment-analysis">
    <el-row class="enrolment-header">
      <el-radio class="my-view"></el-radio>
      <label style="margin-right: 10px">个人招生分析</label>
    </el-row>

    <div>
      <el-row class="enrolment-table" style="top: 30px;height: 365px">
        <table>
          <thead>
          <tr>
            <th>姓名</th>
            <th v-for='item in dataMonth'>{{item}}月</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for='(it,i) in dataList'>
            <td title="员工姓名" style="min-width: 105px;overflow: hidden;white-space:nowrap"
                @click="getDetail(it.userId,i)">{{it.name}}
            </td>
            <td v-for="its in it.num">{{its}}</td>
          </tr>

          </tbody>

        </table>
        <div v-show="!loading" class="pagination-container" style="margin-top: 20px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page" background style="float: left"
                         :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="total" :pager-count="5">
          </el-pagination>
        </div>
      </el-row>
    </div>
    <div class="bottom-rank">
      <div class="enrolment-table" style="bottom: 81px;">
        <table>
          <thead>
          <tr>
            <th>排名</th>
            <th v-for="it in months">{{it}}月</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>第一</td>
            <td v-for="it in months">{{it}}</td>
          </tr>
          <tr>
            <td>第二</td>
            <td v-for="it in months">{{it}}</td>
          </tr>
          <tr>
            <td>第三</td>
            <td v-for="it in months">{{it}}</td>
          </tr>
          <tr colspan="12" style="text-align: center">····</tr>
          <tr>
            <td>倒数第三</td>
            <td v-for="it in months">{{it}}</td>
          </tr>
          <tr>
            <td>倒数第二</td>
            <td v-for="it in months">{{it}}</td>
          </tr>
          <tr>
            <td>倒数第一</td>
            <td v-for="it in months">{{it}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div  class="echart">
      <echarts :option="option"></echarts>
    </div>
    <div v-if="hasClick" style="min-height: 500px">
      <el-table :data="detailList" height="370" class="table-detail" >
        <el-table-column type="index" label="编号" align="center" width="70"></el-table-column>
        <el-table-column prop="name" label="姓名" show-overflow-tooltip width="70"></el-table-column>
        <el-table-column prop="mobile" label="电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="enrolTime" label="入学日期" show-overflow-tooltip></el-table-column>
        <el-table-column prop="motorcycleType" label="车型" show-overflow-tooltip width="50"></el-table-column>
      </el-table>
    </div>
    </div>



</template>

<script>
  /*
  *个人招生分析
  * 页面高度：420px
  * */
  import Echarts from "@/components/Echarts";
  import { getUserRecruit, queryRecruitByUser } from "@/api/visualization/api";
  import options from "@/utils/options";

  export default {
    name: "view-individual-enrollment-analysis",
    components: {
      Echarts
    },
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
      }
    },
    data() {
      return {
        months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        dataMonth:[],
        // tableHeight: this.area[1],
        datas: [15, 20, 10, 13, 9, 20, 8, 12, 21, 4, 6, 26],
        detailList: [],
        dataList: [],
        list:[],
        zsList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        loading: false,
        option: null,
        hasClick:false,
        total: 0,
        listQuery: {
          orgId: 4,
          year: 2018,
          page: 1,
          limit: 10
        },
        rankQuery: {
          orgId: 4,
          year: 2018,
          page: 1,
          limit: 0
        },
        userDetail: {
          year: 2018,
          userId: 6964
        }
      };
    },
    filters: {
      changeToDate(value) {        
        return new Date(value).toISOString().substring(0,10)
      }
    },
    created() {
      this.getList();
      //this.getDetail();
      this.getCurrentMonth();
      this.getRank();
    },
    methods: {
      getList() {
        getUserRecruit(this.listQuery).then(res => {
          if (res.data.code == 0) {
            this.total = res.data.data.data.totalCount;
            var num = [];
            var maxrank = [];
            var minrank = [];
            var list = [];
            var index = [];
            var dmLength=this.dataMonth.length;
            this.dataList = res.data.data.data.list;
            // this.list = res.data.data.data.list.slice(0,dmLength?dmLength:11);
            // console.log("listlistlistlist",this.dataList)

            this.dataList.forEach(function(e,v) {
              // console.log("&&&&&&",v)
              e.num=e.num.slice(0,dmLength?dmLength:11);
               // console.log("***********",e.num);
              // this.list.push(e);
            })
            // var dmLength=this.dataMonth.length;
            //

          }
        });
      },
      getDetail(index, i) {
        this.userDetail.userId = index;
        this.zsList = this.dataList[i].num;
        this.init();
        queryRecruitByUser(this.userDetail).then(response => {
          if (response.data.code == 0) {
            this.detailList = response.data.data;
            this.detailList.forEach(v=>{
             v.enrolTime=new Date(v.enrolTime).toISOString().substring(0,10);
            })
            this.hasClick=true;
          }
        });
      },
      init() {
        var data = {
          xData: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], // X轴数据
          yName: "人数",            // Y轴名字
          unit: "人",               // 单位
          mark: 6,                // 平均线
          hid:true,
          series: [                 // 图形集合
            {
              name: "人数",
              type: "line",
              smooth: false,
              lineWidth: 3,
              color: "#A4D482",
              data: this.zsList,//[15, 20, 10, 13, 9, 20, 8, 12, 21, 4, 6, 26]  //this.detailList[this.ids].num||

            }
          ]
        };
        this.option = options.config(data);
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },
      getCurrentMonth() {
        var dataArr = [];
        var data = new Date();
        var year = data.getFullYear();
        data.setMonth(data.getMonth() + 1, 1);//获取到当前月份,设置月份
        var m=data.getMonth()+11;
        for(var i=1;i<=m;i++){
          dataArr.push(i);
          this.dataMonth.push(i)
        }        
        // for (var i = 0; i < 12; i++) {
        //   data.setMonth(data.getMonth() - 1);//每次循环一次 月份值减1
        //   var m = data.getMonth() + 1;
        //   m = m < 10 ? "0" + m : m;
        //   dataArr.push(m);
        // }

        // console.log("dataArrdataArr", dataArr);

      },
      getRank() {
        var rank = [];
        var index = [0, 0, 0];
        getUserRecruit(this.rankQuery).then(re => {
          if (re.data.code == 0) {
            var ranklist = re.data.data.data.list;
            //index.forEach(function(a, b) {
              for (var n = 0; n <= 11; n++) {
                ranklist.forEach(function(v, i) {
                  var max = ranklist[0].num[n];
                  // console.log("@@@@@@@@",max)
                  if (v.num[n] - max > 0) {
                    max = v.num[n];
                    // index[b] = i;
                  }


                });
              }
            //});
          }
        });
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
    height: 700px;
    overflow: hidden;
    .enrolment-table {
      position: absolute;
      bottom: 0;
      left: 0;
      //height: 75px;
      width: 600px;
      overflow-x: auto;
      //padding: 5px 0 10px 29px;
      th, td {
        min-width: 20px;
      }

      /*滚动条样式 谷歌浏览器支持*/
      &::-webkit-scrollbar { /*滚动条整体样式*/
        width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 10px;
      }

      &::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
        border-radius: 5px;
        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
        background: $Danger;
      }

      &::-webkit-scrollbar-track { /*滚动条里面轨道*/
        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
        border-radius: 0;
        background: $White;
      }

    }

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
      }

      tr:hover {
        background-color: #fbf8e9;
        transition: all 0.1s ease-in-out;
      }

    }

    .half-right {
      height: 650px;
      width: 130px;
      overflow: hidden;


    }
    .echart {
      /*position: absolute;*/
      /*overflow: hidden;*/
      width: 330px;
      height: 180px;
      overflow: hidden;
      /*padding: 0px;*/
      /*margin: 0px;*/
      /*border-width: 0px;*/
      margin-left: 550px;
      /*right: 0;*/
      top: 0;
      display: flex;
      overflow-x:hidden;
    }

    .table-detail {
      .table-detail.el-table th {
        background-color: #3f5c6d2c!important;
      }
      position: relative;
      overflow: hidden;
      max-width: 380px;
      border-width: 0px;
      left: 550px;
      top: 10px;
      height: 370px;
      overflow-y: auto;
    }

    .bottom-rank {
      position: absolute;
      bottom: 10px;
      width: 600px;
      height: 295px;
      /*overflow: auto;*/
      overflow-x: auto;
    }

  }
</style>
