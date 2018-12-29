<template>
  <div id="view">
    <div class="box">
      <el-container>
        <el-header height="215px">
          <div class="header-row type">
            <div class="category" :class="i==selected?'selected ' + ty.color:ty.color" v-for="(ty,i) in typeList" @click="categoryChange(i)"
                 :style="{background:'url(/static/img/view-bg-'+ty.icon+'.png) no-repeat',backgroundSize: i==selected?'240px':'200px',left:i*210+(i>selected?20:0)+'px'}">
              <div class="name">{{ty.name}}
                <div class="line"></div>
              </div>
              <div class="ename">
                {{ty.ename}}
              </div>
              <div class="shadow" :style="{background:'url(/static/img/view-shadow-'+ty.icon+'.png) center bottom no-repeat',backgroundSize: '240px'}"></div>
            </div>
          </div>
          <div class="header-row">
            <label>全局范围设置 &nbsp;&nbsp;&nbsp;</label>
            <!--<el-select  v-model="payment.code" size="mini" filterable remote reserve-keyword placeholder=""-->
            <!--:remote-method="getPayCodeList" :loading="selectLoading">-->
            <el-select  v-model="listQuery.campus" filterable remote clearable reserve-keyword placeholder="校区" style="margin-right: 5px;width: 200px;">
              <el-option v-for="campus in campusList" :key="campus.id" :label="campus.name" :value="campus.id"></el-option>
            </el-select>
            <el-date-picker v-model="listQuery.year" type="year" placeholder="年份" style="margin-right: 5px;width: 200px;"></el-date-picker>
            <el-button icon="el-icon-search" type="danger">确认搜索</el-button>
          </div>
        </el-header>
        <el-container>
          <el-aside width="200px">
            <div class="aside-position">
              <div class="aside-item" v-for="(item,i) in list" :class="i==to?'selected':''" @click="GoTo(i)">
                <a class="text">{{item.name}}</a>
                <div class="bg">
                  <div class="triangle"></div>
                </div>
              </div>
            </div>
          </el-aside>
          <el-main :style="{height: pageHeight-295+'px'}" style="scroll-behavior: smooth;" ref="view">
            <div class="view-list">
              <div :id="item.to" class="view-item" v-for="(item,i) in list" :style="{height:item.height}">
                <view-enrolment :width="area[0] - 300" v-if="item.to=='view-enrolment'"  :params="listQuery" ></view-enrolment>

                <view-amount-completion-rate :width="area[0] - 300" v-if="item.to=='view-amount-completion-rate'"  :params="listQuery" ></view-amount-completion-rate>
                <view-average-output :width="area[0] - 300" v-else-if="item.to=='view-average-output'"  :params="listQuery" ></view-average-output>
                <!--<view-enroll-numbers-rate :width="area[0] - 300" v-else-if="item.to=='view-enroll-numbers-rate'"  :params="listQuery" ></view-enroll-numbers-rate>-->
                <view-forehead-completion-rate :width="area[0] - 300" v-else-if="item.to=='view-forehead-completion-rate'"  :params="listQuery" ></view-forehead-completion-rate>
                <!--<view-amount-growth-rate :width="area[0] - 300" v-else-if="item.to=='view-amount-growth-rate'"  :params="listQuery" ></view-amount-growth-rate>-->
                <view-money :width="area[0] - 300" v-else-if="item.to=='view-money'"  :params="listQuery" ></view-money>
                <view-enrolment :width="area[0] - 300" v-else  :params="listQuery" ></view-enrolment>

              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
  import ViewEnrolment from '@/views/modules/visualization/view-enrolment.vue'  //招生人数
  import ViewAmountCompletionRate from '@/views/modules/visualization/view-amount-completion-rate.vue'  //招生完成率
  import viewAverageOutput from '@/views/modules/visualization/view-average-output.vue'  // 人均产值
  import viewEnrollNumbersRate from '@/views/modules/visualization/view-enroll-numbers-rate.vue'  //月度计划任务人数完成率
  import viewForeheadCompletionRate from '@/views/modules/visualization/view-forehead-completion-rate.vue'  //招生金额完成率
  import viewAmountGrowthRate from '@/views/modules/visualization/view-amount-growth-rate.vue'  //招生量同比增长率
  import viewMmoney from '@/views/modules/visualization/view-money.vue'  //招生金额
  export default {
    name: 'view',
    components: {
      ViewEnrolment,
      ViewAmountCompletionRate,
      viewAverageOutput,
      viewEnrollNumbersRate,
      viewForeheadCompletionRate,
      viewAmountGrowthRate,
      viewMmoney
    },
    props: {
      layerid: String,
      area: Array
    },
    watch: {
      area: function(val) {
        console.log(val)
        this.pageHeight = val[1]
      }
    },
    computed: {
      // pageHeight(){
      //   return document.documentElement.clientHeight || document.body.clientHeight
      // }
    },
    data (){
      return{
        pageHeight: this.area[1],
        typeList:[
          {
            icon: 'visit',
            name: '校区招生',
            ename: 'Campus enrollment',
            list: [
              { name:'招生人数统计', to: 'view-enrolment', height: 460 },
              { name:'招生量完成率统计', to: 'view-amount-completion-rate', height: 460 },
              { name:'招生量增长率统计', to: 'view-amount-growth-rate', height: 460 },
              { name:'个人招生分析', to: 'view-individual-enrollment-analysis', height: 460 },
              { name:'个人招生详情', to: 'view-individual-enrollment-details', height: 460 },
              { name:'招生量车型统计', to: 'view-amount-motorcycle-type', height: 460 }
            ]
          },
          {
            icon: 'achievement',
            name: '校区收入',
            ename:'Campus income',
            list:[
              { name:'招生金额统计', to: 'view-money', height: 460 },
              { name:'人均产值统计', to: 'view-average-output', height: 460 },
              { name:'招生额完成率统计', to: 'view-forehead-completion-rate', height: 460 },
              { name:'招生额增长率统计', to: 'view-forehead-growth-rate', height: 460 },
              { name:'招生额车型统计', to: 'view-forehead-motorcycle-type', height: 460 }
            ]
          },
          {
            icon: 'train',
            name: '部门业绩',
            ename:'Departmental performance',
            list:[
              { name:'部门招生量统计', to: 'view-org-amount-enrolment', height: 460 },
              { name:'部门人均招生额统计', to: 'view-org-average-forehead', height: 460 },
            ]
          },
          {
            icon: 'finance',
            name: '市场分析',
            ename:'Market analysis',
            list:[
              { name:'招生市场占有率', to: 'view-market-share', height: 460 },
              { name:'招生累计市场占有率', to: 'view-cumulative-market-share', height: 460 },
              { name:'招生车管所占有率', to: 'view-vehicle-share', height: 460 },
              { name:'招生累计车管所占有率', to: 'view-cumulative-vehicle-share', height: 460 },
              { name:'意向转化率统计', to: 'view-visit-conversion', height: 460 },
            ]
          }
        ],
        list:[],
        selected:0,
        to:0,
        campusList:[
          { name:"壹路校区", id: 1 },
          { name:"华通校区", id: 2 }
        ],
        listQuery: {
          campus: null,
          year: null
        }
      }
    },
    created() {
      this.list = this.typeList[0].list;
    },
    mounted() { // 监听
      var view = this.$refs.view.$el;
      view.addEventListener('scroll', () => {
        var current_offset_top = view.scrollTop + 200;
        this.to = parseInt(current_offset_top/470);
      })
    },
    methods: {
      categoryChange(i) {
        this.selected = i;
        this.list = this.typeList[i].list;
      },
      GoTo(i) {
        this.to = i;
        // 滑动到指定位置
        document.querySelector("#"+this.list[i].to).scrollIntoView({behaviour: "smooth",block: "start"});
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*主体白色*/
  $White:#fff;
  /*主体红色*/
  $Danger:#c50202;
  $DDD:#ddd;
  $PageBackground:#eee;
  #view {
    background: $PageBackground;
    height: 100%;
    padding: 0 20px;
    .box {
      padding: 20px 0;
      overflow: hidden;

      .el-header {
        padding: 20px;
        background-color: $White;
        border-radius: 10px 10px 0 0;
        margin-bottom: 10px;
        .header-row {
          position: relative;
          display: flex;
          white-space: nowrap;
          align-items: center; /* 左右居中 */
          margin-bottom: 20px;
          &.type {
            height: 115px;
          }
          .category {
            position: absolute;
            bottom: 0;
            width: 200px;
            height: 115px;
            transition: all 0.5s ease;
            margin-right: 10px;
            border-radius: 10px;
            cursor: pointer;
            .name {
              position: absolute;
              bottom: 50px;
              left: 20px;
              color: $White;
              .line {
                transition: width 0.5s ease;
                border: 1px $White solid;
                border-radius: 5px;
                background-color: $White;
                height: 2px;
                width: 20px;
                margin-top: 5px;
              }

            }
            .ename{
              position: absolute;
              bottom: 20px;
              left: 20px;
              color: $DDD;
              font-size: 12px;
            }
            .shadow {
              width: 220px;
              height: 50px;
              position: absolute;
              transition: all 0.5s ease;
              left: 0;
              display: none;
              bottom: -45px;
            }
            &.selected {
              width: 220px;
              height: 138px;
              .shadow {
                display: inline;
              }
              .line {
                width: 100%;
              }
            }
            &:hover {
              .line {
                width: 100%;
              }
            }
          }
          .el-button--danger {
            color: #fff;
            background-color: $Danger!important;
            border-color: $Danger!important;
          }
        }
      }

      .el-aside {
        background-color: $White;
        margin-right: 10px;
        overflow: inherit;
        .aside-position {
          width: 100%;
          margin-top: 20px;
          /*padding: 20px 0;*/
          .aside-item {
            transition: color 0.2s ease-in-out;
            padding: 0 20px;
            height: 36px;
            margin-bottom: 2px;
            line-height: 36px;
            position: relative;
            cursor: pointer;
            font-size: 12px;
            .text {
              position: absolute;
              z-index: 66;
            }
            .bg {
              position: absolute;
              z-index: 65;
              width: 100%;
              height: 100%;
              top: 0;
              left: -220px;
              transition: left 0.2s ease;
              background-color: $Danger;

              .triangle {
                position: absolute;
                top: 0;
                right: -25px;
                width: 0;
                height: 0;
                border-width: 18px;
                border-left-width: 7.5px;
                border-style: solid;
                border-color: transparent transparent transparent $Danger;
              }
            }

            &:hover {
              color: $White;
              /*background: #8c939d;*/
              .bg {
                /*background-color: #f56c6c; */
                left: 0;
                .triangle {
                  /*display: inline;*/
                  /*border-color: transparent transparent transparent #f56c6c;*/
                }
              }

            }
            &.selected {
              color: $White;
              .bg {
                left: 0;
                .triangle {
                  /*display: inline;*/
                }
              }
            }// &.selected

          }
        }
      }

      .el-main {
        padding: 0;
        .view-list{
          .view-item {
            background-color: $White;
            margin-bottom: 10px;
            width: 100%;
            padding: 20px;
          }
        }
        /*滚动条样式 谷歌浏览器支持*/
        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: 5px;     /*高宽分别对应横竖滚动条的尺寸*/
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 5px;
          /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
          background: $Danger;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
          border-radius: 0;
          background: $White;
        }
      }
    }
  }


</style>
