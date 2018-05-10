<template>
  <ul class="tree" style="padding: 0;">
    <template v-for="(node,index) in treeList">
      <leaf
            :selected="selected"
            :model="node"
            :list="treeList"
            :index="index"
            :leafWidth="leafWidth"
            :folder="folder"
            :checkbox="checkbox"
            :length="treeList.length"
            :root="true"
            @node="selectNode"
            @node-checkbox="nodeCheckbox"
      ></leaf>
    </template>
  </ul>
</template>

<script>
  import Leaf from '@/components/MyTree/leaf'
  import request from '@/utils/request'

  export default {
    name: 'my-tree',
    components: {
      Leaf
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      data: {
        type: Array,
        default: null
      },
      leafWidth: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      },
      query: {
        type: Object,
        default: null
      },
      checkbox: {
        type: Boolean,
        default: false
      },
      folder: {
        type: Boolean,
        default: true
      },
      value: {
        default: null
      }
    },
    data() {
      return {
        node: null,
        selected: null,
        isOpen: true,
        treeList: [],
        treeLis2: [
          {
            companyId: 4,
            createTime: 1524263734000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 39,
            orgName: '路训一部',
            orgType: '0',
            parentId: 11,
            remark: '123',
            sort: 0,
            updateTime: 1525747168000,
            useCount: 2
          },
          {
            companyId: 4,
            createTime: 1515386435000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 5,
            orgName: '市场部',
            orgType: '0',
            parentId: 4,
            sort: 1,
            updateTime: 1525802841000,
            useCount: 11
          },
          {
            companyId: 4,
            createTime: 1515386437000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 8,
            orgName: '市场一部',
            orgType: '0',
            parentId: 5,
            remark: '123',
            sort: 1,
            updateTime: 1525820766000,
            useCount: 16
          },
          {
            companyId: 4,
            createTime: 1515386439000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 11,
            orgName: '路训部',
            orgType: '0',
            parentId: 7,
            sort: 1,
            updateTime: 1525287620000,
            useCount: 0
          },
          {
            companyId: 4,
            createTime: 1515386439000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 12,
            orgName: '场训一部',
            orgType: '0',
            parentId: 10,
            remark: '0.0',
            sort: 1,
            updateTime: 1525453360000,
            useCount: 12
          },
          {
            companyId: 4,
            createTime: 1515386435000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 4,
            orgName: '壹鹿驾校',
            orgType: '2',
            parentId: 2,
            sort: 1,
            updateTime: 1525745752000,
            useCount: 4
          },
          {
            companyId: 4,
            createTime: 1515386441000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 15,
            orgName: '路训二部',
            orgType: '0',
            parentId: 11,
            sort: 1,
            updateTime: 1525287653000,
            useCount: 2
          },
          {
            companyId: 4,
            createTime: 1515386436000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 6,
            orgName: '财务部',
            orgType: '0',
            parentId: 4,
            remark: '0.0',
            sort: 2,
            updateTime: 1525458910000,
            useCount: 1
          },
          {
            companyId: 4,
            createTime: 1515386438000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 9,
            orgName: '市场二部',
            orgType: '0',
            parentId: 5,
            remark: '11111',
            sort: 2,
            updateTime: 1525453061000,
            useCount: 4
          },
          {
            companyId: 4,
            createTime: 1515386438000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 10,
            orgName: '场训部',
            orgType: '0',
            parentId: 7,
            sort: 2,
            updateTime: 1525287622000,
            useCount: 2
          },
          {
            companyId: 4,
            createTime: 1517658525000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 18,
            orgName: '场训三部',
            orgType: '0',
            parentId: 10,
            remark: '0.0',
            sort: 2,
            updateTime: 1525287640000,
            useCount: 1
          },
          {
            companyId: 4,
            createTime: 1515386440000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 13,
            orgName: '场训二部',
            orgType: '0',
            parentId: 10,
            sort: 3,
            updateTime: 1525287635000,
            useCount: 1
          },
          {
            companyId: 4,
            createTime: 1517658961000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 19,
            orgName: '路训三部',
            orgType: '0',
            parentId: 11,
            remark: '123123213',
            sort: 3,
            updateTime: 1525400581000,
            useCount: 2
          },
          {
            companyId: 4,
            createTime: 1517656613000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 17,
            orgName: '市场三部',
            orgType: '0',
            parentId: 5,
            remark: '去撒大苏打撒',
            sort: 3,
            updateTime: 1525315493000,
            useCount: 1
          },
          {
            companyId: 4,
            createTime: 1515386437000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 7,
            orgName: '培训部',
            orgType: '0',
            parentId: 4,
            sort: 3,
            updateTime: 1525746068000,
            useCount: 0
          },
          {
            companyId: 4,
            createTime: 1525400393000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 53,
            orgName: '办公室',
            orgType: '0',
            parentId: 4,
            remark: '1223',
            sort: 4,
            updateTime: 1525490287000,
            useCount: 1
          },
          {
            companyId: 4,
            createTime: 1525400968000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 54,
            orgName: '行政人力部',
            orgType: '0',
            parentId: 4,
            remark: '1111',
            sort: 5,
            updateTime: 1525400968000,
            useCount: 0
          },
          {
            companyId: 4,
            createTime: 1525401071000,
            delFlag: '0',
            groupId: 2,
            operator: 'admin',
            orgId: 56,
            orgName: '安全部',
            orgType: '0',
            parentId: 4,
            remark: '6',
            sort: 6,
            updateTime: 1525401071000,
            useCount: 0
          }
        ]
      }
    },
    watch: {
      value: function(val) {
        if (!this.checkbox) {
          this.selected = val
        }
      },
      data: function(val) {
        this.treeList = val
        this.nodeList()
      }
    },
    created() {
      if (!this.checkbox) {
        this.selected = this.value
      }
      this.isOpen = this.open
      this.getTreeData()
    },
    computed: {
    },
    methods: {
      getTreeData() {
        if (this.url) {
          request({
            url: this.url,
            method: 'get',
            params: this.query
          }).then(response => {
            this.treeList = response.data.data
            this.nodeList()
          })
        }
      },
      selectNode(ogj) {
        this.$emit('node', ogj)
        this.$emit('change', ogj.id)
      },
      nodeList() {
        var nodeList = []
        if (this.checkbox) {
          getNodeList(this.treeList, nodeList)
          this.$emit('change', nodeList)
        }
      },
      nodeCheckbox(nodeList) {
        this.$emit('change', nodeList)
      }
    }
  }

  export function getNodeList(list, nodeList) {
    list.forEach(function(item, index) {
      if (item.selected) {
        nodeList.push(item.id)
      }
      getNodeList(item.children, nodeList)
    })
  }

</script>
<style scoped>

</style>
