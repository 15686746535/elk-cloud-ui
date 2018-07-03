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
      user: {},
      showdialog: true,
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
      editInfo(this.$data.user).then((res) => {
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

</style>
