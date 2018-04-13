<template>
  <ul class="tree" style="padding: 0;">
    <template v-for="(node,index) in treeList">
      <leaf
            :selected="value"
            :model="node"
            :list="treeList"
            :index="index"
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
        type: Number,
        default: null
      }
    },
    data() {
      return {
        node: null,
        isOpen: true,
        treeList: [],
        nodeList: []
      }
    },
    watch: {
      value: function(val) {
        backfill(this.nodeList, val)
      },
      data: function(val) {
        this.treeList = val
      }
    },
    created() {
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
          })
        }
      },
      selectNode(ogj) {
        this.$emit('node', ogj)
        this.$emit('change', ogj.id)
      },
      nodeCheckbox(nodeList) {
        // this.$emit('node-checkbox', this.model.id, !this.model.selected)
        this.$emit('nodeList', nodeList)
      },
      delNodeId(id) {
        for (var i = 0; i < this.nodeList.length; i++) {
          if (this.nodeList[i] === id) this.nodeList.splice(i, 1)
        }
      }
    }
  }

  export function backfill(list, id) {
    list.forEach(function(item, index) {
      item.click = false
      if (item.id === id) {
        item.click = true
      }
      backfill(item.children, id)
    })
  }

</script>
<style scoped>

</style>
