<template>
  <div class="rtarded">
    <div class="msg-spirit">
      {{massages[index]}}
    </div>
    <a href="http://faqrobot.hz.taeapp.com/robot/ding_pc.html?corpid=ding6edc173cf7bee74835c2f4657eb6378f" target="_blank">
      <img class="faqrobot" src="../../../static/img/robot.png"/>
    </a>
    <img class="faqrobot" src="../../../static/img/robot.png" style="display: none" @click="show = 'show'"/>
    <div class="msg-box" :class="show" :style="{height: client.height-45+'px' }">
      <div class="title">智能机器人
        <i class="icon-tool-remove" @click="show = ''"></i>
      </div>
      <div :style="{height: client.height-85+'px' }">
        <iframe ref="iframe" width="100%" height="100%" runat="server" src="http://faqrobot.hz.taeapp.com/robot/ding_pc.html?corpid=ding6edc173cf7bee74835c2f4657eb6378f" frameborder="0"
                style="border:0;"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'rtarded',
  components: {
  },
  data() {
    return {
      massages: [
        '有什么不懂的可以问我哦！',
        '有什么不懂的可以问我哦！',
        '加油哦！',
        '可以和我聊聊天哦！',
        '工作使我快乐！',
        '我要拿销冠！',
        '沉迷工作无法自拔！',
        '一起生，一起死，一起奋斗一辈子！'],
      index: 0,
      show: ''
    }
  },
  watch: {
  },
  computed: {
    ...mapGetters([
      'client'
    ])
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      var that = this
      var max = this.massages.length
      setInterval(function() {
        that.index = parseInt(Math.random() * max)
      }, 2000) // 600000 10分钟
    },
    // 打开应用
    layerOpen() {
      this.$emit('open', this.info)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.rtarded{
  position: fixed;
  z-index: 66;
  bottom: 205px;
  right: 40px;
  .faqrobot{
    width: 49px;
  }
  .faqrobot:hover{
    cursor: pointer;
  }
  .msg-spirit{
    background-image: url('../../../static/img/msgbox.png');
    position: fixed;
    background-size: 100% 100%;
    min-height: 55px;
    bottom: 260px;
    padding: 6px 2px 23px 12px;
    right: 23px;
    width: 100px;
    font-size: 12px;
    color: #2196F3;
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
  .title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #84929e;
    color: #fff;
    padding-left: 15px;
    font-weight: 600;
  }
  .msg-box{
    position: fixed;
    /*right: 360px;*/
    right: 0;
    top: 0;
    height: 90%;
    background-color: #fff;//#1c2f4087;
    width: 360px;
    z-index: 1999;
    border-left: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    border-radius: 0 0 0 5px;
    transition: all 0.5s ease;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
    -webkit-box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);

  }
  .msg-box.show{
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}

</style>
