<template>
  <div class="dashboard-container">
    <OBJECT classid="clsid:10946843-7507-44FE-ACE8-2B3483D179B7"
            id="CVR_IDCard" name="CVR_IDCard" width="0" height="0" >
    </OBJECT>

    <object classid="clsid:454C18E2-8B7D-43C6-8C17-B1825B49D7DE" id="captrue" width="400" height="300"></object>

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
      LODOP.PRINT_INIT('订货单')
      LODOP.SET_PRINT_STYLE('FontSize', 18)
      LODOP.SET_PRINT_STYLE('Bold', 1)
      LODOP.ADD_PRINT_TEXT(50, 231, 260, 39, '打印页面部分内容')
      LODOP.ADD_PRINT_HTM(88, 200, 350, 600, this.openId)

    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>


</style>
