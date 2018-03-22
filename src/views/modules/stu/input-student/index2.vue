<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <div v-show="showModule=='basic'">
      <el-card :style="{height: (client.height-45) + 'px'}">
        <div style="width:145px;font-size: 36px;font-weight: 500;margin: 0 auto;">学员录入</div>
        <div style="width:400px;margin: 0 auto; line-height: 50px;" :style="{marginTop: ((client.height-45)/4) + 'px'}">

          <el-form label-position="left" :model="student" :rules="student" ref="student" label-width="80px">
            <el-form-item>
              <label slot="label"><span class="text_css">姓名：</span></label>
              <el-input style="width: 100%;" class="filter-item" placeholder="姓名" v-model="student.name"></el-input>
            </el-form-item>

            <el-form-item>
              <label slot="label"><span class="text_css">身份证号：</span></label>
              <el-input style="width: 100%;" class="filter-item" placeholder="身份证号" v-model="student.idNumber"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" style="width: 100px;" @click="convertClick('detailed')">录  入</el-button>
              <el-button style="float: right;width: 100px;" @click="reset">重  置</el-button>
            </el-form-item>

          </el-form>
          <!--<el-row>
            <el-col :span="6"><span class="text_css">姓名：</span></el-col>
            <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="姓名" v-model="stu.name"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6"><span class="text_css">身份证号：</span></el-col>
            <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="身份证号" v-model="stu.idNumber"></el-input></el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 70px;">
            <el-col :span="4">&nbsp;</el-col>
            <el-col :span="8">
              <el-button style="width: 100%" plain @click="reset">重  置</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" style="width: 100%" @click="convertClick('detailed')">录  入</el-button>
            </el-col>
            <el-col :span="4">&nbsp;</el-col>
          </el-row>-->
        </div>
      </el-card>
    </div>
    <div v-show="showModule=='detailed'">
      <el-card body-style="padding:5px 20px;" style="margin-bottom: 5px;height: 60px;line-height: 50px">
        录入详细信息
        <div style="float: right"><el-button type="primary" @click="convertClick('basic')">返  回</el-button></div>
      </el-card>
      <el-row :gutter="5" :style="{height: (client.height - 110) + 'px'}">
        <el-col :span="12">
          <el-card>

            <el-row :gutter="20">
              <el-col :span="12" style="line-height: 50px">

                <!-- 姓名 -->
                <el-row style="height: 50px">
                  <el-col :span="6"><span class="text_css">姓名：</span></el-col>
                  <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="姓名" v-model="student.name"></el-input></el-col>
                </el-row>

                <!-- 性别 -->
                <el-row style="height: 50px">
                  <el-col :span="6"><span class="text_css">性别：</span></el-col>
                  <el-col :span="18">
                    <el-radio v-model="student.sex" label="1">男</el-radio>
                    <el-radio v-model="student.sex" label="0">女</el-radio>
                  </el-col>
                </el-row>

                <!-- 生日 -->
                <el-row style="height: 50px">
                  <el-col :span="6"><span class="text_css">生日：</span></el-col>
                  <el-col :span="18"><el-date-picker type="date" placeholder="生日"  style="width: 100%" v-model="student.birthday"></el-date-picker></el-col>
                </el-row>

                <!-- 联系电话 -->
                <el-row style="height: 50px">
                  <el-col :span="6"><span class="text_css">联系电话：</span></el-col>
                  <el-col :span="18"><el-input style="width: 100%;" class="filter-item" placeholder="姓名" v-model.number="student.mobile"></el-input></el-col>
                </el-row>

              </el-col>

              <el-col :span="12">

              </el-col>

            </el-row>


          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card>

          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { addObj } from '@/api/student/student'
  import Dict from '@/components/Dict'
  import { removeAllSpace } from '@/utils/validate'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { mapGetters } from 'vuex'
  export default {
    name: 'table_student',
    components: {
      Dict
    },
    directives: {
      waves
    },
    data() {
      return {
        student: {
          aboardTime: null,
          addDrive: null,
          age: null,
          archivesNumber: null,
          arrearage: null,
          avatar: null,
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
          moctorcycleType: null,
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
        showModule: 'basic'
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
        return typeMap[this.student.sex]
      }
    },
    methods: {
      /* 基本信息跳转到详细信息 */
      convertClick(stare) {
        this.student.name = removeAllSpace(this.student.name)
        this.student.idNumber = removeAllSpace(this.student.idNumber)
        console.log(this.student.idNumber.length)
        if (this.student.name === null || this.student.name === '') {
          this.$alert('请输入姓名', '提示', {
            type: 'info'
          })
          return
        }
        if (this.student.idNumber === null) {
          this.$alert('请输入身份证', '提示', {
            type: 'warning'
          })
          return
        } else if (this.student.idNumber.length !== 18 && this.student.idNumber.length !== 12) {
          this.$alert('请输入正确的身份证信息', '提示', {
            type: 'warning'
          })
          return
        } else {
          this.showModule = stare
          // 解析身份证信息
          this.generateInfo()
        }
      },
      reset() {
        this.student = {}
      },
      getDict(val) {
      },
      // 添加
      add() {
        addObj(this.student).then(response => {
        })
      },
      generateInfo() {
        if (this.student.idNumber.length === 18) {
          this.student.birthday = this.student.idNumber.substring(6, 10) + '-' + this.student.idNumber.substring(10, 12) + '-' + this.student.idNumber.substring(12, 14)
          if (this.student.idNumber.substr(16, 1) % 2 === 1) this.student.sex = '1'
          if (this.student.idNumber.substr(16, 1) % 2 === 0) this.student.sex = '0'
        }
      }
    }
  }
</script>

<style>

  .img{
    width: 100px;
    height: 100px;
    padding: 0;
    border-radius: 150px;
    overflow: hidden;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .subject{
    width: 140px;
    height: 30px;
    display:block;
    margin: 10px auto;
    color: rgb(124,124,124);
    background: none;
    border: none;
    font-size: 14px;
  }
  .pass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color: #fff;
    text-align: center;
    border: none;
    background-color: rgb(66,185,131);
  }
  .noPass{
    width: 70px;
    height: 30px;
    border-radius: 10px;
    color:#fff;
    border: none;
    text-align: center;
    background-color: rgb(177,177,177);
  }
  .cost{
    width: 140px;
    height: 30px;
    display:block;
    margin: 10px auto;
    text-align: left;
    color: rgb(124,124,124);
    background: none;
    border: none;
    font-size: 14px;
  }
  .image {
    max-width: 200px;
    max-height: 200px;
  }
.text_css{
  color:#495060;
  font-size: 16px;
  word-break:keep-all;/* 不换行 */
  white-space:nowrap;/* 不换行 */
  overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}

</style>
