<template>
  <div style="height: 100%">
    <el-card style="height: 100%;overflow: auto;">
      <div class="index-box center-group bg-white">
        <div class="notice-title">
          <i class="el-icon-fa-bell"> 提醒 ({{noticeList.length}})</i>
          <span title="刷新" @click="getList('0')" class="agency-css" style="float: right"> <i class="el-icon-refresh"></i> </span>
          <span title="发送消息" @click="agencyClick" class="agency-css" style="float: right"> <i class="el-icon-fa-paper-plane"></i> </span>
        </div>
        <div class="notice-body">
          <div class="message" :style="{ top: (index*40) + 'px',marginBottom: index+1 === noticeList.length?'100px':'0px'}" v-for="(notice,index) in noticeList">
            <div class="time">[ {{notice.createTime | subTime}} ]</div>
            <div class="msg" @click="evenNoticeListDialog(notice,'未办理')" :title="notice.message">{{index + 1}}.{{notice.message}}</div>
            <div class="operator">[ {{notice.initiator}} ]</div>
          </div>
          <div v-if="noticeList.length === 0 && !loading" style="width: 100%" align="center">
            <img style="margin-top: 50px"  src="../../../../static/img/ku_100.png"/>
          </div>
          <div v-if="loading" style="width: 100%" align="center">
            <img style="margin-top: 50px"  src="../../../../static/img/loading_16.gif"/>
          </div>
        </div>
      </div>
    </el-card>


    <el-dialog :modal="false" @close="agencyClose('agency')" title="发送消息" width="550px" :visible.sync="agencyOption">
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
      <div style="clear: both"></div>
    </el-dialog>

    <el-dialog :modal="false" title="消息" width="450px" :visible.sync="evenNoticeListOption">
      <div style="min-height: 150px">
        {{evenNotice.message}}
      </div>
      <el-button type="primary" @click="updateAgency"> 已完成 </el-button>
    </el-dialog>
  </div>
</template>

<script>
import { queryAgency, saveAgency, updateAgency } from '@/api/activiti/agency'
import { userList } from '@/api/upms/user'

export default {
  name: 'agency',
  data() {
    return {
      noticeList: [],
      userList: [],
      taskMsg: '我的待办',
      agencyOption: false,
      loading: false,
      btnLoading: false,
      evenNotice: {},
      evenNoticeListOption: false,
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
    this.getList('0')
    this.getUserList()
  },
  methods: {
    getList(state) {
      // 代办
      this.loading = true
      queryAgency({ type: '2', status: state }).then(response => {
        this.noticeList = response.data.data
        this.loading = false
      })
    },
    sendAgency(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          saveAgency(this.agency).then(() => {
            this.agencyOption = false
            this.btnLoading = false
            this.getList('0')
            this.$refs[formName].resetFields()
          })
        }
      })
    },
    updateAgency() {
      this.evenNotice.status = '1'
      updateAgency(this.evenNotice).then(() => {
        // 查询代办 、提醒
        this.getList('0')
        this.evenNoticeListOption = false
      })
    },
    evenNoticeListDialog(val) {
      this.evenNoticeListOption = true
      this.evenNotice = val
    },
    agencyClose(formName) {
      this.$refs[formName].resetFields()
    },
    agencyClick() {
      this.agencyOption = true
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
  .center-group{
    min-height: 500px;
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
</style>
