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
              <dict dictType="dict_sex" v-model="listQuery.vehicleState" ></dict>
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
            <img width="100%" height="100%" :src="vehicle.vehicleEntity.vehiclePhoto" class="image">
            <el-button type="primary" style="width: 200px;" >更换照片</el-button>
            <br>
            <br>
            <!-- 车牌颜色 -->
            <el-form-item  label-width="82px" label="车牌颜色:" >
              <Dict dictType="dict_sex"  v-if="edit == 'vehicle'"  style="width: 120px" v-model="vehicle.vehicleEntity.plateColor" ></Dict>
              <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.plateColor}}</span>
            </el-form-item>
            <br>
            <el-form-item label-width="82px" label="车身颜色:" >
              <el-input v-if="edit == 'vehicle'" v-model="vehicle.vehicleEntity.carColor" style="width: 120px" placeholder="车身颜色"></el-input>
              <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.carColor}}</span>
            </el-form-item>

          </div>

          <!--<div style="margin-left:220px; width: 1400px;height: 120px;">-->


          <el-col :span="6">
            <el-form-item label="自编号:" >
              <el-input v-if="edit == 'vehicle'" v-model="vehicle.vehicleEntity.number" style="width: 240px" placeholder="自编号"></el-input>
              <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.number}}</span>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="使用责任人" >
              <el-select v-if="edit === 'vehicle'" v-model="vehicle.vehicleEntity.userId" style="width: 240px" placeholder="使用责任人">
                <el-option label="使用责任人一" value="1"></el-option>
                <el-option label="使用责任人二" value="1"></el-option>
              </el-select>
              <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.name}}</span>
            </el-form-item>
          </el-col>


          <el-col :span="6">
            <el-form-item label="所属机构:" >
              <el-input v-if="edit === 'vehicle'" v-model="vehicle.vehicleEntity.affiliation" style="width: 240px" placeholder="所属机构"></el-input>
              <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.affiliation}}</span>
            </el-form-item>
          </el-col>

          <!--<div style="border-bottom:1px solid #001528;margin-left:220px; width: 1010px;"></div>    | subTime-->


          <!-- 车辆牌照 -->
          <el-col :span="6">
            <el-form-item label="车辆牌照:" >
              <span v-if="edit === 'vehicle'">
                <el-input  v-model="vehicle.vehicleEntity.plateNumber" style="width: 240px" placeholder="车辆牌照"></el-input>
                <el-popover ref="popover" placement="top-start" title="提示" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                </el-popover>
                <i class="el-icon-question" v-popover:popover></i>
              </span>
              <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.plateNumber}}</span>
            </el-form-item>
          </el-col>
          <!-- 原车辆牌照 -->
          <el-col :span="6">
            <el-form-item label="原车辆牌照:">
              <el-input  v-if="edit === 'vehicle'" v-model="vehicle.vehicleEntity.oldPlateNumber" style="width: 240px" placeholder="原车辆牌照"></el-input>
              <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.oldPlateNumber}}</span>
            </el-form-item>
          </el-col>

          <!-- 车辆来源 -->
          <el-col :span="6">
            <el-form-item label="车辆来源:" >
              <Dict dictType="dict_sex"  v-if="edit === 'vehicle'" style="width: 240px" v-model="vehicle.vehicleEntity.vehicleState" placeholder="车辆来源" ></Dict>
              <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.vehicleState}}</span>
            </el-form-item>
          </el-col>

          <!-- 发动机号 -->
          <el-col :span="6">
            <el-form-item label="发动机号:" >
              <el-input  v-if="edit === 'vehicle'" v-model="vehicle.vehicleEntity.engineNo" placeholder="发动机号"  style="width: 240px"></el-input>
              <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.engineNo}}</span>
            </el-form-item>
          </el-col>

          <!-- 车架号 -->
          <el-col :span="10">
            <el-form-item label="车架号:" >
              <el-input v-if="edit === 'vehicle'" v-model="vehicle.vehicleEntity.vinNo" placeholder="车架号"  style="width: 240px"></el-input>
              <span style="padding-left: 16px;font-size: 12px;"  v-else >{{vehicle.vehicleEntity.vinNo}}</span>
            </el-form-item>
          </el-col>


          <!-- 车辆类别 -->
          <el-col :span="6">
            <el-form-item label="车辆类别:" >
              <Dict dictType="dict_sex" v-if="edit === 'vehicle'" style="width: 240px" v-model="vehicle.vehicleEntity.vehicleType"  placeholder="车辆类别"></Dict>
              <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.vehicleType}}</span>
            </el-form-item>
          </el-col>

          <!-- 出厂日期 -->
          <el-col :span="6">
            <el-form-item label="出厂日期:" >
              <el-date-picker v-if="edit === 'vehicle'" type="date" placeholder="出厂日期"  style="width: 240px" v-model="vehicle.vehicleEntity.factoryTime"></el-date-picker>
              <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.factoryTime | parseTime('{y}-{m}-{d}')}}</span>
            </el-form-item>
          </el-col>

          <!-- 注册登记日期 -->
          <el-col :span="6">
            <el-form-item label="注册日期:" >
              <el-date-picker  v-if="edit === 'vehicle'" type="date" placeholder="注册登记日期"  style="width: 240px" v-model="vehicle.vehicleEntity.registerTime"></el-date-picker>
              <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.registerTime | parseTime('{y}-{m}-{d}')}}</span>
            </el-form-item>
          </el-col>

          <!-- 技术等级 -->
          <el-col :span="6">
            <el-form-item label="技术等级:">
              <el-input v-if="edit === 'vehicle'" v-model="vehicle.vehicleEntity.technicalLevel" placeholder="技术等级"  style="width: 240px"></el-input>
              <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.technicalLevel}}</span>
            </el-form-item>
          </el-col>

          <!-- 核定载客人 -->
          <el-col :span="6">
            <el-form-item label="核定载客人:" >
              <el-input v-if="edit === 'vehicle'" v-model="vehicle.vehicleEntity.allowNumber" placeholder="核定载客人"  style="width: 240px"></el-input>
              <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.allowNumber}}</span>
            </el-form-item>
          </el-col>

          <!-- 燃料类别 -->
          <el-col :span="6">
            <el-form-item label="燃料类别:">
              <Dict dictType="dict_sex" v-if="edit === 'vehicle'" style="width: 240px" v-model="vehicle.vehicleEntity.fuelType" placeholder="燃料类别" ></Dict>
              <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.fuelType}}</span>
            </el-form-item>
          </el-col>


          <!-- 型号 -->
          <el-col :span="6">
            <el-form-item label="型号:" >
              <el-input v-if="edit === 'vehicle'" v-model="vehicle.vehicleEntity.motorcycleType" placeholder="型号"  style="width: 240px"></el-input>
              <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.motorcycleType}}</span>
            </el-form-item>
          </el-col>

          <!-- 厂牌 -->
          <el-col :span="6">
            <el-form-item label="厂牌:" >
              <el-input v-model="vehicle.vehicleEntity.brand" placeholder="厂牌"  v-if="edit === 'vehicle'" style="width: 240px"></el-input>
              <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.brand}}</span>
            </el-form-item>
          </el-col>


          <!--<hr style="padding-top: 120px; margin-left:200px;margin-bottom: 30px; width: 980px; border: none; border-bottom:1px solid #99a9bf;"/>-->

          <el-col :span="5">

            <el-form-item v-if="edit === 'vehicle'">
              <el-button v-if="!addInfo" type="primary" style="width: 150px;" @click="cancel">取消</el-button>
              <el-button v-if="addInfo" type="primary" style="width: 150px;" @click="add('vehicle',vehicle.vehicleEntity)">确认保存</el-button>
              <el-button v-if="!addInfo" type="primary" style="width: 150px;" @click="update('vehicle',vehicle.vehicleEntity)">确认修改</el-button>
            </el-form-item>


            <el-form-item v-else>
              <el-button type="primary" style="width: 150px;" @click="editInfo('vehicle')">编辑信息</el-button>
            </el-form-item>


          </el-col>


        </el-form>


      </el-card>
      <!--<el-card class="box-card2" v-show="vehicle.vehicleEntity.vehicleId != null">-->

        <el-tabs v-model="activeName" v-if="vehicle.vehicleEntity.vehicleId" type="border-card" @tab-click="handleClick" style="margin-top: 10px" >

          <el-tab-pane label="证件信息" name="1">
            <el-form :inline="true"  :model="vehicle" label	 label-width="160px" label-position="left" class="demo-form-inline">
              <!-- 行驶证注册登记日期 -->
              <el-col :span="8">
                <el-form-item label="行驶证注册登记日期:" >
                  <el-date-picker v-if="edit === 'certificate'" type="date" placeholder="行驶证注册登记日期"   v-model="vehicle.certificateEntity.drivingLicenseEnroll"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.certificateEntity.drivingLicenseEnroll | subTime }}</span>
                </el-form-item>
              </el-col>
              <!-- 行驶证发证日期 -->
              <el-col :span="8">
                <el-form-item label="行驶证发证日期:" >
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="行驶证发证日期" style="width: 100%"   v-model="vehicle.certificateEntity.drivingLicenseRelease"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.drivingLicenseRelease | subTime}}</span>
                </el-form-item>
              </el-col>
              <!-- 行驶证年审有效期 -->
                <el-col :span="8">
                <el-form-item label="行驶证年审有效期:" >
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="行驶证年审有效期"   v-model="vehicle.certificateEntity.drivingLicenseEnd"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.drivingLicenseEnd | subTime}}</span>
                </el-form-item>
              </el-col>

              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:1px solid #d3dce6; "/> </el-col>

              <!-- 道路运输证号 -->
              <el-col :span="8">
                <el-form-item label="道路运输证号:" >
                  <el-input v-if="edit === 'certificate'"  v-model="vehicle.certificateEntity.roadTransport" placeholder="道路运输证号"  style="width: 240px"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.roadTransport}}</span>
                </el-form-item>
              </el-col>
              <!-- 道路运输发证日期 -->
              <el-col :span="8">
                <el-form-item label="道路运输发证日期:" >
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="道路运输发证日期"  style="width: 240px" v-model="vehicle.certificateEntity.roadTransportStart"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.roadTransportStart | subTime}}</span>
                </el-form-item>
              </el-col>
              <!-- 行驶证注册登记日期 -->
              <el-col :span="8">
                <el-form-item label="道路运输年审有效期:" >
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="道路运输年审有效期"  style="width: 240px" v-model="vehicle.certificateEntity.roadTransportEnd"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.roadTransportEnd | subTime}}</span>
                </el-form-item>
              </el-col>

              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:1px solid #d3dce6; "/> </el-col>

              <!-- 行驶证注册登记日期 -->
              <el-col :span="8">
                <el-form-item label="标识卡到期日期:" >
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="标识卡到期日期"  style="width: 240px" v-model="vehicle.certificateEntity.identificationEnd"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.identificationEnd | subTime}}</span>
                </el-form-item>
              </el-col>
              <!-- 评定日期 -->
              <el-col :span="8">
                <el-form-item label="评定日期:" >
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="评定日期"  style="width: 240px" v-model="vehicle.certificateEntity.evaluation"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.evaluation | subTime}}</span>
                </el-form-item>
              </el-col>
              <!-- 强制报销日期 -->
              <el-col :span="8">
                <el-form-item label="强制报销日期:" >
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="强制报销日期"  style="width: 240px" v-model="vehicle.certificateEntity.scrap"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.scrap | subTime}}</span>
                </el-form-item>
              </el-col>

              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:1px solid #d3dce6; "/> </el-col>

              <!-- 交强险 -->
              <el-col :span="12">
                <el-form-item label="交强险:">

                  <el-date-picker v-if="edit === 'certificate'" @blur="clivtaTimeBlur" v-model="daterange.clivtaTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.clivtaStart | subTime}}</span>
                    <span style="padding-left: 16px;font-size: 12px;">至</span>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.clivtaEnd | subTime}}</span>
                  </span>

                </el-form-item>
              </el-col>


              <!-- 商业险 -->
              <el-col :span="12">
                <el-form-item label="商业险:">
                  <el-date-picker v-if="edit === 'certificate'" @blur="viTimeBlur" v-model="daterange.viTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.viStart | subTime}}</span>
                    <span style="padding-left: 16px;font-size: 12px;">至</span>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.viEnd | subTime}}</span>
                  </span>
                </el-form-item>
              </el-col>

              <!-- 保养维修 -->
              <el-col :span="12">
                <el-form-item label="保养维修:">
                  <el-date-picker v-if="edit === 'certificate'" @blur="maintenanceTimeBlur" v-model="daterange.maintenanceTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.maintenanceStart | subTime}}</span>
                    <span style="padding-left: 16px;font-size: 12px;">至</span>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.maintenanceEnd | subTime}}</span>
                  </span>

                </el-form-item>
              </el-col>

              <!-- 气瓶 -->
              <el-col :span="12">
                <el-form-item label="气瓶:">
                  <el-date-picker v-if="edit === 'certificate'" @blur="bottleTimeBlur" v-model="daterange.bottleTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.bottleStart | subTime}}</span>
                    <span style="padding-left: 16px;font-size: 12px;">至</span>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.bottleEnd | subTime}}</span>
                  </span>

                </el-form-item>
              </el-col>

              <!-- 二维检测 -->
              <el-col :span="12">
                <el-form-item label="二维检测:">
                  <el-date-picker v-if="edit === 'certificate'" @blur="twoDimensionalTimeBlur" v-model="daterange.twoDimensionalTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.twoDimensionalStart | subTime}}</span>
                    <span style="padding-left: 16px;font-size: 12px;">至</span>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.twoDimensionalEnd | subTime}}</span>
                  </span>

                </el-form-item>
              </el-col>

              <!-- 类型等级 -->
              <el-col :span="6">
                <el-form-item label="类型等级:" >
                  <el-input v-if="edit === 'certificate'" v-model="vehicle.certificateEntity.typeLevel" placeholder="类型等级"  style="width: 180px"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.typeLevel }}</span>
                </el-form-item>
              </el-col>

              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:2px solid #d3dce6; "/> </el-col>

              <el-col>

                <el-form-item v-if="edit === 'certificate'" style="float: right">
                  <el-button type="primary"  style="width: 150px;" @click="cancel">取消</el-button>
                  <el-button type="primary"  style="width: 150px;" @click="update('certificate',vehicle.certificateEntity)">确认</el-button>
                </el-form-item>


                <el-form-item v-else style="float: right">
                  <el-button type="primary" style="width: 150px;" @click="editInfo('certificate')">编辑信息</el-button>
                </el-form-item>
              </el-col>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="技术信息" name="2">

            <el-form :inline="true"  :model="vehicle" label	 label-width="160px" label-position="left" class="demo-form-inline">

              <!-- 轴距 -->
              <el-col :span="8">
                <el-form-item label="轴距:" >
                  <el-input  v-if="edit === 'technical'" placeholder="轴距"  style="width: 240px" v-model="vehicle.technicalEntity.wheelbase"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.wheelbase}}</span>

                </el-form-item>
              </el-col>

              <!-- 前/后轮距 -->
              <el-col :span="8">
                <el-form-item label="前/后轮距:" >
                  <el-input  v-if="edit === 'technical'"  placeholder="前/后轮距"  style="width: 240px" v-model="vehicle.technicalEntity.tread"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.tread}}</span>
                </el-form-item>
              </el-col>

              <!-- 轮胎数/规格 -->
              <el-col :span="8">
                <el-form-item label="轮胎数/规格:" >
                  <el-input  v-if="edit === 'technical'"  placeholder="轮胎数/规格"  style="width: 240px" v-model="vehicle.technicalEntity.standard"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.standard}}</span>
                </el-form-item>
              </el-col>


              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:1px solid #d3dce6; "/> </el-col>

              <!-- 车长（外）mm -->
              <el-col :span="8">
                <el-form-item label="车长（外）mm:" >
                  <el-input  v-if="edit === 'technical'" placeholder="车长（外）mm"  style="width: 240px" v-model="vehicle.technicalEntity.length"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.length}}</span>
                </el-form-item>
              </el-col>

              <!-- 车宽（外）mm -->
              <el-col :span="8">
                <el-form-item label="车宽（外）mm:" >
                  <el-input  v-if="edit === 'technical'" placeholder="车宽（外）mm"  style="width: 240px" v-model="vehicle.technicalEntity.width"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.width}}</span>
                </el-form-item>
              </el-col>

              <!-- 车高（外）mm -->
              <el-col :span="8">
                <el-form-item label="车高（外）mm:" >
                  <el-input  v-if="edit === 'technical'" placeholder="车高（外）mm"  style="width: 240px" v-model="vehicle.technicalEntity.height"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.height}}</span>
                </el-form-item>
              </el-col>

              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:1px solid #d3dce6; "/> </el-col>

              <!-- 排量/功率 -->
              <el-col :span="8">
                <el-form-item label="排量/功率:" >
                  <el-input  v-if="edit === 'technical'" placeholder="排量/功率"  style="width: 240px" v-model="vehicle.technicalEntity.displacement"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.displacement}}</span>
                </el-form-item>
              </el-col>

              <!-- 转向形式 -->
              <el-col :span="8">
                <el-form-item label="转向形式:" >
                  <el-input  v-if="edit === 'technical'" placeholder="转向形式"  style="width: 240px" v-model="vehicle.technicalEntity.steering"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.steering}}</span>
                </el-form-item>
              </el-col>

              <!-- 车轴数 -->
              <el-col :span="8">
                <el-form-item label="车轴数:" >
                  <el-input  v-if="edit === 'technical'"  placeholder="车轴数"  style="width: 240px" v-model="vehicle.technicalEntity.axleNumber"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.axleNumber}}</span>
                </el-form-item>
              </el-col>

              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:1px solid #d3dce6; "/> </el-col>

              <!-- 总质量 -->
              <el-col :span="8">
                <el-form-item label="总质量:" >
                  <el-input  v-if="edit === 'technical'"  placeholder="总质量"  style="width: 240px" v-model="vehicle.technicalEntity.weight"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.weight}}</span>
                </el-form-item>
              </el-col>

              <!-- 国产/进口 -->
              <el-col :span="8">
                <el-form-item label="国产/进口:" >
                  <el-input  v-if="edit === 'technical'"  placeholder="国产/进口"  style="width: 240px" v-model="vehicle.technicalEntity.origin"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.origin}}</span>
                </el-form-item>
              </el-col>

              <!-- 制造厂商名称 -->
              <el-col :span="8">
                <el-form-item label="制造厂商名称:" >
                  <el-input  v-if="edit === 'technical'"  placeholder="制造厂商名称"  style="width: 240px" v-model="vehicle.technicalEntity.manufacturer"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.manufacturer}}</span>
                </el-form-item>
              </el-col>


              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:2px solid #d3dce6; "/> </el-col>

              <el-col>
                <el-form-item v-if="edit === 'technical'" style="float: right">
                  <el-button type="primary"  style="width: 150px;" @click="cancel">取消</el-button>
                  <el-button type="primary"  style="width: 150px;" @click="update('technical',vehicle.technicalEntity)">确认</el-button>
                </el-form-item>


                <el-form-item v-else style="float: right">
                  <el-button type="primary" style="width: 150px;" @click="editInfo('technical')">编辑信息</el-button>
                </el-form-item>
              </el-col>

            </el-form>

          </el-tab-pane>
          <el-tab-pane label="安全信息" name="3">

            <el-form :inline="true"  :model="vehicle" label	 label-width="160px" label-position="left" class="demo-form-inline">

              <!-- 安装GPS -->
              <el-col :span="8">
                <el-form-item label="安装GPS:" >
                  <el-input  v-if="edit === 'safety'"  placeholder="安装GPS"  style="width: 240px" v-model="vehicle.safetyEntity.gps"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.gps}}</span>

                </el-form-item>
              </el-col>

              <!-- 三角架 -->
              <el-col :span="8">
                <el-form-item label="三角架:" >
                  <el-input  v-if="edit === 'safety'"  placeholder="三角架"  style="width: 240px" v-model="vehicle.safetyEntity.tripod"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.tripod}}</span>
                </el-form-item>
              </el-col>

              <!-- 发动机灭火器 -->
              <el-col :span="8">
                <el-form-item label="发动机灭火器:" >
                  <el-input  v-if="edit === 'safety'"  placeholder="发动机灭火器"  style="width: 240px" v-model="vehicle.safetyEntity.extinguisher"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.extinguisher}}</span>
                </el-form-item>
              </el-col>


              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:1px solid #d3dce6; "/> </el-col>

              <!-- 副后视境 -->
              <el-col :span="8">
                <el-form-item label="副后视境:" >
                  <el-input  v-if="edit === 'safety'" placeholder="副后视境"  style="width: 240px" v-model="vehicle.safetyEntity.rearView"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.rearView}}</span>
                </el-form-item>
              </el-col>

              <!-- 副刹 -->
              <el-col :span="8">
                <el-form-item label="副刹:" >
                  <el-input  v-if="edit === 'safety'" placeholder="副刹"  style="width: 240px" v-model="vehicle.safetyEntity.brake"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.brake}}</span>
                </el-form-item>
              </el-col>

              <!-- 故障警示牌 -->
              <el-col :span="8">
                <el-form-item label="故障警示牌:" >
                  <el-input  v-if="edit === 'safety'" placeholder="故障警示牌"  style="width: 240px" v-model="vehicle.safetyEntity.faultWarning"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.faultWarning}}</span>
                </el-form-item>
              </el-col>


              <!-- 分割线 -->
              <el-col> <hr style="border: none;margin-bottom: 20px; border-bottom:2px solid #d3dce6; "/> </el-col>

              <el-col>

                <el-form-item v-if="edit === 'safety'" style="float: right">
                  <el-button type="primary"  style="width: 150px;" @click="cancel">取消</el-button>
                  <el-button type="primary"  style="width: 150px;" @click="update('safety',vehicle.safetyEntity)">确认</el-button>
                </el-form-item>

                <el-form-item v-else style="float: right">
                  <el-button type="primary" style="width: 150px;" @click="editInfo('safety')">编辑信息</el-button>
                </el-form-item>


              </el-col>

            </el-form>

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
      <!--</el-card>-->
    </div>
  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj } from '@/api/vehicle/vehicle'
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
        // 单个车辆信息
        vehicle: {
          vehicleEntity: {},
          technicalEntity: {},
          safetyEntity: {},
          certificateEntity: {},
          maintainList: [],
          repairList: []
        },
        // 车辆信息集合
        list: [],
        // 总条数
        total: null,
        listLoading: true,
        // 模块标记
        showModule: 'list',
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
        edit: '',
        // 信息卡切换标记
        activeName: '1',
        // 时间范围
        daterange: {
          viTime: [],
          clivtaTime: [],
          maintenanceTime: [],
          bottleTime: [],
          twoDimensionalTime: []
        },
        addInfo: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 时间范围分解
      viTimeBlur() {
        console.log('=============  我正在转换商业险时间范围 ================')
        this.vehicle.certificateEntity.viStart = this.daterange.viTime[0]
        this.vehicle.certificateEntity.viEnd = this.daterange.viTime[1]
        console.log('=============  完成 ================')
      },
      clivtaTimeBlur() {
        console.log('=============  我正在转换交强险时间范围 ================')
        this.vehicle.certificateEntity.clivtaStart = this.daterange.clivtaTime[0]
        this.vehicle.certificateEntity.clivtaEnd = this.daterange.clivtaTime[1]
        console.log('=============  完成 ================')
      },
      maintenanceTimeBlur() {
        console.log('=============  我正在转换保养维修时间范围 ================')
        console.log(this.daterange.maintenanceTime)
        this.vehicle.certificateEntity.maintenanceStart = this.daterange.maintenanceTime[0]
        this.vehicle.certificateEntity.maintenanceEnd = this.daterange.maintenanceTime[1]
        console.log('=============  完成 ================')
      },
      bottleTimeBlur() {
        console.log('=============  我正在转换气瓶时间范围 ================')
        this.vehicle.certificateEntity.bottleStart = this.daterange.bottleTime[0]
        this.vehicle.certificateEntity.bottleEnd = this.daterange.bottleTime[1]
        console.log('=============  完成 ================')
      },
      twoDimensionalTimeBlur() {
        console.log('=============  我正在转换二维检测时间范围 ================')
        this.vehicle.certificateEntity.twoDimensionalStart = this.daterange.twoDimensionalTime[0]
        this.vehicle.certificateEntity.twoDimensionalEnd = this.daterange.twoDimensionalTime[1]
        console.log('=============  完成 ================')
      },
      timeGroup() {
        console.log('=============  我正在给时间范围赋值 ================')
        this.daterange.viTime[0] = this.vehicle.certificateEntity.viStart == null ? '' : this.vehicle.certificateEntity.viStart
        this.daterange.viTime[1] = this.vehicle.certificateEntity.viEnd == null ? '' : this.vehicle.certificateEntity.viEnd
        this.daterange.clivtaTime[0] = this.vehicle.certificateEntity.clivtaStart == null ? '' : this.vehicle.certificateEntity.clivtaStart
        this.daterange.clivtaTime[1] = this.vehicle.certificateEntity.clivtaEnd == null ? '' : this.vehicle.certificateEntity.clivtaEnd
        this.daterange.maintenanceTime[0] = this.vehicle.certificateEntity.maintenanceStart == null ? '' : this.vehicle.certificateEntity.maintenanceStart
        this.daterange.maintenanceTime[1] = this.vehicle.certificateEntity.maintenanceEnd == null ? '' : this.vehicle.certificateEntity.maintenanceEnd
        this.daterange.bottleTime[0] = this.vehicle.certificateEntity.bottleStart == null ? '' : this.vehicle.certificateEntity.bottleStart
        this.daterange.bottleTime[1] = this.vehicle.certificateEntity.bottleEnd == null ? '' : this.vehicle.certificateEntity.bottleEnd
        this.daterange.twoDimensionalTime[0] = this.vehicle.certificateEntity.twoDimensionalStart == null ? '' : this.vehicle.certificateEntity.twoDimensionalStart
        this.daterange.twoDimensionalTime[1] = this.vehicle.certificateEntity.twoDimensionalEnd == null ? '' : this.vehicle.certificateEntity.twoDimensionalEnd
        console.log('=============  结束  ================')
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
          vehicleEntity: {},
          technicalEntity: {},
          safetyEntity: {},
          certificateEntity: {},
          maintainList: [],
          repairList: []
        }
        this.addInfo = true
        this.edit = 'vehicle'
        this.showModule = 'info'
      },
      // 返回列表
      back() {
        this.getList()
        this.edit = ''
        this.showModule = 'list'
      },
      // 添加
      add(key, obj) {
        addObj(key, obj).then(response => {
          console.log('这里是===========================')
          this.vehicle.vehicleEntity.vehicleId = response.data.data
          console.log(this.vehicle.vehicleEntity.vehicleId)
        })
        this.edit = ''
      },
      // 修改
      update(key, obj) {
        putObj(key, obj).then(response => {
          console.log(response.data)
        })
        this.edit = ''
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
      cancel() {
        console.log('=================== 正在完成取消操作 ===================')
        this.editlist(this.vehicle)
        this.showModule = 'info'
        console.log('=================== 完成 ===================')
      },
      // 双击编辑
      editlist(val) {
        // this.vehicle.vehicleEntity = val.vehicleEntity
        // this.vehicle.technicalInfo = val.technicalEntity
        // this.vehicle.safetyEntity = val.safetyEntity
        // this.vehicle.certificateEntity = val.certificateEntity
        // this.vehicle.maintainList = val.maintainEntityList
        // this.vehicle.repairList = val.repairEntityList
        getObj(val.vehicleEntity.vehicleId)
          .then(response => {
            console.log('=================== 这是当前车辆的所有信息 ===================')
            console.log(response.data)
            // this.vehicleNotes = response.data.data
            this.vehicle.vehicleEntity = response.data.data.vehicleEntity
            this.vehicle.technicalEntity = response.data.data.technicalEntity
            this.vehicle.safetyEntity = response.data.data.safetyEntity
            this.vehicle.certificateEntity = response.data.data.certificateEntity
            this.vehicle.maintainList = response.data.data.maintainEntityList
            this.vehicle.repairList = response.data.data.repairEntityList
            this.timeGroup()
          })
        this.showModule = 'info'
        this.edit = ''
        this.addInfo = false
      },
      // 所有编辑方法
      editInfo(key) {
        if (this.edit === 'vehicle') {
          this.update(this.edit, this.vehicle.vehicleEntity)
        } else if (this.edit === 'technical') {
          this.update(this.edit, this.vehicle.technicalEntity)
        } else if (this.edit === 'safety') {
          this.update(this.edit, this.vehicle.safetyEntity)
        } else if (this.edit === 'certificate') {
          this.update(this.edit, this.vehicle.certificateEntity)
        }
        this.editlist(this.vehicle)
        this.edit = key
      },
      handleClick(tab, event) {
        console.log(tab)
        console.log(event)
        console.log(this.activeName)
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
