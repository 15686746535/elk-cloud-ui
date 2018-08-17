<template>
  <div style="height: 100%">
    <el-card  v-show="showModule=='list'" style="height: 100%">
      <el-row :gutter="20" style="margin-bottom: 15px">
        <el-col :xs="6" :sm="5" :md="4" :lg="4">
          <el-input @keyup.enter.native="searchClick" class="filter-item" placeholder="车牌/负责人" v-model="listQuery.condition"></el-input>
        </el-col>
        <el-col :span="4">
          <el-button class="filter-item" type="primary" @click="searchClick"><i class="el-icon-search"></i> 搜 索</el-button>
        </el-col>
      </el-row>
      <el-table :data="list" :height="(tableHeight - 220)" border style="width: 100%"  highlight-current-row @row-dblclick="editList" v-loading="listLoading"
                element-loading-text="给我一点时间">
        <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
        <!-- 基本信息 -->
        <el-table-column align="center" label="基本信息">
          <template slot-scope="scope">
            <el-row :gutter="10">
              <el-col :span="10">
                <el-tag class="img">
                  <img :src="scope.row.vehicleEntity.vehiclePhoto" class="img">
                </el-tag>
              </el-col>

              <el-col style="line-height: 25px" :span="14">
                <el-row :gutter="10">
                  <el-col :span="8" class="table_text">车辆牌照：</el-col>
                  <el-col :span="16" class="table_text">{{scope.row.vehicleEntity==null?null:scope.row.vehicleEntity.plateNumber}}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8" class="table_text">责任人：</el-col>
                  <el-col :span="16" class="table_text">
                    {{scope.row.vehicleEntity==null?null:scope.row.vehicleEntity.name}}
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8" class="table_text">所属机构：</el-col>
                  <el-col :span="16" class="table_text">{{scope.row.vehicleEntity==null?null:scope.row.vehicleEntity.affiliation}}</el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8" class="table_text">车辆状态：</el-col>
                  <el-col :span="16" class="table_text">{{scope.row.vehicleEntity==null?null:scope.row.vehicleEntity.vehicleState}}</el-col>
                </el-row>
              </el-col>

            </el-row>

          </template>
        </el-table-column>

        <!-- 证件信息 -->
        <el-table-column align="center" label="证件信息">
          <template slot-scope="scope">
            <el-col style="line-height: 25px">
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">标识卡到期日期：</el-col>
                <el-col :span="17" class="table_text">{{scope.row.certificateEntity==null?null:scope.row.certificateEntity.identificationEnd | subTime}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">评定日期：</el-col>
                <el-col :span="17" class="table_text">
                  {{scope.row.certificateEntity==null?null:scope.row.certificateEntity.evaluation | subTime}}
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">强制报销日期：</el-col>
                <el-col :span="17" class="table_text">{{scope.row.certificateEntity==null?null:scope.row.certificateEntity.scrap | subTime}}</el-col>
              </el-row>
            </el-col>

          </template>
        </el-table-column>

        <!-- 技术信息 -->
        <el-table-column align="center" label="技术信息">
          <template slot-scope="scope">
            <el-col style="line-height: 25px">
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">排量/功率：</el-col>
                <el-col :span="17" class="table_text">{{scope.row.technicalEntity==null?null:scope.row.technicalEntity.displacement}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">总质量：</el-col>
                <el-col :span="17" class="table_text">
                  {{scope.row.technicalEntity==null?null:scope.row.technicalEntity.weight}}
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">制造厂商名称：</el-col>
                <el-col :span="17" class="table_text">{{scope.row.technicalEntity==null?null:scope.row.technicalEntity.manufacturer}}</el-col>
              </el-row>
            </el-col>

          </template>
        </el-table-column>

        <!-- 安全信息 -->
        <el-table-column align="center" label="安全信息">
          <template slot-scope="scope">
            <el-col style="line-height: 25px">
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">安装GPS：</el-col>
                <el-col :span="17" class="table_text">{{scope.row.safetyEntity==null?null:scope.row.safetyEntity.gps}}</el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">三角架：</el-col>
                <el-col :span="17" class="table_text">
                  {{scope.row.safetyEntity==null?null:scope.row.safetyEntity.tripod}}
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="7" class="table_text">发动机灭火器：</el-col>
                <el-col :span="17" class="table_text">{{scope.row.safetyEntity==null?null:scope.row.safetyEntity.extinguisher}}</el-col>
              </el-row>
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
        <el-button style="float: right" @click="create" type="primary"><i class="el-icon-plus"></i> 添 加</el-button>
      </div>
    </el-card>
    <el-card v-show="showModule=='info'" style="height: 100%;overflow: auto"  v-loading="infoLoading" element-loading-text="给我一点时间" >
      <el-card class="box-card1">
        <div slot="header" class="clearfix">
          |&nbsp;<span style="font-weight: 600">基础信息</span>
          <el-button type="primary" size="mini" style="float: right" @click="back"><i class="el-icon-back"></i> 返 回</el-button>
        </div>
        <el-form :model="vehicleEntity" :rules="vehicleEntityRules" ref="vehicleEntity"  label-width="100px" size="mini">
          <el-row>
            <el-col style="width: 300px;margin-right: 22px">
              <el-row style="margin-bottom: 4px;">

                <el-upload :disabled="!(edit === 'car')" class="avatar-uploader" action="/oss/upload" name="file" :show-file-list="false" :headers="headers"
                           accept=".png,.jpg"
                           :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
                  <img :src="vehicleEntity.vehiclePhoto" class="avatar">
                </el-upload>

              </el-row>
              <el-row style="height: 50px">
                <el-form-item prop="plateColor">
                  <span slot="label" class="text_css">车牌颜色:</span>
                  <el-select style="width: 100%" v-if="edit === 'car'" v-model="vehicleEntity.plateColor" placeholder="请选择车牌颜色">
                    <el-option v-for="item in plateColors" :key="item" :label="item" :value="item">
                    </el-option>
                  </el-select>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.plateColor}}</span>
                </el-form-item>
              </el-row>
              <el-row style="height: 50px">
                <el-form-item prop="carColor">
                  <span slot="label" class="text_css">车身颜色:</span>
                  <el-input v-if="edit === 'car'" v-model="vehicleEntity.carColor" placeholder="车身颜色"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicleEntity.carColor}}</span>
                </el-form-item>
              </el-row>
              <el-row style="height: 50px">
                <el-form-item prop="number">
                  <span slot="label" class="text_css">自编号:</span>
                  <el-input v-if="edit === 'car'"  v-model="vehicleEntity.number" placeholder="自编号"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.number}}</span>
                </el-form-item>
              </el-row>
            </el-col>
            <el-col :style="{width: ($store.state.app.client.width - 423) + 'px'}">

              <el-row :gutter="10" style="height: 50px">
                <el-col :span="8">
                  <el-form-item prop="vehicleType">
                    <span slot="label" class="text_css">车辆类别:</span>
                    <el-select style="width: 100%" v-if="edit === 'car'" v-model="vehicleEntity.vehicleType" placeholder="请选择车辆类别">
                      <el-option v-for="item in vehicleTypes" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.vehicleType}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="vehicleState">
                    <span slot="label" class="text_css">车辆来源:</span>
                    <el-select style="width: 100%" v-if="edit === 'car'" v-model="vehicleEntity.vehicleState" placeholder="请选择车辆来源">
                      <el-option v-for="item in vehicleStates" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                    <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicleEntity.vehicleState}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="plateNumber">
                    <span slot="label" class="text_css">车辆牌照:</span>
                    <el-input v-if="edit === 'car'"  v-model="vehicleEntity.plateNumber" placeholder="车辆牌照"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.plateNumber}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 50px">
                <el-col :span="8">
                  <el-form-item prop="factoryTime">
                    <span slot="label" class="text_css">出厂日期:</span>
                    <el-date-picker value-format="timestamp" style="width: 100%" v-if="edit === 'car'" type="date" placeholder="出厂日期" v-model="vehicleEntity.factoryTime"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.factoryTime | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="registerTime">
                    <span slot="label" class="text_css">注册登记日期:</span>
                    <el-date-picker value-format="timestamp" style="width: 100%" v-if="edit === 'car'" type="date" placeholder="注册登记日期" v-model="vehicleEntity.registerTime"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.registerTime | subTime}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="oldPlateNumber">
                    <span slot="label" class="text_css">原车辆牌照:</span>
                    <el-input v-if="edit === 'car'" v-model="vehicleEntity.oldPlateNumber" placeholder="原车辆牌照"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.oldPlateNumber}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 50px">
                <el-col :span="8">
                  <el-form-item prop="vinNo">
                    <span slot="label" class="text_css">车架号:</span>
                    <el-input v-if="edit === 'car'" v-model="vehicleEntity.vinNo" placeholder="车架号"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.vinNo}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="engineNo">
                    <span slot="label" class="text_css">发动机号:</span>
                    <el-input v-if="edit === 'car'" v-model="vehicleEntity.engineNo" placeholder="发动机号"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.engineNo}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="motorcycleType">
                    <span slot="label" class="text_css">型号:</span>
                    <el-input v-if="edit === 'car'" v-model="vehicleEntity.motorcycleType" placeholder="型号"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.motorcycleType}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 50px">
                <el-col :span="8">
                  <el-form-item prop="fuelType">
                    <span slot="label" class="text_css">燃料类别:</span>
                    <el-select style="width: 100%" v-if="edit === 'car'" v-model="vehicleEntity.fuelType" placeholder="请选择燃料类别">
                      <el-option v-for="item in fuelTypes" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                    <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicleEntity.fuelType}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="allowNumber">
                    <span slot="label" class="text_css">核定载客人:</span>
                    <el-input v-if="edit === 'car'"  v-model="vehicleEntity.allowNumber" placeholder="核定载客人"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.allowNumber}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="brand">
                    <span slot="label" class="text_css">厂牌:</span>
                    <el-input v-if="edit === 'car'" v-model="vehicleEntity.brand" placeholder="厂牌"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.brand}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="10" style="height: 50px">
                <el-col :span="8">
                  <el-form-item prop="technicalLevel">
                    <span slot="label" class="text_css">技术等级:</span>
                    <el-input v-if="edit === 'car'"  v-model="vehicleEntity.technicalLevel" placeholder="技术等级"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.technicalLevel}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="userId">
                    <span slot="label" class="text_css">使用责任人:</span>
                    <el-select v-if="edit === 'car'" style="width: 100%;" v-model="vehicleEntity.userId" clearable filterable placeholder="使用责任人">
                      <el-option
                        v-for="item in userList"
                        :key="item.userId"
                        :label="item.name"
                        :value="item.userId">
                      </el-option>
                    </el-select>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.name}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item prop="affiliation">
                    <span slot="label" class="text_css">所属机构:</span>
                    <el-input v-if="edit === 'car'"  v-model="vehicleEntity.affiliation" placeholder="所属机构"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicleEntity.affiliation}}</span>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-col>



            <el-row v-if="edit === 'car'" style="float: right;">
              <el-button v-if="!addInfo"  size="mini" type="info" @click="cancel"><i class="el-icon-fa-undo"></i> 取 消</el-button>
              <el-button v-if="addInfo"  size="mini" :loading="btnLoading" type="success" @click="add('vehicleEntity','car',vehicleEntity)"><i class="el-icon-fa-save"></i> 保 存</el-button>
              <el-button v-if="!addInfo"  size="mini" :loading="btnLoading" type="success" @click="update('car',vehicleEntity)"><i class="el-icon-fa-save"></i> 保 存</el-button>
            </el-row>
            <el-row v-else style="float: right;">
              <el-button type="primary"  size="mini" @click="editInfo('car')"><i class="el-icon-edit"></i> 编 辑</el-button>
            </el-row>
          </el-row>
        </el-form>
      </el-card>
      <el-tabs v-model="activeName" v-if="vehicleEntity.vehicleId" type="border-card" @tab-click="handleClick" style="margin-top: 10px" >
        <el-tab-pane label="证件信息" name="1" style="line-height: 50px;">

          <el-form :model="certificateEntity" :rules="certificateEntityRules" ref="certificateEntity"  label-width="140px" size="mini">

            <el-row :gutter="10" style="height: 50px">
              <el-col :span="8">
                <el-form-item label-width="140px" prop="identificationEnd">
                  <span slot="label" class="text_css">标识卡有效期:</span>
                  <el-date-picker value-format="timestamp"  v-if="edit === 'certificate'" type="date" placeholder="标识卡到期日期"  style="width: 100%" v-model="certificateEntity.identificationEnd"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{certificateEntity.identificationEnd | subTime}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="140px" prop="scrap">
                  <span slot="label" class="text_css">强制报销日期:</span>
                  <el-date-picker value-format="timestamp"  v-if="edit === 'certificate'" type="date" placeholder="强制报销日期"  style="width: 100%" v-model="certificateEntity.scrap"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{certificateEntity.scrap | subTime}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="140px" prop="typeLevel">
                  <span slot="label" class="text_css">类型等级:</span>
                  <el-input v-if="edit === 'certificate'" v-model="certificateEntity.typeLevel" placeholder="类型等级"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{certificateEntity.typeLevel}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" style="height: 50px">
              <el-col :span="8">
                <el-form-item label-width="140px" prop="clivtaTime">
                  <span slot="label" class="text_css">交强险有效期:</span>
                  <el-date-picker value-format="timestamp" v-if="edit === 'certificate'" @blur="clivtaTimeBlur" v-model="daterange.clivtaTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{certificateEntity.clivtaStart | subTime}}</span>
                      <span style="padding-left: 16px;font-size: 12px;" v-if="certificateEntity.clivtaStart"> - </span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{certificateEntity.clivtaEnd | subTime}}</span>
                    </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="140px" prop="viTime">
                  <span slot="label" class="text_css">商业险有效期:</span>
                  <el-date-picker value-format="timestamp" v-if="edit === 'certificate'" @blur="viTimeBlur" v-model="daterange.viTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                        <span style="padding-left: 16px;font-size: 12px;" >{{certificateEntity.viStart | subTime}}</span>
                        <span style="padding-left: 16px;font-size: 12px;" v-if="certificateEntity.viStart"> - </span>
                        <span style="padding-left: 16px;font-size: 12px;" >{{certificateEntity.viEnd | subTime}}</span>
                      </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="140px" prop="maintenanceTime">
                  <span slot="label" class="text_css">维修保养有效期:</span>
                  <el-date-picker value-format="timestamp" v-if="edit === 'certificate'" @blur="maintenanceTimeBlur" v-model="daterange.maintenanceTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                        <span style="padding-left: 16px;font-size: 12px;" >{{certificateEntity.maintenanceStart | subTime}}</span>
                        <span style="padding-left: 16px;font-size: 12px;" v-if="certificateEntity.maintenanceStart"> - </span>
                        <span style="padding-left: 16px;font-size: 12px;" >{{certificateEntity.maintenanceEnd | subTime}}</span>
                      </span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" style="height: 50px">
              <el-col :span="8">
                <el-form-item label-width="140px" prop="twoDimensionalStart">
                  <span slot="label" class="text_css">二维检测日期:</span>
                  <el-date-picker value-format="timestamp" v-if="edit === 'certificate'" @blur="twoDimensionalTimeBlur" v-model="daterange.twoDimensionalTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                        <span style="padding-left: 16px;font-size: 12px;" >{{certificateEntity.twoDimensionalStart | subTime}}</span>
                        <span style="padding-left: 16px;font-size: 12px;" v-if="certificateEntity.twoDimensionalStart"> - </span>
                        <span style="padding-left: 16px;font-size: 12px;" >{{certificateEntity.twoDimensionalEnd | subTime}}</span>
                      </span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="140px" prop="bottleTime">
                  <span slot="label" class="text_css">气瓶有效期:</span>
                  <el-date-picker value-format="timestamp" v-if="edit === 'certificate'" @blur="bottleTimeBlur" v-model="daterange.bottleTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                        <span style="padding-left: 16px;font-size: 12px;" >{{certificateEntity.bottleStart | subTime}}</span>
                        <span style="padding-left: 16px;font-size: 12px;" v-if="certificateEntity.bottleStart"> - </span>
                        <span style="padding-left: 16px;font-size: 12px;" >{{certificateEntity.bottleEnd | subTime}}</span>
                      </span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" style="height: 50px">
              <el-col :span="8">
                <el-form-item label-width="140px" prop="roadTransport">
                  <span slot="label" class="text_css">道路运输证号:</span>
                  <el-input v-if="edit === 'certificate'"  v-model="certificateEntity.roadTransport" placeholder="道路运输证号" ></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{certificateEntity.roadTransport}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="140px" prop="roadTransportStart">
                  <span slot="label" class="text_css">道路运输发证日期:</span>
                  <el-date-picker value-format="timestamp"  v-if="edit === 'certificate'" type="date" placeholder="道路运输发证日期"  style="width: 100%" v-model="certificateEntity.roadTransportStart"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{certificateEntity.roadTransportStart | subTime}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="140px" prop="roadTransportEnd">
                  <span slot="label" class="text_css">道路运输有效期:</span>
                  <el-date-picker value-format="timestamp"  v-if="edit === 'certificate'" type="date" placeholder="道路运输年审有效期"  style="width: 100%" v-model="certificateEntity.roadTransportEnd"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{certificateEntity.roadTransportEnd | subTime}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" style="height: 50px">
              <el-col :span="6">
                <el-form-item label-width="140px" prop="drivingLicenseEnroll">
                  <span slot="label" class="text_css">行驶证注册日期:</span>
                  <el-date-picker value-format="timestamp"  v-if="edit === 'certificate'" type="date" placeholder="行驶证注册登记日期"  style="width: 100%" v-model="certificateEntity.drivingLicenseEnroll"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{certificateEntity.drivingLicenseEnroll | subTime}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label-width="140px" prop="drivingLicenseRelease">
                  <span slot="label" class="text_css">行驶证发证日期:</span>
                  <el-date-picker value-format="timestamp" v-if="edit === 'certificate'" type="date" placeholder="行驶证发证日期"  style="width: 100%" v-model="certificateEntity.drivingLicenseRelease"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{certificateEntity.drivingLicenseRelease | subTime}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label-width="140px" prop="drivingLicenseRelease">
                  <span slot="label" class="text_css">行驶证有效期:</span>
                  <el-date-picker value-format="timestamp"  v-if="edit === 'certificate'" type="date" placeholder="行驶证年审有效期"  style="width: 100%" v-model="certificateEntity.drivingLicenseEnd"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{certificateEntity.drivingLicenseEnd | subTime}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label-width="140px" prop="evaluation">
                  <span slot="label" class="text_css">行驶证评定期:</span>
                  <el-date-picker value-format="timestamp"  v-if="edit === 'certificate'" type="date" placeholder="行驶证评定日期"  style="width: 100%" v-model="certificateEntity.evaluation"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{certificateEntity.evaluation | subTime}}</span>
                </el-form-item>
              </el-col>
            </el-row>


            <!-- 分割线 -->
            <!--<el-row><el-col> <hr style="border: none; border-bottom:2px solid #d3dce6; "/> </el-col></el-row>-->

            <!-- 按钮 -->
            <el-row v-if="edit === 'certificate'" style="float: right;">
              <el-button type="info" size="mini"  @click="cancel"><i class="el-icon-fa-undo"></i> 取 消</el-button>
              <el-button type="success" size="mini"  @click="update('certificate',certificateEntity)"><i class="el-icon-fa-save"></i> 确 认</el-button>
            </el-row>
            <el-row v-else style="float: right;">
              <el-button type="primary" size="mini"  @click="editInfo('certificate')"><i class="el-icon-edit"></i> 编 辑</el-button>
            </el-row>
          </el-form>

        </el-tab-pane>
        <el-tab-pane label="技术信息" name="2" style="line-height: 50px;">

          <el-form :model="technicalEntity" :rules="technicalEntityRules" ref="technicalEntity"  label-width="100px" size="mini">
            <el-row :gutter="10" style="height: 50px">
              <el-col :span="8">
                <el-form-item prop="wheelbase">
                  <span slot="label" class="text_css">轴距:</span>
                  <el-input  v-if="edit === 'technical'" placeholder="轴距"  style="width: 100%" v-model="technicalEntity.wheelbase"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.wheelbase}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="tread">
                  <span slot="label" class="text_css">前/后轮距:</span>
                  <el-input  v-if="edit === 'technical'"  placeholder="前/后轮距"  style="width: 100%" v-model="technicalEntity.tread"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.tread}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="standard">
                  <span slot="label" class="text_css">轮胎数/规格:</span>
                  <el-input  v-if="edit === 'technical'" placeholder="轮胎数/规格"  style="width: 100%" v-model="technicalEntity.standard"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.standard}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" style="height: 50px">
              <el-col :span="8">
                <el-form-item label-width="130px" prop="length">
                  <span slot="label" class="text_css">车长(外)mm:</span>
                  <el-input  v-if="edit === 'technical'" placeholder="车长（外）mm"  style="width: 100%" v-model="technicalEntity.length"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.length}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="130px" prop="width">
                  <span slot="label" class="text_css">车宽(外)mm:</span>
                  <el-input  v-if="edit === 'technical'"  placeholder="车宽（外）mm"  style="width: 100%" v-model="technicalEntity.width"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.width}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label-width="130px" prop="height">
                  <span slot="label" class="text_css">车高(外)mm:</span>
                  <el-input  v-if="edit === 'technical'" placeholder="车高（外）mm"  style="width: 100%" v-model="technicalEntity.height"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.height}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" style="height: 50px">
              <el-col :span="8">
                <el-form-item prop="displacement">
                  <span slot="label" class="text_css">排量/功率:</span>
                  <el-input  v-if="edit === 'technical'" placeholder="排量/功率"  style="width: 100%" v-model="technicalEntity.displacement"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.displacement}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="steering">
                  <span slot="label" class="text_css">转向形式:</span>
                  <el-input  v-if="edit === 'technical'"  placeholder="转向形式"  style="width: 100%" v-model="technicalEntity.steering"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.steering}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="axleNumber">
                  <span slot="label" class="text_css">车轴数:</span>
                  <el-input  v-if="edit === 'technical'" placeholder="车轴数"  style="width: 100%" v-model="technicalEntity.axleNumber"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.axleNumber}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" style="height: 50px">
              <el-col :span="8">
                <el-form-item prop="weight">
                  <span slot="label" class="text_css">总质量:</span>
                  <el-input  v-if="edit === 'technical'" placeholder="总质量"  style="width: 100%" v-model="technicalEntity.weight"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.weight}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="origin">
                  <span slot="label" class="text_css">国产/进口:</span>
                  <el-input  v-if="edit === 'technical'"  placeholder="国产/进口"  style="width: 100%" v-model="technicalEntity.origin"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.origin}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="manufacturer">
                  <span slot="label" class="text_css">制造厂商名称:</span>
                  <el-input  v-if="edit === 'technical'" placeholder="制造厂商名称"  style="width: 100%" v-model="technicalEntity.manufacturer"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{technicalEntity.manufacturer}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-form-item v-if="edit === 'technical'" style="float: right">
                <el-button type="primary" size="mini" @click="cancel"><i class="el-icon-fa-undo"></i> 取 消</el-button>
                <el-button type="primary" size="mini" @click="update('technical',technicalEntity)"><i class="el-icon-fa-save"></i> 确 认</el-button>
              </el-form-item>


              <el-form-item v-else style="float: right">
                <el-button type="primary" size="mini" @click="editInfo('technical')"><i class="el-icon-edit"></i> 编 辑</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="安全信息" name="3" style="line-height: 50px;">

          <el-form :model="safetyEntity" :rules="safetyEntityRules" ref="safetyEntity"  label-width="100px" size="mini">
            <el-row :gutter="10" style="height: 50px">
              <el-col :span="8">
                <el-form-item prop="gps">
                  <span slot="label" class="text_css">安装GPS:</span>
                  <el-radio-group v-if="edit === 'safety'" v-model="safetyEntity.gps">
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{safetyEntity.gps == 1? '有':'无'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="tripod">
                  <span slot="label" class="text_css">三角架:</span>
                  <el-radio-group v-if="edit === 'safety'" v-model="safetyEntity.tripod">
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{safetyEntity.tripod == 1? '有':'无'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="extinguisher">
                  <span slot="label" class="text_css">发动机灭火器:</span>
                  <el-radio-group v-if="edit === 'safety'" v-model="safetyEntity.extinguisher">
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{safetyEntity.extinguisher == 1? '有':'无'}}</span>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10" style="height: 50px">
              <el-col :span="8">
                <el-form-item prop="rearView">
                  <span slot="label" class="text_css">副后视境:</span>
                  <el-radio-group v-if="edit === 'safety'" v-model="safetyEntity.rearView">
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{safetyEntity.rearView == 1? '有':'无'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="brake">
                  <span slot="label" class="text_css">副刹:</span>
                  <el-radio-group v-if="edit === 'safety'" v-model="safetyEntity.brake">
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{safetyEntity.brake == 1? '有':'无'}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="faultWarning">
                  <span slot="label" class="text_css">故障警示牌:</span>
                  <el-radio-group v-if="edit === 'safety'" v-model="safetyEntity.faultWarning">
                    <el-radio :label="1">有</el-radio>
                    <el-radio :label="0">无</el-radio>
                  </el-radio-group>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{safetyEntity.faultWarning == 1? '有':'无'}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <el-row v-if="edit === 'safety'" style="float: right">
            <el-button type="primary" size="mini" @click="cancel"><i class="el-icon-fa-undo"></i> 取 消</el-button>
            <el-button type="primary" size="mini" @click="update('safety',safetyEntity)"><i class="el-icon-fa-save"></i> 确 认</el-button>
          </el-row>

          <el-row v-else style="float: right">
            <el-button type="primary" size="mini" @click="editInfo('safety')"><i class="el-icon-edit"></i> 编 辑</el-button>
          </el-row>




        </el-tab-pane>
        <el-tab-pane label="图片相册" name="4">
          <el-row class="panel-group" :gutter="20">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">行驶证</div>
              <el-upload class="avatar-uploader" action="/oss/upload" :show-file-list="false" :headers="headers"
                         accept=".png,.jpg"
                         :on-success="handleDrivingLicensePhotoSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
                <img v-if="safetyEntity.drivingLicensePhoto" :src="safetyEntity.drivingLicensePhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">登记证书</div>
              <el-upload class="avatar-uploader" action="/oss/upload" :show-file-list="false" :headers="headers"
                         accept=".png,.jpg"
                         :on-success="handleCertificatePhotoSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
                <img v-if="safetyEntity.certificatePhoto" :src="safetyEntity.certificatePhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">保单</div>
              <el-upload class="avatar-uploader" action="/oss/upload" :show-file-list="false" :headers="headers"
                         accept=".png,.jpg"
                         :on-success="handlePolicyPhotoSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
                <img v-if="safetyEntity.policyPhoto" :src="safetyEntity.policyPhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">二维检测</div>
              <el-upload class="avatar-uploader" action="/oss/upload" :show-file-list="false" :headers="headers"
                         accept=".png,.jpg"
                         :on-success="handleTwoDimensionalPhotoSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
                <img v-if="safetyEntity.twoDimensionalPhoto" :src="safetyEntity.twoDimensionalPhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>

            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">气瓶证</div>
              <el-upload class="avatar-uploader" action="/oss/upload" :show-file-list="false" :headers="headers"
                         accept=".png,.jpg"
                         :on-success="handleBottlePhotoSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
                <img v-if="safetyEntity.bottlePhoto" :src="safetyEntity.bottlePhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">标识卡</div>
              <el-upload class="avatar-uploader" action="/oss/upload" :show-file-list="false" :headers="headers"
                         accept=".png,.jpg"
                         :on-success="handleIdentificationPhotoSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
                <img v-if="safetyEntity.identificationPhoto" :src="safetyEntity.identificationPhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
              <div style="width: 100%;height: 20px;text-align: center;font-size: 16px;font-weight: 600;margin-bottom: 5px;">道路运输证</div>
              <el-upload class="avatar-uploader" action="/oss/upload" :show-file-list="false" :headers="headers"
                         accept=".png,.jpg"
                         :on-success="handleRoadTransportPhotoSuccess" :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
                <img v-if="safetyEntity.roadTransportPhoto" :src="safetyEntity.roadTransportPhoto" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="维修日志" name="5">
          <el-table v-loading="repairListLoading" element-loading-text="我已经全速加载了..." :data="repairList" stripe border fit highlight-current-row style="width: 100%">
            <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
            <el-table-column prop="description" label="维修事项" width="180">
            </el-table-column>
            <el-table-column prop="repairTime" label="维修时间" width="180">
              <template slot-scope="scope">
                {{scope.row.repairTime | subTime}}
              </template>
            </el-table-column>
            <el-table-column prop="cost" label="维修费用（￥）">
            </el-table-column>
            <el-table-column prop="operator" label="维修人">
            </el-table-column>
            <el-table-column prop="remark" label="备注">
            </el-table-column>
          </el-table>
          <div v-show="!repairListLoading" class="pagination-container" style="margin-top: 20px">
            <el-button style="margin-top: -8px;float: right" @click="createClick('repair')" type="primary" ><i class="el-icon-plus"></i> 添 加</el-button>
          </div>

        </el-tab-pane>
        <el-tab-pane label="保养日志" name="6">
          <el-table v-loading="maintainListLoading" element-loading-text="我已经全速加载了..." :data="maintainList" stripe border fit highlight-current-row style="width: 100%">
            <!--<el-table-column type="selection" class="selection" align="center" prop='uuid'></el-table-column>-->
            <el-table-column type="index" label="序号"  align="center" width="50"></el-table-column>
            <el-table-column prop="description" label="保养内容" width="180">
            </el-table-column>
            <el-table-column prop="maintainTime" label="保养时间" width="180">
              <template slot-scope="scope">
                {{scope.row.maintainTime | subTime}}
              </template>
            </el-table-column>
            <el-table-column prop="cost" label="保养费用">
            </el-table-column>
            <el-table-column prop="operator" label="保养人">
            </el-table-column>
            <el-table-column prop="remark" label="备注">
            </el-table-column>
          </el-table>
          <div v-show="!maintainListLoading" class="pagination-container" style="margin-top: 20px">
            <el-button style="margin-top: -8px;float: right" @click="createClick('maintain')" type="primary" ><i class="el-icon-plus"></i> 添 加</el-button>
          </div>

        </el-tab-pane>
        <el-tab-pane label="里程日志" name="7">
          <el-table v-loading="maintainListLoading" element-loading-text="我已经全速加载了..." :data="mileList" stripe border fit highlight-current-row style="width: 100%">
            <el-table-column type="index" label="序号"  align="center" width="50">
            </el-table-column>
            <el-table-column prop="mile" label="里程" width="210">
            </el-table-column>
            <el-table-column prop="date"  label="时间" width="250">
              <template slot-scope="scope">
                {{scope.row.date | subTime}}
              </template>
            </el-table-column>
              <el-table-column prop="operator" label="操作人">
            </el-table-column>
          </el-table>
          <div v-show="!maintainListLoading" class="pagination-container" style="margin-top: 20px">
            <el-button style="margin-top: -8px;float: right" @click="createClick('mile')" type="primary" ><i class="el-icon-plus"></i> 添 加</el-button>
          </div>
        </el-tab-pane>


        <el-tab-pane label="耗油日志" name="8">
          <el-table element-loading-text="我已经全速加载了..." :data="oilconsumptionList" stripe border fit highlight-current-row style="width: 100%">
            <el-table-column type="index" label="序号"  align="center" width="50">
            </el-table-column>
            <el-table-column prop="operateTime" label="加油日期" width="180">
              <template slot-scope="scope">
                {{scope.row.operateTime | subTime}}
              </template>
            </el-table-column>
            <el-table-column prop="cost" label="金额" width="180">
            </el-table-column>
            <el-table-column prop="operator" label="操作人">
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDel('oilconsumption',scope.row)">删除</el-button>
              <el-button size="mini" type="primary" @click="oilconsumption=scope.row,createClick('oilconsumption')">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="!maintainListLoading" class="pagination-container" style="margin-top: 20px">
            <el-button style="margin-top: -8px;float: right" @click="oilconsumption={},createClick('oilconsumption')" type="primary" ><i class="el-icon-plus"></i> 添 加</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="保险管理" name="9">
          <el-table element-loading-text="我已经全速加载了..." :data="insuranceList" stripe border fit highlight-current-row style="width: 100%">
            <el-table-column type="index" label="序号"  align="center" width="50">
            </el-table-column>
            <el-table-column prop="companyName" label="保险公司名称" width="180">
            </el-table-column>
            <el-table-column prop="type" label="保险类型">
            </el-table-column>
            <el-table-column prop="orderNum" label="订单号">
            </el-table-column>
            <el-table-column prop="coverage" label="保额"  align="center" width="50">
            </el-table-column>
            <el-table-column prop="startTime" label="起始时间" width="180">
              <template slot-scope="scope">
                {{scope.row.startTime | subTime}}
              </template>
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="180">
              <template slot-scope="scope">
                {{scope.row.endTime | subTime}}
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDel('insurance',scope.row)">删除</el-button>
                <el-button size="mini" type="primary" @click="insurance=scope.row,createClick('insurance')">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div v-show="!maintainListLoading" class="pagination-container" style="margin-top: 20px">
            <el-button style="margin-top: -8px;float: right" @click="insurance={},createClick('insurance')" type="primary" ><i class="el-icon-plus"></i> 添 加</el-button>
          </div>

        </el-tab-pane>
      </el-tabs>

      <el-dialog :modal="false" @close="editList({ 'vehicleEntity': vehicleEntity })" :title="flag === 'repair'?'添加维修日志':'添加'" width="550px" :visible.sync="repairListOption">
        <div v-show="flag === 'repair'">

          <el-form label-position="left" :model="repair" :rules="repairRules" ref="repair" label-width="100px">
            <el-form-item label="维修事项" prop="description">
              <el-input v-model="repair.description" placeholder="维修事项" ></el-input>
            </el-form-item>
            <el-form-item label="维修时间" prop="repairTime">
              <el-date-picker value-format="timestamp" style="width: 100%" type="date" placeholder="维修时间" v-model="repair.repairTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="维修费用" prop="cost">
              <el-input v-model="repair.cost" placeholder="维修费用" ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model.number="repair.remark" placeholder="备注" ></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" style="float: right">
            <el-button type="primary" :loading="btnLoading" @click="createRepair('repair', repair)">确 定</el-button>
          </div>
          <div style="clear: both"></div>
        </div>

        <div v-show="flag === 'maintain'">
          <el-form label-position="left" :model="maintain" :rules="maintainRules" ref="maintain" label-width="100px">
            <el-form-item label="保养内容" prop="description">
              <el-input v-model="maintain.description" placeholder="保养内容" ></el-input>
            </el-form-item>
            <el-form-item label="保养时间" prop="maintainTime">
              <el-date-picker value-format="timestamp" style="width: 100%" type="date" placeholder="保养时间" v-model="maintain.maintainTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="保养费用" prop="cost">
              <el-input v-model="maintain.cost" placeholder="保养费用" ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 4}" v-model.number="maintain.remark" placeholder="备注" ></el-input>
            </el-form-item>
          </el-form>

          <div slot="footer" style="float: right">
            <el-button type="primary" :loading="btnLoading" @click="createRepair('maintain', maintain)">确 定</el-button>
          </div>
          <div style="clear: both"></div>


        </div>
        <div v-show="flag === 'mile'">
          <el-form label-position="left" :model="mile"  ref="mile" label-width="100px">
            <el-form-item label="新增里程" prop="description">
              <el-input v-model="mile.mile" placeholder="新增里程" ></el-input>
            </el-form-item>
            <el-form-item label="时间" prop="maintainTime">
              <el-date-picker value-format="timestamp" style="width: 100%" type="date" placeholder="时间" v-model="mile.date"></el-date-picker>
            </el-form-item>
          </el-form>

          <div slot="footer" style="float: right">
            <el-button type="primary" :loading="btnLoading" @click="createRepair('mile', mile)">确 定</el-button>
          </div>
          <div style="clear: both"></div>
        </div>
        <div v-show="flag === 'insurance'">
          <el-form label-position="left" :model="insurance"  ref="insurance" label-width="100px">
            <el-form-item label="保险公司名称" prop="description">
              <el-input v-model="insurance.companyName" placeholder="保险公司名称" ></el-input>
            </el-form-item>
            <el-form-item label="保险类型" prop="description">
              <el-input v-model="insurance.type" placeholder="保险类型" ></el-input>
            </el-form-item>
            <el-form-item label="订单号" prop="description">
              <el-input v-model="insurance.orderNum" placeholder="订单号" ></el-input>
            </el-form-item>
            <el-form-item label="保额" prop="description">
              <el-input v-model="insurance.coverage" placeholder="保额" ></el-input>
            </el-form-item>

            <el-form-item label="起始时间" prop="description">
              <el-date-picker value-format="timestamp" style="width: 100%" type="date" placeholder="时间" v-model="insurance.startTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间" prop="description">
              <el-date-picker value-format="timestamp" style="width: 100%" type="date" placeholder="时间" v-model="insurance.endTime"></el-date-picker>
            </el-form-item>

          </el-form>
          <div slot="footer" style="float: right">
            <el-button type="primary" :loading="btnLoading" @click="createRepair('insurance', insurance)">确 定</el-button>
          </div>
          <div style="clear: both"></div>
        </div>
        <div v-show="flag === 'oilconsumption'">
          <el-form label-position="left" :model="oilconsumption"  ref="oilconsumption" label-width="100px">
            <el-form-item label="加油金额" prop="cost">
              <el-input v-model="oilconsumption.cost" placeholder="加油金额" ></el-input>
            </el-form-item>
            <el-form-item label="时间" prop="operateTime">
              <el-date-picker value-format="timestamp" style="width: 100%" type="date" placeholder="时间" v-model="oilconsumption.operateTime"></el-date-picker>
            </el-form-item>
          </el-form>
          <div slot="footer" style="float: right">
            <el-button type="primary" :loading="btnLoading" @click="createRepair('oilconsumption', oilconsumption)">确 定</el-button>
          </div>
          <div style="clear: both"></div>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
  import { fetchList, getObj, addObj, delVehicleSub, putObj } from '@/api/vehicle/vehicle'
  import { removeAllSpace } from '@/utils/validate'
  import { userList } from '@/api/upms/user'
  import { mapGetters } from 'vuex'
  import { getToken } from '@/utils/auth'

  export default {
    name: 'table_vehicle',
    props: {
      area: Array
    },
    watch: {
      area: function(val) {
        this.tableHeight = val[1]
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'client'
      ]),
      headers() {
        return {
          'Authorization': 'Bearer ' + getToken()
        }
      }
    },
    data() {
      return {
        tableHeight: this.area[1],
        // 车牌集合
        plates: [],
        oilconsumption: {},
        // 负责人集合
        userNames: [],
        // 单个车辆信息
        vehicleEntity: {},
        technicalEntity: {},
        safetyEntity: {},
        insuranceList: [],
        insurance: {},
        certificateEntity: {
          bottleEnd: null,
          bottleStart: null,
          clivtaEnd: null,
          clivtaStart: null,
          createTime: null,
          drivingLicenseEnd: null,
          drivingLicenseEnroll: null,
          drivingLicenseRelease: null,
          evaluation: null,
          identificationEnd: null,
          maintenanceEnd: null,
          maintenanceStart: null,
          roadTransport: null,
          roadTransportEnd: null,
          roadTransportStart: null,
          scrap: null,
          twoDimensionalEnd: null,
          twoDimensionalStart: null,
          typeLevel: null,
          updateTime: null,
          vehicleId: null,
          viEnd: null,
          viStart: null
        },
        maintainList: [],
        mileList: [],
        repairList: [],
        oilconsumptionList: [],
        maintain: {
          description: null,
          maintainTime: null,
          cost: null,
          remark: null
        },
        repair: {
          description: null,
          repairTime: null,
          cost: null,
          remark: null
        },
        mile: {
          vehicleId: null,
          mile: 0,
          date: null
        },
        // 负责人集合
        userList: [],
        // 车辆信息集合
        list: [],
        // 总条数
        total: null,
        listLoading: true,
        repairListLoading: true,
        maintainListLoading: true,
        repairListOption: false,
        flag: 'repairList',
        btnLoading: false,
        infoLoading: false,
        // 模块标记
        showModule: 'list',
        // 分页数据
        listQuery: {
          page: 1,
          limit: 20,
          condition: null,
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
        vehicleEntityRules: {
          number: [
            { required: true, message: '请输入自编号', trigger: ['blur', 'change'] }
          ],
          plateNumber: [
            { required: true, message: '请输入车牌', trigger: ['blur', 'change'] }
          ],
          engineNo: [
            { required: true, message: '请输入发动机号', trigger: ['blur', 'change'] }
          ],
          factoryTime: [
            { required: true, message: '请输入出厂日期', trigger: ['blur', 'change'] }
          ],
          allowNumber: [
            { required: true, message: '请输入核定载客人', trigger: ['blur', 'change'] }
          ],
          affiliation: [
            { required: true, message: '请输入所属机构', trigger: ['blur', 'change'] }
          ],
          registerTime: [
            { required: true, message: '请输入注册登记日期', trigger: ['blur', 'change'] }
          ],
          vehicleType: [
            { required: true, message: '请输入车辆类别', trigger: ['blur', 'change'] }
          ],
          vehicleState: [
            { required: true, message: '请输入车辆来源', trigger: ['blur', 'change'] }
          ],
          userId: [
            { required: true, message: '请输入使用责任人', trigger: ['blur', 'change'] }
          ],
          vinNo: [
            { required: true, message: '请输入车架号', trigger: ['blur', 'change'] }
          ],
          plateColor: [
            { required: true, message: '请输入车牌颜色', trigger: ['blur', 'change'] }
          ]
        },
        certificateEntityRules: {},
        safetyEntityRules: {},
        technicalEntityRules: {},
        addInfo: false,
        plateColors: ['黄色', '绿色', '蓝色'],
        vehicleTypes: ['教练车', '公交', '挂车', '普货车', '特种', '公务车', '出租'],
        vehicleStates: ['新增', '内部转入', '外部转入', '报废更新', '租用'],
        fuelTypes: ['柴油', '汽油', 'CNG天然气', '油电混合', '纯电动'],
        repairRules: {
          description: [
            { required: true, message: '请填写维修内容', trigger: ['blur', 'change'] }
          ],
          repairTime: [
            { required: true, message: '请选择维修时间', trigger: ['blur', 'change'] }
          ],
          cost: [
            { required: true, message: '请填写维修费用', trigger: ['blur', 'change'] }
          ]
        },
        maintainRules: {
          description: [
            { required: true, message: '请填写保养内容', trigger: ['blur', 'change'] }
          ],
          maintainTime: [
            { required: true, message: '请选择保养时间', trigger: ['blur', 'change'] }
          ],
          cost: [
            { required: true, message: '请填写保养费用', trigger: ['blur', 'change'] }
          ]
        }
      }
    },
    created() {
      this.getList()
      this.getUserList()
    },
    methods: {
      // 时间范围分解
      viTimeBlur() {
        this.certificateEntity.viStart = this.daterange.viTime[0]
        this.certificateEntity.viEnd = this.daterange.viTime[1]
      },
      clivtaTimeBlur() {
        this.certificateEntity.clivtaStart = this.daterange.clivtaTime[0]
        this.certificateEntity.clivtaEnd = this.daterange.clivtaTime[1]
      },
      maintenanceTimeBlur() {
        this.certificateEntity.maintenanceStart = this.daterange.maintenanceTime[0]
        this.certificateEntity.maintenanceEnd = this.daterange.maintenanceTime[1]
      },
      bottleTimeBlur() {
        this.certificateEntity.bottleStart = this.daterange.bottleTime[0]
        this.certificateEntity.bottleEnd = this.daterange.bottleTime[1]
      },
      twoDimensionalTimeBlur() {
        this.certificateEntity.twoDimensionalStart = this.daterange.twoDimensionalTime[0]
        this.certificateEntity.twoDimensionalEnd = this.daterange.twoDimensionalTime[1]
      },
      timeGroup() {
        this.daterange = {
          viTime: [],
          clivtaTime: [],
          maintenanceTime: [],
          bottleTime: [],
          twoDimensionalTime: []
        }
        if (this.certificateEntity.viStart) this.daterange.viTime.push(this.certificateEntity.viStart)
        if (this.certificateEntity.viEnd) this.daterange.viTime.push(this.certificateEntity.viEnd)
        if (this.certificateEntity.clivtaStart) this.daterange.clivtaTime.push(this.certificateEntity.clivtaStart)
        if (this.certificateEntity.clivtaEnd) this.daterange.clivtaTime.push(this.certificateEntity.clivtaEnd)
        if (this.certificateEntity.maintenanceStart) this.daterange.maintenanceTime.push(this.certificateEntity.maintenanceStart)
        if (this.certificateEntity.maintenanceEnd) this.daterange.maintenanceTime.push(this.certificateEntity.maintenanceEnd)
        if (this.certificateEntity.bottleStart) this.daterange.bottleTime.push(this.certificateEntity.bottleStart)
        if (this.certificateEntity.bottleEnd) this.daterange.bottleTime.push(this.certificateEntity.bottleEnd)
        if (this.certificateEntity.twoDimensionalStart) this.daterange.twoDimensionalTime.push(this.certificateEntity.twoDimensionalStart)
        if (this.certificateEntity.twoDimensionalEnd) this.daterange.twoDimensionalTime.push(this.certificateEntity.twoDimensionalEnd)
        this.infoLoading = false
      },
      // 获取所有车辆信息
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
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
        this.vehicleEntity = {}
        this.technicalEntity = {}
        this.safetyEntity = {}
        this.certificateEntity = {}
        this.maintainList = []
        this.repairList = []
        this.addInfo = true
        this.edit = 'car'
        this.showModule = 'info'
      },
      // 返回列表
      back() {
        this.getList()
        this.edit = ''
        this.showModule = 'list'
        this.$refs['vehicleEntity'].resetFields()
      },
      // 添加
      add(formName, key, obj) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            this.infoLoading = true
            addObj(key, obj).then(response => {
              this.vehicleEntity.vehicleId = response.data.data
              this.btnLoading = false
              this.infoLoading = false
              this.editList({ 'vehicleEntity': this.vehicleEntity })
            })
            this.edit = ''
          }
        })
      },
      // 修改
      update(key, obj) {
        this.btnLoading = true
        this.infoLoading = true
        putObj(key, obj).then(() => {
          this.btnLoading = false
          this.infoLoading = false
          this.editList({ 'vehicleEntity': this.vehicleEntity })
        })
        this.edit = ''
      },
      // 搜索
      searchClick() {
        this.listQuery.page = 1
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.getList()
      },
      // 取消
      cancel() {
        this.editList({ 'vehicleEntity': this.vehicleEntity })
        this.showModule = 'info'
        this.edit = ''
      },
      // 双击编辑
      editList(val) {
        this.infoLoading = true
        getObj(val.vehicleEntity.vehicleId)
          .then(response => {
            this.vehicleEntity = response.data.data.vehicleEntity === null ? {} : response.data.data.vehicleEntity
            this.technicalEntity = response.data.data.technicalEntity === null ? {} : response.data.data.technicalEntity
            this.safetyEntity = response.data.data.safetyEntity === null ? {} : response.data.data.safetyEntity
            this.certificateEntity = response.data.data.certificateEntity === null ? {} : response.data.data.certificateEntity
            this.maintainList = response.data.data.maintainEntityList === null ? [] : response.data.data.maintainEntityList
            this.repairList = response.data.data.repairEntityList === null ? [] : response.data.data.repairEntityList
            var t = response.data.data.mileageEntityList === null ? [] : response.data.data.mileageEntityList
            this.oilconsumptionList = response.data.data.oilconsumptionEntityList === null ? [] : response.data.data.oilconsumptionEntityList
            this.insuranceList = response.data.data.insuranceEntityList === null ? [] : response.data.data.insuranceEntityList
            this.mileList = t
            this.repairListLoading = false
            this.maintainListLoading = false
            this.timeGroup()
          })
        this.showModule = 'info'
        this.addInfo = false
      },
      // 所有编辑方法
      editInfo(key) {
        if (this.edit === 'car') {
          this.update(this.edit, this.vehicleEntity)
        } else if (this.edit === 'technical') {
          if (this.technicalEntity.wheelbase === null) this.technicalEntity.wheelbase = ''
          this.update(this.edit, this.technicalEntity)
        } else if (this.edit === 'safety') {
          this.update(this.edit, this.safetyEntity)
        } else if (this.edit === 'certificate') {
          if (this.certificateEntity.roadTransport === null) this.certificateEntity.roadTransport = ''
          this.update(this.edit, this.certificateEntity)
        }
        this.edit = key
      },
      handleClick(tab, event) {
      },
      handleAvatarSuccess(res, file) {
        this.vehicleEntity.vehiclePhoto = res.data
        this.infoLoading = false
        // this.update('car', this.vehicleEntity)
      },
      /* 二维 */
      handleTwoDimensionalPhotoSuccess(res, file) {
        this.safetyEntity.twoDimensionalPhoto = res.data
        this.update('safety', this.safetyEntity)
      },
      /* 道路运输证 */
      handleRoadTransportPhotoSuccess(res, file) {
        this.safetyEntity.roadTransportPhoto = res.data
        this.update('safety', this.safetyEntity)
      },
      /* 标识卡 */
      handleIdentificationPhotoSuccess(res, file) {
        this.safetyEntity.identificationPhoto = res.data
        this.update('safety', this.safetyEntity)
      },
      /* 气瓶证 */
      handleBottlePhotoSuccess(res, file) {
        this.safetyEntity.bottlePhoto = res.data
        this.update('safety', this.safetyEntity)
      },
      /* 保单 */
      handlePolicyPhotoSuccess(res, file) {
        this.safetyEntity.policyPhoto = res.data
        this.update('safety', this.safetyEntity)
      },
      /* 登记证书 */
      handleCertificatePhotoSuccess(res, file) {
        this.safetyEntity.certificatePhoto = res.data
        this.update('safety', this.safetyEntity)
      },
      /* 行驶证照片 */
      handleDrivingLicensePhotoSuccess(res, file) {
        this.safetyEntity.drivingLicensePhoto = res.data
        this.update('safety', this.safetyEntity)
      },
      handleAvatarError(err, file, fileList) {
        this.infoLoading = false
        this.$message.error('上传失败')
      },
      beforeAvatarUpload(file) {
        const type = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif']
        const isLt2M = file.size / 1024 / 1024 < 1
        const isImages = file.type && type.indexOf(file.type) > -1

        if (!isImages) {
          this.$message.error('只支持jpg、png格式的图片！')
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 1MB!')
        }

        if (isImages && isLt2M) this.infoLoading = true
        return isImages && isLt2M
      },
      getUserList() {
        userList().then(response => {
          this.userList = response.data.data
        })
      },
      createClick(key) {
        this.repairListOption = true
        this.flag = key
        this.$refs[key].resetFields()
        // if (this.edit === 'repair') {
        //   this.update(this.edit, this.repair)
        // } else if (this.edit === 'maintain') {
        //   this.update(this.edit, this.maintain)
        // }
      },
      createRepair(key, obj) {
        this.$refs[key].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            this.infoLoading = true
            obj.vehicleId = this.vehicleEntity.vehicleId
            addObj(key, obj).then(() => {
              this.btnLoading = false
              this.infoLoading = false
              this.repairListOption = false
              this.editList({ 'vehicleEntity': this.vehicleEntity })
            })
          }
        })
      },
      handleDel(key, obj) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (key == 'oilconsumption') {
            key = key + '/' + obj.consumptionId
          }
          delVehicleSub(key, obj).then(() => {
            this.btnLoading = false
            this.infoLoading = false
            this.repairListOption = false
            this.editList({ 'vehicleEntity': this.vehicleEntity })
          })
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .img{
    width: 100px;
    height: 100px;
    padding: 0;
    overflow: hidden;
  }

  .table_text{
    color: #7c7c7c;font-size: 12px;text-align: left;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
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
    font-size: 14px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .avatar-uploader{
    border: 1px dashed #d9d9d9;
    width: 150px;
    height: 150px;
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
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }
  .panel-group {
    margin-top: 18px;
    .card-panel-col {
      margin-bottom: 10px;
    }
  }
</style>
