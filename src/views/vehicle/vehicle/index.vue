<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div class="app-container calendar-list-container">
    <div v-show="showModule=='list'">
      <el-card style="margin-bottom: 5px;">
        <div slot="header" class="clearfix">
          |&nbsp;<span style="font-weight: 600">筛选</span>
          <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
        </div>
        <div class="filter-container">
          <el-form ref="list" :model="list" inline label-width="80px">
            <el-form-item label="车牌">
              <el-select v-model="list.plateNumber" placeholder="请选择车牌">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人">
              <el-select v-model="list.plateNumber" placeholder="请选择负责人">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车辆来源">
              <el-select v-model="list.plateNumber" placeholder="请选择车辆来源">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>

            <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="create">添加</el-button>
          </el-form>
        </div>
      </el-card>
      <el-card>
        <div slot="header" class="clearfix">
          |&nbsp;<span style="font-weight: 600">车辆信息</span>
        </div>
        <!-- 身份卡循环 -->
        <el-table :data="list" height="500" border style="width: 100%"  v-loading="listLoading" element-loading-text="给我一点时间">
          <el-table-column label="编号" width="100px">
              <template slot-scope="scope">
              <span>{{scope.row.motorcycleType}}</span>
            </template>
          </el-table-column>
            <!-- 基本信息 -->
          <el-table-column label="基本信息">
            <template slot-scope="scope">
              <img :src="scope.row.photo" class="img">  <!-- 头像 -->
              <div style="float: left;width: 200px;height: 20px ">
                <p style="color: #868686;width: 100px;float: left;margin-top: 10px">车辆牌照：</p><p style="float: left">{{scope.row.plateNumber}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px;margin-top: 10px">
                <p style="color: #868686;width: 100px;float: left">使用责任人：</p><p style="float: left">{{scope.row.userId}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px ;margin-top: 10px">
                <p style="color: #868686;width: 100px;float: left">所属机构：</p><p style="float: left">{{scope.row.orgId}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px  ;margin-top: 10px">
                <p style="color: #868686;width: 100px;float: left">车辆状态：</p><p style="float: left">{{scope.row.vehicleState}}</p>
              </div>
            </template>
          </el-table-column>

          <!-- 证件信息 -->
          <el-table-column label="证件信息">
            <template slot-scope="scope">
              <div style="width: 200px;height: 20px ">
                <p style="color: #868686;width: 140px;float: left;margin-top: 10px">标识卡到期日期：</p><p style="float: left">{{list.plateNumber}}</p>
              </div>
              <div style="width: 200px;height: 20px;margin-top: 10px">
                <p style="color: #868686;width: 140px;float: left">评定日期：</p><p style="float: left">{{list.userId}}</p>
              </div>
              <div style="width: 200px;height: 20px ;margin-top: 10px">
                <p style="color: #868686;width: 140px;float: left">强制报销日期：</p><p style="float: left">{{list.orgId}}</p>
              </div>
            </template>
          </el-table-column>

            <!-- 技术信息 -->
          <el-table-column label="技术信息">
            <template slot-scope="scope">
              <div style="width: 200px;height: 20px ">
                <p style="color: #868686;width: 140px;float: left;margin-top: 10px">排量/功率：</p><p style="float: left">{{list.plateNumber}}</p>
              </div>
              <div style="width: 200px;height: 20px;margin-top: 10px">
                <p style="color: #868686;width: 140px;float: left">总质量：</p><p style="float: left">{{list.userId}}</p>
              </div>
              <div style="width: 200px;height: 20px ;margin-top: 10px">
                <p style="color: #868686;width: 140px;float: left">制造厂商名称：</p><p style="float: left">{{list.orgId}}</p>
              </div>
            </template>
          </el-table-column>

            <!-- 安全信息 -->
          <el-table-column label="证件信息">
            <template slot-scope="scope">
              <div style="width: 200px;height: 20px ">
                <p style="color: #868686;width: 140px;float: left;margin-top: 10px">安装GPS：</p><p style="float: left">{{list.plateNumber}}</p>
              </div>
              <div style="width: 200px;height: 20px;margin-top: 10px">
                <p style="color: #868686;width: 140px;float: left">三角架：</p><p style="float: left">{{list.userId}}</p>
              </div>
              <div style="width: 200px;height: 20px ;margin-top: 10px">
                <p style="color: #868686;width: 140px;float: left">发动机灭火器：</p><p style="float: left">{{list.orgId}}</p>
              </div>
            </template>
          </el-table-column>

          <!--</div>-->
        </el-table>
        <!--</div>-->
        <!--<el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                  highlight-current-row style="width: 100%">
          <el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
          <el-table-column label="负责人ID">
            <template slot-scope="scope">
              <span>{{scope.row.userId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="组织ID">
            <template slot-scope="scope">
              <span>{{scope.row.orgId}}</span>
            </template>
          </el-table-column>
          <el-table-column label="型号(车辆品牌)">
            <template slot-scope="scope">
              <span>{{scope.row.motorcycleType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="车辆状态">
            <template slot-scope="scope">
              <span>{{scope.row.vehicleState}}</span>
            </template>
          </el-table-column>
          <el-table-column label="自编号">
            <template slot-scope="scope">
              <span>{{scope.row.number}}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属机构">
            <template slot-scope="scope">
              <span>{{scope.row.affiliation}}</span>
            </template>
          </el-table-column>
          <el-table-column label="教练车学牌">
            <template slot-scope="scope">
              <span>{{scope.row.plateNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column label="原车辆牌照">
            <template slot-scope="scope">
              <span>{{scope.row.oldPlateNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column label="发动机号">
            <template slot-scope="scope">
              <span>{{scope.row.engineNo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="车架号">
            <template slot-scope="scope">
              <span>{{scope.row.vinNo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="车身颜色">
            <template slot-scope="scope">
              <span>{{scope.row.carColor}}</span>
            </template>
          </el-table-column>
          <el-table-column label="车牌颜色">
            <template slot-scope="scope">
              <span>{{scope.row.plateColor}}</span>
            </template>
          </el-table-column>
          <el-table-column label="出厂时间">
            <template slot-scope="scope">
              <span>{{scope.row.factoryTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="注册登记日期">
            <template slot-scope="scope">
              <span>{{scope.row.registerTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="车辆类别(如:教练车,公交...)">
            <template slot-scope="scope">
              <span>{{scope.row.vehicleType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="核定载客人">
            <template slot-scope="scope">
              <span>{{scope.row.allowNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column label="燃料类别 ">
            <template slot-scope="scope">
              <span>{{scope.row.fuelType}}</span>
            </template>
          </el-table-column>
          <el-table-column label="技术等级">
            <template slot-scope="scope">
              <span>{{scope.row.technicalLevel}}</span>
            </template>
          </el-table-column>
          <el-table-column label="厂牌">
            <template slot-scope="scope">
              <span>{{scope.row.brand}}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注">
            <template slot-scope="scope">
              <span>{{scope.row.remark}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作人">
            <template slot-scope="scope">
              <span>{{scope.row.operator}}</span>
            </template>
          </el-table-column>
          <el-table-column label="创建时间/通过时间">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间/回访时间">
            <template slot-scope="scope">
              <span>{{scope.row.updateTime}}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success"
                         @click="update(scope.row)">编辑
              </el-button>
              <el-button size="mini" type="danger"
                         @click="delete(scope.row)">删除
              </el-button>
            </template>
          </el-table-column>

        </el-table>-->

        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page"
                         :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-card>
    </div>
    <div v-show="showModule=='info'">
      <el-card  class="box-card1">

        <div slot="header" class="clearfix">
          |&nbsp;<span style="font-weight: 600">基础信息</span>
        </div>

        <el-form :inline="true"  :model="userInfo" label	 label-width="100px" label-position="left" class="demo-form-inline">
          <div style="width: 280px; height: 400px;float: left;">
            <img width="100%" height="100%" :src="userInfo.user.avatar" class="image">
            <!--<el-button type="primary" style="width: 174px;" @click="edit">修改头像</el-button>-->
            <!-- 车牌颜色 -->

            <el-form-item  label-width="82px" label="车牌颜色:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.mobile}}</span>
              <Dict type="dict_sex" v-else  style="width: 100px" v-model="userInfo.user.mobile" ></Dict>
            </el-form-item>
            <br>
            <el-form-item label-width="82px" label="车身颜色:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.idCard}}</span>
              <el-input  v-else v-model="userInfo.idCard" style="width: 100px" placeholder="车身颜色"></el-input>
            </el-form-item>

          </div>

          <!--<div style="margin-left:220px; width: 1400px;height: 120px;">-->


          <el-col :span="6">
            <el-form-item label="自编号:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.username}}</span>
              <el-input v-else  v-model="userInfo.user.username" style="width: 180px" placeholder="自编号"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="使用责任人" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.jobNumber}}</span>
              <el-select v-else v-model="userInfo.region" style="width: 180px" placeholder="使用责任人">
                <el-option label="使用责任人一" value="shanghai"></el-option>
                <el-option label="使用责任人二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="所属机构:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.idNumber}}</span>
              <el-input v-else  v-model="userInfo.user.idNumber" style="width: 180px" placeholder="身份证号"></el-input>
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
            <el-form-item label="原车辆牌照:">
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.qq}}</span>
              <el-input  v-else v-model="userInfo.idCard" style="width: 180px" placeholder="原车辆牌照"></el-input>
            </el-form-item>
          </el-col>

          <!-- 车辆来源 -->
          <el-col :span="6">
            <el-form-item label="车辆来源:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.mobile}}</span>
              <Dict type="dict_sex" v-else  style="width: 180px" v-model="userInfo.user.mobile" ></Dict>
              <!--<el-input v-else  v-model="userInfo.user.mobile" placeholder="车辆来源"  style="width: 180px"></el-input>-->
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
          <el-col :span="10">
            <el-form-item label="车架号:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.mobile}}</span>
              <el-input v-else  v-model="userInfo.user.mobile" placeholder="车架号"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>


          <!-- 车辆类别 -->
          <el-col :span="6">
            <el-form-item label="车辆类别:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.mobile}}</span>
              <Dict type="dict_sex" v-else  style="width: 180px" v-model="userInfo.user.mobile" ></Dict>
              <!--<el-input v-else  v-model="userInfo.user.mobile" placeholder="车辆来源"  style="width: 180px"></el-input>-->
            </el-form-item>
          </el-col>

          <!-- 出厂日期 -->
          <el-col :span="6">
            <el-form-item label="出厂日期:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.joinedTime }}</span>
              <el-date-picker  v-else type="date" placeholder="出厂日期"  style="width: 180px" v-model="userInfo.user.joinedTime"></el-date-picker>
            </el-form-item>
          </el-col>

          <!-- 注册登记日期 -->
          <el-col :span="6">
            <el-form-item label="注册日期:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.joinedTime }}</span>
              <el-date-picker  v-else type="date" placeholder="注册登记日期"  style="width: 180px" v-model="userInfo.user.joinedTime"></el-date-picker>
            </el-form-item>
          </el-col>

          <!-- 技术等级 -->
          <el-col :span="6">
            <el-form-item label="技术等级:">
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.contactAddress}}</span>
              <el-input v-else  v-model="userInfo.user.contactAddress" placeholder="技术等级"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <!-- 核定载客人 -->
          <el-col :span="6">
            <el-form-item label="核定载客人:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.homeAddress}}</span>
              <el-input v-else  v-model="userInfo.user.homeAddress" placeholder="核定载客人"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <!-- 车辆类别 -->
          <el-col :span="6">
            <el-form-item label="燃料类别:">
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.mobile}}</span>
              <Dict type="dict_sex" v-else  style="width: 180px" v-model="userInfo.user.mobile" ></Dict>
              <!--<el-input v-else  v-model="userInfo.user.mobile" placeholder="车辆来源"  style="width: 180px"></el-input>-->
            </el-form-item>
          </el-col>


          <!-- 型号 -->
          <el-col :span="6">
            <el-form-item label="型号:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.education}}</span>
              <el-input v-else  v-model="userInfo.user.education" placeholder="型号"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>

          <!-- 厂牌 -->
          <el-col :span="6">
            <el-form-item label="厂牌:" required>
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit">{{userInfo.user.major}}</span>
              <el-input v-else v-model="userInfo.user.major" placeholder="厂牌"  style="width: 180px"></el-input>
            </el-form-item>
          </el-col>


          <!--<hr style="padding-top: 120px; margin-left:200px;margin-bottom: 30px; width: 980px; border: none; border-bottom:1px solid #99a9bf;"/>-->

          <el-col :span="22">
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
  </div>
</template>

<script>
  import { fetchList, getObj } from '@/api/vehicle/vehicle'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import Dict from '@/components/Dict'

  export default {
    name: 'table_vehicle',
    directives: {
      waves
    },
    components: {
      Dict
    },
    data() {
      return {
        vehicle: {},
        list: [],
        total: null,
        listLoading: true,
        showModule: 'list',
        listQuery: {
          page: 1,
          limit: 20
        },
        edit: false,
        activeName2: '1',
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
        this.listLoading = false
        fetchList(this.listQuery).then(response => {
          console.log('===================================================================================================')
          console.log(response.data)
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
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
      create() {
        this.vehicle = {}
        this.showModule = 'info'
      },
      update(row) {
        getObj(row.roleId)
          .then(response => {
            this.vehicle = response.data
            this.showModule = 'info'
          })
      },
      search() {
        this.listQuery.page = 1
        this.getList()
      },
      delete(id) {
        this.getList()
      },
      cancel() {
        this.showModule = 'list'
      },
      getListByiId() {
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

  .img{
    width: 150px;
    height: 150px;
    float: left;
    margin-right:10px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
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
