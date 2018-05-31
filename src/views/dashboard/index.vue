<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div>
      <el-row class="panel-group" :gutter="20">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="index-box top-group bg-warning">
            <el-col :xs="0" :sm="6" :lg="6" style="line-height: 118px;text-align: center">
                <i class="el-icon-fa-tree"></i>
            </el-col>
            <el-col :xs="24" :sm="18" :lg="18" class="right" style="text-align: center">
              <div style="text-align: left;padding: 0 25px;">
                <el-row><el-col class="number">{{intentionCount.depIntention}}</el-col></el-row>
                <el-row ><el-col class="text">部门意向客户</el-col></el-row>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="index-box top-group bg-success">
            <el-col :xs="0" :sm="6" :lg="6" style="line-height: 118px;text-align: center">
              <i class="el-icon-fa-file-text"></i>
            </el-col>
            <el-col :xs="24" :sm="18" :lg="18" class="right" style="text-align: center">
              <div style="text-align: left;padding: 0 25px;">
                <el-row><el-col class="number">{{intentionCount.depStudent}}</el-col></el-row>
                <el-row ><el-col class="text">部门签约客户</el-col></el-row>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="index-box top-group bg-danger">
            <el-col :xs="0" :sm="6" :lg="6" style="line-height: 118px;text-align: center">
              <i class="el-icon-fa-user"></i>
            </el-col>
            <el-col :xs="24" :sm="18" :lg="18" class="right" style="text-align: center">
              <div style="text-align: left;padding: 0 25px;">
                <el-row><el-col class="number">{{intentionCount.myIntention}}</el-col></el-row>
                <el-row ><el-col class="text">个人意向客户</el-col></el-row>
              </div>
            </el-col>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="index-box top-group bg-blue">
            <el-col :xs="0" :sm="6" :lg="6" style="line-height: 118px;text-align: center">
              <i class="el-icon-fa-edit"></i>
            </el-col>
            <el-col :xs="24" :sm="18" :lg="18" class="right" style="text-align: center">
              <div style="text-align: left;padding: 0 25px;">
                <el-row><el-col class="number">{{intentionCount.myStudent}}</el-col></el-row>
                <el-row ><el-col class="text">个人签约客户</el-col></el-row>
              </div>
            </el-col>
          </div>
        </el-col>
      </el-row>
      <el-row class="panel-group" :gutter="20">
      <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col">
        <div class="index-box center-group bg-white">
          <div class="notice-title">
              <i class="el-icon-fa-volume-up"> 我的待办 ({{evenNoticeList('1').length}})</i>
          </div>
          <div class="notice-body">
            <div class="message" :style="{ top: (index*25) + 'px'}" v-for="(notice,index) in evenNoticeList('1')">
              <div class="time">[ {{notice.createTime | subTime}} ]</div>
              <div class="msg" @click="evenNoticeListDialog(notice,'未办理')" :title="notice.message">{{index + 1}}.{{notice.message}}</div>
              <div class="operator">[ {{notice.initiator}} ]</div>
            </div>
          </div>
        </div>
      </el-col>

      <el-dialog :title="evenNotice.flag" width="450px" :visible.sync="evenNoticeListOption">
        <div style="min-height: 150px">
          {{evenNotice.message}}
        </div>
        <div v-show="evenNotice.flag === '通知'" slot="footer">
          <el-button type="primary" @click="updateAgency"> 已 办</el-button>
        </div>
      </el-dialog>

      <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col">
        <div class="index-box center-group bg-white">
          <div class="notice-title">
            <i class="el-icon-fa-bell"> 提醒 ({{evenNoticeList('2').length}})</i>
            <span title="发送消息" @click="agencyClick" class="agency-css"> <i class="el-icon-fa-paper-plane"></i> </span>
          </div>
          <div class="notice-body">
            <div class="message" :style="{ top: (index*25) + 'px'}" v-for="(notice,index) in evenNoticeList('2')">
              <div class="time">[ {{notice.createTime | subTime}} ]</div>
              <div class="msg"  @click="evenNoticeListDialog(notice,'通知')" :title="notice.message">{{index + 1}}.{{notice.message}}</div>
              <div class="operator">[ {{notice.initiator}} ]</div>
            </div>
          </div>
        </div>
      </el-col>

      <!-- 发送消息 -->
      <el-dialog @close="agencyClose('agency')" title="发送消息" width="550px" :visible.sync="agencyOption">
        <el-form :model="agency" :rules="agencyRules" ref="agency" label-position="left">

          <el-form-item prop="message">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="agency.message" placeholder="发送内容"></el-input>
          </el-form-item>

          <el-form-item prop="recipientId">
            <el-select v-model="agency.recipientId" collapse-tags style="width: 100%" filterable placeholder="请选择接收人">
              <el-option v-for="user in userList" :key="user.userId" :label="user.name" :value="user.userId">
              </el-option>
            </el-select>
          </el-form-item>

        </el-form>

        <div style="width: 100%">
          <el-button style="float: right" type="primary" :loading="btnLoading" @click="sendAgency('agency')"> 发 送</el-button>
        </div>
        <!-- 清除上一个浮动效果影响 -->
        <div style="width: 100%; height: 1px;clear: both">
        </div>
      </el-dialog>



      <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col">
        <div class="index-box center-group bg-white">
          <div class="notice-title">
            <i class="el-icon-fa-pie-chart"> 本月意向转换率</i>
          </div>
          <div class="chart-body">
            <pie-chart :data="pieData"></pie-chart>
          </div>
        </div>
      </el-col>
    </el-row>
      <el-row class="panel-group" :gutter="20">
        <el-col :xs="24" :sm="24" :lg="16" class="card-panel-col">
          <div class="index-box foot-group bg-white">
            <div class="chart-title">
              <i class="el-icon-fa-bar-chart"> 本年意向展示</i>
            </div>
            <div class="chart-body">
              <bar-pile-chart :data="yuarData" ></bar-pile-chart>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8" class="card-panel-col">
          <div class="index-box foot-group bg-white">
            <div class="chart-title">
              <i class="el-icon-fa-line-chart"> 本周意向展示</i>
            </div>
            <div class="chart-body">
              <bar-pile-chart :data="weekData" ></bar-pile-chart>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/PieChart'
import BarPileChart from '@/components/BarPileChart'
import { queryIndex } from '@/api/visualization/api'
import { userList } from '@/api/upms/user'
import { queryAgency, updateAgency, saveAgency } from '@/api/activiti/agency'
import Coach from '@/components/Coach'

export default {
  name: 'dashboard',
  components: {
    BarPileChart,
    Coach,
    PieChart
  },
  data() {
    return {
      noticeList: [],
      // 部门 个人（签约，意向）总数
      intentionCount: {
        myStudent: 0,
        myIntention: 0,
        depStudent: 0,
        depIntention: 0
      },
      // 本月转换率
      pieData: {
        legend: [],
        value: []
      },
      userList: [],
      // 本周意向展示
      weekData: {
        colors: [],
        xAxis: [],
        seriesList: []
      },
      // 本年意向展示
      yuarData: {
        colors: [],
        xAxis: [],
        seriesList: []
      },
      evenNoticeListOption: false,
      evenNotice: {
        flag: ''
      },
      agencyOption: false,
      btnLoading: false,
      agency: {
        message: null,
        recipientId: null
      },
      agencyRules: {
        message: [
          { required: true, message: '请填写发送内容', trigger: ['blur', 'change'] }
        ],
        recipientId: [
          { required: true, message: '请选择接收人', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  created() {
    this.getList()
    this.getUserList()
  },
  methods: {
    evenNoticeList(type) {
      return this.noticeList.filter(function(notice) {
        return notice.type === type
      })
    },
    getList() {
      queryIndex().then(response => {
        var data = response.data
        this.weekData = {
          colors: ['#e6a23c'],
          xAxis: ['日', '一', '二', '三', '四', '五', '六'],
          seriesList: data.week
        }
        this.pieData = {
          legend: ['跟进中', '已入学', '已关闭'],
          value: data.contractRate
        }
        this.yuarData = {
          xAxis: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          seriesList: data.year
        }
        this.intentionCount = data.intentionCount
      })
      // 查询代办 、提醒
      this.getAgency()
    },
    getAgency() {
      queryAgency().then(response => {
        this.noticeList = response.data.data
      })
    },
    evenNoticeListDialog(val, str) {
      this.evenNoticeListOption = true
      this.evenNotice = val
      this.evenNotice.flag = str
    },
    updateAgency() {
      this.evenNotice.status = '1'
      updateAgency(this.evenNotice).then(() => {
        // 查询代办 、提醒
        this.getAgency()
        this.evenNoticeListOption = false
      })
    },
    agencyClick() {
      this.agencyOption = true
    },
    agencyClose(formName) {
      this.$refs[formName].resetFields()
    },
    sendAgency(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          saveAgency(this.agency).then(() => {
            this.agencyOption = false
            this.btnLoading = false
            this.$refs[formName].resetFields()
          })
        }
      })
    },
    /* 获取接收人列表 */
    getUserList() {
      userList().then(response => {
        this.userList = response.data.data
      })
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .panel-group {
    /*margin-top: 18px;*/
    .card-panel-col{
      margin-bottom: 10px;
    }
    .index-box{
      border-radius:5px ;
      /*-webkit-box-shadow: 5px 5px 10px #888;
      box-shadow: 5px 5px 10px #888;*/
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
      height: 108px;
      i{
        color: #fff;
        font-size:40px !important;
        width: 60px;
        height: 60px;
        border: 2px solid darkgray;
        background-color: darkgray;
        border-radius: 50%;
        text-align: center;
        padding-top: 8px;
      }
      .text{
        overflow: hidden;
        word-break:keep-all;/* 不换行 */
        white-space:nowrap;/* 不换行 */
        padding: 10px 0;
      }
      .right{
        color: #fff;
        font-size: 16px;
        padding: 30px 0;
        .number{
          font-size: 18px;
          font-weight: 600;
          word-break:keep-all;/* 不换行 */
          white-space:nowrap;/* 不换行 */
        }
      }
    }
    .center-group{
      height: 300px;
      .notice-title{
        color: #409eff;
        padding: 10px;
        i{
          font-size:16px !important;
          padding-right: 10px;
        }
      }
      .chart-body{
        height: 264px;
        width: 100%;
        border-radius: 5px;
      }
      .notice-body{
        padding: 10px 0;
        font-size: 14px;
        overflow: auto;
        height: 80%;
        position: relative;
        .message:hover{
          cursor: pointer;
          .msg{
            color: #409eff;
            text-decoration:underline;
          }
        }
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
    .foot-group{
      height: 300px;
      .chart-title{
        i{
          font-size:16px !important;
          color: #409eff;
          padding: 10px;
        }
      }
      .chart-body{
        height: 264px;
        width: 100%;
        border-radius: 5px;
      }
    }
    .agency-css{
      color: #afb8c1;
      float: right;
      cursor: pointer;
    }
    .agency-css:hover{
      color: #409eff;
    }
  }
</style>
