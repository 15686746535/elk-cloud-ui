<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div v-show="showModule=='list'">

      <el-card style="margin-bottom: 5px;">
        <el-row :gutter="20">
          <el-col :xs="6" :sm="5" :md="4" :lg="4">
            <el-select style="width: 100%" v-model="listQuery.plate" placeholder="请选择车牌">
              <el-option v-for="item in plates" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="6" :sm="5" :md="4" :lg="4">
            <el-select style="width: 100%" v-model="listQuery.username" placeholder="请选择负责人">
              <el-option v-for="item in userNames" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :xs="0" :sm="5" :md="4" :lg="4">
            <dict dictType="dict_source"  style="width: 100%" v-model="listQuery.vehicleState" placeholder="请选择车辆状态"></dict>
          </el-col>
          <el-col :xs="6" :sm="5" :md="4" :lg="4">
            <el-input @keyup.enter.native="searchClick" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>
          </el-col>
          <el-col :span="4">
            <el-button class="filter-item" type="primary" icon="search" @click="searchClick"><i class="el-icon-search"></i>搜索</el-button>
          </el-col>
        </el-row>
      </el-card>
      <el-card :style="{height: ($store.state.app.client.height - 125) + 'px'}">


        <el-table :data="list" :height="($store.state.app.client.height - 215)" border style="width: 100%"  highlight-current-row @row-dblclick="editList" v-loading="listLoading" element-loading-text="给我一点时间">
          <!--<el-table-column align="center" label="编号" width="50px">-->
              <!--<template slot-scope="scope">-->
              <!--<span>{{scope.row.vehicleEntity.vehicleId}}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
            <!-- 基本信息 -->
          <el-table-column align="center" label="基本信息">
            <template slot-scope="scope">
              <el-row :gutter="10">
                <el-col :span="10">
                  <el-row><img width="100%" height="100%" :src="scope.row.vehicleEntity.vehiclePhoto"></el-row>  <!-- 车辆图片 -->
                </el-col>
                <el-col style="text-align: left;color: #868686;" :span="14">
                  <el-row style="margin: 12px 0;">车辆牌照：{{scope.row.vehicleEntity==null?null:scope.row.vehicleEntity.plateNumber}}</el-row>
                  <el-row style="margin: 12px 0;">使用责任人：{{scope.row.vehicleEntity==null?null:scope.row.vehicleEntity.name}}</el-row>
                  <el-row style="margin: 12px 0;">所属机构：{{scope.row.vehicleEntity==null?null:scope.row.vehicleEntity.affiliation}}</el-row>
                  <el-row style="margin: 12px 0;">车辆状态：{{scope.row.vehicleEntity==null?null:scope.row.vehicleEntity.vehicleState}}</el-row>
                </el-col>
              </el-row>

            </template>
          </el-table-column>

          <!-- 证件信息 -->
          <el-table-column align="center" label="证件信息">
            <template slot-scope="scope">
              <el-col style="text-align: left;color: #868686;">
                <el-row style="margin: 12px 0;">标识卡到期日期：{{scope.row.certificateEntity==null?null:scope.row.certificateEntity.identificationEnd | subTime}}</el-row>

                <el-row style="margin: 12px 0;">评定日期：{{scope.row.certificateEntity==null?null:scope.row.certificateEntity.evaluation | subTime}}</el-row>
                <el-row style="margin: 12px 0;">强制报销日期：{{scope.row.certificateEntity==null?null:scope.row.certificateEntity.scrap | subTime}}</el-row>
              </el-col>

            </template>
          </el-table-column>

            <!-- 技术信息 -->
          <el-table-column align="center" label="技术信息">
            <template slot-scope="scope">

              <el-col style="text-align: left;color: #868686;">
                <el-row style="margin: 12px 0;">排量/功率：{{scope.row.technicalEntity==null?null:scope.row.technicalEntity.displacement}}</el-row>

                <el-row style="margin: 12px 0;">总质量：{{scope.row.technicalEntity==null?null:scope.row.technicalEntity.weight}}</el-row>
                <el-row style="margin: 12px 0;">制造厂商名称：{{scope.row.technicalEntity==null?null:scope.row.technicalEntity.manufacturer}}</el-row>
              </el-col>


            </template>
          </el-table-column>

            <!-- 安全信息 -->
          <el-table-column align="center" label="证件信息">
            <template slot-scope="scope">
              <el-col style="text-align: left;color: #868686;">
                <el-row style="margin: 12px 0;">安装GPS：{{scope.row.safetyEntity==null?null:scope.row.safetyEntity.gps}}</el-row>

                <el-row style="margin: 12px 0;">三角架：{{scope.row.safetyEntity==null?null:scope.row.safetyEntity.tripod}}</el-row>
                <el-row style="margin: 12px 0;">发动机灭火器：{{scope.row.safetyEntity==null?null:scope.row.safetyEntity.extinguisher}}</el-row>
              </el-col>

            </template>
          </el-table-column>


        </el-table>


        <div v-show="!listLoading" style="margin-top: 20px">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page.sync="listQuery.page" background
                         :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                         style="float: left"
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
          <el-button style="float: right" @click="create" type="primary"><i class="el-icon-plus"></i>添加</el-button>
        </div>
      </el-card>
    </div>

    <div v-show="showModule=='info'">
      <!--<el-card shadow="hover" body-style="padding:0" style="height: 350px">-->
        <!--<div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">-->
          <!--<div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">-->
            <!--基础信息-->
          <!--</div>-->
        <!--</div>-->



      <!--</el-card>-->
      <el-card body-style="padding:0">
        <div slot="header" class="clearfix">
          |&nbsp;<span v-if="addInfo" style="line-height: 40px;font-weight: 600">车辆添加</span>
          <span v-else style="line-height: 40px;font-weight: 600">车辆编辑</span>
          <el-button type="primary" style="float: right" @click="back"><i class="el-icon-back"></i> 返 回</el-button>
        </div>
        <el-form :model="vehicle" :rules="vehicleRules" ref="vehicle" label-position="left" label-width="100px">

          <!-- 基础信息 -->
          <el-card shadow="never" body-style="padding:0">
            <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
              <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                基础信息
              </div>
            </div>
            <div style="padding:20px;">
              <el-row>
                <el-col style="width: 300px;margin-right: 22px">
                  <el-row style="margin-bottom: 4px;">
                    <el-upload :disabled="!edit" class="avatar-uploader" style="width: 128px;height: 128px;" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                      <img v-if="vehicle.vehicleEntity.vehiclePhoto" :src="vehicle.vehicleEntity.vehiclePhoto" class="avatar"  style="width: 128px;height: 128px;" >
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-row>
                  <el-row style="height: 62px;">
                    <el-form-item prop="plateColor">
                      <span slot="label" class="text_css">车牌颜色</span>
                      <el-input v-if="edit" v-model="vehicle.vehicleEntity.plateColor"  placeholder="车牌颜色"></el-input>
                      <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.plateColor}}</span>
                    </el-form-item>
                  </el-row>
                  <el-row style="height: 62px;">
                    <el-form-item prop="carColor">
                      <span slot="label" class="text_css">车身颜色</span>
                      <el-input v-if="edit" v-model="vehicle.vehicleEntity.carColor" placeholder="车身颜色"></el-input>
                      <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.carColor}}</span>
                    </el-form-item>
                  </el-row>
                  <el-row style="height: 62px;">
                    <el-form-item prop="vehicleEntity.number">
                      <span slot="label" class="text_css">自编号</span>
                      <el-input v-if="edit"  v-model="vehicle.vehicleEntity.number" placeholder="自编号"></el-input>
                      <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.number}}</span>
                    </el-form-item>
                  </el-row>
                </el-col>
                <el-col :style="{width: ($store.state.app.client.width - 400) + 'px'}">

                  <el-row :gutter="10" style="height: 62px;">
                    <el-col :span="8">
                      <el-form-item prop="vehicleType">
                        <span slot="label" class="text_css">车辆类别</span>
                        <el-input v-if="edit"  v-model="vehicle.vehicleEntity.vehicleType" placeholder="车辆类别"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.vehicleType}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="vehicleState">
                        <span slot="label" class="text_css">车辆来源</span>
                        <el-input v-if="edit" v-model="vehicle.vehicleEntity.vehicleState" placeholder="车辆来源" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.vehicleState}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="plateNumber">
                        <span slot="label" class="text_css">车辆牌照</span>
                        <el-input v-if="edit"  v-model="vehicle.vehicleEntity.plateNumber" placeholder="车辆牌照"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.plateNumber}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="10" style="height: 62px;">
                    <el-col :span="8">
                      <el-form-item prop="factoryTime">
                        <span slot="label" class="text_css">出厂日期</span>
                        <el-date-picker value-format="timestamp" style="width: 100%" v-if="edit" type="date" placeholder="出厂日期" v-model="vehicle.vehicleEntity.factoryTime"></el-date-picker>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.factoryTime | subTime}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="registerTime">
                        <span slot="label" class="text_css">注册登记日期</span>
                        <el-date-picker value-format="timestamp" style="width: 100%" v-if="edit" type="date" placeholder="注册登记日期" v-model="vehicle.vehicleEntity.registerTime"></el-date-picker>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.registerTime | subTime}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="oldPlateNumber">
                        <span slot="label" class="text_css">原车辆牌照</span>
                        <el-input v-if="edit" v-model="vehicle.vehicleEntity.oldPlateNumber" placeholder="原车辆牌照"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.oldPlateNumber}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="10" style="height: 62px;">
                    <el-col :span="8">
                      <el-form-item prop="vinNo">
                        <span slot="label" class="text_css">车架号</span>
                        <el-input v-if="edit" v-model="vehicle.vehicleEntity.vinNo" placeholder="车架号"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.vinNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="engineNo">
                        <span slot="label" class="text_css">发动机号</span>
                        <el-input v-if="edit" v-model="vehicle.vehicleEntity.engineNo" placeholder="发动机号"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.engineNo}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="motorcycleType">
                        <span slot="label" class="text_css">型号</span>
                        <el-input v-if="edit" v-model="vehicle.vehicleEntity.motorcycleType" placeholder="型号"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.motorcycleType}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="10" style="height: 62px;">
                    <el-col :span="8">
                      <el-form-item prop="fuelType">
                        <span slot="label" class="text_css">燃料类别</span>
                        <el-input v-if="edit" v-model="vehicle.vehicleEntity.fuelType" placeholder="燃料类别" ></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.fuelType}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="allowNumber">
                        <span slot="label" class="text_css">核定载客人</span>
                        <el-input v-if="edit"  v-model="vehicle.vehicleEntity.allowNumber" placeholder="核定载客人"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.allowNumber}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="brand">
                        <span slot="label" class="text_css">厂牌</span>
                        <el-input v-if="edit" v-model="vehicle.vehicleEntity.brand" placeholder="厂牌"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.brand}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row :gutter="10" style="height: 62px;">
                    <el-col :span="8">
                      <el-form-item prop="technicalLevel">
                        <span slot="label" class="text_css">技术等级</span>
                        <el-input v-if="edit"  v-model="vehicle.vehicleEntity.technicalLevel" placeholder="技术等级"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.technicalLevel}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="userId">
                        <span slot="label" class="text_css">使用责任人</span>
                        <el-input v-if="edit"  v-model="vehicle.vehicleEntity.userId" placeholder="使用责任人"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.name}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item prop="affiliation">
                        <span slot="label" class="text_css">所属机构</span>
                        <el-input v-if="edit"  v-model="vehicle.vehicleEntity.affiliation" placeholder="所属机构"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.affiliation}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </el-col>
              </el-row>
            </div>
          </el-card>

          <!-- 证件信息 -->
          <el-card shadow="never" style="margin-top: 5px" body-style="padding:0">
            <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
              <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                证件信息
              </div>
            </div>
            <div style="padding:20px;">

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="identificationEnd">
                    <span slot="label" class="text_css">标识卡有效期</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="标识卡到期日期"  style="width: 100%" v-model="vehicle.certificateEntity.identificationEnd"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.identificationEnd | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="scrap">
                    <span slot="label" class="text_css">强制报销日期</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="强制报销日期"  style="width: 100%" v-model="vehicle.certificateEntity.scrap"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.scrap | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="typeLevel">
                    <span slot="label" class="text_css">类型等级</span>
                    <el-input v-if="edit" v-model="vehicle.certificateEntity.typeLevel" placeholder="类型等级"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.typeLevel}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="clivtaTime">
                    <span slot="label" class="text_css">交强险有效期</span>
                    <el-date-picker value-format="timestamp" v-if="edit" @blur="clivtaTimeBlur" v-model="daterange.clivtaTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-else>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.clivtaStart | subTime}}</span>
                    <span style="padding-left: 16px;font-size: 12px;" v-if="vehicle.certificateEntity.clivtaStart"> - </span>
                    <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.clivtaEnd | subTime}}</span>
                  </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="viTime">
                    <span slot="label" class="text_css">商业险有效期</span>
                    <el-date-picker value-format="timestamp" v-if="edit" @blur="viTimeBlur" v-model="daterange.viTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.viStart | subTime}}</span>
                      <span style="padding-left: 16px;font-size: 12px;" v-if="vehicle.certificateEntity.viStart"> - </span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.viEnd | subTime}}</span>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="maintenanceTime">
                    <span slot="label" class="text_css">维修保养有效期</span>
                    <el-date-picker value-format="timestamp" v-if="edit" @blur="maintenanceTimeBlur" v-model="daterange.maintenanceTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.maintenanceStart | subTime}}</span>
                      <span style="padding-left: 16px;font-size: 12px;" v-if="vehicle.certificateEntity.maintenanceStart"> - </span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.maintenanceEnd | subTime}}</span>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="twoDimensionalStart">
                    <span slot="label" class="text_css">二维检测日期</span>
                    <el-date-picker value-format="timestamp" v-if="edit" @blur="twoDimensionalTimeBlur" v-model="daterange.twoDimensionalTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.twoDimensionalStart | subTime}}</span>
                      <span style="padding-left: 16px;font-size: 12px;" v-if="vehicle.certificateEntity.twoDimensionalStart"> - </span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.twoDimensionalEnd | subTime}}</span>
                    </span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="bottleTime">
                    <span slot="label" class="text_css">气瓶有效期</span>
                    <el-date-picker value-format="timestamp" v-if="edit" @blur="bottleTimeBlur" v-model="daterange.bottleTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.bottleStart | subTime}}</span>
                      <span style="padding-left: 16px;font-size: 12px;" v-if="vehicle.certificateEntity.bottleStart"> - </span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.bottleEnd | subTime}}</span>
                    </span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="6">
                  <el-form-item label-width="140px" prop="drivingLicenseEnroll">
                    <span slot="label" class="text_css">行驶证注册日期</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="行驶证注册登记日期"  style="width: 100%" v-model="vehicle.certificateEntity.drivingLicenseEnroll"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.drivingLicenseEnroll | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="140px" prop="drivingLicenseRelease">
                    <span slot="label" class="text_css">行驶证发证日期</span>
                    <el-date-picker value-format="timestamp" v-if="edit" type="date" placeholder="行驶证发证日期"  style="width: 100%" v-model="vehicle.certificateEntity.drivingLicenseRelease"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.drivingLicenseRelease | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="140px" prop="drivingLicenseRelease">
                    <span slot="label" class="text_css">行驶证有效期</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="行驶证年审有效期"  style="width: 100%" v-model="vehicle.certificateEntity.drivingLicenseEnd"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.drivingLicenseEnd | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="140px" prop="evaluation">
                    <span slot="label" class="text_css">行驶证评定期</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="行驶证评定日期"  style="width: 100%" v-model="vehicle.certificateEntity.evaluation"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.evaluation | subTime}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="roadTransport">
                    <span slot="label" class="text_css">道路运输证号</span>
                    <el-input v-if="edit"  v-model="vehicle.certificateEntity.roadTransport" placeholder="道路运输证号" ></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.roadTransport}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="roadTransportStart">
                    <span slot="label" class="text_css">道路运输发证日期</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="道路运输发证日期"  style="width: 100%" v-model="vehicle.certificateEntity.roadTransportStart"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.roadTransportStart | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="roadTransportEnd">
                    <span slot="label" class="text_css">道路运输有效期</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="道路运输年审有效期"  style="width: 100%" v-model="vehicle.certificateEntity.roadTransportEnd"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.roadTransportEnd | subTime}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <!-- 技术信息 -->
          <el-card shadow="never" style="margin-top: 5px" body-style="padding:0">
            <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
              <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                技术信息
              </div>
            </div>
            <div style="padding:20px;">

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item prop="wheelbase">
                    <span slot="label" class="text_css">轴距</span>
                    <el-input  v-if="edit" placeholder="轴距"  style="width: 100%" v-model="vehicle.technicalEntity.wheelbase"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.wheelbase}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="tread">
                    <span slot="label" class="text_css">前/后轮距</span>
                    <el-input  v-if="edit"  placeholder="前/后轮距"  style="width: 100%" v-model="vehicle.technicalEntity.tread"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.tread}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="standard">
                    <span slot="label" class="text_css">轮胎数/规格</span>
                    <el-input  v-if="edit" placeholder="轮胎数/规格"  style="width: 100%" v-model="vehicle.technicalEntity.standard"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.standard}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item label-width="130px" prop="length">
                    <span slot="label" class="text_css">车长（外）mm</span>
                    <el-input  v-if="edit" placeholder="车长（外）mm"  style="width: 100%" v-model="vehicle.technicalEntity.length"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.length}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="130px" prop="width">
                    <span slot="label" class="text_css">车宽（外）mm</span>
                    <el-input  v-if="edit"  placeholder="车宽（外）mm"  style="width: 100%" v-model="vehicle.technicalEntity.width"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.width}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="130px" prop="height">
                    <span slot="label" class="text_css">车高（外）mm</span>
                    <el-input  v-if="edit" placeholder="车高（外）mm"  style="width: 100%" v-model="vehicle.technicalEntity.height"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.height}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item prop="displacement">
                    <span slot="label" class="text_css">排量/功率</span>
                    <el-input  v-if="edit" placeholder="排量/功率"  style="width: 100%" v-model="vehicle.technicalEntity.displacement"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.displacement}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="steering">
                    <span slot="label" class="text_css">转向形式</span>
                    <el-input  v-if="edit"  placeholder="转向形式"  style="width: 100%" v-model="vehicle.technicalEntity.steering"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.steering}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="axleNumber">
                    <span slot="label" class="text_css">车轴数</span>
                    <el-input  v-if="edit" placeholder="车轴数"  style="width: 100%" v-model="vehicle.technicalEntity.axleNumber"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.axleNumber}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item prop="weight">
                    <span slot="label" class="text_css">总质量</span>
                    <el-input  v-if="edit" placeholder="总质量"  style="width: 100%" v-model="vehicle.technicalEntity.weight"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.weight}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="origin">
                    <span slot="label" class="text_css">国产/进口</span>
                    <el-input  v-if="edit"  placeholder="国产/进口"  style="width: 100%" v-model="vehicle.technicalEntity.origin"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.origin}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="manufacturer">
                    <span slot="label" class="text_css">制造厂商名称</span>
                    <el-input  v-if="edit" placeholder="制造厂商名称"  style="width: 100%" v-model="vehicle.technicalEntity.manufacturer"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.manufacturer}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-card>

          <!-- 安全信息 -->
          <el-card shadow="never" style="margin-top: 5px" body-style="padding:0">
            <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
              <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                安全信息
              </div>
            </div>
            <div style="padding:20px;">

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item prop="gps">
                    <span slot="label" class="text_css">安装GPS</span>
                    <el-input  v-if="edit" placeholder="安装GPS" v-model="vehicle.safetyEntity.gps"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.gps}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="tripod">
                    <span slot="label" class="text_css">三角架</span>
                    <el-input  v-if="edit"  placeholder="三角架" v-model="vehicle.safetyEntity.tripod"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.tripod}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="extinguisher">
                    <span slot="label" class="text_css">发动机灭火器</span>
                    <el-input  v-if="edit" placeholder="发动机灭火器" v-model="vehicle.safetyEntity.extinguisher"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.extinguisher}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item prop="rearView">
                    <span slot="label" class="text_css">副后视境</span>
                    <el-input  v-if="edit" placeholder="副后视境"  style="width: 100%" v-model="vehicle.safetyEntity.rearView"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.rearView}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="brake">
                    <span slot="label" class="text_css">副刹</span>
                    <el-input  v-if="edit"  placeholder="副刹" v-model="vehicle.safetyEntity.brake"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.brake}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="faultWarning">
                    <span slot="label" class="text_css">故障警示牌</span>
                    <el-input  v-if="edit" placeholder="故障警示牌" v-model="vehicle.safetyEntity.faultWarning"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.faultWarning}}</span>
                  </el-form-item>
                </el-col>
              </el-row>


            </div>
          </el-card>

          <!-- 图片相册 -->
          <el-card shadow="never" style="margin-top: 5px" body-style="padding:0">
            <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
              <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                图片相册
              </div>
            </div>

            <el-row class="panel-group" :gutter="20">
              <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">行驶证</div>
                <el-upload :disabled="!edit" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="vehicle.vehicleEntity.vehiclePhoto" :src="vehicle.vehicleEntity.vehiclePhoto" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">登记证书</div>
                <el-upload :disabled="!edit" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="vehicle.vehicleEntity.vehiclePhoto" :src="vehicle.vehicleEntity.vehiclePhoto" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">保单</div>
                <el-upload :disabled="!edit" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="vehicle.vehicleEntity.vehiclePhoto" :src="vehicle.vehicleEntity.vehiclePhoto" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">二维检测</div>
                <el-upload :disabled="!edit" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="vehicle.vehicleEntity.vehiclePhoto" :src="vehicle.vehicleEntity.vehiclePhoto" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>

              <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">气瓶证</div>
                <el-upload :disabled="!edit" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="vehicle.vehicleEntity.vehiclePhoto" :src="vehicle.vehicleEntity.vehiclePhoto" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">标识卡</div>
                <el-upload :disabled="!edit" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="vehicle.vehicleEntity.vehiclePhoto" :src="vehicle.vehicleEntity.vehiclePhoto" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
                <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">道路运输证</div>
                <el-upload :disabled="!edit" class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                  <img v-if="vehicle.vehicleEntity.vehiclePhoto" :src="vehicle.vehicleEntity.vehiclePhoto" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>




          </el-card>

          <!-- 维修日志 -->
          <el-card shadow="never" style="margin-top: 5px" body-style="padding:0">
            <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
              <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                维修日志
              </div>
            </div>
          </el-card>
          <!-- 保养日志 -->
          <el-card shadow="never" style="margin-top: 5px" body-style="padding:0">
            <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
              <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                保养日志
              </div>
            </div>
          </el-card>
          <!-- 费用日志 -->
          <el-card shadow="never" style="margin-top: 5px" body-style="padding:0">
            <div style="height: 40px;width: 100%;background-color: rgb(245, 247, 250);border-bottom:1px solid rgb(235, 239, 245)">
              <div style="background-color: #ffffff;width: 100px;height: 40px;line-height: 40px;color: #409eff;font-size: 14px;text-align: center;border-right:1px solid rgb(235, 239, 245)">
                费用日志
              </div>
            </div>
          </el-card>
          <el-row>
            <div v-if="edit" style="padding:20px;float: right">
              <el-button v-if="!addInfo" type="info" @click="cancel('vehicle')"><i class="el-icon-fa-undo"></i> 取 消</el-button>
              <el-button v-if="addInfo" :loading="btnLoading" type="success" @click="add('vehicle')"><i class="el-icon-fa-save"></i> 保 存</el-button>
              <el-button v-if="!addInfo" :loading="btnLoading" type="success" @click="update('vehicle')"><i class="el-icon-edit"></i> 修 改</el-button>
            </div>
            <div v-else style="padding:20px;float: right">
              <el-button type="primary" @click="editInfo"><i class="el-icon-edit"></i> 编 辑</el-button>
            </div>
          </el-row>

        </el-form>
      </el-card>

      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="margin-top: 10px" >


        <el-tab-pane label="图片相册" name="4">图片相册</el-tab-pane>
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
    </div>
  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj } from '@/api/vehicle/vehicle'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'

  export default {
    name: 'table_vehicle',
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
        vehicleRules: {
          // number: [
          //   { required: true, message: '请输入自编号', trigger: ['blur', 'change'] }
          // ],
          // plateNumber: [
          //   { required: true, message: '请输入车牌', trigger: ['blur', 'change'] }
          // ],
          // engineNo: [
          //   { required: true, message: '请输入发动机号', trigger: ['blur', 'change'] }
          // ],
          // factoryTime: [
          //   { required: true, message: '请输入出厂日期', trigger: ['blur', 'change'] }
          // ],
          // allowNumber: [
          //   { required: true, message: '请输入核定载客人', trigger: ['blur', 'change'] }
          // ],
          // affiliation: [
          //   { required: true, message: '请输入所属机构', trigger: ['blur', 'change'] }
          // ],
          // registerTime: [
          //   { required: true, message: '请输入注册登记日期', trigger: ['blur', 'change'] }
          // ]
        },
        total: null,
        listLoading: false,
        btnLoading: false,
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
        edit: false,
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
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ])
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
          this.list = response.data.data.list
          this.total = response.data.data.totalCount
          this.listLoading = false
          // this.editList(this.list[0])
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
        this.edit = true
        this.showModule = 'info'
      },
      // 返回列表
      back() {
        this.getList()
        this.edit = false
        this.showModule = 'list'
      },
      // 添加
      add(formName) {
        var key, obj
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            addObj(key, obj).then(response => {
              console.log('这里是===========================')
              // this.vehicle.vehicleEntity.vehicleId = response.data.data
              // console.log(this.vehicle.vehicleEntity.vehicleId)
              this.edit = false
              this.btnLoading = false
              this.getList
              this.showModule = 'list'
            })
          } else {
            this.$message.error('输入内容错误，请检查后保存！')
          }
        })
      },
      // 修改
      update(formName) {
        var key, obj
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.btnLoading = true
            putObj(key, obj).then(response => {
              console.log(response.data)
              this.edit = false
              this.btnLoading = false
            })
          } else {
            this.$message.error('输入内容错误，请检查后保存！')
          }
        })
      },
      // 搜索
      searchClick() {
        this.listQuery.page = 1
        this.getList()
      },
      // 取消
      cancel(formName) {
        const set = this.$refs
        set[formName].resetFields()
        console.log('=================== 正在完成取消操作 ===================')
        this.editList(this.vehicle)
        console.log('=================== 完成 ===================')
      },
      // 双击编辑
      editList(val) {
        // this.car.vehicleEntity = val.vehicleEntity
        // this.car.technicalInfo = val.technicalEntity
        // this.car.safetyEntity = val.safetyEntity
        // this.car.certificateEntity = val.certificateEntity
        // this.car.maintainList = val.maintainEntityList
        // this.car.repairList = val.repairEntityList
        getObj(val.vehicleEntity.vehicleId)
          .then(response => {
            console.log('=================== 这是当前车辆的所有信息 ===================')
            console.log(response.data)
            // this.vehicleNotes = response.data.data
            this.vehicle.vehicleEntity = response.data.data.vehicleEntity === null ? {} : response.data.data.vehicleEntity
            this.vehicle.technicalEntity = response.data.data.technicalEntity === null ? {} : response.data.data.technicalEntity
            this.vehicle.safetyEntity = response.data.data.safetyEntity === null ? {} : response.data.data.safetyEntity
            this.vehicle.certificateEntity = response.data.data.certificateEntity === null ? {} : response.data.data.certificateEntity
            this.vehicle.maintainList = response.data.data.maintainEntityList === null ? [] : response.data.data.maintainEntityList
            this.vehicle.repairList = response.data.data.repairEntityList === null ? [] : response.data.data.repairEntityList
            this.timeGroup()
          })
        this.showModule = 'info'
        this.edit = false
        this.addInfo = false
      },
      // 所有编辑方法
      editInfo() {
        // if (this.edit) {
        //   this.update(this.edit, this.vehicle.vehicleEntity)
        // } else if (this.edit === 'technical') {
        //   this.update(this.edit, this.vehicle.technicalEntity)
        // } else if (this.edit === 'safety') {
        //   this.update(this.edit, this.vehicle.safetyEntity)
        // } else if (this.edit) {
        //   this.update(this.edit, this.vehicle.certificateEntity)
        // }
        // this.editList(this.vehicle)
        this.edit = true
      },
      handleClick(tab, event) {
        console.log(tab)
        console.log(event)
        console.log(this.activeName)
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt4M = file.size / 1024 / 1024 < 4

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或者 PNG 格式!')
        }
        if (!isLt4M) {
          this.$message.error('上传头像图片大小不能超过 4MB!')
        }
        return isJPG && isLt4M
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .text_css{
    color:#495060;
    font-size: 16px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    width: 178px;
    height: 178px;
    margin: 0 auto;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .panel-group {
    margin-top: 18px;
    .card-panel-col {
      margin-bottom: 10px;
    }
  }
</style>
