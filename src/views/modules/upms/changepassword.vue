<template>
  <div class="student">
    <el-card :modal="false"  title="修改密码" width="100px" :visible.sync="showdialog">

      <el-form label-width="80px" >
        <el-row :gutter="20">
          <el-col :span="24" >
            <el-form-item>
              <span slot="label" class="text_css">原密码</span>
              <el-input class="filter-item" v-model="user.oldpassword" placeholder="原密码" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" >
            <el-form-item>
              <span slot="label" class="text_css">新密码</span>
              <el-input class="filter-item" v-model="user.newpassword1" placeholder="新密码" ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div class="dialog-footer">
        <!--<el-button plain>取消</el-button>-->
        <el-button type="primary" @click="changepassword">修改</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
  import { editInfo } from '@/api/upms/user'

  import { mapGetters } from 'vuex'

  export default {

    data() {
     return {
       user:{},
       showdialog:true,
       passdata:{}
     }
    },
    created() {

    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ]),
      headers() {
        return {
          'Authorization': 'Bearer ' + getToken()
        }
      }
    },
    methods: {
      changepassword(){
        editInfo(this.$data.user).then((res) => {
                 console.log(res)
          // this.$notify({
          //   title: '成功',
          //   message: '保存成功',
          //   type: 'success',
          //   duration: 2000
          // })
                })
  }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  /*.student{*/
    /*.img{*/
      /*width: 50px;*/
      /*height: 50px;*/
      /*padding: 0;*/
      /*border-radius: 150px;*/
      /*overflow: hidden;*/
    /*}*/
    /*.clearfix:before,*/
    /*.clearfix:after {*/
      /*display: table;*/
      /*content: "";*/
    /*}*/
    /*.clearfix:after {*/
      /*clear: both*/
    /*}*/
    /*.title{*/
      /*height: 40px;*/
      /*line-height: 40px;*/
      /*color:#495060;*/
      /*background-color: #f5f7fa;*/
      /*text-align: center;*/
      /*font-size: 16px;*/
      /*margin-bottom: 10px;*/
    /*}*/
    /*.text_css{*/
      /*color:#495060;*/
      /*font-size: 12px;*/
      /*word-break:keep-all;!* 不换行 *!*/
      /*white-space:nowrap;!* 不换行 *!*/
      /*overflow:hidden;!* 内容超出宽度时隐藏超出部分的内容 *!*/
      /*text-overflow:ellipsis;!* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*!*/
    /*}*/
    /*.table_text{*/
      /*color: #7c7c7c;font-size: 12px;*/
      /*text-align: left;*/
      /*word-break:keep-all;!* 不换行 *!*/
      /*white-space:nowrap;!* 不换行 *!*/
      /*overflow:hidden;!* 内容超出宽度时隐藏超出部分的内容 *!*/
      /*text-overflow:ellipsis;!* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*!*/
    /*}*/
    /*.avatar-uploader .el-upload {*/
      /*border: 1px dashed #d9d9d9;*/
      /*border-radius: 6px;*/
      /*cursor: pointer;*/
      /*position: relative;*/
      /*overflow: hidden;*/
    /*}*/
    /*.avatar-uploader .el-upload:hover {*/
      /*border-color: #409EFF;*/
    /*}*/
    /*.avatar-uploader-icon {*/
      /*font-size: 28px;*/
      /*color: #8c939d;*/
      /*width: 140px;*/
      /*height: 180px;*/
      /*line-height: 180px;*/
      /*text-align: center;*/
    /*}*/
    /*.avatar {*/
      /*width: 140px;*/
      /*height: 180px;*/
      /*display: block;*/
    /*}*/
    /*.avatar_img {*/
      /*line-height: 180px;*/
      /*position: relative;*/
      /*margin: auto;*/
      /*border: 1px dashed #d9d9d9;*/
      /*border-radius: 6px;*/
      /*width: 140px;*/
      /*height: 180px;*/
      /*display: block;*/
    /*}*/
    /*.AddAvatar-uploader .el-upload {*/
      /*border: 1px dashed #d9d9d9;*/
      /*border-radius: 6px;*/
      /*cursor: pointer;*/
      /*position: relative;*/
      /*overflow: hidden;*/
    /*}*/
    /*.AddAvatar-uploader .el-upload:hover {*/
      /*border-color: #409EFF;*/
    /*}*/
    /*.AddAvatar-uploader-icon {*/
      /*font-size: 28px;*/
      /*color: #8c939d;*/
      /*width: 100px;*/
      /*height: 130px;*/
      /*line-height: 130px;*/
      /*text-align: center;*/
    /*}*/
    /*.AddAvatar {*/
      /*width: 100px;*/
      /*height: 130px;*/
      /*display: block;*/
    /*}*/
    /*.batchCss{*/
      /*background-color: rgba(64,158,255,.1);*/
      /*display: inline-block;*/
      /*padding: 0 10px;*/
      /*height: 32px;*/
      /*line-height: 30px;*/
      /*font-size: 12px;*/
      /*color: #409eff;*/
      /*border-radius: 4px;*/
      /*box-sizing: border-box;*/
      /*border: 1px solid rgba(64,158,255,.2);*/
      /*white-space: nowrap;*/
      /*cursor: pointer;*/
    /*}*/
    /*.batchCss_selected{*/
      /*background-color: rgba(103,194,58,.1);*/
      /*border-color: rgba(103,194,58,.2);*/
      /*color: #67c23a;*/
    /*}*/
    /*.batchCss:hover{*/
      /*background-color: rgba(103,194,58,.1);*/
      /*border-color: rgba(103,194,58,.2);*/
      /*color: #67c23a;*/
    /*}*/
    /*.carClassCss{*/
      /*background-color: rgba(64,158,255,.1);*/
      /*display: inline-block;*/
      /*padding: 0 10px;*/
      /*height: 32px;*/
      /*line-height: 30px;*/
      /*font-size: 12px;*/
      /*color: #409eff;*/
      /*border-radius: 4px;*/
      /*box-sizing: border-box;*/
      /*border: 1px solid rgba(64,158,255,.2);*/
      /*white-space: nowrap;*/
      /*cursor: pointer;*/
    /*}*/
    /*.carClassCss_selected{*/
      /*background-color: rgba(103,194,58,.1);*/
      /*border-color: rgba(103,194,58,.2);*/
      /*color: #67c23a;*/
    /*}*/
    /*.carClassCss:hover{*/
      /*background-color: rgba(103,194,58,.1);*/
      /*border-color: rgba(103,194,58,.2);*/
      /*color: #67c23a;*/
    /*}*/
  /*}*/

</style>
