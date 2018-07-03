<template>
  <div style="margin: 15px" align="center">
    <table class="TableBlock" width="90%" align="center">
      <tbody><tr><td class="TableHeader">应用</td></tr></tbody>
    </table>
    <table class="TableBlock" width="90%" align="center">
      <tbody>
        <tr v-for="i in list">
          <td v-for="app in listFilter(i)" align="center">
            <div class="app-div" :class="app.isChoice?'selected':''" @click="selected(app, $event)">
              <img :src="app.icon" />
              <p>{{app.name}}</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  name: 'add',
  data() {
    return {
      list: []
    }
  },
  props: {
    desktop: {
      type: String
    }
  },
  computed: {
    ...mapGetters([
      'hasAppList',
      'desktopTwoList',
      'desktopOneList'
    ])
  },
  watch: {
    desktopList: function(val) {
    }
  },
  mounted() {
    var length = this.hasAppList.length
    var residue = length % 4
    var len = parseInt(length / 4)
    if (residue > 0) len += 1
    for (var i = 0; i < len; i++) {
      this.list.push(i * 4)
    }
  },
  methods: {
    listFilter(i) {
      var list = this.desktopOneList.concat(this.desktopTwoList)
      return this.hasAppList.filter(function(app, index) {
        app.isChoice = false
        list.forEach(function(item) {
          if (item.id === app.id) {
            app.isChoice = true
          }
        })
        return index >= i && index < i + 4
      })
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
    border: 1px #CCCCCE solid;
    line-height: 20px;
    font-size: 9pt;
    border-collapse: collapse;
  }

  .TableHeader {
    COLOR: #fff;
    FONT-WEIGHT: bold;
    FONT-SIZE: 9pt;
    background: #FAFAFC;
    line-height: 21px;
  }

  .TableBlock td {
    padding: 3px;
    height: 35px;
  }

  .TableBlock .TableHeader td, .TableBlock td.TableHeader {
    height: 40px !important;
    height: 40px;
    background: #E7E7E7;
    border: 1px #CCCCCE solid;
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
