<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}" >

    <el-card :style="{height: ($store.state.app.client.height - 125) + 'px'}">
    <div  class="" v-for="log in list">
      <!--<dl>-->
        <!--<dt>-->
      <!--{{log.title}}-->
        <!--</dt>-->
        <!--<dd>-->
      <!--{{log.content}}</dd>-->
        <!--<dd>-->
          <!--<el-tag-->
            <!--type="info">-->
      <!--Version.{{log.version}}-->
          <!--</el-tag>-->
        <!--</dd>-->
      <!--</dl>-->
    </div>
      <div class="timeline-block" v-for="log in list">
        <div class="timeline-title-info">
          <div class="timeline-title">Ver.{{log.version}}</div><div class="timeline-time">{{log.title}}</div>
        </div>
        <div class="timeline-info">
          <div class="timeline-content">
            <br><br><p style="padding-right:10px;color:#646464;text-align:left">
            {{log.content}}
            <br>
            <br>
            <el-tag
              type="success">{{log.dateline|subTime('dateTime')}}
            </el-tag>
          </p>
          </div>
         </div>
      </div>


    </el-card>


  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { updatelist } from '@/api/upms/log'
  export default {
    name: 'updateinfo',
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
    },
    data() {
      return {
        list: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        updatelist().then(res => {
          this.list = res.data.data
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      searchClick() {
        this.listQuery.page = 1
        this.getList()
      }
    }
  }
</script>
<style scoped>
  /*内容总区域的长度，自行控制*/

  .timeline-block {

    width:90%;

    margin:0 auto;

  }

  /*title区域*/

  .timeline-title-info {

    display:-webkit-box;

    display:-moz-box;
  }

  /*公告文字*/

  .timeline-title {

    color:#F67236;

    margin-right:16px;

  }

  /*日期*/

  .timeline-time {

    -webkit-box-flex:1;

    box-flex:1;

  }

  /*内容区域*/

  .timeline-info {

    width:100%;

  }

  /*内容文字*/

  .timeline-content {
    border-left:1px solid #FBC0A6;
    margin-left:10px;
    padding-left:34px;
    margin-top:10px;
    margin-bottom:8px;
    color:#646464;
    font-size:12px;
    position:relative;
    min-height:66px;
    text-indent:20px;
  }
  .timeline-content span{
    text-indent: 0px;
  }

  .timeline-content::before {
    content:'';
    display:block;
    position:absolute;
    left:-3px;
    top:-3px;
    width:5px;
    height:5px;
    border-radius:50%;
    background:#F6763D;
  }

  .timeline-content::after {
    content:'';
    display:block;
    position:absolute;
    left:-3px;

    bottom:0px;

    width:5px;

    height:5px;

    border-radius:50%;

    background:#F6763D;

  }
</style>
