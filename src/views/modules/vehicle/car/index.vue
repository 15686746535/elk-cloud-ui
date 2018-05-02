<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <div v-show="showModule=='list'">

      <el-card style="margin-bottom: 5px;height: 80px">
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
              <dict dictType="dict_source" v-model="listQuery.vehicleState" ></dict>
            </el-form-item>
            <el-input @keyup.enter.native="searchClick" style="width: 200px;" class="filter-item" placeholder="关键词" v-model="listQuery.roleName"></el-input>

            <el-button class="filter-item" type="primary"  icon="search" @click="searchClick">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary"><i class="el-icon-plus"></i>添加</el-button>
          </el-form>
      </el-card>
      <el-card :style="{height: ($store.state.app.client.height - 125) + 'px'}">


        <el-table :data="list" :height="($store.state.app.client.height - 215)" border style="width: 100%"  highlight-current-row @row-dblclick="editlist" v-loading="listLoading" element-loading-text="给我一点时间">
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
                         layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
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
        <el-form :model="vehicle" :rules="vehicleRules" ref="vehicle" label-position="left" label-width="100px">
          <div slot="header" class="clearfix">
            |&nbsp;<span v-if="addInfo" style="line-height: 40px;font-weight: 600">车辆添加</span>
            <span v-else style="line-height: 40px;font-weight: 600">车辆编辑</span>
            <el-button type="primary" style="float: right" @click="back"><i class="el-icon-back"></i> 返 回</el-button>
          </div>

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
                    <el-row>
                      <img width="100%" height="100%" :src="vehicle.vehicleEntity.vehiclePhoto" class="image">
                    </el-row>
                    <el-row style="height: 62px;">
                      <el-form-item prop="vehicleEntity.plateColor">
                        <span slot="label" class="text_css">车牌颜色：</span>
                        <el-input v-if="edit" v-model="vehicle.vehicleEntity.plateColor"  placeholder="车牌颜色"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.plateColor}}</span>
                      </el-form-item>
                    </el-row>
                    <el-row style="height: 62px;">
                      <el-form-item prop="vehicleEntity.carColor">
                        <span slot="label" class="text_css">车身颜色：</span>
                        <el-input v-if="edit" v-model="vehicle.vehicleEntity.carColor" placeholder="车身颜色"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.carColor}}</span>
                      </el-form-item>
                    </el-row>
                    <el-row style="height: 62px;">
                      <el-form-item prop="vehicleEntity.number">
                        <span slot="label" class="text_css">自编号：</span>
                        <el-input v-if="edit"  v-model="vehicle.vehicleEntity.number" placeholder="自编号"></el-input>
                        <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.number}}</span>
                      </el-form-item>
                    </el-row>
                  </el-col>
                  <el-col :style="{width: ($store.state.app.client.width - 400) + 'px'}">

                    <el-row :gutter="10" style="height: 62px;">
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.vehicleType">
                          <span slot="label" class="text_css">车辆类别：</span>
                          <el-input v-if="edit"  v-model="vehicle.vehicleEntity.vehicleType" placeholder="车辆类别"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.vehicleType}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.vehicleState">
                          <span slot="label" class="text_css">车辆来源：</span>
                          <el-input v-if="edit" v-model="vehicle.vehicleEntity.vehicleState" placeholder="车辆来源" ></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.vehicleState}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.plateNumber">
                          <span slot="label" class="text_css">车辆牌照：</span>
                          <el-input v-if="edit"  v-model="vehicle.vehicleEntity.plateNumber" placeholder="车辆牌照"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.plateNumber}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10" style="height: 62px;">
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.factoryTime">
                          <span slot="label" class="text_css">出厂日期：</span>
                          <el-date-picker value-format="timestamp" style="width: 100%" v-if="edit" type="date" placeholder="出厂日期" v-model="vehicle.vehicleEntity.factoryTime"></el-date-picker>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.factoryTime | subTime}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.registerTime">
                          <span slot="label" class="text_css">注册登记日期：</span>
                          <el-date-picker value-format="timestamp" style="width: 100%" v-if="edit" type="date" placeholder="注册登记日期" v-model="vehicle.vehicleEntity.registerTime"></el-date-picker>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.registerTime | subTime}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.oldPlateNumber">
                          <span slot="label" class="text_css">原车辆牌照：</span>
                          <el-input v-if="edit" v-model="vehicle.vehicleEntity.oldPlateNumber" placeholder="原车辆牌照"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.oldPlateNumber}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10" style="height: 62px;">
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.vinNo">
                          <span slot="label" class="text_css">车架号：</span>
                          <el-input v-if="edit" v-model="vehicle.vehicleEntity.vinNo" placeholder="车架号"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.vinNo}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.engineNo">
                          <span slot="label" class="text_css">发动机号：</span>
                          <el-input v-if="edit" v-model="vehicle.vehicleEntity.engineNo" placeholder="发动机号"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.engineNo}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.motorcycleType">
                          <span slot="label" class="text_css">型号：</span>
                          <el-input v-if="edit" v-model="vehicle.vehicleEntity.motorcycleType" placeholder="型号"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.motorcycleType}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10" style="height: 62px;">
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.fuelType">
                          <span slot="label" class="text_css">燃料类别：</span>
                          <el-input v-if="edit" v-model="vehicle.vehicleEntity.fuelType" placeholder="燃料类别" ></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.fuelType}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.allowNumber">
                          <span slot="label" class="text_css">核定载客人：</span>
                          <el-input v-if="edit"  v-model="vehicle.vehicleEntity.allowNumber" placeholder="核定载客人"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.allowNumber}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.brand">
                          <span slot="label" class="text_css">厂牌：</span>
                          <el-input v-if="edit" v-model="vehicle.vehicleEntity.brand" placeholder="厂牌"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.brand}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row :gutter="10" style="height: 62px;">
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.technicalLevel">
                          <span slot="label" class="text_css">技术等级：</span>
                          <el-input v-if="edit"  v-model="vehicle.vehicleEntity.technicalLevel" placeholder="技术等级"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.technicalLevel}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.userId">
                          <span slot="label" class="text_css">使用责任人：</span>
                          <el-input v-if="edit"  v-model="vehicle.vehicleEntity.userId" placeholder="使用责任人"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.name}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item prop="vehicleEntity.orgId">
                          <span slot="label" class="text_css">所属机构：</span>
                          <el-input v-if="edit"  v-model="vehicle.vehicleEntity.orgId" placeholder="所属机构"></el-input>
                          <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.orgName}}</span>
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
                    <span slot="label" class="text_css">标识卡有效期：</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="标识卡到期日期"  style="width: 100%" v-model="vehicle.certificateEntity.identificationEnd"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.identificationEnd | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="scrap">
                    <span slot="label" class="text_css">强制报销日期：</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="强制报销日期"  style="width: 100%" v-model="vehicle.certificateEntity.scrap"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.scrap | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="typeLevel">
                    <span slot="label" class="text_css">类型等级：</span>
                    <el-input v-if="edit" v-model="vehicle.certificateEntity.typeLevel" placeholder="类型等级"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.typeLevel}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="clivtaTime">
                    <span slot="label" class="text_css">交强险有效期：</span>
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
                    <span slot="label" class="text_css">商业险有效期：</span>
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
                    <span slot="label" class="text_css">维修保养有效期：</span>
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
                    <span slot="label" class="text_css">二维检测日期：</span>
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
                    <span slot="label" class="text_css">气瓶有效期：</span>
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
                    <span slot="label" class="text_css">行驶证注册日期：</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="行驶证注册登记日期"  style="width: 100%" v-model="vehicle.certificateEntity.drivingLicenseEnroll"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.drivingLicenseEnroll | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="140px" prop="drivingLicenseRelease">
                    <span slot="label" class="text_css">行驶证发证日期：</span>
                    <el-date-picker value-format="timestamp" v-if="edit" type="date" placeholder="行驶证发证日期"  style="width: 100%" v-model="vehicle.certificateEntity.drivingLicenseRelease"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.drivingLicenseRelease | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="140px" prop="drivingLicenseRelease">
                    <span slot="label" class="text_css">行驶证有效期：</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="行驶证年审有效期"  style="width: 100%" v-model="vehicle.certificateEntity.drivingLicenseEnd"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.drivingLicenseEnd | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label-width="140px" prop="evaluation">
                    <span slot="label" class="text_css">行驶证评定期：</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="行驶证评定日期"  style="width: 100%" v-model="vehicle.certificateEntity.evaluation"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.evaluation | subTime}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 62px;">
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="roadTransport">
                    <span slot="label" class="text_css">道路运输证号：</span>
                    <el-input v-if="edit"  v-model="vehicle.certificateEntity.roadTransport" placeholder="道路运输证号" ></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.roadTransport}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="roadTransportStart">
                    <span slot="label" class="text_css">道路运输发证日期：</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="道路运输发证日期"  style="width: 100%" v-model="vehicle.certificateEntity.roadTransportStart"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.roadTransportStart | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="140px" prop="roadTransportEnd">
                    <span slot="label" class="text_css">道路运输有效期：</span>
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
                    <span slot="label" class="text_css">轴距：</span>
                    <el-input  v-if="edit" placeholder="轴距"  style="width: 100%" v-model="vehicle.technicalEntity.wheelbase"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.wheelbase}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="scrap">
                    <span slot="label" class="text_css">强制报销日期：</span>
                    <el-date-picker value-format="timestamp"  v-if="edit" type="date" placeholder="强制报销日期"  style="width: 100%" v-model="vehicle.certificateEntity.scrap"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.scrap | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="typeLevel">
                    <span slot="label" class="text_css">类型等级：</span>
                    <el-input v-if="edit" v-model="vehicle.certificateEntity.typeLevel" placeholder="类型等级"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.typeLevel}}</span>
                  </el-form-item>
                </el-col>
              </el-row>


            </div>


          </el-card>

          <el-row>
            <div v-if="edit" style="padding:20px;float: right">
              <el-button v-if="!addInfo" type="info" @click="cancel"><i class="el-icon-fa-close"></i> 取 消</el-button>
              <el-button v-if="addInfo" type="success" @click="add()"><i class="el-icon-fa-save"></i> 保 存</el-button>
              <el-button v-if="!addInfo" type="success" @click="update()"><i class="el-icon-edit"></i> 修 改</el-button>
            </div>
            <div v-else style="padding:20px;float: right">
              <el-button type="primary" @click="editInfo('vehicle')"><i class="el-icon-edit"></i> 编 辑</el-button>
            </div>
          </el-row>

        </el-form>
      </el-card>

      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" style="margin-top: 10px" >

        <el-tab-pane label="技术信息" name="1" style="line-height: 50px;">

          <!-- 第一大排 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="8">
              <!-- 轴距 -->
              <el-row>
                <el-col :span="6"><div class="text_css">轴距：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit" placeholder="轴距"  style="width: 100%" v-model="vehicle.technicalEntity.wheelbase"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.wheelbase}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第二列 -->
            <el-col :span="8">

              <!-- 前/后轮距 -->
              <el-row>
                <el-col :span="6"><div class="text_css">前/后轮距：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit"  placeholder="前/后轮距"  style="width: 100%" v-model="vehicle.technicalEntity.tread"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.tread}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第三列 -->
            <el-col :span="8">

              <!-- 轮胎数/规格 -->
              <el-row>
                <el-col :span="6"><div class="text_css">轮胎数/规格：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit" placeholder="轮胎数/规格"  style="width: 100%" v-model="vehicle.technicalEntity.standard"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.standard}}</span>
                </el-col>
              </el-row>

            </el-col>

          </el-row>
          <!-- 分割线 -->
          <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


          <!-- 第二大排 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="8">
              <!-- 车长（外）mm -->
              <el-row>
                <el-col :span="6"><div class="text_css">车长（外）mm：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit" placeholder="车长（外）mm"  style="width: 100%" v-model="vehicle.technicalEntity.length"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.length}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第二列 -->
            <el-col :span="8">

              <!-- 车宽（外）mm -->
              <el-row>
                <el-col :span="6"><div class="text_css">车宽（外）mm：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit"  placeholder="车宽（外）mm"  style="width: 100%" v-model="vehicle.technicalEntity.width"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.width}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第三列 -->
            <el-col :span="8">

              <!-- 车高（外）mm -->
              <el-row>
                <el-col :span="6"><div class="text_css">车高（外）mm：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit" placeholder="车高（外）mm"  style="width: 100%" v-model="vehicle.technicalEntity.height"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.height}}</span>
                </el-col>
              </el-row>

            </el-col>

          </el-row>
          <!-- 分割线 -->
          <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


          <!-- 第三大排 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="8">
              <!-- 排量/功率 -->
              <el-row>
                <el-col :span="6"><div class="text_css">排量/功率：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit" placeholder="排量/功率"  style="width: 100%" v-model="vehicle.technicalEntity.displacement"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.displacement}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第二列 -->
            <el-col :span="8">

              <!-- 转向形式 -->
              <el-row>
                <el-col :span="6"><div class="text_css">转向形式：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit"  placeholder="转向形式"  style="width: 100%" v-model="vehicle.technicalEntity.steering"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.steering}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第三列 -->
            <el-col :span="8">

              <!-- 车轴数 -->
              <el-row>
                <el-col :span="6"><div class="text_css">车轴数：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit" placeholder="车轴数"  style="width: 100%" v-model="vehicle.technicalEntity.axleNumber"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.axleNumber}}</span>
                </el-col>
              </el-row>

            </el-col>

          </el-row>
          <!-- 分割线 -->
          <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


          <!-- 第四大排 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="8">
              <!-- 总质量 -->
              <el-row>
                <el-col :span="6"><div class="text_css">总质量：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit" placeholder="总质量"  style="width: 100%" v-model="vehicle.technicalEntity.weight"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.weight}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第二列 -->
            <el-col :span="8">

              <!-- 国产/进口 -->
              <el-row>
                <el-col :span="6"><div class="text_css">国产/进口：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit"  placeholder="国产/进口"  style="width: 100%" v-model="vehicle.technicalEntity.origin"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.origin}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第三列 -->
            <el-col :span="8">

              <!-- 制造厂商名称 -->
              <el-row>
                <el-col :span="6"><div class="text_css">制造厂商名称：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit" placeholder="制造厂商名称"  style="width: 100%" v-model="vehicle.technicalEntity.manufacturer"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.manufacturer}}</span>
                </el-col>
              </el-row>

            </el-col>

          </el-row>
          <!-- 分割线 -->
          <el-row><el-col> <hr style="border: none; border-bottom:2px solid #d3dce6; "/> </el-col></el-row>

          <el-form :inline="true"  :model="vehicle" label	 label-width="160px" label-position="left" class="demo-form-inline">

            <el-col>
              <el-form-item v-if="edit" style="float: right">
                <el-button type="primary"  style="width: 150px;" @click="cancel">取消</el-button>
                <el-button type="primary"  style="width: 150px;" @click="update('technical',vehicle.technicalEntity)">确认</el-button>
              </el-form-item>


              <el-form-item v-else style="float: right">
                <el-button type="primary" style="width: 150px;" @click="editInfo('technical')">编辑信息</el-button>
              </el-form-item>
            </el-col>

          </el-form>

        </el-tab-pane>
        <el-tab-pane label="安全信息" name="3" style="line-height: 50px;">

          <!-- 第一大排 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="8">
              <!-- 安装GPS -->
              <el-row>
                <el-col :span="6"><div class="text_css">安装GPS：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit === 'safety'" placeholder="安装GPS"  style="width: 100%" v-model="vehicle.safetyEntity.gps"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.gps}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第二列 -->
            <el-col :span="8">

              <!-- 三角架 -->
              <el-row>
                <el-col :span="6"><div class="text_css">三角架：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit === 'safety'"  placeholder="三角架"  style="width: 100%" v-model="vehicle.safetyEntity.tripod"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.tripod}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第三列 -->
            <el-col :span="8">

              <!-- 发动机灭火器 -->
              <el-row>
                <el-col :span="6"><div class="text_css">发动机灭火器：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit === 'safety'" placeholder="发动机灭火器"  style="width: 100%" v-model="vehicle.safetyEntity.extinguisher"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.extinguisher}}</span>
                </el-col>
              </el-row>

            </el-col>

          </el-row>
          <!-- 分割线 -->
          <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


          <!-- 第二大排 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="8">
              <!-- 副后视境 -->
              <el-row>
                <el-col :span="6"><div class="text_css">副后视境：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit === 'safety'" placeholder="副后视境"  style="width: 100%" v-model="vehicle.safetyEntity.rearView"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.rearView}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第二列 -->
            <el-col :span="8">

              <!-- 副刹 -->
              <el-row>
                <el-col :span="6"><div class="text_css">副刹：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit === 'safety'"  placeholder="副刹"  style="width: 100%" v-model="vehicle.safetyEntity.brake"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.brake}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第三列 -->
            <el-col :span="8">

              <!-- 故障警示牌 -->
              <el-row>
                <el-col :span="6"><div class="text_css">故障警示牌：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit === 'safety'" placeholder="故障警示牌"  style="width: 100%" v-model="vehicle.safetyEntity.faultWarning"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.safetyEntity.faultWarning}}</span>
                </el-col>
              </el-row>

            </el-col>

          </el-row>
          <!-- 分割线 -->
          <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>

          <el-form :inline="true"  :model="vehicle" label	 label-width="160px" label-position="left" class="demo-form-inline">

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
        vehicleRules: {},
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
          // this.editlist(this.list[0])
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
      searchClick() {
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
        if (this.edit) {
          this.update(this.edit, this.vehicle.vehicleEntity)
        } else if (this.edit === 'technical') {
          this.update(this.edit, this.vehicle.technicalEntity)
        } else if (this.edit === 'safety') {
          this.update(this.edit, this.vehicle.safetyEntity)
        } else if (this.edit) {
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
