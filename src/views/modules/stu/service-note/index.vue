<template>
  <div class="app-container calendar-list-container" :style="{height: $store.state.app.client.height + 'px'}">
    <el-card>

    </el-card>
  </div>
</template>

<script>
  import { autoProduce } from '@/utils/index'
  import Coach from '@/components/Coach'
  import { removeAllSpace } from '@/utils/validate'
  import { getToken } from '@/utils/auth'
  import { mapGetters } from 'vuex'

  import { fetchStudentList, getStudent, saveStudent, putStudent, isExistence } from '@/api/student/student'
  import { batchSave } from '@/api/student/exambespeak'
  import { examFetchList } from '@/api/student/examnote'
  import { getBatchList } from '@/api/student/batch'

  import { userList } from '@/api/upms/user'
  import { getVehiclePeriodByStudentId, getClassByCoachId, bespeakVehiclePeriod } from '@/api/bespeak/vehicleperiod'
  import { getShuttleLogByStudentId } from '@/api/bespeak/shuttlestudent'
  import { followUpList } from '@/api/visit/followup'
  import { getIntentionByMobile } from '@/api/visit/intention'

  export default {
    name: 'table_student',
    components: {
      Coach
    },
    data() {
      return {
      }
    },
    created() {
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
      },
      headers() {
        return {
          'Authorization': 'Bearer ' + getToken()
        }
      }
    },
    methods: {
    }
  }
</script>

<style>
</style>
