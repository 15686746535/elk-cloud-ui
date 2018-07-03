<template>
  <el-card style="height: 100%;overflow: auto;">
    <div class="index-box center-group bg-white">
      <div class="notice-title">
        <i class="el-icon-fa-volume-up"> {{taskMsg}}({{agencyList.length}})</i>
        <el-dropdown class="agency-css" @command="command">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :command="{msg:'我的待办',state:'0'}">我的待办</el-dropdown-item>
            <el-dropdown-item :command="{msg:'我的已办',state:'1'}">我的已办</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--<span title="发送消息" @click="agencyClick" class="agency-css"> <i class="el-icon-caret-bottom"></i> </span>-->
      </div>
      <div class="notice-body">
        <div class="message" :style="{ top: (index*40) + 'px',marginBottom: index+1 === agencyList.length?'100px':'0px'}" v-for="(notice,index) in agencyList">
          <div class="time">[ {{notice.createTime | subTime}} ]</div>
          <div class="msg" :title="notice.message">{{index + 1}}.{{notice.message}}</div>
          <div class="operator">[ {{notice.initiator}} ]</div>
        </div>
        <div v-if="agencyList.length === 0 && !loading" style="width: 100%" align="center">
          <img style="margin-top: 50px"  src="../../../../static/img/ku_100.png"/>
        </div>
        <div v-if="loading" style="width: 100%" align="center">
          <img style="margin-top: 50px"  src="../../../../static/img/loading_16.gif"/>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { queryAgency } from '@/api/activiti/agency'

export default {
  name: 'agency',
  data() {
    return {
      agencyList: [],
      taskMsg: '我的待办',
      loading: false
    }
  },
  created() {
    this.getAgency('0')
  },
  methods: {
    getAgency(state) {
      // 代办
      this.loading = true
      queryAgency({ type: '1', status: state }).then(response => {
        this.agencyList = response.data.data
        this.loading = false
      })
    },
    command(tab) {
      this.agencyList = []
      this.taskMsg = tab.msg
      this.getAgency(tab.state)
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
