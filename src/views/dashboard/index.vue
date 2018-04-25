<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div>
      <el-row class="panel-group" :gutter="20">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="index-box top-group bg-warning">
            <div class="left">
              <i class="el-icon-fa-user"></i>
            </div>
            <div class="right">
              <div class="number">500</div>
              <div>个人意向</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="index-box top-group bg-success">
            <div class="left">
              <i class="el-icon-fa-user"></i>
            </div>
            <div class="right">
              <div class="number">500</div>
              <div>个人意向</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="index-box top-group bg-danger">
            <div class="left">
              <i class="el-icon-fa-user"></i>
            </div>
            <div class="right">
              <div class="number">500</div>
              <div>个人意向</div>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="index-box top-group bg-blue">
            <div class="left">
              <i class="el-icon-fa-user"></i>
            </div>
            <div class="right">
              <div class="number">500</div>
              <div>个人意向</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="panel-group" :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col">
        <div class="index-box center-group bg-white">
          <div class="notice-title">
            <i class="el-icon-fa-bell"> 我的代办</i>
          </div>
          <div class="notice-body">
            <div class="message" :style="{ top: (index*25) + 'px'}" v-for="(notice,index) in evenNoticeList('1')">
              <div class="time">[ {{notice.createTime | subTime}} ]</div>
              <div class="msg">{{index + 1}}.{{notice.message}}</div>
              <div class="operator">[ {{notice.initiator}} ]</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col">
        <div class="index-box center-group bg-white">
          <div class="notice-title">
            <i class="el-icon-fa-bell"> 提醒</i>
          </div>
          <div class="notice-body">
            <div class="message" :style="{ top: (index*25) + 'px'}" v-for="(notice,index) in evenNoticeList('2')">
              <div class="time">[ {{notice.createTime | subTime}} ]</div>
              <div class="msg">{{index + 1}}.{{notice.message}}</div>
              <div class="operator">[ {{notice.initiator}} ]</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col">
        <div class="index-box center-group bg-white">
          <pie-chart></pie-chart>
        </div>
      </el-col>
    </el-row>
      <el-row class="panel-group" :gutter="20">
        <el-col :xs="24" :sm="24" :lg="16" class="card-panel-col">
          <div class="index-box center-group bg-white">
            <bar-tick-align :data="month"></bar-tick-align>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col">
          <div class="index-box center-group bg-white">
            <bar-tick-align :data="week"></bar-tick-align>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import BarTickAlign from '@/components/BarTickAlign'
import PieChart from '@/components/PieChart'
import { busPage } from '@/api/activiti/agency'

export default {
  name: 'dashboard',
  components: {
    BarTickAlign,
    PieChart
  },
  data() {
    return {
      noticeList: [],
      week: {
        mon: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        pos: [1, 2, 3, 4, 5, 7, 9]
      },
      month: {
        mon: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        pos: [1, 2, 3, 4, 5, 7, 9, 9, 9, 9, 9, 9]
      },
      listQuery: {
        page: 1,
        limit: 0
      }
    }
  },
  created() {
    this.getList()
  },
  computed: {
  },
  methods: {
    evenNoticeList(type) {
      return this.noticeList.filter(function(notice) {
        return notice.type === type
      })
    },
    getList() {
      busPage(this.listQuery).then(response => {
        this.noticeList = response.data.data.list
        console.log(response)
      })
    }
  }
}

// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' },
// { time: new Date(), msg: '阿水电费水电费水电费奥术大师多撒多撒多撒多水电费水电费水电费', operator: '张大炮' }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    margin-top: 18px;
    .card-panel-col{
      margin-bottom: 10px;
    }
    .index-box{
      border-radius:5px ;
      /*-webkit-box-shadow: 5px 5px 10px #888;
      box-shadow: 5px 5px 10px #888;*/
    }
    .index-box.top-group{
      height: 108px;
    }
    .index-box.center-group{
      height: 300px;
    }
    .top-group:hover{
      /*cursor: pointer;*/
      i{
        -webkit-box-shadow: 0px 0px 8px 0px #fff;
        box-shadow: 0px 0px 8px 0px #fff;
        border: 2px solid #fff;
      }
    }
    .top-group{
      i{
        color: #fff;
        font: normal normal normal 40px/1 FontAwesome !important;
        width: 60px;
        height: 60px;
        border: 2px solid darkgray;
        background-color: darkgray;
        border-radius: 50%;
        text-align: center;
        padding-top: 8px;
      }
      .left{
        float: left;
        padding: 24px;
      }
      .right{
        color: #fff;
        font-size: 16px;
        float: left;
        padding: 30px 0;
        .number{
          font-size: 18px;
          padding-bottom: 8px;
          font-weight: 600;
        }
      }
    }

    .center-group{
      .notice-title{
        i{
          font: normal normal normal 20px/1 FontAwesome !important;
          color: #409eff;
          padding: 10px;
        }
      }
      .notice-body{
        padding: 10px 0;
        font-size: 14px;
        overflow: auto;
        height: 80%;
        position: relative;
        .message{
          position: absolute;
          width: 100%;
          .time{
            position: absolute;
            left: 15px;
            width: 100px;
            color: #e6a23c;
          }
          .msg{
            position: absolute;
            padding: 0px 95px 0 108px;
            width: 100%;
            height: 16px;
            overflow: hidden;
            word-break:keep-all;/* 不换行 */
            white-space:nowrap;/* 不换行 */
            text-overflow : ellipsis
          }
          .operator{
            color: #e6a23c;
            position: absolute;
            right: 15px;
          }
        }
      }
    }
  }
</style>
