<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      |&nbsp;<span style="font-weight: 600">员工信息</span>
      <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
    </div>

    <!--<div v-for="o in 4" :key="o" class="text item">-->
      <!--{{'列表内容 ' + o }}-->
    <!--</div>-->

    <div style="width: 200px; height: 500px;float: left;">
      <img :src="userInfo.user.avatar" class="image">
        <el-button type="primary" style="width: 174px;" @click="edit">修改头像</el-button>
    </div>

    <!--<div style="margin-left:220px; width: 1400px;height: 120px;">-->
        <el-form :inline="true"  size="mini" :model="userInfo" :rules="rules" label-width="82px" label-position="left" class="demo-form-inline">


          <el-col :span="5">
          <el-form-item label="员工姓名:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.username}}</span>
            <el-input v-else  v-model="userInfo.user.username" style="width: 180px" placeholder="员工姓名"></el-input>
          </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="工号:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.jobNumber}}</span>
              <el-input v-else  v-model="userInfo.user.jobNumber" style="width: 180px" placeholder="工号"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
          <el-form-item label="身份证号:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.idNumber}}</span>
            <el-input v-else  v-model="userInfo.user.idNumber" style="width: 180px" placeholder="身份证号"></el-input>
          </el-form-item>
          </el-col>

          <el-col :span="5">
          <el-form-item label="出生日期:" required>
              <span class="" style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.birthday | parseTime('{y}-{m}-{d}')}}</span>
              <el-date-picker v-else   type="date" placeholder="出生日期"  style="width: 180px;" v-model="userInfo.user.birthday"></el-date-picker>
          </el-form-item>
          </el-col>

          <!--<div style="border-bottom:1px solid #001528;margin-left:220px; width: 1010px;"></div>   | parseTime('{y}-{m}-{d}')-->


          <el-col :span="5">
          <el-form-item label="性别:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.sex==1?'男':'女'}}</span>
            <span v-else >
            <el-radio  v-model="userInfo.user.sex" label="1">男</el-radio>
            <el-radio  v-model="userInfo.user.sex" label="2">女</el-radio>
            </span>
          </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="所属部门:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.qq}}</span>
              <el-input  v-else v-model="userInfo.idCard" style="width: 180px" placeholder="所属部门"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="5">
            <el-form-item label="联系电话:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.mobile}}</span>
              <el-input v-else  v-model="userInfo.user.mobile" placeholder="联系电话"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="联系地址:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.contactAddress}}</span>
              <el-input v-else  v-model="userInfo.user.contactAddress" placeholder="联系地址"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="家庭地址:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.homeAddress}}</span>
              <el-input v-else  v-model="userInfo.user.homeAddress" placeholder="家庭地址"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="学历:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.education}}</span>
              <el-input v-else  v-model="userInfo.user.education" placeholder="学历"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="专业:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.major}}</span>
              <el-input v-else v-model="userInfo.user.major" placeholder="专业"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="QQ:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.qq}}</span>
              <el-input v-else  v-model="userInfo.user.qq" placeholder="QQ"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <!--<hr style="padding-top: 120px; margin-left:200px;margin-bottom: 30px; width: 1110px; border: none; border-bottom:1px solid #99a9bf;"/>-->

          <!--<el-col :span="6">-->
          <!--<el-form-item label="活动区域" required>-->
            <!--<el-select v-model="userInfo.region" placeholder="活动区域">-->
              <!--<el-option label="区域一" value="shanghai"></el-option>-->
              <!--<el-option label="区域二" value="beijing"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="5">-->
            <!--<el-form-item label="档案号:" required>-->

              <!--<span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.qq}}</span>-->
              <!--<el-input v-else  v-model="userInfo.user" style="width: 180px" placeholder="档案号"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="5">-->
            <!--<el-form-item label="职位:" required>-->
              <!--<span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.qq}}</span>-->
              <!--<el-input  v-else v-model="userInfo.idCard" style="width: 180px" placeholder="职位"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="5">
            <el-form-item label="入职日期:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.joinedTime | parseTime('{y}-{m}-{d}')}}</span>
              <el-date-picker  v-else type="date" placeholder="入职日期"  style="width: 180px" v-model="userInfo.user.joinedTime"></el-date-picker>
            </el-form-item>
          </el-col>




          <!--<el-col :span="5">-->
            <!--<el-form-item label="场训教练:" required>-->
              <!--<el-select v-model="userInfo.region" style="width: 180px" placeholder="场训教练">-->
                <!--<el-option label="教练一" value="shanghai"></el-option>-->
                <!--<el-option label="教练二" value="beijing"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<hr style="padding-top: 120px; margin-left:200px;margin-bottom: 30px; width: 980px; border: none; border-bottom:1px solid #99a9bf;"/>-->

          <el-col :span="17">
            <el-form-item  style="float: right">
              <el-button type="primary" v-if="edit" style="width: 174px;" @click="saveInfo">确认</el-button>
              <el-button style="width: 174px;" @click="editInfo">编辑信息</el-button>
            </el-form-item>
          </el-col>


        </el-form>

    <!--</div>-->


  </el-card>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        edit: false,
        userInfo: {
          user: {
            // 所属组织
            orgId: '1',
            // 用户名
            username: '123',
            // 密码
            password: '132',
            // 头像
            avatar: 'http://g.hiphotos.baidu.com/image/pic/item/c83d70cf3bc79f3d86eee82db0a1cd11728b299b.jpg',
            // 姓名
            name: '张三',
            // 性别1男
            sex: '1',
            // 工号
            jobNumber: '123541263545',
            // 身份证号码
            idNumber: '123123123',
            // 生日
            birthday: '2118-01-08T16:00:00.000Z',
            // 电话号码
            mobile: '123456789101315171',
            // 联系地址
            contactAddress: '123456789101315171',
            // 家庭地址
            homeAddress: '123456789101315171',
            // 学历
            education: '123456789101315171',
            // 专业
            major: '123456789101315171',
            // 入职日期
            joinedTime: '2018-01-08T16:00:00.000Z',
            // 转正日
            positiveTime: '2018-01-08T16:00:00.000Z',
            // 离职日期
            leaveTime: '2018-01-08T16:00:00.000Z',
            // 公积金购买日期
            providentFundTime: '2018-01-08T16:00:00.000Z',
            // 五险购买日期
            fiveInsuranceTime: '2118-01-08T16:00:00.000Z',
            // 离职标记  0正常 1离职
            quit: '123456789101315171',
            // 删除标记
            delFlag: '123456789101315171',
            // 备注
            remark: '123456789101315171',
            // 操作
            operator: '123456789101315171',
            // 创建时间
            createTime: '123456789101315171',
            // 修改时间
            updateTime: '123456789101315171',
            // QQ
            qq: '123456789101315171',
            // 邮箱
            email: '123456789101315171',
            // 工作电话
            workMobile: '123456789101315171',
            // 纬度
            latitude: '123456789101315171',
            // 经度
            longitude: '123456789101315171',
            // 微信
            wechat: '123456789101315171',
            // 紧急联系人
            emergencyContact: '123456789101315171',
            // 紧急联系人电话
            emergencyMobile: '123456789101315171'
          },
          date: '',
          sex: '',
          phone: ''
        }
      }
    },
    methods: {
      editInfo() {
        this.edit = true
      },
      saveInfo() {
        this.edit = false
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 1400px;
    height: 600px;
    margin: 50px 0 0 50px;
  }
  .image {
    margin-bottom: 20px;
    margin-right: 50px;
    width: 174px;
    height: 174px;
    display: block;
    float: left;
  }
</style>
