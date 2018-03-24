<template>
  <div class="dashboard-container">
    <OBJECT classid="clsid:10946843-7507-44FE-ACE8-2B3483D179B7"
            id="CVR_IDCard" name="CVR_IDCard" width="0" height="0" >
    </OBJECT>

    <object classid="clsid:454C18E2-8B7D-43C6-8C17-B1825B49D7DE" id="captrue" width="400" height="300"></object>

    <div class="a">
      <div class="b"></div>
    </div>
    <el-form :model="person"  ref="person" label-width="100px">
      <el-form-item label="姓名"  prop="name">
        <el-input v-model="person.name" placeholder="姓名" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;"  @click.native.prevent="printPdf">登陆</el-button>
      </el-form-item>

    </el-form>
    <el-button type="primary" @click="aaaaaa">ceshi</el-button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { wechatLogin } from '@/api/upms/login'
import { getLodop } from '@/common/LodopFuncs'
let LODOP
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      person: {
        name: '',
        sex: '',
        nation: '',
        born: '',
        address: '',
        cardNo: '',
        issuedAt: '',
        effectedDate: '',
        expiredDate: '',
        samId: '',
        pic: '',
        picture: '',
        pictureLen: ''
      },
      openId: 'sdsadsad'
      // LODOP: getLodop
    }
  },
  methods: {
    aaaaaa() {
      wechatLogin(this.openId).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    ClearForm() {
      this.person = {
        name: '',
        sex: '',
        nation: '',
        born: '',
        address: '',
        cardNo: '',
        issuedAt: '',
        effectedDate: '',
        expiredDate: '',
        samId: '',
        pic: '',
        picture: '',
        pictureLen: ''
      }
    },
    Button1_onclick() {
      var CVR_IDCard = document.getElementById('CVR_IDCard')
      var strReadResult = CVR_IDCard.ReadCard()
      if (strReadResult == '0') {
        this.ClearForm()
        this.person.name = CVR_IDCard.Name
        this.person.sex = CVR_IDCard.Sex
        this.person.nation = CVR_IDCard.Nation
        this.person.born = CVR_IDCard.Born
        this.person.address = CVR_IDCard.Address
        this.person.cardNo = CVR_IDCard.CardNo
        this.person.issuedAt = CVR_IDCard.IssuedAt
        this.person.effectedDate = CVR_IDCard.EffectedDate
        this.person.expiredDate = CVR_IDCard.ExpiredDate
        this.person.samId = CVR_IDCard.SAMID
        this.person.pic = CVR_IDCard.Pic
        this.person.picture = CVR_IDCard.Picture
        this.person.pictureLen = CVR_IDCard.PictureLen
      } else {
        this.ClearForm()
        alert(strReadResult)
      }
    },
    Button3_onclick() {
      var CVR_IDCard = document.getElementById('CVR_IDCard')
      CVR_IDCard.AboutBox()
    },
    printPdf() {
      this.CreateOneFormPage()
      // LODOP.PRINT()
      LODOP.PREVIEW()
    },
    CreateOneFormPage() {
      LODOP = getLodop()
      LODOP.PRINT_INITA(10, 10, 762, 533, '打印控件功能演示_Lodop功能_移动公司发票全样')
      LODOP.SET_PRINT_STYLE('FontColor', '#0000FF')
      LODOP.ADD_PRINT_SHAPE(2, 116, 43, 655, 373, 0, 1, '#800000')
      LODOP.ADD_PRINT_SHAPE(1, 144, 44, 653, 1, 0, 1, '#800000')
      LODOP.ADD_PRINT_SHAPE(1, 172, 44, 653, 1, 0, 1, '#800000')
      LODOP.ADD_PRINT_SHAPE(0, 116, 143, 1, 56, 0, 1, '#800000')
      LODOP.ADD_PRINT_SHAPE(0, 116, 488, 1, 56, 0, 1, '#800000')
      LODOP.ADD_PRINT_SHAPE(0, 116, 574, 1, 372, 0, 1, '#800000')
      LODOP.ADD_PRINT_SHAPE(0, 172, 166, 1, 282, 0, 1, '#800000')
      LODOP.ADD_PRINT_SHAPE(0, 172, 415, 1, 282, 0, 1, '#800000')
      LODOP.ADD_PRINT_SHAPE(1, 454, 44, 653, 1, 0, 1, '#800000')
      LODOP.ADD_PRINT_SHAPE(0, 454, 130, 1, 34, 0, 1, '#800000')
      LODOP.ADD_PRINT_SHAPE(0, 454, 483, 1, 34, 0, 1, '#800000')
      LODOP.ADD_PRINT_SHAPE(0, 64, 62, 120, 1, 0, 1, '#0000FF')
      LODOP.ADD_PRINT_SHAPE(3, 29, 62, 32, 32, 0, 4, '#0000FF')
      LODOP.ADD_PRINT_SHAPE(3, 21, 300, 147, 75, 0, 3, '#FF0000')
      LODOP.ADD_PRINT_SHAPE(3, 26, 307, 132, 65, 0, 1, '#FF0000')
      LODOP.ADD_PRINT_TEXT(33, 192, 408, 30, '中国移动通信集团北京有限公司专用发票')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 15)
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(68, 326, 100, 25, '发 票 联')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(29, 98, 84, 35, '中国移动通信CHINA MOBILE')
      LODOP.ADD_PRINT_SHAPE(2, 37, 69, 18, 15, 0, 1, '#0000FF')
      LODOP.ADD_PRINT_SHAPE(2, 40, 73, 10, 9, 0, 1, '#0000FF')
      LODOP.ADD_PRINT_TEXT(70, 64, 117, 20, '移 动 信 息 专 家')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8)
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(124, 58, 68, 20, '客户名称')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(152, 58, 68, 20, '手机号码')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(124, 497, 68, 20, '受理类别')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(152, 497, 68, 20, '合 同 号')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(465, 54, 68, 20, '大写金额')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(465, 495, 104, 20, '小写金额    ￥: ')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 3)
      LODOP.ADD_PRINT_TEXT(98, 56, 47, 20, '编号：')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 3)
      LODOP.ADD_PRINT_TEXT(98, 259, 48, 20, '日期：')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 3);
      LODOP.ADD_PRINT_TEXT(97, 500, 71, 20, '发票号码：')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 3)
      LODOP.ADD_PRINT_TEXT(496, 54, 83, 20, '话费帐期：')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 3)
      LODOP.ADD_PRINT_TEXT(496, 321, 83, 20, '营业员工号：')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 3)
      LODOP.ADD_PRINT_TEXT(496, 480, 93, 20, '收款单位名称：')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 3)
      LODOP.ADD_PRINT_TEXT(226, 703, 27, 121, '第二联发票联')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(203, 21, 17, 195, '京地税准印八九号五百万份')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 8)
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(126, 150, 100, 20, '郭德强')
      LODOP.ADD_PRINT_TEXT(151, 150, 100, 20, '13954885188')
      LODOP.ADD_PRINT_TEXT(125, 584, 99, 20, '发票打印(第1次)')
      LODOP.ADD_PRINT_TEXT(465, 140, 198, 20, '陆百柒拾捌元叁角零分')
      LODOP.ADD_PRINT_TEXT(465, 599, 70, 20, '678.30')
      LODOP.ADD_PRINT_TEXT(496, 408, 59, 20, 'H112063')
      LODOP.ADD_PRINT_TEXT(191, 58, 100, 20, '国内漫游通话')
      LODOP.ADD_PRINT_TEXT(191, 217, 100, 20, '584.00')
      LODOP.ADD_PRINT_TEXT(222, 58, 100, 20, '增值业务费')
      LODOP.ADD_PRINT_TEXT(222, 217, 100, 20, '48.30')
      LODOP.ADD_PRINT_TEXT(251, 58, 100, 20, '代收费')
      LODOP.ADD_PRINT_TEXT(251, 217, 100, 20, '50.00')
      LODOP.ADD_PRINT_TEXT(280, 58, 100, 20, '优惠费')
      LODOP.ADD_PRINT_TEXT(280, 217, 100, 20, '4.00')
      LODOP.ADD_PRINT_TEXT(98, 101, 150, 20, '101081005747319387')
      LODOP.ADD_PRINT_TEXT(97, 307, 150, 20, '2008年10月19日 10:28:38')
      LODOP.ADD_PRINT_TEXT(152, 584, 103, 20, '138860016786')
      LODOP.ADD_PRINT_TEXT(95, 571, 112, 20, '06775516')
      LODOP.SET_PRINT_STYLEA(0, 'FontName', 'System')
      LODOP.ADD_PRINT_TEXT(76, 500, 71, 20, '发票代码：')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#800000')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 3)
      LODOP.ADD_PRINT_TEXT(74, 571, 112, 20, '237090742401')
      LODOP.SET_PRINT_STYLEA(0, 'FontName', 'System')
      LODOP.SET_PRINT_STYLEA(0, 'FontColor', '#FF0000')
      LODOP.ADD_PRINT_TEXT(496, 135, 183, 20, '2008年09月(20080901-20080930)')
      LODOP.ADD_PRINT_TEXT(496, 572, 112, 20, '-王府井中心店营')
      LODOP.ADD_PRINT_TEXT(311, 217, 100, 20, '678.30')
      LODOP.ADD_PRINT_TEXT(311, 58, 100, 20, '费用合计')
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.a{
  width: 100px;
  height: 100px;
  background-color: #b2b6bd;
  transition: background-color 0.2s;
  .b{
    width: 50px;
    height: 50px;
    background-color:red;
    transition: background-color 0.2s;
  }
  }
.a:hover{
  background-color: crimson;
  .b{
    background-color: #b2b6bd;
  }
}


</style>
