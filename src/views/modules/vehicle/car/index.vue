<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
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

            <el-button class="filter-item" type="primary" v-waves icon="search" @click="searchClick">搜索</el-button>
            <el-button class="filter-item" style="margin-left: 10px;" @click="create" type="primary" icon="plus">添加</el-button>
          </el-form>
      </el-card>
      <el-card :style="{height: (client.height - 125) + 'px'}">

        <!-- 身份卡循环 -->
        <el-table :data="list" :height="(client.height - 215)" border style="width: 100%"  highlight-current-row @row-dblclick="editlist" v-loading="listLoading" element-loading-text="给我一点时间">
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
      <el-card class="box-card1">

        <div slot="header" class="clearfix">
          |&nbsp;<span style="font-weight: 600">基础信息</span>
          <el-button type="primary" style="width: 174px;float: right" @click="back">返回</el-button>
        </div>

        <el-row :gutter="10">
          <el-col :span="4" style="line-height: 50px;">
            <el-row><el-col><img width="100%" height="100%" :src="vehicle.vehicleEntity.vehiclePhoto" class="image"></el-col></el-row>
            <!-- 车牌颜色 -->
            <el-row>
              <el-col :span="8"><div class="text_css">车牌颜色:</div></el-col>
              <el-col :span="14">
                <Dict dictType="dict_sex"  v-if="edit == 'vehicle'"  style="width: 100%;max-width: 110px;" v-model="vehicle.vehicleEntity.plateColor" ></Dict>
                <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.plateColor}}</span>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8"><div class="text_css">车身颜色:</div></el-col>
              <el-col :span="14">
                <el-input v-if="edit == 'vehicle'" v-model="vehicle.vehicleEntity.carColor" style="width: 100%;max-width: 110px;" placeholder="车身颜色"></el-input>
                <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.carColor}}</span>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="20" style="line-height: 50px;">
            <!-- 第一大排 -->
            <el-row>
              <!-- 第一列 -->
              <el-col :span="8">
                <!-- 自编号 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">自编号：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit == 'vehicle'"  v-model="vehicle.vehicleEntity.number" placeholder="自编号"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.number}}</span>
                  </el-col>
                </el-row>

                <!-- 车辆牌照 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">车辆牌照：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit == 'vehicle'"  v-model="vehicle.vehicleEntity.plateNumber" placeholder="车辆牌照"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.plateNumber}}</span>
                  </el-col>

                </el-row>

                <!-- 发动机号 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">发动机号：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit == 'vehicle'"  v-model="vehicle.vehicleEntity.engineNo" placeholder="发动机号"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.engineNo}}</span>
                  </el-col>

                </el-row>


              </el-col>

              <!-- 第二列 -->
              <el-col :span="8">

                <!-- 使用责任人 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">使用责任人：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit == 'vehicle'"  v-model="vehicle.vehicleEntity.userId" placeholder="使用责任人"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.name}}</span>
                  </el-col>
                </el-row>

                <!-- 原车辆牌照 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">原车辆牌照：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit == 'vehicle'"  v-model="vehicle.vehicleEntity.oldPlateNumber" placeholder="原车辆牌照"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.oldPlateNumber}}</span>
                  </el-col>
                </el-row>

                <!-- 车架号 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">车架号：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit == 'vehicle'"  v-model="vehicle.vehicleEntity.vinNo" placeholder="车架号"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.vinNo}}</span>
                  </el-col>
                </el-row>

              </el-col>

              <!-- 第三列 -->
              <el-col :span="8">

                <!-- 所属机构 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">所属机构：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit == 'vehicle'"  v-model="vehicle.vehicleEntity.vinNo" placeholder="所属机构"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.vinNo}}</span>
                  </el-col>
                </el-row>

                <!-- 车辆来源  -->
                <el-row>
                  <el-col :span="6"><div class="text_css">车辆来源：</div></el-col>
                  <el-col :span="16">
                    <Dict dictType="dict_sex"  v-if="edit === 'vehicle'"  style="width: 100%" v-model="vehicle.vehicleEntity.vehicleState" placeholder="车辆来源" ></Dict>
                    <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.vehicleState}}</span>
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
                <!-- 车辆类别 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">车辆类别：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit == 'vehicle'"  v-model="vehicle.vehicleEntity.vehicleType" placeholder="车辆类别"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.vehicleType}}</span>
                  </el-col>
                </el-row>

                <!-- 车辆牌照 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">技术等级：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit == 'vehicle'"  v-model="vehicle.vehicleEntity.technicalLevel" placeholder="技术等级"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.technicalLevel}}</span>
                  </el-col>

                </el-row>


              </el-col>

              <!-- 第二列 -->
              <el-col :span="8">

                <!-- 出厂日期 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">出厂日期：</div></el-col>
                  <el-col :span="16">
                    <el-date-picker  v-if="edit === 'vehicle'" type="date" placeholder="出厂日期"  style="width: 100%" v-model="vehicle.vehicleEntity.factoryTime"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.factoryTime | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>

                <!-- 核定载客人 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">核定载客人：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit === 'vehicle'"  v-model="vehicle.vehicleEntity.allowNumber" placeholder="核定载客人"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.allowNumber}}</span>
                  </el-col>
                </el-row>



              </el-col>

              <!-- 第三列 -->
              <el-col :span="8">

                <!-- 注册登记日期 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">注册登记日期：</div></el-col>
                  <el-col :span="16">
                    <el-date-picker  v-if="edit === 'vehicle'" type="date" placeholder="注册登记日期"  style="width: 100%" v-model="vehicle.vehicleEntity.registerTime"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.registerTime | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>

                <!-- 燃料类别  -->
                <el-row>
                  <el-col :span="6"><div class="text_css">燃料类别：</div></el-col>
                  <el-col :span="16">
                    <Dict dictType="dict_sex"  v-if="edit === 'vehicle'" style="width: 100%" v-model="vehicle.vehicleEntity.fuelType" placeholder="燃料类别" ></Dict>
                    <span style="padding-left: 16px;font-size: 12px;" v-else >{{vehicle.vehicleEntity.fuelType}}</span>
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
                <!-- 型号 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">型号：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit == 'vehicle'" style="width: 100%;" v-model="vehicle.vehicleEntity.motorcycleType" placeholder="型号"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.motorcycleType}}</span>
                  </el-col>
                </el-row>


              </el-col>

              <!-- 第二列 -->
              <el-col :span="8">

                <!-- 厂牌 -->
                <el-row>
                  <el-col :span="6"><div class="text_css">厂牌：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit === 'vehicle'" style="width: 100%;" v-model="vehicle.vehicleEntity.brand" placeholder="厂牌"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.vehicleEntity.brand}}</span>
                  </el-col>
                </el-row>



              </el-col>

              <!-- 第三列 -->
              <el-col :span="7">

                <el-row v-if="edit === 'vehicle'" :gutter="10">
                  <el-col :span="12"><el-button v-if="!addInfo" type="info" style="width: 100%;" @click="cancel">取消</el-button></el-col>
                  <el-col :span="12"><el-button v-if="addInfo" type="success" style="width: 100%;" @click="add('vehicle',vehicle.vehicleEntity)">确认保存</el-button></el-col>
                  <el-col :span="12"><el-button v-if="!addInfo" type="success" style="width: 100%;" @click="update('vehicle',vehicle.vehicleEntity)">确认修改</el-button></el-col>
                </el-row>


                <el-row v-else>
                  <el-col :span="12"><el-button type="primary" style="width: 100%;" @click="editInfo('vehicle')">编辑信息</el-button></el-col>
                </el-row>



              </el-col>

            </el-row>

          </el-col>
        </el-row>


      </el-card>

      <el-tabs v-model="activeName" v-if="vehicle.vehicleEntity.vehicleId" type="border-card" @tab-click="handleClick" style="margin-top: 10px" >

        <el-tab-pane label="证件信息" name="1" style="line-height: 50px;">


          <!-- 第一大排 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="8">
              <!-- 行驶证注册登记日期 -->
              <el-row>
                <el-col :span="8"><div class="text_css">行驶证注册登记日期：</div></el-col>
                <el-col :span="14">
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="行驶证注册登记日期"  style="width: 100%" v-model="vehicle.certificateEntity.drivingLicenseEnroll"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.drivingLicenseEnroll | parseTime('{y}-{m}-{d}')}}</span>
                </el-col>
              </el-row>


            </el-col>

            <!-- 第二列 -->
            <el-col :span="8">

              <!-- 行驶证发证日期 -->
              <el-row>
                <el-col :span="8"><div class="text_css">行驶证发证日期：</div></el-col>
                <el-col :span="14">
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="行驶证发证日期"  style="width: 100%" v-model="vehicle.certificateEntity.drivingLicenseRelease"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.drivingLicenseRelease | parseTime('{y}-{m}-{d}')}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第三列 -->
            <el-col :span="8">

              <!-- 行驶证年审有效期 -->
              <el-row>
                <el-col :span="8"><div class="text_css">行驶证年审有效期：</div></el-col>
                <el-col :span="14">
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="行驶证年审有效期"  style="width: 100%" v-model="vehicle.certificateEntity.drivingLicenseEnd"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.drivingLicenseEnd | parseTime('{y}-{m}-{d}')}}</span>
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
              <!-- 道路运输证号 -->
              <el-row>
                <el-col :span="8"><div class="text_css">道路运输证号：</div></el-col>
                <el-col :span="14">
                  <el-input v-if="edit === 'certificate'"  v-model="vehicle.certificateEntity.roadTransport" placeholder="道路运输证号" ></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.roadTransport}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第二列 -->
            <el-col :span="8">

              <!-- 道路运输发证日期 -->
              <el-row>
                <el-col :span="8"><div class="text_css">道路运输发证日期：</div></el-col>
                <el-col :span="14">
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="道路运输发证日期"  style="width: 100%" v-model="vehicle.certificateEntity.roadTransportStart"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.roadTransportStart | parseTime('{y}-{m}-{d}')}}</span>
                </el-col>
              </el-row>


            </el-col>

            <!-- 第三列 -->
            <el-col :span="8">

              <!-- 道路运输年审有效期 -->
              <el-row>
                <el-col :span="8"><div class="text_css">道路运输年审有效期：</div></el-col>
                <el-col :span="14">
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="道路运输年审有效期"  style="width: 100%" v-model="vehicle.certificateEntity.roadTransportEnd"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.roadTransportEnd | parseTime('{y}-{m}-{d}')}}</span>
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
              <!-- 标识卡到期日期 -->
              <el-row>
                <el-col :span="8"><div class="text_css">标识卡到期日期：</div></el-col>
                <el-col :span="14">
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="标识卡到期日期"  style="width: 100%" v-model="vehicle.certificateEntity.identificationEnd"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.identificationEnd | parseTime('{y}-{m}-{d}')}}</span>
                </el-col>
              </el-row>


            </el-col>

            <!-- 第二列 -->
            <el-col :span="8">

              <!-- 评定日期 -->
              <el-row>
                <el-col :span="8"><div class="text_css">评定日期：</div></el-col>
                <el-col :span="14">
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="评定日期"  style="width: 100%" v-model="vehicle.certificateEntity.evaluation"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.evaluation | parseTime('{y}-{m}-{d}')}}</span>
                </el-col>
              </el-row>

            </el-col>

            <!-- 第三列 -->
            <el-col :span="8">

              <!-- 强制报销日期 -->
              <el-row>
                <el-col :span="8"><div class="text_css">强制报销日期：</div></el-col>
                <el-col :span="14">
                  <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="强制报销日期"  style="width: 100%" v-model="vehicle.certificateEntity.scrap"></el-date-picker>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.scrap | parseTime('{y}-{m}-{d}')}}</span>
                </el-col>
              </el-row>

            </el-col>

          </el-row>
          <!-- 分割线 -->
          <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


          <!-- 第四大排 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="12">
              <!-- 交强险 -->
              <el-row>
                <el-col :span="4"><div class="text_css">交强险：</div></el-col>
                <el-col :span="18">
                  <el-date-picker v-if="edit === 'certificate'" @blur="clivtaTimeBlur" v-model="daterange.clivtaTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.clivtaStart | parseTime('{y}-{m}-{d}')}}</span>
                      <span style="padding-left: 16px;font-size: 12px;">至</span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.clivtaEnd | parseTime('{y}-{m}-{d}')}}</span>
                    </span>
                </el-col>
              </el-row>

              <!-- 保养维修 -->
              <el-row>
                <el-col :span="4"><div class="text_css">保养维修：</div></el-col>
                <el-col :span="18">
                  <el-date-picker v-if="edit === 'certificate'" @blur="maintenanceTimeBlur" v-model="daterange.maintenanceTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.maintenanceStart | parseTime('{y}-{m}-{d}')}}</span>
                      <span style="padding-left: 16px;font-size: 12px;">至</span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.maintenanceEnd | parseTime('{y}-{m}-{d}')}}</span>
                    </span>
                </el-col>
              </el-row>

              <!-- 二维检测 -->
              <el-row>
                <el-col :span="4"><div class="text_css">二维检测：</div></el-col>
                <el-col :span="18">
                  <el-date-picker v-if="edit === 'certificate'" @blur="twoDimensionalTimeBlur" v-model="daterange.twoDimensionalTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.twoDimensionalStart | parseTime('{y}-{m}-{d}')}}</span>
                      <span style="padding-left: 16px;font-size: 12px;">至</span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.twoDimensionalEnd | parseTime('{y}-{m}-{d}')}}</span>
                    </span>
                </el-col>
              </el-row>


            </el-col>

            <!-- 第二列 -->
            <el-col :span="12">

              <!-- 商业险 -->
              <el-row>
                <el-col :span="4"><div class="text_css">商业险：</div></el-col>
                <el-col :span="18">
                  <el-date-picker v-if="edit === 'certificate'" @blur="viTimeBlur" v-model="daterange.viTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.viStart | parseTime('{y}-{m}-{d}')}}</span>
                      <span style="padding-left: 16px;font-size: 12px;">至</span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.viEnd | parseTime('{y}-{m}-{d}')}}</span>
                    </span>
                </el-col>
              </el-row>


              <!-- 气瓶 -->
              <el-row>
                <el-col :span="4"><div class="text_css">气瓶：</div></el-col>
                <el-col :span="18">
                  <el-date-picker v-if="edit === 'certificate'" @blur="bottleTimeBlur" v-model="daterange.bottleTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                  </el-date-picker>
                  <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.bottleStart | parseTime('{y}-{m}-{d}')}}</span>
                      <span style="padding-left: 16px;font-size: 12px;">至</span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{vehicle.certificateEntity.bottleEnd | parseTime('{y}-{m}-{d}')}}</span>
                    </span>
                </el-col>
              </el-row>

              <!-- 类型等级 -->
              <el-row>
                <el-col :span="4"><div class="text_css">类型等级：</div></el-col>
                <el-col :span="18">
                  <el-input v-if="edit === 'certificate'" v-model="vehicle.certificateEntity.typeLevel" placeholder="类型等级"  style="width: 100%"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.certificateEntity.typeLevel }}</span>
                </el-col>
              </el-row>

            </el-col>


          </el-row>
          <!-- 分割线 -->
          <el-row><el-col> <hr style="border: none; border-bottom:2px solid #d3dce6; "/> </el-col></el-row>

          <!-- 按钮 -->
          <el-row>

            <el-col :span="17">&nbsp;</el-col>
            <el-col :span="6">

              <el-row v-if="edit === 'certificate'" :gutter="10">
                <el-col :span="12"> <el-button type="info" style="width: 100%" @click="cancel">取消</el-button></el-col>
                <el-col :span="12"><el-button type="success"  style="width: 100%" @click="update('certificate',vehicle.certificateEntity)">确认</el-button></el-col>
              </el-row>

              <el-row v-else >
                <el-col :span="12"><el-button type="primary" style="width: 100%" @click="editInfo('certificate')">编辑信息</el-button></el-col>
              </el-row>

            </el-col>
          </el-row>


        </el-tab-pane>
        <el-tab-pane label="技术信息" name="2" style="line-height: 50px;">

          <!-- 第一大排 -->
          <el-row>
            <!-- 第一列 -->
            <el-col :span="8">
              <!-- 轴距 -->
              <el-row>
                <el-col :span="6"><div class="text_css">轴距：</div></el-col>
                <el-col :span="14">
                  <el-input  v-if="edit === 'technical'" placeholder="轴距"  style="width: 100%" v-model="vehicle.technicalEntity.wheelbase"></el-input>
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
                  <el-input  v-if="edit === 'technical'"  placeholder="前/后轮距"  style="width: 100%" v-model="vehicle.technicalEntity.tread"></el-input>
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
                  <el-input  v-if="edit === 'technical'" placeholder="轮胎数/规格"  style="width: 100%" v-model="vehicle.technicalEntity.standard"></el-input>
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
                  <el-input  v-if="edit === 'technical'" placeholder="车长（外）mm"  style="width: 100%" v-model="vehicle.technicalEntity.length"></el-input>
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
                  <el-input  v-if="edit === 'technical'"  placeholder="车宽（外）mm"  style="width: 100%" v-model="vehicle.technicalEntity.width"></el-input>
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
                  <el-input  v-if="edit === 'technical'" placeholder="车高（外）mm"  style="width: 100%" v-model="vehicle.technicalEntity.height"></el-input>
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
                  <el-input  v-if="edit === 'technical'" placeholder="排量/功率"  style="width: 100%" v-model="vehicle.technicalEntity.displacement"></el-input>
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
                  <el-input  v-if="edit === 'technical'"  placeholder="转向形式"  style="width: 100%" v-model="vehicle.technicalEntity.steering"></el-input>
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
                  <el-input  v-if="edit === 'technical'" placeholder="车轴数"  style="width: 100%" v-model="vehicle.technicalEntity.axleNumber"></el-input>
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
                  <el-input  v-if="edit === 'technical'" placeholder="总质量"  style="width: 100%" v-model="vehicle.technicalEntity.weight"></el-input>
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
                  <el-input  v-if="edit === 'technical'"  placeholder="国产/进口"  style="width: 100%" v-model="vehicle.technicalEntity.origin"></el-input>
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
                  <el-input  v-if="edit === 'technical'" placeholder="制造厂商名称"  style="width: 100%" v-model="vehicle.technicalEntity.manufacturer"></el-input>
                  <span style="padding-left: 16px;font-size: 12px;" v-else>{{vehicle.technicalEntity.manufacturer}}</span>
                </el-col>
              </el-row>

            </el-col>

          </el-row>
          <!-- 分割线 -->
          <el-row><el-col> <hr style="border: none; border-bottom:2px solid #d3dce6; "/> </el-col></el-row>

          <el-form :inline="true"  :model="vehicle" label	 label-width="160px" label-position="left" class="demo-form-inline">

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
      <!--<el-tabs v-model="activeName" v-if="car.vehicleEntity.vehicleId" type="border-card" @tab-click="handleClick" style="margin-top: 10px" >

          <el-tab-pane label="证件信息" name="1" style="line-height: 50px;">


            &lt;!&ndash; 第一大排 &ndash;&gt;
            <el-row>
              &lt;!&ndash; 第一列 &ndash;&gt;
              <el-col :span="8">
                &lt;!&ndash; 行驶证注册登记日期 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">行驶证注册登记日期：</div></el-col>
                  <el-col :span="16">
                    <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="行驶证注册登记日期"  style="width: 100%" v-model="car.certificateEntity.drivingLicenseEnroll"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.certificateEntity.drivingLicenseEnroll | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>


              </el-col>

              &lt;!&ndash; 第二列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 行驶证发证日期 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">行驶证发证日期：</div></el-col>
                  <el-col :span="16">
                    <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="行驶证发证日期"  style="width: 100%" v-model="car.certificateEntity.drivingLicenseRelease"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.certificateEntity.drivingLicenseRelease | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第三列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 行驶证年审有效期 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">行驶证年审有效期：</div></el-col>
                  <el-col :span="16">
                    <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="行驶证年审有效期"  style="width: 100%" v-model="car.certificateEntity.drivingLicenseEnd"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.certificateEntity.drivingLicenseEnd | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>

              </el-col>

            </el-row>
            &lt;!&ndash; 分割线 &ndash;&gt;
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


            &lt;!&ndash; 第二大排 &ndash;&gt;
            <el-row>
              &lt;!&ndash; 第一列 &ndash;&gt;
              <el-col :span="8">
                &lt;!&ndash; 道路运输证号 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">道路运输证号：</div></el-col>
                  <el-col :span="16">
                    <el-input v-if="edit === 'certificate'"  v-model="car.certificateEntity.roadTransport" placeholder="道路运输证号" ></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.certificateEntity.roadTransport}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第二列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 道路运输发证日期 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">道路运输发证日期：</div></el-col>
                  <el-col :span="16">
                    <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="道路运输发证日期"  style="width: 100%" v-model="car.certificateEntity.roadTransportStart"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.certificateEntity.roadTransportStart | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>


              </el-col>

              &lt;!&ndash; 第三列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 道路运输年审有效期 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">道路运输年审有效期：</div></el-col>
                  <el-col :span="16">
                    <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="道路运输年审有效期"  style="width: 100%" v-model="car.certificateEntity.roadTransportEnd"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.certificateEntity.roadTransportEnd | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>

              </el-col>

            </el-row>
            &lt;!&ndash; 分割线 &ndash;&gt;
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


            &lt;!&ndash; 第三大排 &ndash;&gt;
            <el-row>
              &lt;!&ndash; 第一列 &ndash;&gt;
              <el-col :span="8">
                &lt;!&ndash; 标识卡到期日期 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">标识卡到期日期：</div></el-col>
                  <el-col :span="16">
                    <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="标识卡到期日期"  style="width: 100%" v-model="car.certificateEntity.identificationEnd"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.certificateEntity.identificationEnd | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>


              </el-col>

              &lt;!&ndash; 第二列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 评定日期 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">评定日期：</div></el-col>
                  <el-col :span="16">
                    <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="评定日期"  style="width: 100%" v-model="car.certificateEntity.evaluation"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.certificateEntity.evaluation | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第三列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 强制报销日期 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">强制报销日期：</div></el-col>
                  <el-col :span="16">
                    <el-date-picker  v-if="edit === 'certificate'" type="date" placeholder="强制报销日期"  style="width: 100%" v-model="car.certificateEntity.scrap"></el-date-picker>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.certificateEntity.scrap | parseTime('{y}-{m}-{d}')}}</span>
                  </el-col>
                </el-row>

              </el-col>

            </el-row>
            &lt;!&ndash; 分割线 &ndash;&gt;
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


            &lt;!&ndash; 第四大排 &ndash;&gt;
            <el-row>
              &lt;!&ndash; 第一列 &ndash;&gt;
              <el-col :span="12">
                &lt;!&ndash; 交强险 &ndash;&gt;
                <el-row>
                  <el-col :span="4"><div class="text_css">交强险：</div></el-col>
                  <el-col :span="18">
                    <el-date-picker v-if="edit === 'certificate'" @blur="clivtaTimeBlur" v-model="daterange.clivtaTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{car.certificateEntity.clivtaStart | parseTime('{y}-{m}-{d}')}}</span>
                      <span style="padding-left: 16px;font-size: 12px;">至</span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{car.certificateEntity.clivtaEnd | parseTime('{y}-{m}-{d}')}}</span>
                    </span>
                  </el-col>
                </el-row>

                &lt;!&ndash; 保养维修 &ndash;&gt;
                <el-row>
                  <el-col :span="4"><div class="text_css">保养维修：</div></el-col>
                  <el-col :span="18">
                    <el-date-picker v-if="edit === 'certificate'" @blur="maintenanceTimeBlur" v-model="daterange.maintenanceTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{car.certificateEntity.maintenanceStart | parseTime('{y}-{m}-{d}')}}</span>
                      <span style="padding-left: 16px;font-size: 12px;">至</span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{car.certificateEntity.maintenanceEnd | parseTime('{y}-{m}-{d}')}}</span>
                    </span>
                  </el-col>
                </el-row>

                &lt;!&ndash; 二维检测 &ndash;&gt;
                <el-row>
                  <el-col :span="4"><div class="text_css">二维检测：</div></el-col>
                  <el-col :span="18">
                    <el-date-picker v-if="edit === 'certificate'" @blur="twoDimensionalTimeBlur" v-model="daterange.twoDimensionalTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{car.certificateEntity.twoDimensionalStart | parseTime('{y}-{m}-{d}')}}</span>
                      <span style="padding-left: 16px;font-size: 12px;">至</span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{car.certificateEntity.twoDimensionalEnd | parseTime('{y}-{m}-{d}')}}</span>
                    </span>
                  </el-col>
                </el-row>


              </el-col>

              &lt;!&ndash; 第二列 &ndash;&gt;
              <el-col :span="12">

                &lt;!&ndash; 商业险 &ndash;&gt;
                <el-row>
                  <el-col :span="4"><div class="text_css">商业险：</div></el-col>
                  <el-col :span="18">
                    <el-date-picker v-if="edit === 'certificate'" @blur="viTimeBlur" v-model="daterange.viTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{car.certificateEntity.viStart | parseTime('{y}-{m}-{d}')}}</span>
                      <span style="padding-left: 16px;font-size: 12px;">至</span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{car.certificateEntity.viEnd | parseTime('{y}-{m}-{d}')}}</span>
                    </span>
                  </el-col>
                </el-row>


                &lt;!&ndash; 气瓶 &ndash;&gt;
                <el-row>
                  <el-col :span="4"><div class="text_css">气瓶：</div></el-col>
                  <el-col :span="18">
                    <el-date-picker v-if="edit === 'certificate'" @blur="bottleTimeBlur" v-model="daterange.bottleTime" style="width: 100%" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <span v-else>
                      <span style="padding-left: 16px;font-size: 12px;" >{{car.certificateEntity.bottleStart | parseTime('{y}-{m}-{d}')}}</span>
                      <span style="padding-left: 16px;font-size: 12px;">至</span>
                      <span style="padding-left: 16px;font-size: 12px;" >{{car.certificateEntity.bottleEnd | parseTime('{y}-{m}-{d}')}}</span>
                    </span>
                  </el-col>
                </el-row>

                &lt;!&ndash; 类型等级 &ndash;&gt;
                <el-row>
                  <el-col :span="4"><div class="text_css">类型等级：</div></el-col>
                  <el-col :span="18">
                    <el-input v-if="edit === 'certificate'" v-model="car.certificateEntity.typeLevel" placeholder="类型等级"  style="width: 100%"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.certificateEntity.typeLevel }}</span>
                  </el-col>
                </el-row>

              </el-col>


            </el-row>
            &lt;!&ndash; 分割线 &ndash;&gt;
            <el-row><el-col> <hr style="border: none; border-bottom:2px solid #d3dce6; "/> </el-col></el-row>

            &lt;!&ndash; 按钮 &ndash;&gt;
            <el-row>

              <el-col :span="17">&nbsp;</el-col>
              <el-col :span="6">

                <el-row v-if="edit === 'certificate'" :gutter="10">
                  <el-col :span="12"> <el-button type="info" style="width: 100%" @click="cancel">取消</el-button></el-col>
                  <el-col :span="12"><el-button type="success"  style="width: 100%" @click="update('certificate',car.certificateEntity)">确认</el-button></el-col>
                </el-row>

                <el-row v-else >
                  <el-col :span="12"><el-button type="primary" style="width: 100%" @click="editInfo('certificate')">编辑信息</el-button></el-col>
                </el-row>

              </el-col>
            </el-row>


          </el-tab-pane>
          <el-tab-pane label="技术信息" name="2" style="line-height: 50px;">

            &lt;!&ndash; 第一大排 &ndash;&gt;
            <el-row>
              &lt;!&ndash; 第一列 &ndash;&gt;
              <el-col :span="8">
                &lt;!&ndash; 轴距 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">轴距：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'" placeholder="轴距"  style="width: 100%" v-model="car.technicalEntity.wheelbase"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.wheelbase}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第二列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 前/后轮距 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">前/后轮距：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'"  placeholder="前/后轮距"  style="width: 100%" v-model="car.technicalEntity.tread"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.tread}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第三列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 轮胎数/规格 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">轮胎数/规格：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'" placeholder="轮胎数/规格"  style="width: 100%" v-model="car.technicalEntity.standard"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.standard}}</span>
                  </el-col>
                </el-row>

              </el-col>

            </el-row>
            &lt;!&ndash; 分割线 &ndash;&gt;
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


            &lt;!&ndash; 第二大排 &ndash;&gt;
            <el-row>
              &lt;!&ndash; 第一列 &ndash;&gt;
              <el-col :span="8">
                &lt;!&ndash; 车长（外）mm &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">车长（外）mm：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'" placeholder="车长（外）mm"  style="width: 100%" v-model="car.technicalEntity.length"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.length}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第二列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 车宽（外）mm &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">车宽（外）mm：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'"  placeholder="车宽（外）mm"  style="width: 100%" v-model="car.technicalEntity.width"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.width}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第三列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 车高（外）mm &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">车高（外）mm：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'" placeholder="车高（外）mm"  style="width: 100%" v-model="car.technicalEntity.height"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.height}}</span>
                  </el-col>
                </el-row>

              </el-col>

            </el-row>
            &lt;!&ndash; 分割线 &ndash;&gt;
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


            &lt;!&ndash; 第三大排 &ndash;&gt;
            <el-row>
              &lt;!&ndash; 第一列 &ndash;&gt;
              <el-col :span="8">
                &lt;!&ndash; 排量/功率 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">排量/功率：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'" placeholder="排量/功率"  style="width: 100%" v-model="car.technicalEntity.displacement"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.displacement}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第二列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 转向形式 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">转向形式：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'"  placeholder="转向形式"  style="width: 100%" v-model="car.technicalEntity.steering"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.steering}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第三列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 车轴数 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">车轴数：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'" placeholder="车轴数"  style="width: 100%" v-model="car.technicalEntity.axleNumber"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.axleNumber}}</span>
                  </el-col>
                </el-row>

              </el-col>

            </el-row>
            &lt;!&ndash; 分割线 &ndash;&gt;
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


            &lt;!&ndash; 第四大排 &ndash;&gt;
            <el-row>
              &lt;!&ndash; 第一列 &ndash;&gt;
              <el-col :span="8">
                &lt;!&ndash; 总质量 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">总质量：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'" placeholder="总质量"  style="width: 100%" v-model="car.technicalEntity.weight"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.weight}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第二列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 国产/进口 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">国产/进口：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'"  placeholder="国产/进口"  style="width: 100%" v-model="car.technicalEntity.origin"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.origin}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第三列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 制造厂商名称 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">制造厂商名称：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'technical'" placeholder="制造厂商名称"  style="width: 100%" v-model="car.technicalEntity.manufacturer"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.technicalEntity.manufacturer}}</span>
                  </el-col>
                </el-row>

              </el-col>

            </el-row>
            &lt;!&ndash; 分割线 &ndash;&gt;
            <el-row><el-col> <hr style="border: none; border-bottom:2px solid #d3dce6; "/> </el-col></el-row>

            <el-form :inline="true"  :model="car" label	 label-width="160px" label-position="left" class="demo-form-inline">

              <el-col>
                <el-form-item v-if="edit === 'technical'" style="float: right">
                  <el-button type="primary"  style="width: 150px;" @click="cancel">取消</el-button>
                  <el-button type="primary"  style="width: 150px;" @click="update('technical',car.technicalEntity)">确认</el-button>
                </el-form-item>


                <el-form-item v-else style="float: right">
                  <el-button type="primary" style="width: 150px;" @click="editInfo('technical')">编辑信息</el-button>
                </el-form-item>
              </el-col>

            </el-form>

          </el-tab-pane>
          <el-tab-pane label="安全信息" name="3" style="line-height: 50px;">

            &lt;!&ndash; 第一大排 &ndash;&gt;
            <el-row>
              &lt;!&ndash; 第一列 &ndash;&gt;
              <el-col :span="8">
                &lt;!&ndash; 安装GPS &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">安装GPS：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'safety'" placeholder="安装GPS"  style="width: 100%" v-model="car.safetyEntity.gps"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.safetyEntity.gps}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第二列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 三角架 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">三角架：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'safety'"  placeholder="三角架"  style="width: 100%" v-model="car.safetyEntity.tripod"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.safetyEntity.tripod}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第三列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 发动机灭火器 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">发动机灭火器：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'safety'" placeholder="发动机灭火器"  style="width: 100%" v-model="car.safetyEntity.extinguisher"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.safetyEntity.extinguisher}}</span>
                  </el-col>
                </el-row>

              </el-col>

            </el-row>
            &lt;!&ndash; 分割线 &ndash;&gt;
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>


            &lt;!&ndash; 第二大排 &ndash;&gt;
            <el-row>
              &lt;!&ndash; 第一列 &ndash;&gt;
              <el-col :span="8">
                &lt;!&ndash; 副后视境 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">副后视境：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'safety'" placeholder="副后视境"  style="width: 100%" v-model="car.safetyEntity.rearView"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.safetyEntity.rearView}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第二列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 副刹 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">副刹：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'safety'"  placeholder="副刹"  style="width: 100%" v-model="car.safetyEntity.brake"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.safetyEntity.brake}}</span>
                  </el-col>
                </el-row>

              </el-col>

              &lt;!&ndash; 第三列 &ndash;&gt;
              <el-col :span="8">

                &lt;!&ndash; 故障警示牌 &ndash;&gt;
                <el-row>
                  <el-col :span="6"><div class="text_css">故障警示牌：</div></el-col>
                  <el-col :span="16">
                    <el-input  v-if="edit === 'safety'" placeholder="故障警示牌"  style="width: 100%" v-model="car.safetyEntity.faultWarning"></el-input>
                    <span style="padding-left: 16px;font-size: 12px;" v-else>{{car.safetyEntity.faultWarning}}</span>
                  </el-col>
                </el-row>

              </el-col>

            </el-row>
            &lt;!&ndash; 分割线 &ndash;&gt;
            <el-row><el-col> <hr style="border: none; border-bottom:1px solid #d3dce6; "/> </el-col></el-row>

            <el-form :inline="true"  :model="car" label	 label-width="160px" label-position="left" class="demo-form-inline">

              <el-col>

                <el-form-item v-if="edit === 'safety'" style="float: right">
                  <el-button type="primary"  style="width: 150px;" @click="cancel">取消</el-button>
                  <el-button type="primary"  style="width: 150px;" @click="update('safety',car.safetyEntity)">确认</el-button>
                </el-form-item>

                <el-form-item v-else style="float: right">
                  <el-button type="primary" style="width: 150px;" @click="editInfo('safety')">编辑信息</el-button>
                </el-form-item>


              </el-col>

            </el-form>

          </el-tab-pane>
          <el-tab-pane label="图片相册" name="4">图片相册</el-tab-pane>
          <el-tab-pane label="维修日志" name="5">

            <el-table :data="car.repairEntityList" stripe style="width: 100%">
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

            <el-table :data="car.maintainEntityList" stripe style="width: 100%">
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

            <el-table :data="car.maintainEntityList" stripe style="width: 100%">
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

        </el-tabs>-->
    </div>
  </div>
</template>

<script>
  import { fetchList, getObj, addObj, putObj } from '@/api/vehicle/vehicle'
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import { removeAllSpace } from '@/utils/validate'
  import Dict from '@/components/Dict'
  import { mapGetters } from 'vuex'

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
