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
import { getLodop } from '@/utils/LodopFuncs'
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
      LODOP.PRINT_INITA(1,  0, 761, 550, '打印控件功能演示_Lodop功能_在线编辑获得程序代码')
      LODOP.SET_PRINT_MODE('PRINT_NOCOLLATE', 1)
      LODOP.ADD_PRINT_TEXT(16, 242, 300, 59, '重庆壹路驾校培训有限公司\r\n收款收据')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 16)
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(51, 563, 173, 30, '单据编号：年月+流水号')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 11)
      LODOP.ADD_PRINT_RECT(77, 26, 702, 376, 0, 1)
      LODOP.ADD_PRINT_TEXT(459, 531, 57, 25, '复核人：')
      LODOP.ADD_PRINT_TEXT(459, 64, 75, 25, '单位盖章：')
      LODOP.ADD_PRINT_TEXT(459, 291, 65, 25, '收款人：')
      LODOP.ADD_PRINT_LINE(122, 26, 121, 728, 0, 1)
      LODOP.ADD_PRINT_TEXT(90, 26, 100, 20, '2018年5月2日')
      LODOP.ADD_PRINT_LINE(77, 137, 121, 138, 0, 1)
      LODOP.ADD_PRINT_TEXT(90, 139, 45, 20, '校区：')
      LODOP.ADD_PRINT_TEXT(90, 184, 45, 20, '沙坪坝')
      LODOP.ADD_PRINT_LINE(121, 275, 77, 276, 0, 1)
      LODOP.ADD_PRINT_TEXT(91, 359, 33, 20, '全款')
      LODOP.ADD_PRINT_LINE(121, 407, 77, 408, 0, 1)
      LODOP.ADD_PRINT_TEXT(91, 280, 69, 20, '收款类型：')
      LODOP.ADD_PRINT_TEXT(91, 411, 46, 20, '姓名：')
      LODOP.ADD_PRINT_LINE(121, 527, 77, 528, 0, 1)
      LODOP.ADD_PRINT_TEXT(91, 531, 73, 20, '身份证号：')
      LODOP.ADD_PRINT_LINE(245, 27, 244, 728, 0, 1)
      LODOP.ADD_PRINT_LINE(407, 27, 406, 728, 0, 1)
      LODOP.ADD_PRINT_LINE(244, 68, 121, 69, 0, 1)
      LODOP.ADD_PRINT_TEXT(158, 34, 30, 37, '收款')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12)
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_LINE(216, 69, 215, 728, 0, 1)
      LODOP.ADD_PRINT_TEXT(132, 74, 80, 25, '应收全款：¥')
      LODOP.ADD_PRINT_TEXT(133, 289, 79, 25, '已收定金：¥')
      LODOP.ADD_PRINT_TEXT(160, 73, 103, 25, '本次实收金额：¥')
      LODOP.ADD_PRINT_TEXT(160, 289, 97, 25, '人民币大写：¥')
      LODOP.ADD_PRINT_TEXT(185, 287, 96, 25, '人民币大写：¥')
      LODOP.ADD_PRINT_TEXT(185, 72, 84, 25, '欠款金额：¥')
      LODOP.ADD_PRINT_TEXT(221, 73, 100, 20, '本次收款方式：')
      LODOP.ADD_PRINT_TEXT(221, 175, 53, 25, '现金：')
      LODOP.ADD_PRINT_TEXT(221, 285, 61, 20, '支付宝：')
      LODOP.ADD_PRINT_TEXT(221, 417, 45, 20, '微信：')
      LODOP.ADD_PRINT_LINE(274, 69, 273, 729, 0, 1)
      LODOP.ADD_PRINT_LINE(305, 69, 304, 729, 0, 1)
      LODOP.ADD_PRINT_LINE(338, 69, 337, 729, 0, 1)
      LODOP.ADD_PRINT_LINE(376, 69, 375, 729, 0, 1)
      LODOP.ADD_PRINT_LINE(407, 68, 244, 69, 0, 1)
      LODOP.ADD_PRINT_TEXT(268, 36, 24, 93, '包括项目')
      LODOP.SET_PRINT_STYLEA(0, 'FontSize', 12)
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(252, 89, 46, 20, '车型：')
      LODOP.ADD_PRINT_TEXT(252, 138, 100, 20, 'C1')
      LODOP.ADD_PRINT_TEXT(282, 88, 57, 20, '代收费：')
      LODOP.ADD_PRINT_TEXT(282, 144, 73, 20, '科一学习费')
      LODOP.ADD_PRINT_TEXT(282, 223, 129, 20, '科一至科四初次考试费')
      LODOP.ADD_PRINT_TEXT(282, 358, 49, 20, '体检费')
      LODOP.ADD_PRINT_TEXT(283, 412, 52, 20, '保险费')
      LODOP.SET_PRINT_STYLEA(0, 'Alignment', 2)
      LODOP.ADD_PRINT_TEXT(283, 468, 47, 20, '学时卡')
      LODOP.ADD_PRINT_TEXT(314, 87, 70, 20, '培训费：')
      LODOP.ADD_PRINT_TEXT(314, 144, 100, 20, '科二培训费')
      LODOP.ADD_PRINT_TEXT(314, 250, 100, 20, '科三培训费')
      LODOP.ADD_PRINT_TEXT(348, 86, 66, 20, '服务包：')
      LODOP.ADD_PRINT_TEXT(383, 85, 69, 20, '优惠活动：')
      LODOP.ADD_PRINT_TEXT(348, 145, 63, 20, '一人一车')
      LODOP.ADD_PRINT_TEXT(348, 211, 34, 20, '包过')
      LODOP.ADD_PRINT_TEXT(348, 249, 46, 20, '老司机')
      LODOP.ADD_PRINT_TEXT(348, 301, 100, 20, '周末练车')
      LODOP.ADD_PRINT_LINE(454, 235, 407, 236, 0, 1)
      LODOP.ADD_PRINT_TEXT(425, 35, 95, 20, '学时卡已发放，')
      LODOP.ADD_PRINT_TEXT(425, 130, 100, 20, '体检表已发放')
      LODOP.ADD_PRINT_LINE(454, 395, 406, 396, 0, 1)
      LODOP.ADD_PRINT_TEXT(425, 239, 58, 20, '销售员：')
      LODOP.ADD_PRINT_TEXT(425, 400, 45, 20, '备注：')
      LODOP.ADD_PRINT_TEXT(383, 153, 100, 20, '一人一车一元钱')
      LODOP.ADD_PRINT_TEXT(91, 446, 59, 20, '罗富文')
      LODOP.ADD_PRINT_TEXT(91, 591, 136, 20, '513030199611061294')
      LODOP.ADD_PRINT_TEXT(459, 340, 100, 24, '321')
      LODOP.ADD_PRINT_TEXT(459, 578, 100, 25, '321')
      LODOP.ADD_PRINT_TEXT(427, 451, 100, 20, '123')
      LODOP.ADD_PRINT_TEXT(425, 286, 100, 20, '123')
      LODOP.ADD_PRINT_TEXT(132, 153, 100, 20, '3380')
      LODOP.ADD_PRINT_TEXT(160, 175, 100, 20, '新加文本95')
      LODOP.ADD_PRINT_TEXT(186, 156, 100, 20, '新加文本96')
      LODOP.ADD_PRINT_TEXT(133, 368, 100, 20, '新加文本97')
      LODOP.ADD_PRINT_TEXT(160, 385, 273, 20, '新加文本98')
      LODOP.ADD_PRINT_TEXT(185, 382, 287, 20, '新加文本99')
      LODOP.ADD_PRINT_TEXT(221, 217, 51, 20, '新本')
      LODOP.ADD_PRINT_TEXT(221, 336, 80, 20, '新')
      LODOP.ADD_PRINT_TEXT(221, 464, 100, 20, '新加文本102')
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
