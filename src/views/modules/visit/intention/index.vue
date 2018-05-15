<template>
  <div class="app-container calendar-list-container" :style="{height: client.height + 'px'}">
    <transition name="el-zoom-in-center">
    <div v-show="showModule=='list'" style="height: 100%">
      <el-row :gutter="5">
        <el-col class="org-tree-left">
          <el-card>
            <span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">权限筛选</span>
            <my-tree url="/upms/org/tree" v-model="listQuery.orgId"  @node="searchByOrg"></my-tree>
          </el-card>
        </el-col>

        <el-col :style="{width: ($store.state.app.client.width-250) + 'px'}">
          <el-card body-style="padding:10px 20px;" style="margin-bottom: 5px;height: 50px;">
            <el-row :gutter="5">
              <el-col :xs="7" :sm="7" :md="7" :lg="7">
                <el-date-picker value-format="timestamp" size="mini" style="width: 100%;" v-model="interval" type="daterange" align="left" unlink-panels range-separator="—" start-placeholder="来访时间" end-placeholder="来访时间" :picker-options="pickerOptions">
                </el-date-picker>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4">
                <el-select style="width: 100%;" size="mini" v-model="listQuery.introducer" clearable placeholder="负责人">
                  <el-option
                    v-for="item in userList"
                    :key="item.userId"
                    :label="item.name"
                    :value="item.userId">
                  </el-option>
                </el-select>
              </el-col>

              <el-col :xs="3" :sm="3" :md="3" :lg="3">
                <dict dictType="dict_customer_type" size="mini" v-model="listQuery.customerType" placeholder="类型"></dict>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4">
                <dict dictType="dict_source" size="mini" v-model="listQuery.source" placeholder="来源渠道"></dict>
              </el-col>

              <el-col :xs="4" :sm="4" :md="4" :lg="4">
                <el-input @keyup.enter.native="searchClick" size="mini" class="filter-item" placeholder="关键词" v-model="listQuery.condition"></el-input>
              </el-col>

              <el-col :xs="2" :sm="2" :md="2" :lg="2">
                <el-button class="filter-item" type="primary" size="mini" icon="search" @click="searchClick">搜索</el-button>
              </el-col>

            </el-row>
          </el-card>
          <el-card :style="{height: ($store.state.app.client.height-95) + 'px'}" style="overflow: hidden">
            <div class="intentions"  :style="{height: (client.height-185) + 'px'}" style="border-bottom: 1px solid #b2b6bd;" v-loading="listLoading" element-loading-text="给我一点时间" >

              <div class="intention" v-for="intention in intentionList" @click="intentionClick($event,intention)"  @dblclick="editList(intention)">
                <div style="width: 100%;height: 25px">
                  <div class="intention_text" style="width: 50%;float: left;font-size: 18px;">{{intention.name}}</div>
                  <div class="intention_text" style="width: 50%;float: left;font-size: 16px;text-align: right">{{intention.customerType}}</div>
                </div>

                <!-- 分割线 -->
                <div style="width: 100%;float: left;border: none;border-bottom:1px solid #9fcfff;"></div>
                <div style="width: 100%;height: 25px">
                  <div class="intention_text" style="width: 50%;float: left">性别：{{intention.sex | sexFilter}}</div>
                  <div class="intention_text" style="width: 50%;float: left">负责人：{{intention.userName}}</div>
                </div>

                <div class="intention_text" style="width: 100%;float: left">电话：{{intention.mobile}}</div>

                <div class="intention_text" style="width: 100%;float: left">微信：{{intention.wechat}}</div>

                <div class="intention_text" style="width: 100%;float: left">住址：{{intention.contactAddress}}</div>

                <div class="intention_text" style="width: 100%;float: left">顾虑：{{intention.worry}}</div>

                <div class="intention_text" style="width: 100%;float: left">渠道：{{intention.source}}</div>


                <el-tooltip placement="bottom" effect="dark">
                  <div slot="content">
                    <div style="margin: 3px 0"><el-button type="primary" size="mini" @click="editList(intention)">查  看</el-button></div>
                    <div style="margin: 3px 0"><el-button type="success" size="mini" @click="updateState(intention, '1')">入 学</el-button></div>
                    <div style="margin: 3px 0"><el-button type="warning" size="mini" @click="updateState(intention, '-1')">分 配</el-button></div>
                    <div style="margin: 3px 0"><el-button type="danger" size="mini" @click="updateState(intention, '2')">关 闭</el-button></div>
                  </div>
                  <div class="intention_btn"><svg-icon icon-class="wrench"></svg-icon>操作</div>
                </el-tooltip>


              </div>

              <el-collapse-transition>
                <div v-show="followShow">
                  <div :style="{height: (client.height-1) + 'px'}" class="alert_follow" style="border-radius: 6px 0 0 5px;">
                    <div style="width: 100%;background-color: #e9e9e9;height: 40px;line-height: 40px;border-radius: 5px 0 0 0; ">
                      <div style="border: 5px solid #e9e9e9;border-left-color:#b7b7b7; height: 40px; width: 6px;float: left"></div>
                      <span class="text_css" style="font-size: 16px;padding-left: 10px">{{alertFollowEntity.name}}</span>
                      <span class="text_css" style="font-size: 14px;padding-left: 10px">{{alertFollowEntity.mobile}}</span>
                      <div @click="followShow = !followShow" style="float: right;cursor: pointer;margin-right: 10px;"><svg-icon icon-class="closeLink"></svg-icon></div>
                    </div>
                    <div style="width: 100%;height: 100%;">

                      <div :style="{height: (client.height-150) + 'px'}"  style="width: 100%;overflow: auto;margin-bottom: 10px;padding: 35px">
                        <div style="border-left: 2px solid #9fcfff;min-height: 100px;padding-bottom: 15px;" v-for="followUps in followUps">
                          <el-tag class="avatar">
                            <img width="100%" height="100%" :src="followUps.avatar">
                          </el-tag>
                          <div class="username">{{followUps.userName}}</div>
                          <div class="time">{{followUps.createTime | subTime('dateTime')}}</div>
                          <div style="clear: both;white-space:normal;width: 100%">
                            <p style="font-size: 12px;margin-left: 35px;border-radius: 10px;white-space:normal;color: #606266;line-height: 16px;">{{followUps.content}}</p>
                          </div>
                        </div>
                      </div>



                      <div style="padding: 0 5px;">
                        <el-row :gutter="5">
                          <el-col :span="19" >
                            <el-input type="textarea" maxlength="200" :autosize="{ minRows: 4, maxRows: 3}" v-model="followUp.content" placeholder="跟进内容"></el-input>
                          </el-col>
                          <el-col :span="5" ><el-button style="width: 100%;height: 96px;" :loading="btnLoading" type="primary" @click="addFollowUp">跟进</el-button></el-col>
                        </el-row>
                      </div>
                    </div>
                  </div>

                </div>

              </el-collapse-transition>
            </div>
            <div v-show="!listLoading" class="pagination-container" style="margin-top: 20px;">
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                             :current-page.sync="listQuery.page"
                             background
                             style="float: left"
                             :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                             layout="total, sizes, prev, pager, next, jumper" :total="total">
              </el-pagination>

              <el-button size="small" style="float: right" @click="create" type="primary"><i class="el-icon-plus"></i>添加</el-button>
            </div>

          </el-card>
        </el-col>
      </el-row>

    </div>
    </transition>

    <el-dialog width="650px" :close-on-click-modal="false" @close="back" title="录入意向" :visible.sync="addOption">


      <el-form :model="intention" :rules="rules" ref="intention" label-width="120px" class="demo-ruleForm"  size="small">

        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item prop="name">
              <span slot="label" class="text_css">姓名</span>
              <el-input v-model="intention.name" placeholder="姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="sex">
              <span slot="label" class="text_css">性别</span>
              <el-radio-group v-model="intention.sex">
                <el-radio label="1">男</el-radio>
                <el-radio label="0">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="mobile">
              <span slot="label" class="text_css">电话</span>
              <el-input  v-model="intention.mobile" placeholder="电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="wechat">
              <span slot="label" class="text_css">微信</span>
              <el-input  v-model="intention.wechat" placeholder="微信"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="contactAddress">
              <span slot="label" class="text_css">住址</span>
              <el-input  v-model="intention.contactAddress" placeholder="住址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="customerType">
              <span slot="label" class="text_css">客户类型</span>
              <dict v-model="intention.customerType" dictType="dict_customer_type" style="width: 100%;"  placeholder="客户类型"></dict>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="source">
              <span slot="label" class="text_css">来源渠道</span>
              <dict dictType="dict_source" style="width: 100%;" v-model="intention.source"  placeholder="来源渠道"></dict>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="worry">
              <span slot="label" class="text_css">客户顾虑</span>
              <dict v-model="intention.worry" dictType="dict_worry" style="width: 100%;"  placeholder="客户顾虑"></dict>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item prop="visitTime">
              <span slot="label" class="text_css">来访时间</span>
              <el-date-picker  type="date" placeholder="来访时间" value-format="timestamp" style="width: 100%" v-model="intention.visitTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="applyType">
              <span slot="label" class="text_css">车型</span>
              <dict  v-model="intention.applyType" dictType="dict_motorcycle_type" style="width: 100%;"  placeholder="车型"></dict>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item prop="content">
              <span slot="label" class="text_css">咨询内容</span>
              <el-input  type="textarea" v-model="intention.content" placeholder="咨询内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer">
        <el-button size="small" @click="closeAlert('intention')">取 消</el-button>
        <el-button size="small" @click="add('intention')" type="primary">录 入</el-button>
      </div>

    </el-dialog>
    <transition name="el-zoom-in-center">
    <div v-show="showModule=='info'">

      <el-row>
        <el-card style="margin-bottom: 5px;height: 60px;" body-style="padding:10px 20px">
          <div style="float: left;height: 40px;line-height: 40px;">
            |&nbsp;<span style="font-size: 18px;color:rgb(145,145,145)">意向详细信息</span>
          </div>
          <div style="float: right">
            <el-button type="primary" style="float: right" @click="back">返回</el-button>
          </div>
        </el-card>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="12">
          <el-card :style="{height: (client.height-105) + 'px'}" style="overflow: auto">
            <div slot="header" class="clearfix">
              <div style="float: left">
                |&nbsp;<span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">基本信息</span>
              </div>
            </div>
            <el-form :model="intention" :rules="rules" ref="intention" label-width="120px" size="mini" class="demo-ruleForm">

              <el-row :gutter="5"  style="line-height: 50px;">
                <el-col :span="12">
                  <el-form-item prop="name">
                    <span slot="label" class="text_css">姓名</span>
                    <el-input v-if="edit"  v-model="intention.name" placeholder="姓名"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.name}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="mobile">
                    <span slot="label" class="text_css">电话</span>
                    <el-input v-if="edit" :maxlength="11" v-model="intention.mobile" placeholder="电话"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.mobile}}</div>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row :gutter="5"  style="line-height: 50px;">
                <el-col :span="12">
                  <el-form-item prop="userName">
                    <span slot="label" class="text_css">负责人</span>
                    <el-input v-if="edit" disabled v-model="intention.userName" placeholder="负责人"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.userName}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="wechat">
                    <span slot="label" class="text_css">微信</span>
                    <el-input v-if="edit"  v-model="intention.wechat" placeholder="微信"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.wechat}}</div>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row :gutter="5"  style="line-height: 50px;">
                <el-col :span="12">
                  <el-form-item prop="sex">
                    <span slot="label" class="text_css">性别</span>
                    <template v-if="edit">
                      <el-radio v-model="intention.sex" label="1">男</el-radio>
                      <el-radio v-model="intention.sex" label="0">女</el-radio>
                    </template>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.sex | sexFilter}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="source">
                    <span slot="label" class="text_css">来源渠道</span>
                    <dict v-if="edit" dictType="dict_source" style="width: 100%;" v-model="intention.source"  placeholder="来源渠道"></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.source}}</div>
                  </el-form-item>
                </el-col>
              </el-row>


              <el-row :gutter="5"  style="line-height: 50px;">
                <el-col :span="12">
                  <el-form-item prop="customerType">
                    <span slot="label" class="text_css">客户类型</span>
                    <dict v-if="edit" v-model="intention.customerType" dictType="dict_customer_type" style="width: 100%;"  placeholder="客户类型"></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.customerType}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="contactAddress">
                    <span slot="label" class="text_css">住址</span>
                    <el-input v-if="edit"  v-model="intention.contactAddress" placeholder="住址"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.contactAddress}}</div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="5"  style="line-height: 50px;">
                <el-col :span="12">
                  <el-form-item prop="worry">
                    <span slot="label" class="text_css">客户顾虑</span>
                    <dict v-if="edit" v-model="intention.worry" dictType="dict_worry" style="width: 100%;"  placeholder="客户顾虑"></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.worry}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="applyType">
                    <span slot="label" class="text_css">车型</span>
                    <dict v-if="edit" v-model="intention.applyType" dictType="dict_motorcycle_type" style="width: 100%;"  placeholder="车型"></dict>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.applyType}}</div>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="5"  style="line-height: 50px;">
                <el-col :span="12">
                  <el-form-item prop="visitTime">
                    <span slot="label" class="text_css">来访时间</span>
                    <el-date-picker v-if="edit" type="date" placeholder="来访时间"  value-format="timestamp" style="width: 100%" v-model="intention.visitTime"></el-date-picker>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.visitTime | subTime('data')}}</div>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  &nbsp;
                </el-col>
              </el-row>
              <el-row :gutter="5"  style="line-height: 50px;">
                <el-col>
                  <el-form-item prop="content">
                    <span slot="label" class="text_css">咨询内容</span>
                    <el-input v-if="edit" type="textarea" :autosize="{ minRows: 4, maxRows: 3}" v-model="intention.content" placeholder="咨询内容"></el-input>
                    <div style="padding-left: 16px;font-size: 12px;" v-else>{{intention.content}}</div>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 分割线 -->
              <el-row><el-col>&nbsp;</el-col></el-row>

              <el-row>
                <el-col>
                  <el-row v-if="edit">
                    <el-row  v-if="!addInfo" :gutter="10">
                      <el-col :span="6">&nbsp;</el-col>
                      <el-col :span="6"><el-button type="info" size="mini" @click="cancel"><i class="el-icon-fa-undo"></i> 取 消</el-button></el-col>
                      <el-col :span="6"><el-button v-if="!addInfo" type="primary" size="mini" @click="update"><i class="el-icon-fa-save"></i> 保 存</el-button></el-col>
                      <el-col :span="6">&nbsp;</el-col>
                    </el-row>
                    <el-row v-if="addInfo">
                      <el-col :span="8">&nbsp;</el-col>
                      <el-col :span="8"><el-button type="primary" size="mini" @click="add"><i class="el-icon-fa-save"></i> 保 存</el-button></el-col>
                      <el-col :span="8">&nbsp;</el-col>
                    </el-row>
                  </el-row>

                  <el-row v-else :gutter="10">
                    <el-col :span="8">&nbsp;</el-col>
                    <el-col :span="8"><el-button type="primary" size="mini" @click="editInfo"><i class="el-icon-edit"></i> 编 辑</el-button></el-col>
                    <el-col :span="8">&nbsp;</el-col>
                  </el-row>

                </el-col>

              </el-row>
            </el-form>
          </el-card>
        </el-col>

        <el-col :span="12">
          <el-card body-style="padding:0;" :style="{height: (client.height-105) + 'px'}">
              <div slot="header" class="clearfix">
                <div style="float: left">
                  |&nbsp;<span style="font-size: 16px;font-family: '微软雅黑 Light';color:rgb(145,145,145)">跟进信息</span>
                </div>
                <!--<div style="float: right">-->
                  <!--<el-button type="primary" style="width: 174px;float: right" @click="back">返回</el-button>-->
                <!--</div>-->
              </div>

              <div :style="{height: (client.height-275) + 'px'}"  style="width: 100%;overflow: auto;margin-bottom: 10px;padding: 35px">
                <div style="border-left: 2px solid #9fcfff;min-height: 100px;padding-bottom: 25px;" v-for="followUps in followUps">
                  <el-tag style="float:left;width:50px; height: 50px; border-radius: 1000px;margin-left: -26px;margin-top: -15px; padding: 0;overflow: hidden;">
                    <img width="100%" height="100%" :src="followUps.avatar">
                  </el-tag>
                  <div class="username">{{followUps.userName}}</div>
                  <div class="time">{{followUps.createTime | subTime('dateTime')}}</div>
                  <div style="clear: both;white-space:normal;width: 100%">
                    <p style="font-size: 12px;margin-left: 35px;border-radius: 10px;white-space:normal;color: #606266;line-height: 16px;">{{followUps.content}}</p>
                  </div>
                </div>
              </div>



              <div style="padding: 0 5px;">
                <el-row :gutter="5">
                  <el-col :span="19" >
                    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 3}" v-model="followUp.content" placeholder="跟进内容"></el-input>
                  </el-col>
                  <el-col :span="5" ><el-button style="width: 100%;height: 96px;" :loading="btnLoading"  type="primary" @click="addFollowUp">跟进</el-button></el-col>
                </el-row>
              </div>

            </el-card>
        </el-col>
      </el-row>
    </div>
    </transition>

  </div>
</template>

<script>
  import { fetchList, addObj, getObj, putObj, getIntentionByMobile } from '@/api/visit/intention'
  import { followUpList, addFollowUp } from '@/api/visit/followup'
  import { removeAllSpace } from '@/utils/validate'
  import { mapGetters } from 'vuex'
  import { userList } from '@/api/upms/user'

  export default {
    name: 'table_intention',
    data() {
      var mobileIsExistence = (rule, value, callback) => {
        getIntentionByMobile({ 'mobile': value, 'state': '' }).then(response => {
          console.log('=== ===')
          console.log(response.data)
          if (response.data.data) {
            callback(new Error('电话号码已存在'))
          } else {
            callback()
          }
        })
      }
      return {
        intentionList: [],
        intention: {},
        total: null,
        addInfo: false,
        listLoading: true,
        btnLoading: false,
        showModule: 'list',
        interval: [],
        followUp: {
          content: null,
          intentionId: null
        },
        followUps: [],
        followQuery: {
          intentionId: null
        },
        listQuery: {
          page: 1,
          limit: 20,
          orgId: null,
          condition: null,
          source: null,
          customerType: null,
          beginTime: null,
          endTime: null,
          state: 0,
          introducer: null,
          followUp: true
        },
        alertFollowEntity: {},
        pickerOptions: {
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const end = new Date(new Date().setHours(0, 0, 0, 0))
              const start = new Date(new Date().setHours(0, 0, 0, 0))
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '近三天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 3)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本周',
            onClick(picker) {
              const end = new Date()
              const day = new Date(new Date().setHours(0, 0, 0, 0))
              var week = day.getDay()
              if (week === 0) week = 7
              const start = day
              start.setTime(start.getTime() - 3600 * 1000 * 24 * (week - 1))
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '本月',
            onClick(picker) {
              const end = new Date()
              const start = new Date(new Date().setHours(0, 0, 0, 0))
              start.setDate(1)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        customerType: [],
        userList: [],
        edit: true,
        followShow: false,
        addOption: false,
        rules: {
          name: [
            { required: true, message: '请输入名字', trigger: ['blur'] }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: ['blur'] }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: ['blur'] },
            { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: ['blur'] },
            { validator: mobileIsExistence, trigger: ['blur'] }
          ],
          wechat: [
            { required: false, message: '请输入客户微信', trigger: ['blur'] }],
          contactAddress: [
            { required: false, message: '请输入住址', trigger: ['blur'] }
          ],
          customerType: [
            { required: true, message: '请选择客户类型', trigger: ['blur'] }
          ],
          source: [
            { required: true, message: '请选择来源渠道', trigger: ['blur'] }
          ],
          worry: [
            { required: true, message: '请选择客户顾虑', trigger: ['blur'] }
          ],
          applyType: [
            { required: true, message: '请选择所学车型', trigger: ['blur'] }
          ],
          visitTime: [
            { required: true, message: '请选择来访时间', trigger: ['blur'] }
          ],
          content: [
            { required: false, message: '请输入资讯内容', trigger: ['blur'] }
          ]
        }
      }
    },
    created() {
      this.getList()
      this.getUserList()
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
      intervalTime() {
        console.log('================== 时间转换 ===================')
        if (this.interval) {
          this.listQuery.beginTime = this.interval[0]
          this.listQuery.endTime = this.interval[1]
        } else {
          this.listQuery.beginTime = null
          this.listQuery.endTime = null
        }
      },
      getUserList() {
        userList().then(response => {
          console.log('================== 所有负责人 ===================')
          console.log(response.data)
          this.userList = response.data.data
        })
      },
      // 根据部门id查询员工
      searchByOrg() {
        console.log('=====================   根据部门id查询来访信息   =======================')
        this.listQuery.page = 1
        this.getList()
      },
      // 双击行  编辑
      editList(val) {
        console.log('====================== 正在进入单个学员编辑 =====================')
        this.edit = false
        this.intention = val
        console.log(val)
        this.showModule = 'info'
        this.getFollowUp(val)
      },
      getList() {
        this.listLoading = true
        console.log('====== 查询意向 =====')
        console.log(this.listQuery)
        fetchList(this.listQuery).then(response => {
          this.intentionList = response.data.data.list
          console.log('====== 意向信息 =====')
          console.log(this.intentionList)
          this.total = response.data.data.totalCount
          this.listLoading = false
          this.cleanIntentionSelected()
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
      // 添加点击按钮
      create() {
        this.intention = {}
        this.addOption = true
      },
      // 编辑
      editInfo() {
        this.edit = true
      },
      // 添加
      add(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.intention.state = 0
            addObj(this.intention).then(() => {
              console.log('这里是添加方法===========================')
              this.closeAlert(formName)
              this.addOption = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      closeAlert(formName) {
        this.$refs[formName].resetFields()
        this.addOption = false
      },
      // 修改
      update() {
        console.log('================= 修改 ==================')
        console.log(this.intention)
        putObj(this.intention)
          .then(() => {
            this.edit = false
            this.getList()
          })
      },
      // 更改客户状态
      updateState(val, state) {
        var stu = ''
        if (state === '-1') stu = '转入分配'
        else if (state === '2') stu = '关闭'
        else if (state === '1') stu = '转为入学'
        this.$confirm('是否将该学员' + stu + '?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.intention = val
          this.intention.state = state
          this.update()
        })
      },
      // 搜索
      searchClick() {
        this.intervalTime()
        this.listQuery.page = 1
        this.listQuery.condition = removeAllSpace(this.listQuery.condition)
        this.getList()
      },
      // 取消
      cancel() {
        getObj(this.intention.intentionId).then(response => {
          console.log('================= 取消 ==================')
          console.log(response.data)
          this.intention = response.data.data
        })
        this.edit = false
      },
      // 返回
      back() {
        this.showModule = 'list'
        this.addInfo = false
        this.intention = {}
        this.edit = false
        this.followShow = false
        this.addOption = false
        this.getList()
        this.getUserList()
      },
      // 来访信息点击事件
      intentionClick(e, val) {
        this.alertFollowEntity = val
        this.getFollowUp(val)
        console.log(e)
        this.followShow = true
        var a = document.getElementsByClassName('intention')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('intention_selected')
        }
        e.currentTarget.classList.add('intention_selected')
      },
      /* 清除批次样式 */
      cleanIntentionSelected() {
        var a = document.getElementsByClassName('intention')
        for (var i = 0; i < a.length; i++) {
          a[i].classList.remove('intention_selected')
        }
      },
      getFollowUp(val) {
        this.followQuery.intentionId = val.intentionId
        this.followUp.intentionId = val.intentionId
        followUpList(this.followQuery).then(response => {
          console.log('============= 跟进信息 ===================')
          console.log(response.data.data)
          this.followUps = response.data.data
        })
      },
      addFollowUp() {
        console.log('=================')
        this.followUp.content = removeAllSpace(this.followUp.content)
        if (this.followUp.content) {
          this.btnLoading = true
          addFollowUp(this.followUp).then(() => {
            this.getFollowUp(this.followQuery)
            this.btnLoading = false
            this.followUp.content = null
          })
        }
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
  .intentions {
    overflow:auto;
  }
  .intention {
    float: left;
    width: 242px;
    height: 218px;
    margin:5px;
    cursor: pointer;
    border: 1px solid #449ffb;
    border-radius: 5px 5px;
    box-shadow: 5px 3px 3px #ffffff;
    padding: 5px;
    transition: border-color 0.2s,box-shadow 0.2s;
  }
  .intention_btn{
    width: 60px;
    height: 25px;
    border-radius: 5px 0px;
    float: right;
    margin: -17px -6px;
    cursor: pointer;
    background-color: #449ffb;
    transition: background-color 0.2s;
    color: #ffffff;
    text-align: center;
    line-height: 25px;
    font-size: 14px
  }
  .intention:hover{
    border-color: #67c23a;
    .intention_btn{
      background-color: #67c23a;
    }
  }
  .intention_selected {
    border-color: #67c23a;
    box-shadow: 5px 3px 3px #b2b6bd;
    .intention_btn{
      background-color: #67c23a;
    }
  }
  .intention_text{
    color:#495060;
    margin: 2px 0;
    font-size: 14px;
    line-height: 25px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .text_css{
    color:#495060;
    font-size: 16px;
    word-break:keep-all;/* 不换行 */
    white-space:nowrap;/* 不换行 */
    overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
  .el-tooltip__popper.is-dark {
    background: #303133;
    color: #fff;
   }
  .alert_follow{
    position: fixed;
    top: 85px;
    right: 0;
    width: 350px;
    background-color: #fff;
    border-left: 1px solid #449ffb;
    z-index: 10000;
    transition: left 0.2s;

  }
  .avatar{
     float: left;
     width: 40px;
     height: 40px;
     border-radius: 1000px;
     margin-left: -21px;
     margin-top: -14px;
     padding: 0px;
     overflow: hidden;
   }
  .username{
    float: left;
    color: rgb(73, 80, 96);
    font-size: 12px;
    margin-left: 10px;
    font-weight: 600;
  }
  .time{
    float: right;
    color: rgb(73, 80, 96);
    font-size: 12px;
  }
</style>

