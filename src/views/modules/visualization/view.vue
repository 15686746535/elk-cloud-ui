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
                <view-enrolment  :params="listQuery" ></view-enrolment>
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
  import ViewEnrolment from '@/views/modules/visualization/view-enrolment.vue'
  import ViewAaa from '@/views/modules/visualization/view-aaa.vue'
  export default {
    name: 'view',
    components: {
      ViewEnrolment,
      ViewAaa,
    },
    props: {
      layerid: String,
      area: Array
    },
    watch: {
      area: function(val) {
        console.log(val)
        this.pageHeight = val[1]
        this.listQuery.winWidth = val[0] - 300
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
          { icon: 'visit', name: '意向总览', ename:'General survey of intentions' },
          { icon: 'achievement', name: '招生总览', ename:'Enrollment overview' },
          { icon: 'train', name: '培训总览', ename:'Training overview' },
          { icon: 'finance', name: '财务总览', ename:'Financial overview' }
        ],
        list:[
          { name:'招生人数', to: 'view-enrolment', height: '460px' },
          { name:'人均产值', to: 'view-aaa0', height: '460px' },
          { name:'招生完成率', to: 'view-aaa1', height: '460px' },
          { name:'招生增长率', to: 'view-aaa2', height: '460px' },
          { name:'招生人数占有率', to: 'view-aaa3', height: '460px' },
        ],
        selected:0,
        to:0,
        campusList:[
          { name:"壹路校区", id: 1 },
          { name:"华通校区", id: 2 }
        ],
        listQuery: {
          campus: null,
          year: null,
          winWidth:this.area[0] - 300
        }
      }
    },
    created() {
    },
    mounted() {
      var view = this.$refs.view.$el;
      view.addEventListener('scroll', () => {
        var current_offset_top = view.scrollTop;
        // 暂定方案
        this.to = parseInt(current_offset_top/460);
      })
    },
    methods: {
      categoryChange(i) {
        this.selected = i;
      },
      GoTo(i) {
        this.to = i;
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
  #view {
    background: #eee;
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
          padding: 20px 0;
          .aside-item {
            transition: color 0.5s ease-in-out;
            padding: 0 20px;
            height: 45px;
            margin-bottom: 2px;
            line-height: 45px;
            position: relative;
            cursor: pointer;
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
              transition: left 0.5s ease;
              background-color: $Danger;

              .triangle {
                position: absolute;
                top: 0;
                right: -31px;
                /*display: none;*/
                width: 0;
                height: 0;
                border-width: 22.5px;
                border-left-width: 8.5px;
                border-style: solid;
                border-color: transparent transparent transparent $Danger;
              }
            }

            &:hover {
              color: $White;
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
