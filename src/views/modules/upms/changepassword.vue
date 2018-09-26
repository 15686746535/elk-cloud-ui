<template>
  <div style="height: 100%">
    <el-card  style="height: 100%" >
      <div style="width: 100%;" align="center">
        <div style="padding-top: 50px;">
          <div style="color: red;font-size: 14px;margin-bottom: 10px;">
            <span v-show="error.show"></span>
            {{error.msg}}
          </div>
        </div>
        <el-form label-width="80px" style="width: 380px">
          <el-form-item>
            <span slot="label" class="text_css">原密码</span>
            <el-input class="filter-item" type="password" v-model="user.password" placeholder="原密码" ></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label" class="text_css">新密码</span>
            <el-input class="filter-item"  type="password"  v-model="newpassword1" placeholder="新密码" ></el-input>
          </el-form-item>
          <el-form-item>
            <span slot="label" class="text_css">新密码</span>
            <el-input class="filter-item"  type="password"  v-model="newpassword2" placeholder="再次输入新密码" ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer" align="center">
        <el-button type="primary" @click="changepassword">修改</el-button>
      </div>
      <div style="width: 100%;color: red;padding-top: 50px" align="center">
        ps:初始密码无法操作OA，请修改密码！
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
      user: {
        password: '',
        newpassword1: ''
      },
      newpassword1: '',
      newpassword2: '',
      showdialog: true,
      error: {
        show: true,
        msg: ''
      },
      passdata: {}
    }
  },
  created() {

  },
  computed: {
    ...mapGetters([
      'permissions',
      'client'
    ])
  },
  methods: {
    changepassword() {
      if (this.user.password === '') {
        this.error.show = true
        this.error.msg = '请输入原密码'
      } else if (this.newpassword1 === '') {
        this.error.show = true
        this.error.msg = '请输入新密码'
      } else if (this.newpassword1.length < 6) {
        this.error.show = true
        this.error.msg = '密码长度必须大于6'
      } else if (this.newpassword2 === this.user.oldpassword) {
        this.error.show = true
        this.error.msg = '新密码与原密码相同'
      } else if (this.newpassword2 === '') {
        this.error.show = true
        this.error.msg = '请再次输入新密码'
      } else if (this.newpassword2 !== this.newpassword1) {
        this.error.show = true
        this.error.msg = '两次输入密码不一致'
      } else {
        this.error.show = false
        this.error.msg = ''
        this.user.newpassword1 = this.newpassword1
        this.user.newpassword1 = this.newpassword1
        editInfo(this.user).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            var child = document.getElementById('10001')
            child.parentNode.removeChild(child)
          } else {
            this.error.show = true
            this.error.msg = res.data.msg
          }
        })
      }
    }
  }
}
</script>
