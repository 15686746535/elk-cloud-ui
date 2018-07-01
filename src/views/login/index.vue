<template>
  <div class="login-container">
    <el-container>
      <!--s-->
      <el-container>
        <el-container>
          <el-main>
            <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
                     class="card-box login-form">
              <h3 class="title">系统登录</h3>
              <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
              </el-form-item>
              <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                          placeholder="密码"></el-input>
                <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
              </el-form-item>

              <input name="randomStr" type="hidden" v-model="loginForm.randomStr" />
              <!--<el-form-item>-->
              <!--<el-col :span="2">-->
              <!--<span class="svg-container">-->
              <!--&lt;!&ndash;<icon-svg icon-class="form"/>&ndash;&gt;-->
              <!--</span>-->
              <!--</el-col>-->
              <!--<el-col :span="11">-->
              <!--<el-input name="code" type="text" v-model="loginForm.code" autoComplete="on" placeholder="验证码"/>-->
              <!--</el-col>-->
              <!--<el-col :span="10" style="height: 52px;">-->
              <!--<img :src="src" style="margin-top: 2px;border-radius: 3px;" @click="refreshCode"/>-->
              <!--</el-col>-->
              <!--</el-form-item>-->

              <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                  登陆
                </el-button>
              </el-form-item>
            </el-form>
          </el-main>
          <el-footer style="position: fixed; bottom: 0; width: 100%; text-align: center;font-size: 12px;color: #fff;">
            驾校管理系统 v3.1.1<br>&copy;2018 eluchn.com All Rights Reserved.
            <a href="http://www.miitbeian.gov.cn/" target="_blank" rel="nofollow" style="text-decoration: underline;color: #fff;">渝ICP备17017040号-1<i class="c-icon-jgwablogo" ></i></a>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      src: '',
      loginForm: {
        username: null,
        password: null,
        code: 'FFFF',
        randomStr: Math.ceil(Math.random() * 100000) + '_' + Date.now()
      },
      loginRules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, trigger: 'blur', message: '密码不能小于6位' }
        ],
        code: [{ required: true, trigger: 'blur' }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    refreshCode: function() {
      this.loginForm.randomStr = Math.ceil(Math.random() * 100000) + Date.now()
      this.src = '/upms/code/' + this.loginForm.randomStr
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
            this.refreshCode()
          })
        } else {
          return false
        }
      })
    }
  },
  created() {
    this.src = '/upms/code/' + this.loginForm.randomStr
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import 'src/styles/mixin.scss';
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    @include relative;
    height: 100vh;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
      background-color: #2d3a4b;
    }
    .login-form {
      /*position: absolute;*/
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .c-icon-jgwablogo {
      position: relative;
      top: 3px;
      margin-right: 6px;
      width: 14px;
      height: 17px;
      display: inline-block;
      overflow: hidden;
      background: url(../../../static/icon/icons_5859e57.png) no-repeat;
      background-position: -623px -96px;
    }
  }

</style>
