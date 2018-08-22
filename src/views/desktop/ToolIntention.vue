<template>
  <div class="" id="vl-tool-right" :style="{height: client.height-45+'px' }">
    <div class="title">{{intention.name}}
      <i class="icon-tool-remove" @click="close"></i>
    </div>
    <div id="vl-tool-content" :style="{height: client.height-186+'px' }">
      <div class="content-itrm" style="" v-for="up in followUpList">
        <el-tag>
          <img :src="up.avatar?up.avatar:'../../static/img/usreicon_40.png'">
        </el-tag>
        <div class="username">{{up.name}}</div>
        <div class="time">{{up.createTime | formatTime('{y}-{m}-{d} {h}:{i}')}}</div>
        <div class="content" style="">
          <p>{{up.content}}</p>
        </div>
      </div>
    </div>
    <div id="vl-tool-footer" ><!--@keyup.enter.native="addFollowUp"   v-model="followUp.content"   @click="addFollowUp"  :loading="btnLoading"-->
      <div class="in-content">
        <el-date-picker v-model="followUp.nextTime" type="date" placeholder="下次跟进时间" format="yyyy-MM-dd" value-format="yyyy-MM-dd" style="width: 100%">
        </el-date-picker>
        <el-input type="textarea" @keyup.enter.native="addFollowUp" v-model="followUp.content" :autosize="{ minRows: 2, maxRows: 2}" placeholder="跟进内容"></el-input>
      </div>
      <div  class="in-btn">
        <el-button style="width: 100%;height: 96px;"  @click="addFollowUp"  :loading="btnLoading"  type="primary" >跟进</el-button>
      </div>
    </div>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { removeAllSpace } from '@/utils/validate'
import { followUpList, addFollowUp } from '@/api/visit/followup'
import intention from '@/views/modules/visit/intention.vue'

export default {
  name: 'tool-intention',
  data() {
    return {
      btnLoading: false,
      app: { id: 30200, params: { display: 'list' }, name: '意向信息', content: intention, icon: '../../../static/icon/app/app_visit_intention.png' },
      followUpList: [],
      followUp: {}
    }
  },
  watch: {
    'intention.intentionId': function(intentionId) {
      this.getFollowUp(intentionId)
    }
  },
  computed: {
    ...mapGetters([
      'intention',
      'client'
    ])
  },
  created() {
  },
  methods: {
    close() {
      document.getElementById('vl-tool-right').classList.remove('show')
    },
    getFollowUp(id) {
      followUpList({ intentionId: id }).then(response => {
        this.followUpList = response.data.data
      })
    },
    addFollowUp() {
      this.followUp.content = removeAllSpace(this.followUp.content)
      this.followUp.intentionId = this.intention.intentionId
      if (this.followUp.content) {
        this.btnLoading = true
        addFollowUp(this.followUp).then(() => {
          if (this.followUp.nextTime) {
            var follow = {
              nextTime: null,
              content: '下次跟进时间' + this.followUp.nextTime,
              intentionId: this.followUp.intentionId
            }
            addFollowUp(follow).then(() => {
              this.getFollowUp(this.followQuery)
              this.btnLoading = false
              this.followUp.content = null
              this.followUp.nextTime = null
            })
          } else {
            this.getFollowUp(this.intention.intentionId)
            this.btnLoading = false
            this.followUp.content = null
            this.followUp.nextTime = null
          }
          this.$emit('open', this.app)
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/*悬浮工作台*/
#vl-tool-right{
  position: fixed;
  right: 0;
  top: 0;
  background-color: #fff;//#1c2f4087;
  width: 360px;
  z-index: 2000;
  border-left: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  border-radius: 0 0 0 5px;
  transition: all 0.5s ease;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
  -webkit-box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);

  .title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #84929e;
    color: #fff;
    padding-left: 15px;
    font-weight: 600;
  }

  #vl-tool-content{
    padding: 35px 10px 20px 35px;
    overflow: auto;

    .content-itrm{
      border-left: 2px solid #1E9FFF;
      min-height: 100px;
      padding-bottom: 25px;

      .el-tag{
        float: left;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        margin-left: -19px;
        margin-top: -12px;
        padding: 0px;
        overflow: hidden;
        background: #1E9FFF;

        img{
          width: 33px;
          height: 33px;
          border-radius: 50%;
        }
      }
      .username{
        float: left;
        color: rgb(73, 80, 96);
        font-size: 12px;
        margin-left: 10px;
        font-weight: 600;
        width: 80px;
      }
      .time{
        float: left;
        color: #FF6C60;
        font-size: 12px;
      }
      .content{
        clear: both;
        white-space:normal;
        width: 100%;
        padding: 0 10px 0 40px;
        p{
          font-size: 12px;
          border-radius: 10px;
          white-space:normal;
          color: #606266;
          line-height: 20px;
        }
      }
    }
  }
  #vl-tool-footer{
    height: 96px;
    position: absolute;
    bottom: 0;
    width: 360px;

    .in-content{
      width: 295px;
      position: absolute;
      left: 0;
    }
    .in-btn{
      width: 60px;
      position: absolute;
      right: 3px;
    }
  }

  .icon-tool-remove {
    position: absolute;
    right: 0;
    font-size: 14px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
    top: 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: normal;
    cursor: pointer;
    color: #fff;
    font-style: normal;
    &::before {
      content: "\2716";
    }
  }
  .icon-tool-remove:hover{
    background-color: #87a5bd;
    border-radius: 0 0 0 2px;
  }
}
#vl-tool-right.show{
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}
</style>
