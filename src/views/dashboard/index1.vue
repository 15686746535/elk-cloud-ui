<template>
  <div class="dashboard-container">
    <el-row>
      <div class="dashboard-text">欢迎登陆</div>
      <div class="dashboard-text">用户名：{{name}}</div>
      <div class="dashboard-text">角色名：<span v-for='role in roles' :key='role'>{{role}}</span></div>
    </el-row>

    <el-row>
      <span>字典标签,自定义标签</span>
      <!--
        参数：
        dictType:字典类型
        方法：
        selectDict ：字典发生改变是触发，返回字典对象
       {{dict}}
      -->
      <dict dictType="dict_sex" :result="dict" v-model="dict" @selectDict="getDict"></dict>
    </el-row>

    <el-row>
      <el-select class="filter-item" v-model="sel" placeholder="请输入资源请求类型">
          <el-option v-for="item in  methodOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
      </el-select>
      {{sel}}
    </el-row>

    <el-row>
      <!--
      -->
      <org-select v-model="orgId" @org-click="orgClick"></org-select> {{orgId}}
    </el-row>


    <el-row>
      <input type="button" value="按钮" @click="toggle">
    </el-row>
    <el-row>
      <object type="application/cert-reader"  id="plugin" width=0 height=0> </object>
      <input type="button" value="连接" @click="connect">
      <!--<input type="button" value="状态" @click="getStatus">-->
      <input type="button" value="读取" @click="readCert">
      <!--<input type="button" value="断开" @click="disconnect">
-->
      <el-input id="testjquery" placeholder="testjquery"></el-input>
      <table border="0" width="100%" cellpadding="0" cellspacing="0">
        <tr><td align="right">姓名：{{fillForm.Name}}</td></tr>
        <tr><td align="right">性别：{{fillForm.Sex}}</td></tr>
        <tr><td align="right">民族：{{fillForm.Nation}}</td></tr>
        <tr>
          <td align="right">出生：{{fillForm.Born}}</td>
        </tr>
        <tr>
          <td align="right">地址：{{fillForm.Address}}</td>
        </tr>
        <tr>
          <td align="right">身份证号：{{fillForm.CardNo}}</td>
        </tr>
        <tr>
          <td align="right">签发机关：{{fillForm.Police}}</td>
        </tr>
        <tr>
          <td align="right">期限起始：{{fillForm.ActivityLFrom}}</td>
        </tr>
        <tr>
          <td align="right">期限失效：{{fillForm.ActivityLTo}}</td>
        </tr>

        <tr>
          <td align="right">resultFlag：{{fillForm.resultFlag}}</td>
        </tr>

        <tr>
          <td align="right">errorMsg：{{fillForm.errorMsg}}</td>
        </tr>
        <tr>
          <td align="right">status：{{fillForm.status}}</td>
        </tr>

        <tr>
          <td align="left">
            <img :src="fillForm.cardHimg" />(Jpg照片，在IE8中可以显示)
          </td>
        </tr>
        <tr>
          <td align="left">
            <img :src="fillForm.cardFimg" />(Jpg照片，在IE8中可以显示)
          </td>
        </tr>
        <tr>
          <td align="left">
            <img :src="fillForm.cardBimg"  />(Jpg照片，在IE8中可以显示)
          </td>
        </tr>
        <tr>
          <td align="left">
            <img :src="fillForm.cardAimg"  />(Jpg照片，在IE8中可以显示)
          </td>
        </tr>
      </table>
    </el-row>
    <el-row>
    </el-row>

   <!-- <div style="height: 500px;float: left;width: 300px;" >
      &lt;!&ndash; 调用实例  &ndash;&gt;
      <org-tree @node-click="nodeClick" ></org-tree>
    </div>
    <div style="height: 500px;float: left;width: 300px;" >
      &lt;!&ndash;
      &#45;&#45; 参数
      list:数据
      recordList:有复选框时回选节点集合
      id：如果同页面使用多个需要id区分
      open：是否展开    folder
      choiceType：类型 folder显示文件夹图标  checkbox显示复选框 folder_checkbox 都显示
      &#45;&#45; 事件
      @node-click：点击节点触发，返回节点对象
      @node-checkbox：点击复选框时触发 类型为checkbox时用来获取选中集合  传出两个参数 (val, isAdd) val 节点id  ，isAdd true选中，false取消
      &ndash;&gt;


    </div>-->
    <tree :list="list" :recordList="recordList" id="tree" :open="true" choiceType="folder_checkbox" @node-click="nodeCheck" @node-checkbox="nodeCheckbox"></tree>
    <div style="height: 500px">
      <div id="box">

        <transition name="fade">
          <div id="div1" class="test1" v-show="hidden" ></div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Dict from '@/components/Dict'
import OrgTree from '@/components/OrgTree'
import OrgSelect from '@/components/OrgSelect'
import Tree from '@/components/Tree'

export default {
  components: {
    Dict,
    OrgTree,
    OrgSelect,
    Tree
  },
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      dict: '1',
      orgId: 1,
      disabled: true,
      fillForm: {
        Name: '',
        Sex: '',
        Nation: '',
        Born: '',
        Address: '',
        CardNo: '',
        Police: '',
        ActivityLFrom: '',
        ActivityLTo: '',
        resultFlag: '',
        errorMsg: '',
        status: '',
        cardHimg: '',
        cardFimg: '',
        ret: '',
        cardBimg: '',
        cardAimg: ''
      },
      methodOptions: [
        {
          id: 1,
          name: '111111'
        },
        {
          id: 2,
          name: '222222'
        },
        {
          id: 3,
          name: '333333'
        }
      ],
      org: null,
      sel: null,
      hidden: true,
      checkbox: [1, 2, 3],
      recordList: [1, 2, 3],
      list: [
        {
          'id': 1,
          'name': '项目管理',
          'children': [
            {
              'id': 2,
              'name': '项目',
              'children': [
                {
                  'id': 3,
                  'name': '项目1',
                  'children': [
                    {
                      'id': 4,
                      'name': '项目1-1',
                      'children': [
                        {
                          'id': 5,
                          'name': '项目1-1-1',
                          'children': []
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              'id': 6,
              'name': '我的任务',
              'children': []
            },
            {
              'id': 7,
              'name': '人员周报',
              'children': []
            }
          ]
        },
        {
          'id': 8,
          'name': '数据统计',
          'children': []
        },
        {
          'id': 9,
          'name': '人事管理',
          'children': []
        },
        {
          'id': 10,
          'name': '基础管理',
          'children': [
            {
              'id': 12,
              'name': '基础管理1',
              'children': []
            }
          ]
        }
      ]
    }
  },
  methods: {
    connect: function(org) {
      var CVR_IDCard = document.getElementById('plugin')
      var ret = CVR_IDCard.connect()
      this.fillForm.ret = ret
      ret = JSON.parse(ret)
    },
    readCert: function(org) {
      var CVR_IDCard = document.getElementById('plugin')
      var ret = CVR_IDCard.readCert()
      this.fillForm.ret = ret
      ret = JSON.parse(ret)
      if (ret.resultFlag !== -1) {
        this.fillForm.Name = ret.resultContent.partyName
        this.fillForm.Sex = ret.resultContent.gender
        this.fillForm.Nation = ret.resultContent.nation
        this.fillForm.Born = ret.resultContent.bornDay
        this.fillForm.Address = ret.resultContent.certAddress
        this.fillForm.CardNo = ret.resultContent.certNumber
        this.fillForm.Police = ret.resultContent.certOrg
        this.fillForm.ActivityLFrom = ret.resultContent.effDate
        this.fillForm.ActivityLTo = ret.resultContent.expDate
        this.fillForm.cardHimg = 'data:image/jpg;base64,' + ret.resultContent.cardHimg
        this.fillForm.cardFimg = 'data:image/jpg;base64,' + ret.resultContent.cardFimg
        this.fillForm.cardBimg = 'data:image/jpg;base64,' + ret.resultContent.cardBimg
        this.fillForm.cardAimg = 'data:image/jpg;base64,' + ret.resultContent.cardAimg
      }
    },
    qqqq: function(org) {
    },
    nodeClick: function(org) {
    },
    nodeCheckbox(val, isAdd) {
      if (isAdd) {
        this.checkbox.push(val)
      } else {
        this.delNodeId(val)
      }
      console.log(this.checkbox)
    },
    delNodeId(id) {
      for (var i = 0; i < this.checkbox.length; i++) {
        if (this.checkbox[i] === id) this.checkbox.splice(i, 1)
      }
    },
    orgClick(org) {
    },
    toggle() {
      var w = document.documentElement.scrollWidth || document.body.scrollWidth
      var h = document.documentElement.scrollHeight || document.body.scrollHeight
      // var $ = require('jquery')
      // var va = $('#testjquery').val()
      // console.log(va)
      // if (this.sel === 2) {
      //   this.sel = 1
      //   this.orgId = 1
      //   this.dict = '1'
      // } else {
      //   this.sel = 2
      //   this.orgId = 2
      //   this.dict = '2'
      // }
    },
    nodeCheck(node) {
    },
    getDict(d) {
    }
  }
}
// window.onresize = function() {
//   var w = document.documentElement.scrollWidth || document.body.scrollWidth
//   var h = document.documentElement.scrollHeight || document.body.scrollHeight
//   console.log(w)
//   console.log(h)
// }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }


}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>
