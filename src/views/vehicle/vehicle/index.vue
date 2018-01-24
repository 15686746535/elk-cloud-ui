<template xmlns:v-popover="http://www.w3.org/1999/xhtml">
  <div class="app-container calendar-list-container">
    <div v-show="showModule=='list'">
      <el-card style="margin-bottom: 5px;">

        <div class="filter-container">
          <el-form ref="listQuery" :model="listQuery" inline label-width="80px">
            <el-form-item label="车牌">
              <el-select v-model="listQuery.plate" placeholder="请选择车牌">
                <el-option v-for="item in plates" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="负责人">
              <el-select v-model="listQuery.username" placeholder="请选择负责人">
                <el-option v-for="item in userNames" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="车辆来源">
              <dict type="dict_sex" v-model="listQuery.vehicleState" ></dict>
            </el-form-item>
            <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>

            <el-button class="filter-item" type="primary" v-waves icon="search" @click="search">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="create">添加</el-button>
          </el-form>
        </div>
      </el-card>
      <el-card>

        <!-- 身份卡循环 -->
        <el-table :data="list" height="500" border style="width: 100%"  highlight-current-row @row-dblclick="editlist" v-loading="listLoading" element-loading-text="给我一点时间">
          <el-table-column label="编号" width="100px">
              <template slot-scope="scope">
              <span>{{scope.row.vehicleEntity.vehicleId}}</span>
            </template>
          </el-table-column>
            <!-- 基本信息 -->
          <el-table-column label="基本信息">
            <template slot-scope="scope">
              <img :src="scope.row.vehicleEntity.vehiclePhoto" class="img">  <!-- 车辆图片 -->
              <div style="float: left;width: 200px;height: 20px ">
                <p style="color: #868686;width: 100px;float: left;margin-top: 10px">车辆牌照：</p><p style="float: left">{{scope.row.vehicleEntity.plateNumber}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px;margin-top: 10px">
                <p style="color: #868686;width: 100px;float: left">使用责任人：</p><p style="float: left">{{scope.row.vehicleEntity.name}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px ;margin-top: 10px">
                <p style="color: #868686;width: 100px;float: left">所属机构：</p><p style="float: left">{{scope.row.vehicleEntity.affiliation}}</p>
              </div>
              <div style="float: left;width: 200px;height: 20px  ;margin-top: 10px">
                <p style="color: #868686;width: 100px;float: left">车辆状态：</p><p style="float: left">{{scope.row.vehicleEntity.vehicleState}}</p>
              </div>
            </template>
          </el-table-column>

          <!-- 证件信息 -->
          <el-table-column label="证件信息">
            <template slot-scope="scope">
              <!--<div style="width: 200px;height: 20px ">-->
                <!--<p style="color: #868686;width: 140px;float: left;margin-top: 10px">标识卡到期日期：</p><p style="float: left">{{scope.row.certificateEntity.identificationEnd}}</p>-->
              <!--</div>-->
              <!--<div style="width: 200px;height: 20px;margin-top: 10px">-->
                <!--<p style="color: #868686;width: 140px;float: left">评定日期：</p><p style="float: left">{{scope.row.certificateEntity.evaluation}}</p>-->
              <!--</div>-->
              <!--<div style="width: 200px;height: 20px ;margin-top: 10px">-->
                <!--<p style="color: #868686;width: 140px;float: left">强制报销日期：</p><p style="float: left">{{scope.row.certificateEntity.scrap}}</p>-->
              <!--</div>-->
            </template>
          </el-table-column>

            <!-- 技术信息 -->
          <el-table-column label="技术信息">
            <template slot-scope="scope">
              <div style="width: 200px;height: 20px ">
                <p style="color: #868686;width: 140px;float: left;margin-top: 10px">排量/功率：</p><p style="float: left">{{scope.row.technicalEntity.displacement}}</p>
              </div>
              <div style="width: 200px;height: 20px;margin-top: 10px">
                <p style="color: #868686;width: 140px;float: left">总质量：</p><p style="float: left">{{scope.row.technicalEntity.weight}}</p>
              </div>
              <div style="width: 200px;height: 20px ;margin-top: 10px">
                <p style="color: #868686;width: 140px;float: left">制造厂商名称：</p><p style="float: left">{{scope.row.technicalEntity.manufacturer}}</p>
              </div>
            </template>
          </el-table-column>

            <!-- 安全信息 -->
          <el-table-column label="证件信息">
            <template slot-scope="scope">
              <!--<div style="width: 200px;height: 20px ">-->
                <!--<p style="color: #868686;width: 140px;float: left;margin-top: 10px">安装GPS：</p><p style="float: left">{{scope.row.safetyEntity.gps}}</p>-->
              <!--</div>-->
              <!--<div style="width: 200px;height: 20px;margin-top: 10px">-->
                <!--<p style="color: #868686;width: 140px;float: left">三角架：</p><p style="float: left">{{scope.row.safetyEntity.tripod}}</p>-->
              <!--</div>-->
              <!--<div style="width: 200px;height: 20px ;margin-top: 10px">-->
                <!--<p style="color: #868686;width: 140px;float: left">发动机灭火器：</p><p style="float: left">{{scope.row.safetyEntity.extinguisher}}</p>-->
              <!--</div>-->
            </template>
          </el-table-column>


        </el-table>


        <div v-show="!listLoading" class="pagination-container">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page"
                         :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </el-card>
    </div>
    <div v-show="showModule=='info'">
      <el-card  class="box-card1">

        <div slot="header" class="clearfix">
          |&nbsp;<span style="font-weight: 600">基础信息</span>
          <el-button type="primary" style="width: 174px;float: right" @click="back">返回</el-button>
        </div>

        <el-form :inline="true"  :model="vehicle" label	 label-width="100px" label-position="left" class="demo-form-inline">
          <div style="width: 240px; height: 400px;float: left;">
            <img width="100%" height="100%" :src="vehicle.vehicleInfo.vehiclePhoto" class="image">
            <el-button type="primary" style="width: 200px;" >更换照片</el-button>
            <br>
            <br>
            <!-- 车牌颜色 -->
            <el-form-item  label-width="82px" label="车牌颜色:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.plateColor}}</span>
              <Dict type="dict_sex" v-else  style="width: 120px" v-model="vehicle.vehicleInfo.plateColor" ></Dict>
            </el-form-item>
            <br>
            <el-form-item label-width="82px" label="车身颜色:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.carColor}}</span>
              <el-input  v-else v-model="vehicle.vehicleInfo.carColor" style="width: 120px" placeholder="车身颜色"></el-input>
            </el-form-item>

          </div>

          <!--<div style="margin-left:220px; width: 1400px;height: 120px;">-->


          <el-col :span="6">
            <el-form-item label="自编号:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.number}}</span>
              <el-input v-else  v-model="vehicle.vehicleInfo.number" style="width: 240px" placeholder="自编号"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="使用责任人" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.name}}</span>
              <el-select v-else v-model="vehicle.vehicleInfo.name" style="width: 240px" placeholder="使用责任人">
                <el-option label="使用责任人一" value="shanghai"></el-option>
                <el-option label="使用责任人二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="所属机构:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.affiliation}}</span>
              <el-input v-else  v-model="vehicle.vehicleInfo.affiliation" style="width: 240px" placeholder="所属机构"></el-input>
            </el-form-item>
          </el-col>

          <!--<div style="border-bottom:1px solid #001528;margin-left:220px; width: 1010px;"></div>    | subTime-->


          <!-- 车辆牌照 -->
          <el-col :span="6">
            <el-form-item label="车辆牌照:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.plateNumber}}</span>
              <span v-else >
              <el-input  v-model="vehicle.vehicleInfo.plateNumber" style="width: 240px" placeholder="车辆牌照"></el-input>
              <el-popover ref="popover" placement="top-start" title="提示" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
              </el-popover>
              <i class="el-icon-question" v-popover:popover></i>
            </span>
            </el-form-item>
          </el-col>
          <!-- 原车辆牌照 -->
          <el-col :span="6">
            <el-form-item label="原车辆牌照:">
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.oldPlateNumber}}</span>
              <el-input  v-else v-model="vehicle.vehicleInfo.oldPlateNumber" style="width: 240px" placeholder="原车辆牌照"></el-input>
            </el-form-item>
          </el-col>

          <!-- 车辆来源 -->
          <el-col :span="6">
            <el-form-item label="车辆来源:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.vehicleState}}</span>
              <Dict type="dict_sex" v-else  style="width: 240px" v-model="vehicle.vehicleInfo.vehicleState" placeholder="车辆来源" ></Dict>
              <!--<el-input v-else  v-model="vehicle.mobile" placeholder="车辆来源"  style="width: 240px"></el-input>-->
            </el-form-item>
          </el-col>

          <!-- 发动机号 -->
          <el-col :span="6">
            <el-form-item label="发动机号:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.engineNo}}</span>
              <el-input v-else  v-model="vehicle.vehicleInfo.engineNo" placeholder="发动机号"  style="width: 240px"></el-input>
            </el-form-item>
          </el-col>

          <!-- 车架号 -->
          <el-col :span="10">
            <el-form-item label="车架号:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.vinNo}}</span>
              <el-input v-else  v-model="vehicle.vehicleInfo.vinNo" placeholder="车架号"  style="width: 240px"></el-input>
            </el-form-item>
          </el-col>


          <!-- 车辆类别 -->
          <el-col :span="6">
            <el-form-item label="车辆类别:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.vehicleType}}</span>
              <Dict type="dict_sex" v-else  style="width: 240px" v-model="vehicle.vehicleInfo.vehicleType"  placeholder="车辆类别"></Dict>
              <!--<el-input v-else  v-model="vehicle.mobile" placeholder="车辆来源"  style="width: 240px"></el-input>-->
            </el-form-item>
          </el-col>

          <!-- 出厂日期 -->
          <el-col :span="6">
            <el-form-item label="出厂日期:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.factoryTime | parseTime('{y}-{m}-{d}')}}</span>
              <el-date-picker  v-else type="date" placeholder="出厂日期"  style="width: 240px" v-model="vehicle.vehicleInfo.factoryTime"></el-date-picker>
            </el-form-item>
          </el-col>

          <!-- 注册登记日期 -->
          <el-col :span="6">
            <el-form-item label="注册日期:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.registerTime | parseTime('{y}-{m}-{d}')}}</span>
              <el-date-picker  v-else type="date" placeholder="注册登记日期"  style="width: 240px" v-model="vehicle.vehicleInfo.registerTime"></el-date-picker>
            </el-form-item>
          </el-col>

          <!-- 技术等级 -->
          <el-col :span="6">
            <el-form-item label="技术等级:">
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.technicalLevel}}</span>
              <el-input v-else  v-model="vehicle.vehicleInfo.technicalLevel" placeholder="技术等级"  style="width: 240px"></el-input>
            </el-form-item>
          </el-col>

          <!-- 核定载客人 -->
          <el-col :span="6">
            <el-form-item label="核定载客人:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.allowNumber}}</span>
              <el-input v-else  v-model="vehicle.vehicleInfo.allowNumber" placeholder="核定载客人"  style="width: 240px"></el-input>
            </el-form-item>
          </el-col>

          <!-- 燃料类别 -->
          <el-col :span="6">
            <el-form-item label="燃料类别:">
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.fuelType}}</span>
              <Dict type="dict_sex" v-else  style="width: 240px" v-model="vehicle.vehicleInfo.fuelType" placeholder="燃料类别" ></Dict>
            </el-form-item>
          </el-col>


          <!-- 型号 -->
          <el-col :span="6">
            <el-form-item label="型号:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.motorcycleType}}</span>
              <el-input v-else  v-model="vehicle.vehicleInfo.motorcycleType" placeholder="型号"  style="width: 240px"></el-input>
            </el-form-item>
          </el-col>

          <!-- 厂牌 -->
          <el-col :span="6">
            <el-form-item label="厂牌:" >
              <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.vehicleEdit">{{vehicle.vehicleInfo.brand}}</span>
              <el-input v-else v-model="vehicle.vehicleInfo.brand" placeholder="厂牌"  style="width: 240px"></el-input>
            </el-form-item>
          </el-col>


          <!--<hr style="padding-top: 120px; margin-left:200px;margin-bottom: 30px; width: 980px; border: none; border-bottom:1px solid #99a9bf;"/>-->

          <el-col :span="5">
            <el-form-item v-if="!edit.vehicleEdit">
              <el-button type="primary" style="width: 150px;" @click="vehicleEditInfo">编辑信息</el-button>
            </el-form-item>

            <el-form-item v-else >
              <el-button type="primary"  style="width: 150px;" @click="cancel('vehicleEdit')">取消</el-button>
              <el-button type="primary"  style="width: 150px;" @click="vehicleSaveInfo">确认</el-button>
            </el-form-item>
          </el-col>


        </el-form>


      </el-card>
      <el-card class="box-card2">

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

          <el-tab-pane label="证件信息" name="1">
            <el-form :inline="true"  :model="vehicle" label	 label-width="160px" label-position="left" class="demo-form-inline">
              <!-- 行驶证注册登记日期 -->
              <el-col :span="8">
                <el-form-item label="行驶证注册登记日期:" >
                  <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.certificateEdit">{{vehicle.certificateInfo.drivingLicenseEnroll | subTime }}</span>
                  <el-date-picker  v-else type="date" placeholder="行驶证注册登记日期"  style="width: 240px" v-model="vehicle.certificateInfo.drivingLicenseEnroll"></el-date-picker>
                </el-form-item>
              </el-col>
              <!-- 行驶证发证日期 -->
              <el-col :span="8">
                <el-form-item label="行驶证发证日期:" >
                  <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.certificateEdit">{{vehicle.certificateInfo.drivingLicenseRelease | subTime}}</span>
                  <el-date-picker  v-else type="date" placeholder="行驶证发证日期"  style="width: 240px" v-model="vehicle.certificateInfo.drivingLicenseRelease"></el-date-picker>
                </el-form-item>
              </el-col>
              <!-- 行驶证年审有效期 -->
              <el-col :span="8">
                <el-form-item label="行驶证年审有效期:" >
                  <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.certificateEdit">{{vehicle.certificateInfo.drivingLicenseEnd | subTime}}</span>
                  <el-date-picker  v-else type="date" placeholder="行驶证年审有效期"  style="width: 240px" v-model="vehicle.certificateInfo.drivingLicenseEnd"></el-date-picker>
                </el-form-item>
              </el-col>

              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:1px solid #d3dce6; "/> </el-col>

              <!-- 道路运输证号 -->
              <el-col :span="8">
                <el-form-item label="道路运输证号:" >
                  <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.certificateEdit">{{vehicle.certificateInfo.roadTransport}}</span>
                  <el-date-picker  v-else type="date" placeholder="道路运输证号"  style="width: 240px" v-model="vehicle.certificateInfo.roadTransport"></el-date-picker>
                </el-form-item>
              </el-col>
              <!-- 道路运输发证日期 -->
              <el-col :span="8">
                <el-form-item label="道路运输发证日期:" >
                  <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.certificateEdit">{{vehicle.certificateInfo.roadTransportStart | subTime}}</span>
                  <el-date-picker  v-else type="date" placeholder="道路运输发证日期"  style="width: 240px" v-model="vehicle.certificateInfo.roadTransportStart"></el-date-picker>
                </el-form-item>
              </el-col>
              <!-- 行驶证注册登记日期 -->
              <el-col :span="8">
                <el-form-item label="道路运输年审有效期:" >
                  <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.certificateEdit">{{vehicle.certificateInfo.roadTransportEnd | subTime}}</span>
                  <el-date-picker  v-else type="date" placeholder="道路运输年审有效期"  style="width: 240px" v-model="vehicle.certificateInfo.roadTransportEnd"></el-date-picker>
                </el-form-item>
              </el-col>

              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:1px solid #d3dce6; "/> </el-col>

              <!-- 行驶证注册登记日期 -->
              <el-col :span="8">
                <el-form-item label="标识卡到期日期:" >
                  <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.certificateEdit">{{vehicle.certificateInfo.identificationEnd | subTime}}</span>
                  <el-date-picker  v-else type="date" placeholder="标识卡到期日期"  style="width: 240px" v-model="vehicle.certificateInfo.identificationEnd"></el-date-picker>
                </el-form-item>
              </el-col>
              <!-- 评定日期 -->
              <el-col :span="8">
                <el-form-item label="评定日期:" >
                  <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.certificateEdit">{{vehicle.certificateInfo.evaluation | subTime}}</span>
                  <el-date-picker  v-else type="date" placeholder="评定日期"  style="width: 240px" v-model="vehicle.certificateInfo.evaluation"></el-date-picker>
                </el-form-item>
              </el-col>
              <!-- 强制报销日期 -->
              <el-col :span="8">
                <el-form-item label="强制报销日期:" >
                  <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.certificateEdit">{{vehicle.certificateInfo.scrap | subTime}}</span>
                  <el-date-picker  v-else type="date" placeholder="强制报销日期"  style="width: 240px" v-model="vehicle.certificateInfo.scrap"></el-date-picker>
                </el-form-item>
              </el-col>

              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:1px solid #d3dce6; "/> </el-col>

              <!-- 交强险 -->
              <el-col :span="12">
                <el-form-item label="交强险:">

                  <span v-if="!edit.certificateEdit">
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateInfo.clivtaStart | subTime}}</span>
                    <span style="padding-left: 16px;font-size: 12px;">至</span>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateInfo.clivtaEnd | subTime}}</span>
                  </span>
                  <el-date-picker v-else @blur="clivtaTimeBlur" v-model="daterange.clivtaTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>

                </el-form-item>
              </el-col>


              <!-- 商业险 -->
              <el-col :span="12">
                <el-form-item label="商业险:">
                  <span v-if="!edit.certificateEdit">
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateInfo.viStart | subTime}}</span>
                    <span style="padding-left: 16px;font-size: 12px;">至</span>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateInfo.viEnd | subTime}}</span>
                  </span>
                  <el-date-picker v-else @blur="viTimeBlur" v-model="daterange.viTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <!-- 保养维修 -->
              <el-col :span="12">
                <el-form-item label="保养维修:">
                  <span v-if="!edit.certificateEdit">
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateInfo.maintenanceStart | subTime}}</span>
                    <span style="padding-left: 16px;font-size: 12px;">至</span>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateInfo.maintenanceEnd | subTime}}</span>
                  </span>
                  <el-date-picker v-else @blur="maintenanceTimeBlur" v-model="daterange.maintenanceTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>

                </el-form-item>
              </el-col>

              <!-- 气瓶 -->
              <el-col :span="12">
                <el-form-item label="气瓶:">
                  <span v-if="!edit.certificateEdit">
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateInfo.bottleStart | subTime}}</span>
                    <span style="padding-left: 16px;font-size: 12px;">至</span>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateInfo.bottleEnd | subTime}}</span>
                  </span>
                  <el-date-picker v-else @blur="bottleTimeBlur" v-model="daterange.bottleTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>

                </el-form-item>
              </el-col>

              <!-- 二维检测 -->
              <el-col :span="12">
                <el-form-item label="二维检测:">
                  <span v-if="!edit.certificateEdit">
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateInfo.twoDimensionalStart | subTime}}</span>
                    <span style="padding-left: 16px;font-size: 12px;">至</span>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateInfo.twoDimensionalEnd | subTime}}</span>
                  </span>
                  <el-date-picker v-else @blur="twoDimensionalTimeBlur" v-model="daterange.twoDimensionalTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>

                </el-form-item>
              </el-col>

              <!-- 类型等级 -->
              <el-col :span="6">
                <el-form-item label="类型等级:" >
                  <span style="padding-left: 16px;font-size: 12px;" v-if="!edit.certificateEdit">{{vehicle.certificateInfo.typeLevel }}</span>
                  <el-input v-else v-model="vehicle.certificateInfo.typeLevel" placeholder="类型等级"  style="width: 180px"></el-input>
                </el-form-item>
              </el-col>

              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:2px solid #d3dce6; "/> </el-col>

              <el-col>
                <el-form-item v-if="!edit.certificateEdit"style="float: right">
                  <el-button type="primary" style="width: 150px;" @click="certificateEditInfo">编辑信息</el-button>
                </el-form-item>

                <el-form-item v-else style="float: right">
                  <el-button type="primary"  style="width: 150px;" @click="cancel('certificateEdit')">取消</el-button>
                  <el-button type="primary"  style="width: 150px;" @click="certificateSaveInfo">确认</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </el-tab-pane>



          <el-tab-pane label="技术信息" name="2">

            <el-table :data="vehicle.technicalEntity" stripe style="width: 100%">
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
          <el-tab-pane label="安全信息" name="3">

            <el-table :data="vehicle.safetyEntity" stripe style="width: 100%">
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
          <el-tab-pane label="图片相册" name="4">角色管理</el-tab-pane>
          <el-tab-pane label="维修日志" name="5">

            <el-table :data="vehicle.repairEntityList" stripe style="width: 100%">
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
          <el-tab-pane label="保养日志" name="6">

            <el-table :data="vehicle.maintainEntityList" stripe style="width: 100%">
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
          <el-tab-pane label="费用日志" name="7">

            <el-table :data="vehicle.maintainEntityList" stripe style="width: 100%">
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
        // 车牌集合
        plates: [],
        // 负责人集合
        userNames: [],
        vehicleNotes: {},
        // 单个车辆信息
        vehicle: {
          vehicleInfo: {},
          technicalInfo: {},
          safetyInfo: {},
          certificateInfo: {},
          maintainList: [],
          repairList: []
        },
        // 车辆信息集合
        list: [],
        // 总条数
        total: null,
        listLoading: true,
        // 模块标记
        showModule: 'info',
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          roleName: null,
          plate: null,
          username: null,
          vehicleState: null
        },
        // 编辑标记
        edit: {
          vehicleEdit: false,
          certificateEdit: false
        },
        // 信息卡切换标记
        activeName: '1',
        // 时间范围
        daterange: {
          viTime: [],
          clivtaTime: [],
          maintenanceTime: [],
          bottleTime: [],
          twoDimensionalTime: []
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 时间范围分解
      viTimeBlur() {
        console.log('=============  我正在转换商业险时间范围 ================')
        this.vehicle.certificateInfo.viStart = this.daterange.viTime[0]
        this.vehicle.certificateInfo.viEnd = this.daterange.viTime[1]
        console.log('=============  完成 ================')
      },
      clivtaTimeBlur() {
        console.log('=============  我正在转换交强险时间范围 ================')
        this.vehicle.certificateInfo.clivtaStart = this.daterange.clivtaTime[0]
        this.vehicle.certificateInfo.clivtaEnd = this.daterange.clivtaTime[1]
        console.log('=============  完成 ================')
      },
      maintenanceTimeBlur() {
        console.log('=============  我正在转换保养维修时间范围 ================')
        console.log(this.daterange.maintenanceTime)
        this.vehicle.certificateInfo.maintenanceStart = this.daterange.maintenanceTime[0]
        this.vehicle.certificateInfo.maintenanceEnd = this.daterange.maintenanceTime[1]
        console.log('=============  完成 ================')
      },
      bottleTimeBlur() {
        console.log('=============  我正在转换气瓶时间范围 ================')
        this.vehicle.certificateInfo.bottleStart = this.daterange.bottleTime[0]
        this.vehicle.certificateInfo.bottleEnd = this.daterange.bottleTime[1]
        console.log('=============  完成 ================')
      },
      twoDimensionalTimeBlur() {
        console.log('=============  我正在转换二维检测时间范围 ================')
        this.vehicle.certificateInfo.twoDimensionalStart = this.daterange.twoDimensionalTime[0]
        this.vehicle.certificateInfo.twoDimensionalEnd = this.daterange.twoDimensionalTime[1]
        console.log('=============  完成 ================')
      },
      timeGroup() {
        console.log('=============  我正在给时间范围赋值 ================')
        this.daterange.viTime[0] = this.vehicle.certificateInfo.viStart == null ? '' : this.vehicle.certificateInfo.viStart
        this.daterange.viTime[1] = this.vehicle.certificateInfo.viEnd == null ? '' : this.vehicle.certificateInfo.viEnd
        this.daterange.clivtaTime[0] = this.vehicle.certificateInfo.clivtaStart == null ? '' : this.vehicle.certificateInfo.clivtaStart
        this.daterange.clivtaTime[1] = this.vehicle.certificateInfo.clivtaEnd == null ? '' : this.vehicle.certificateInfo.clivtaEnd
        this.daterange.maintenanceTime[0] = this.vehicle.certificateInfo.maintenanceStart == null ? '' : this.vehicle.certificateInfo.maintenanceStart
        this.daterange.maintenanceTime[1] = this.vehicle.certificateInfo.maintenanceEnd == null ? '' : this.vehicle.certificateInfo.maintenanceEnd
        this.daterange.bottleTime[0] = this.vehicle.certificateInfo.bottleStart == null ? '' : this.vehicle.certificateInfo.bottleStart
        this.daterange.bottleTime[1] = this.vehicle.certificateInfo.bottleEnd == null ? '' : this.vehicle.certificateInfo.bottleEnd
        this.daterange.twoDimensionalTime[0] = this.vehicle.certificateInfo.twoDimensionalStart == null ? '' : this.vehicle.certificateInfo.twoDimensionalStart
        this.daterange.twoDimensionalTime[1] = this.vehicle.certificateInfo.twoDimensionalEnd == null ? '' : this.vehicle.certificateInfo.twoDimensionalEnd
        console.log(this.vehicle.certificateInfo.viStart)
        console.log(this.vehicle.certificateInfo.viEnd)
        console.log(this.vehicle.certificateInfo.clivtaStart)
        console.log(this.vehicle.certificateInfo.clivtaEnd)
        console.log(this.vehicle.certificateInfo.bottleStart)
        console.log(this.vehicle.certificateInfo.bottleEnd)
        console.log(this.vehicle.certificateInfo.twoDimensionalStart)
        console.log(this.vehicle.certificateInfo.twoDimensionalEnd)
        console.log('=============  结束 ================')
      },
      // 获取所有车辆信息
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          console.log('=================== 这是所有车辆信息 ===================')
          console.log(response.data)
          this.list = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },
      // 改变页容量
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      // 改变当前页
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      // 新增
      create() {
        this.vehicle = {
          vehicleInfo: {},
          technicalInfo: {},
          safetyInfo: {},
          certificateInfo: {},
          maintainList: [],
          repairList: []
        }
        this.showModule = 'info'
      },
      // 返回列表
      back() {
        this.showModule = 'list'
      },
      // 修改
      update(row) {
      },
      // 搜索
      search() {
        this.listQuery.page = 1
        this.getList()
      },
      // 删除
      delete(id) {
        this.getList()
      },
      // 取消
      cancel(flag) {
        this.editlist(this.vehicleNotes)
        if (flag === 'vehicleEdit') {
          console.log('=================== 取消编辑车辆基本信息 ===================')
          this.edit.vehicleEdit = false
          console.log('=================== 完成 ===================')
        } else if (flag === 'certificateEdit') {
          console.log('=================== 车辆证书信息取消编辑 ===================')
          this.edit.certificateEdit = false
          console.log('=================== 完成 ===================')
        }
      },
      // 双击编辑
      editlist(val) {
        // this.vehicle.vehicleInfo = val.vehicleEntity
        // this.vehicle.technicalInfo = val.technicalEntity
        // this.vehicle.safetyInfo = val.safetyEntity
        // this.vehicle.certificateInfo = val.certificateEntity
        // this.vehicle.maintainList = val.maintainEntityList
        // this.vehicle.repairList = val.repairEntityList
        getObj(val.vehicleEntity.vehicleId)
          .then(response => {
            console.log('=================== 这是当前车辆的所有信息 ===================')
            console.log(response.data)
            this.vehicleNotes = response.data.data
            this.vehicle.vehicleInfo = response.data.data.vehicleEntity
            this.vehicle.technicalInfo = response.data.data.technicalEntity
            this.vehicle.safetyInfo = response.data.data.safetyEntity
            this.vehicle.certificateInfo = response.data.data.certificateEntity
            this.vehicle.maintainList = response.data.data.maintainEntityList
            this.vehicle.repairList = response.data.data.repairEntityList
          })
        this.showModule = 'info'
      },
      // 改变车辆信息标记 编辑
      vehicleEditInfo() {
        console.log('=============  编辑车辆基本信息 ================')
        this.edit.vehicleEdit = true
        console.log('=============  完成 ================')
      },
      // 改变车辆信息标记 保存
      vehicleSaveInfo() {
        console.log('=============  保存车辆基本信息 ================')
        this.edit.vehicleEdit = false
        console.log('=============  完成 ================')
      },
      // 改变车辆证书信息标记 编辑
      certificateEditInfo() {
        console.log('=============  编辑车辆证书信息 ================')
        this.timeGroup()
        this.edit.certificateEdit = true
        console.log('=============  完成 ================')
      },
      // 改变车辆证书信息标记 保存
      certificateSaveInfo() {
        console.log('=============  保存车辆证书信息 ================')
        this.edit.certificateEdit = false
        console.log('=============  完成 ================')
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
    width: 200px;
    height: 200px;
    display: block;
    float: left;
  }
  .line{
    text-align: center;
    margin-left: 10px;
    margin-right: -10px;
  }
</style>
