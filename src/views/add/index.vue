<template>
  <div style="margin: 15px" align="center">
    <div style="width: 90%;" v-for="(type,index) in typeList">
      <table class="TableBlock title" width="100%" align="center">
        <tbody><tr><td class="TableHeader" @click="openType(index)">{{type.name}}</td></tr></tbody>
      </table>
      <table class="TableBlock" v-show="type.show"  width="100%" align="center" :id="'table_' + type.type">
        <tbody>
        <tr v-for="i in typeFilter(type.type)">
          <td v-for="app in listFilter(i, type.type)" align="left">
            <div class="app-div" :class="app.isChoice?'selected':''" @click="selected(app, $event)">
              <img :src="app.icon" />
              <p>{{app.name}}</p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  name: 'add',
  data() {
    return {
      showList: {},
      typeList: [
        { type: '1', name: '学员管理', show: true },
        { type: '2', name: '客户管理', show: true },
        { type: '3', name: '车辆管理', show: true },
        { type: '4', name: '人力资源管理', show: true },
        { type: '5', name: '财务管理', show: true },
        { type: '6', name: '数据统计', show: true },
        { type: '7', name: '基础配置', show: true },
        { type: '8', name: '日志记录', show: true },
        { type: '9', name: '系统设置', show: true }
      ]
    }
  },

  props: {
    area: Array,
    desktop: {
      type: String
    }
  },
  watch: {
    desktopList: function(val) {
    },
    area: function(val) {
      this.tableHeight = val[1]
    }
  },
  computed: {
    ...mapGetters([
      'hasAppList',
      'desktopTwoList',
      'desktopOneList'
    ])
  },
  mounted() {
  },
  methods: {
    typeFilter(type) {
      var count = 0
      var list = []
      this.hasAppList.forEach(function(item) {
        if (item.type === type) {
          count += 1
          list.push(item)
        }
      })
      this.showList[type] = list
      var residue = count % 4
      var len = parseInt(count / 4)
      if (residue > 0) len += 1
      var list1 = []

      for (var i = 0; i < len; i++) {
        list1.push(i * 4)
      }
      return list1
    },
    listFilter(i, type) {
      var list = this.desktopOneList.concat(this.desktopTwoList)
      return this.showList[type].filter(function(app, index) {
        app.isChoice = false
        list.forEach(function(item) {
          if (item.id === app.id) {
            app.isChoice = true
          }
        })
        return index >= i && index < i + 4
      })
    },
    openType(index) {
      this.typeList[index].show = !this.typeList[index].show
    },
    selected(app) {
      if (!app.isChoice) {
        app.desktop = this.desktop
        if (this.desktop === '1') {
          this.desktopOneList.push(app)
        } else {
          this.desktopTwoList.push(app)
        }
        app.isChoice = true
      }
      var list = this.desktopOneList.concat(this.desktopTwoList)
      this.$store.dispatch('SetDesktopApp', list)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .TableBlock {
    border-right: 1px #CCCCCE solid;
    border-left: 1px #CCCCCE solid;
    border-bottom: 1px #CCCCCE solid;
    line-height: 20px;
    font-size: 9pt;
    &.title{
      border-collapse: collapse;
      border-top: 1px #CCCCCE solid;
    }
  }

  .TableHeader {
    COLOR: #fff;
    FONT-WEIGHT: bold;
    FONT-SIZE: 9pt;
    background: #FAFAFC;
    line-height: 21px;

  }
  .TableHeader:hover {
    cursor: pointer;
  }

  .TableBlock td {
    padding: 3px;
    height: 35px;
  }

  .TableBlock .TableHeader td, .TableBlock td.TableHeader {
    height: 40px !important;
    height: 40px;
    background: #E7E7E7;
    font-weight: bold;
    color: #2D2C2C;
    line-height: 35px;
    padding: 0px;
    padding-left: 5px;
  }
  .app-div{
    width: 200px;
    padding: 5px 20px;
    border: 1px solid #fff;
    border-radius: 5px;
    border: 1px solid #9E9E9E;
    background-color: white;

    &.selected{
      background: url(../../../static/img/select.png) right bottom no-repeat;
    }
    img{
      width: 50px;
      height: 50px;
      float: left;
      margin-right: 15px;
    }
    p{
      line-height: 50px;
      height: 50px;
      margin: 0;
      text-align: left
    }
  }
</style>
