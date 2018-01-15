<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div>

    <el-card class="box-card1">

      <div slot="header" class="clearfix">
        |&nbsp;<span style="font-weight: 600">基础信息</span>
      </div>

      <el-form :inline="true"  :model="userInfo"  label-width="100px" label-position="left" class="demo-form-inline">
        <div style="width: 280px; height: 400px;float: left;">
          <img :src="userInfo.user.avatar" class="image">
          <!--<el-button type="primary" style="width: 174px;" @click="edit">修改头像</el-button>-->
          <!-- 车牌颜色 -->
          <el-col :span="8">
            <el-form-item label="车牌颜色:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.idCard}}</span>
              <el-input  v-else v-model="userInfo.idCard" style="width: 100px" placeholder="车牌颜色"></el-input>
            </el-form-item>

            <el-form-item label-width="82px" label="车身颜色:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.idCard}}</span>
              <el-input  v-else v-model="userInfo.idCard" style="width: 100px" placeholder="车身颜色"></el-input>
            </el-form-item>
          </el-col>
        </div>

      <!--<div style="margin-left:220px; width: 1400px;height: 120px;">-->


        <el-col :span="6">
          <el-form-item label="自编号:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.username}}</span>
            <el-input v-else  v-model="userInfo.user.username" style="width: 180px" placeholder="自编号"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="使用负责人:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.jobNumber}}</span>
            <el-input v-else  v-model="userInfo.user.jobNumber" style="width: 180px" placeholder="工号"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="所属机构:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.idNumber}}</span>
            <el-input v-else  v-model="userInfo.user.idNumber" style="width: 180px" placeholder="身份证号"></el-input>
          </el-form-item>
        </el-col>

        <!-- 出生日期 -->
        <el-col :span="6">
          <el-form-item label="出生日期:" required>
            <span class="" style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.birthday | parseTime('{y}-{m}-{d}')}}</span>
            <el-date-picker v-else   type="date" placeholder="出生日期"  style="width: 180px;" v-model="userInfo.user.birthday"></el-date-picker>
          </el-form-item>
        </el-col>

        <!--<div style="border-bottom:1px solid #001528;margin-left:220px; width: 1010px;"></div>   | parseTime('{y}-{m}-{d}')-->


        <!-- 车辆牌照 -->
        <el-col :span="6">
          <el-form-item label="车辆牌照:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.qq}}</span>
            <span v-else >
              <el-input  v-model="userInfo.idCard" style="width: 180px" placeholder="车辆牌照"></el-input>
              <el-popover ref="popover" placement="top-start" title="提示" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
              </el-popover>
              <i class="el-icon-question" v-popover:popover></i>
            </span>
          </el-form-item>
        </el-col>
        <!-- 原车辆牌照 -->
        <el-col :span="6">
          <el-form-item label="原车辆牌照:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.qq}}</span>
            <el-input  v-else v-model="userInfo.idCard" style="width: 180px" placeholder="原车辆牌照"></el-input>
          </el-form-item>
        </el-col>

        <!-- 车辆来源 -->
        <el-col :span="6">
          <el-form-item label="车辆来源:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.mobile}}</span>
            <el-input v-else  v-model="userInfo.user.mobile" placeholder="车辆来源"  style="width: 180px"></el-input>
          </el-form-item>
        </el-col>

        <!-- 发动机号 -->
        <el-col :span="6">
          <el-form-item label="发动机号:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.mobile}}</span>
            <el-input v-else  v-model="userInfo.user.mobile" placeholder="发动机号"  style="width: 180px"></el-input>
          </el-form-item>
        </el-col>

        <!-- 车架号 -->
        <el-col :span="6">
          <el-form-item label="车架号:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.mobile}}</span>
            <el-input v-else  v-model="userInfo.user.mobile" placeholder="车架号"  style="width: 180px"></el-input>
          </el-form-item>
        </el-col>

        <!-- 联系地址 -->
        <el-col :span="6">
          <el-form-item label="联系地址:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.contactAddress}}</span>
            <el-input v-else  v-model="userInfo.user.contactAddress" placeholder="联系地址"  style="width: 100px"></el-input>
          </el-form-item>
        </el-col>

        <!-- 家庭住址 -->
        <el-col :span="6">
          <el-form-item label="家庭地址:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.homeAddress}}</span>
            <el-input v-else  v-model="userInfo.user.homeAddress" placeholder="家庭地址"  style="width: 180px"></el-input>
          </el-form-item>
        </el-col>

        <!-- 学历 -->
        <el-col :span="6">
          <el-form-item label="学历:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.education}}</span>
            <el-input v-else  v-model="userInfo.user.education" placeholder="学历"  style="width: 180px"></el-input>
          </el-form-item>
        </el-col>

        <!-- 专业 -->
        <el-col :span="6">
          <el-form-item label="专业:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.major}}</span>
            <el-input v-else v-model="userInfo.user.major" placeholder="专业"  style="width: 180px"></el-input>
          </el-form-item>
        </el-col>

        <!-- QQ -->
        <el-col :span="6">
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

        <!-- 入职日期 -->
        <el-col :span="6">
          <el-form-item label="入职日期:" required>
            <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.joinedTime }}</span>
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

        <el-col :span="20">
          <el-form-item  style="float: right">
            <el-button type="primary" v-if="edit" style="width: 174px;" @click="saveInfo">确认</el-button>
            <el-button style="width: 174px;" @click="editInfo">编辑信息</el-button>
          </el-form-item>
        </el-col>


      </el-form>

      <!--</div>-->

    </el-card>
    <el-card class="box-card2">

      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="维修日志" name="1">

          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="维修事项" width="180">
            </el-table-column>
            <el-table-column prop="name" label="维修时间" width="180">
            </el-table-column>
            <el-table-column prop="address" label="维修费用">
            </el-table-column>
            <el-table-column prop="address" label="维修人">
            </el-table-column>
            <el-table-column prop="address" label="备注">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="保养日志" name="2">

          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="保养事项" width="180">
            </el-table-column>
            <el-table-column prop="name" label="保养时间" width="180">
            </el-table-column>
            <el-table-column prop="address" label="保养费用">
            </el-table-column>
            <el-table-column prop="address" label="保养人">
            </el-table-column>
            <el-table-column prop="address" label="备注">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="费用日志" name="3">

          <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="date" label="费用事项" width="180">
            </el-table-column>
            <el-table-column prop="name" label="记录时间" width="180">
            </el-table-column>
            <el-table-column prop="address" label="费用">
            </el-table-column>
            <el-table-column prop="address" label="记录人">
            </el-table-column>
            <el-table-column prop="address" label="备注">
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="证件信息" name="4">角色管理</el-tab-pane>
        <el-tab-pane label="技术信息" name="5">角色管理</el-tab-pane>
        <el-tab-pane label="安全信息" name="6">角色管理</el-tab-pane>
        <el-tab-pane label="图片相册" name="7">角色管理</el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
  import Bar from '@/components/Bar'
  import { getObj } from '@/api/upms/user'

  export default {
    components: {
      Bar
    },
    name: 'index',
    data() {
      return {
        edit: false,
        activeName2: '1',
        listQuery: {
          page: 1,
          limit: 20
        },
        userInfo: {
          user: {},
          date: ''
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        getObj('1').then(response => {
          this.userInfo.user = response.data.data
          console.log(this.userInfo.user)
        })
      },
      editInfo() {
        this.edit = true
        console.log(this.userInfo.user.sex)
      },
      saveInfo() {
        this.edit = false
      },
      handleClick(tab, event) {
        console.log(tab, event)
      }
    }
  }

</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card1 {
    width: 80%;
    margin: 50px 0 0 50px;
  }
  .box-card2 {
    width: 80%;
    margin: 25px 0 0 50px;
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
