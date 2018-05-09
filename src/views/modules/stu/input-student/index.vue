<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div v-show="showModule=='basic'">
      <el-card :style="{height: ($store.state.app.client.height-45) + 'px'}">
        <div style="width:145px;font-size: 36px;font-weight: 500;margin: 0 auto;">学员录入</div>
        <div style="width:400px;margin: 0 auto; line-height: 50px;" :style="{marginTop: (($store.state.app.client.height-45)/4) + 'px'}">
          <el-row>
            <el-col :span="6"><span class="text_css">姓名</span></el-col>
            <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="姓名" v-model="studentEntity.name"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><span class="text_css">身份证号</span></el-col>
            <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="身份证号" v-model="studentEntity.idNumber"></el-input></el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 30px;">
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="9">
              <el-button type="primary" style="width: 100%" @click="convertClick('detailed')">录  入</el-button>
            </el-col>
            <el-col :span="9">
              <el-button style="width: 100%" plain @click="reset">重  置</el-button>
            </el-col>
            <el-col :span="3">&nbsp;</el-col>
          </el-row>
        </div>
      </el-card>
    </div>
    <div v-show="showModule=='detailed'">
      <el-card body-style="padding:5px 20px;" style="margin-bottom: 5px;height: 60px;line-height: 50px">
        录入详细信息
        <div style="float: right"><el-button type="primary" @click="convertClick('basic')">返  回</el-button></div>
      </el-card>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-card :style="{height: ($store.state.app.client.height - 110) + 'px'}" style="overflow: auto;line-height: 50px">
            <el-row>
              <el-row :gutter="20">
                <el-col :span="12" >

                  <!-- 档案号 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">档案号</span></el-col>
                    <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="档案号" v-model.number="studentEntity.archivesNumber"></el-input></el-col>
                  </el-row>

                  <!-- 姓名 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">姓名</span></el-col>
                    <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="姓名" v-model="studentEntity.name"></el-input></el-col>
                  </el-row>

                  <!-- 身份证号 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">身份证号</span></el-col>
                    <el-col :span="18">
                      <el-input style="width: 100%;" class="filter-item" placeholder="身份证号" :maxlength="18" @change="generateInfo" v-model="studentEntity.idNumber"></el-input>
                    </el-col>
                  </el-row>

                  <!-- 联系电话 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">联系电话</span></el-col>
                    <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="联系电话" :maxlength="11" v-model.number="studentEntity.mobile"></el-input></el-col>
                  </el-row>

                  <!-- 性别 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">性别</span></el-col>
                    <el-col :span="18">
                      <el-radio v-model="studentEntity.sex" label="1">男</el-radio>
                      <el-radio v-model="studentEntity.sex" label="0">女</el-radio>
                    </el-col>
                  </el-row>

                  <!-- 生日 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">生日</span></el-col>
                    <el-col :span="18"><el-date-picker value-format="timestamp" type="date" placeholder="生日"  style="width: 100%" v-model="studentEntity.birthday"></el-date-picker></el-col>
                  </el-row>

                  <!-- 所学车型 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">所学车型</span></el-col>
                    <el-col :span="18"><dict v-model="studentEntity.motorcycleType" dictType="dict_motorcycle_type" style="width: 100%;"  placeholder="所学车型"></dict></el-col>
                  </el-row>

                  <!-- 来源渠道 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">来源渠道</span></el-col>
                    <el-col :span="18"><dict v-model="studentEntity.source" dictType="dict_source" style="width: 100%;"  placeholder="来源渠道"></dict></el-col>
                  </el-row>


                  <!-- 入学日期 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">入学日期</span></el-col>
                    <el-col :span="18"><el-date-picker value-format="timestamp" type="date" placeholder="入学日期"  style="width: 100%" v-model="studentEntity.enrolTime"></el-date-picker></el-col>
                  </el-row>


                  <!-- 报名点 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">报名点</span></el-col>
                    <el-col :span="18"><dict v-model="studentEntity.enrolSite" dictType="dict_enrolSite" style="width: 100%;"  placeholder="报名点"></dict></el-col>
                  </el-row>


                  <!-- 所在单位 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">所在单位</span></el-col>
                    <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="所在单位" v-model.number="studentEntity.company"></el-input></el-col>

                  </el-row>





                </el-col>

                <el-col :span="12">

                  <el-row>
                    <el-col :span="6"> &nbsp;</el-col>
                    <el-col  :span="18">
                      <div style="height: 250px;width: 200px;margin: 0 auto">
                        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                          <img v-if="studentEntity.avatar" :src="studentEntity.avatar" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>

                      </div>
                    </el-col>
                  </el-row>

                  <!-- 微信 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">微信</span></el-col>
                    <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="微信" :maxlength="11" v-model.number="studentEntity.wechat"></el-input></el-col>
                  </el-row>


                  <!-- 校区 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">校区</span></el-col>
                    <el-col :span="18"><dict v-model="studentEntity.homeAddress" dictType="dict_campus" style="width: 100%;"  placeholder="校区"></dict></el-col>
                  </el-row>

                  <!-- 联系地址 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">联系地址</span></el-col>
                    <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="联系地址" v-model.number="studentEntity.contactAddress"></el-input></el-col>
                  </el-row>


                  <!-- 入学期数 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">入学期数</span></el-col>
                    <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="入学期数" v-model.number="studentEntity.periods"></el-input></el-col>
                  </el-row>

                  <!-- 电子邮箱 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">电子邮箱</span></el-col>
                    <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="电子邮箱" v-model.number="studentEntity.email"></el-input></el-col>
                  </el-row>

                  <!-- 所属职位 -->
                  <el-row style="height: 50px">
                    <el-col :span="6"><span class="text_css">所属职位</span></el-col>
                    <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="所属职位" v-model.number="studentEntity.position"></el-input></el-col>
                  </el-row>

                </el-col>

              </el-row>

              <el-row style="height: 50px">
                <el-col :span="3"><span class="text_css">介绍人1</span></el-col>
                <el-col :span="5"><!--<org-select style="width: 100%" v-model="studentEntity.introducer" @org-click="orgClick"></org-select>--></el-col>
                <el-col :span="1"><div class="text_css" style="float: none;margin: 0 auto;text-align:center;">--</div></el-col>
                <el-col :span="6"><el-input style="width: 100%;" class="filter-item" placeholder="所在单位" v-model.number="studentEntity.introducer"></el-input></el-col>
              </el-row>

              <el-row style="height: 50px">
                <el-col :span="3"><span class="text_css">介绍人2</span></el-col>
                <el-col :span="16"></el-col>
              </el-row>
            </el-row>
            <el-row>
              <el-col>
                <div style="width: 163px;margin: 0 auto">
                  <el-button type="primary">建 档</el-button>
                  <el-button>重 置</el-button>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card :style="{height: ($store.state.app.client.height - 110) + 'px'}" style="overflow: auto">

          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { saveStudent } from '@/api/student/student'
  import { mapGetters } from 'vuex'
  export default {
    name: 'table_student',
    data() {
      return {
        studentEntity: {
          aboardTime: null,
          addDrive: null,
          age: null,
          archivesNumber: null,
          arrearage: null,
          avatar: '',
          birthday: null,
          company: null,
          contactAddress: null,
          createTime: null,
          email: null,
          enrolSite: null,
          enrolTime: null,
          fieldCoach: null,
          fieldCoachName: null,
          graduationTime: null,
          haveCar: null,
          homeAddress: null,
          idNumber: null,
          increment: null,
          incrementList: null,
          introducer: null,
          latitude: null,
          longitude: null,
          mobile: null,
          motorcycleType: null,
          name: null,
          operator: null,
          periodOfValidity: null,
          periods: null,
          phone: null,
          physicalExamination: null,
          position: null,
          punchTime: null,
          remark: null,
          roadCoach: null,
          roadCoachName: null,
          serviceType: null,
          serviceTypeDto: null,
          sex: null,
          source: null,
          studyTime: null,
          wechat: null
        },
        /* basic 基本 detailed 详细 */
        showModule: 'detailed'
      }
    },
    created() {
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ]),
      sexVO() {
        const typeMap = {
          1: '男',
          0: '女'
        }
        return typeMap[this.studentEntity.sex]
      }
    },
    methods: {
      /* 基本信息跳转到详细信息 */
      convertClick(stare) {
        this.showModule = stare
        // 解析身份证信息
        this.generateInfo()
      },
      reset() {
        this.studentEntity = {}
      },
      getDict(val) {
      },
      // 添加
      add() {
        saveStudent(this.studentEntity).then(response => {
        })
      },
      generateInfo() {
        if (this.studentEntity.idNumber.length === 18) {
          this.studentEntity.birthday = this.studentEntity.idNumber.substring(6, 10) + '-' + this.studentEntity.idNumber.substring(10, 12) + '-' + this.studentEntity.idNumber.substring(12, 14)
          if (this.studentEntity.idNumber.substr(16, 1) % 2 === 1) this.studentEntity.sex = '1'
          if (this.studentEntity.idNumber.substr(16, 1) % 2 === 0) this.studentEntity.sex = '0'
        }
      },
      orgClick() {},
      handleAvatarSuccess(res, file) {
        this.studentEntity.avatar = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 230px;
    line-height: 230px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 230px;
    display: block;
  }
.text_css{
  color:#495060;
  font-size: 16px;
  float: right;
  word-break:keep-all;/* 不换行 */
  white-space:nowrap;/* 不换行 */
  overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}

</style>
