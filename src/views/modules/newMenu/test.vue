<template>
  <div>
    <el-row>
      <label>学员身份证:</label>
      <el-input style="width:250px" v-model="listQuery.idCard"></el-input>
      <el-button type="primary" @click="searchStu">查询</el-button>
    </el-row>
    <div style="align:center">
      <el-card style="width:300px;margin-top:35px;" v-for="item in result" :key="item">
        <span>姓名：</span><span>{{item.name}}</span><br>
        <span>身份证：</span><span>{{item.idcard}}</span><br>
        <span>结果：</span><span>{{item.state}}</span>
      </el-card>
      
      <el-table border  :data="subject1" style="margin-top:35px">
        <el-table-column label="科目" width="auto" align="center">
          <template slot-scope="scope"><span>{{ scope.row.subject }}</span></template>
        </el-table-column>
        <el-table-column label="日期" width="auto" align="center">
          <template slot-scope="scope"><span>{{ scope.row.examtime }}</span></template>
        </el-table-column>
        <el-table-column label="地点" width="auto" align="center">
          <template slot-scope="scope"><span>{{ scope.row.examare  }}</span></template>
        </el-table-column>
        <el-table-column label="分数" width="auto" align="center">
          <template slot-scope="scope"><span>{{ scope.row.sorce }}</span></template>
        </el-table-column>
      </el-table>
       
    </div>
  </div>
</template>


<script>
export default {
  data(){
    return{
      // subject1:[{'subject':'科目一','date':'2015-01-25','field':'重庆九龙坡','score':'95'}],
subject1:[ {
        "id": "1045",
        "name": "何天洋",
        "stunum": "500700588009",
        "idcard": "500104199604031618",
        "subject": "1",
        "type": "C1",
        "examtime": "2018-08-15 00:00:00",
        "examare": "科目一大渡口双山考场",
        "sorce": "93",
        "school": "重庆华通汽车驾驶培训学校",
        "state": null
    }],
    subject2:[ {
        "id": "1046",
        "name": "何天洋",
        "stunum": "500700588009",
        "idcard": "500104199604031618",
        "subject": "2",
        "type": "C1",
        "examtime": "2018-11-21 00:00:00",
        "examare": "科目二江津双福考场",
        "sorce": "90",
        "school": "重庆华通汽车驾驶培训学校",
        "state": null
    }],
    subject3:[ {
        "id": "1046",
        "name": "何天洋",
        "stunum": "500700588009",
        "idcard": "500104199604031618",
        "subject": "2",
        "type": "C1",
        "examtime": "2018-11-21 00:00:00",
        "examare": "科目二江津双福考场",
        "sorce": "90",
        "school": "重庆华通汽车驾驶培训学校",
        "state": null
    }],
    result:[
      {"name": "何天洋",
    "idcard": "500104199604031618",
    "state": "科目四"}
    ],
    // "1": {
    //     "id": "1046",
    //     "name": "何天洋",
    //     "stunum": "500700588009",
    //     "idcard": "500104199604031618",
    //     "subject": "2",
    //     "type": "C1",
    //     "examtime": "2018-11-21 00:00:00",
    //     "examare": "科目二江津双福考场",
    //     "sorce": "90",
    //     "school": "重庆华通汽车驾驶培训学校",
    //     "state": null
    // },
    // "2": {
    //     "id": "1047",
    //     "name": "何天洋",
    //     "stunum": "500700588009",
    //     "idcard": "500104199604031618",
    //     "subject": "3",
    //     "type": "C1",
    //     "examtime": "2019-01-08 00:00:00",
    //     "examare": "科目三南岸迎龙考场",
    //     "sorce": "0",
    //     "school": "重庆华通汽车驾驶培训学校",
    //     "state": null
    // },
    // "name": "何天洋",
    // "idcard": "500104199604031618",
    // "state": "科目四"}
     
      listQuery:{
        idCard:''
      }
    }
  },
  methods:{
    searchStu(){
      console.log("hahah",this.listQuery.idCard)
    }
  }
}
</script>

<style>

</style>
