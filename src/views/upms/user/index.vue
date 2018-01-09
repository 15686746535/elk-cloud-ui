<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名"-->
                <!--v-model="listQuery.username">-->
      <!--</el-input>-->
      <!--<el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>-->
      <!--<el-button v-if="sys_user_add" class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit">添加</el-button>-->
      <!--<el-button class="filter-item" type="primary" icon="document" @click="handleDownload">导出</el-button>-->
      |&nbsp;<span style="font-size: 20px;font-weight: 600;font-family: '微软雅黑 Light'">同事列表</span>
    </div>

    <el-row>
      <el-col :span="5" style='margin-top:15px;'>
        <div style="height: 700px; width: 300px; box-shadow: #99a9bf 5px 5px 5px;text-align: center">
          <span style="font-size: 16px;font-weight: 600;font-family: '微软雅黑 Light'">部门筛选</span>
          <hr>
          <el-tree
            class="filter-tree"
            :data="treeData"
            node-key="id"
            highlight-current
            :props="defaultProps"
            :filter-node-method="filterNode"
            @node-click="getNodeData"
            default-expand-all
          >
          </el-tree>
        </div>
      </el-col>
      <el-col :span="16" style='margin-top:15px;'>

        <div class="user_table" v-for="list in list">

          <div class="user_info">
            <img :src="list.user.avatar" class="img">
            <div class="user">
              姓名：{{list.user.name}}
            </div>
          </div>
          <div class="user_recruit">
            <bar></bar>
          </div>
          <div class="user_visit">
            <bar></bar>
          </div>

        </div>

      </el-col>
      <el-col :span="16" style='margin-top:15px;'>
        <el-button @click="cancel('form')">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="create('form')">确 定</el-button>
        <el-button v-else type="primary" @click="update('form')">修 改</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import waves from '@/directive/waves/index.js' // 水波纹指令
  import Bar from '@/components/Bar'

  export default {
    components: {
      Bar
    },
    name: 'index',
    directives: {
      waves
    },
    data() {
      return {
        list: [
          {
            user: {
              name: '张三',
              avatar: 'https://ps.ssl.qhimg.com/dmfd/299_417_/t01c186aa68a9bf0701.jpg'
            }
          },
          {
            user: {
              name: '李四',
              avatar: 'https://ps.ssl.qhimg.com/dmfd/299_417_/t01c186aa68a9bf0701.jpg'
            }
          },
          {
            user: {
              name: '王麻子',
              avatar: 'https://ps.ssl.qhimg.com/dmfd/299_417_/t01c186aa68a9bf0701.jpg'
            }
          },
          {
            user: {
              name: '李四',
              avatar: 'https://ps.ssl.qhimg.com/dmfd/299_417_/t01c186aa68a9bf0701.jpg'
            }
          },
          {
            user: {
              name: '王麻子',
              avatar: 'https://ps.ssl.qhimg.com/dmfd/299_417_/t01c186aa68a9bf0701.jpg'
            }
          },
          {
            user: {
              name: '李四',
              avatar: 'https://ps.ssl.qhimg.com/dmfd/299_417_/t01c186aa68a9bf0701.jpg'
            }
          },
          {
            user: {
              name: '王麻子',
              avatar: 'https://ps.ssl.qhimg.com/dmfd/299_417_/t01c186aa68a9bf0701.jpg'
            }
          },
          {
            user: {
              name: '李四',
              avatar: 'https://ps.ssl.qhimg.com/dmfd/299_417_/t01c186aa68a9bf0701.jpg'
            }
          },
          {
            user: {
              name: '王麻子',
              avatar: 'https://ps.ssl.qhimg.com/dmfd/299_417_/t01c186aa68a9bf0701.jpg'
            }
          }
        ],
        total: 1,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 20
        },
        treeData: [
          {
            a: 1,
            b: 2
          },
          {
            a: 1,
            b: 2
          },
          {
            a: 1,
            b: 2
          },
          {
            a: 1,
            b: 2
          },
          {
            a: 1,
            b: 2
          },
          {
            a: 1,
            b: 2
          },
          {
            a: 1,
            b: 2
          }
        ],
        defaultProps: {
          children: 'children',
          label: 'name'
        }
      }
    }
  }
</script>


<style scoped>

  .user_table{
    width: 1200px;
    height: 170px;
    background-color: #f7f7f7;
    margin: 10px 0 0 10px;
  }
  .user_info{
    float: left;
    width: 400px;
    height: 150px;
    margin: 10px 0 0 10px;
  }
  .img{
    width: 150px;
    height: 150px;
    float: left;
  }
  .user{
    float: left;
    width: 130px;
    height: 130px;
    padding: 20px 0 0 20px;
  }
  .user_visit {
    float: left;
    width: 300px;
    height: 150px;
    margin: 10px 0 0 10px;
  }

  .user_recruit {
    float: left;
    width: 300px;
    height: 150px;
    margin: 10px 0 0 10px;
  }
</style>
