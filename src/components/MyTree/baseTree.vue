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
        treeList: []
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
