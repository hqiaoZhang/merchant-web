/*
* @Author: xiexiaoying
* @Date: 2021-03-09 13:25
* @Email: 634021337@qq.com
* @Description: 树菜单
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-03-10 14:18:25
*/
<style lang="scss">
  .select_pop_input {
    width: 300px;
    /*margin-bottom: 24px;*/

    .el-input__icon {
      color: #1D84EF;
      font-size: 16px;
    }

  }
  .el-popover.select_pop {
    .el-tree-node__content {
      height: 32px;
    }
    .is-current > div:first-child .el-tree-node__label{
      color: #1D84EF;
    }
    .el-tree {
      max-height: 300px;
      overflow: auto;
    }
  }
</style>
<template>
  <div>
    <el-popover
      placement="bottom-start"
      :width="treeClass ? 200 : 300"
      popper-class="select_pop"
      v-model="visible"
      trigger="click">
        <el-tree ref="treeFilter" :data="menuData" :props="defaultProps" :filter-node-method="filterNode" @node-click="handleNodeClick"></el-tree>
        <el-input
          :placeholder="placeholder || '请选择'"
          v-model="itemData"
          :class="treeClass ? treeClass : 'select_pop_input'"
          :disabled="disabled"
          slot="reference"
          :readonly="true"
          :suffix-icon="visible ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
        >
        </el-input>
    </el-popover>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        itemData: '',
        menuList: [],
        visible: false,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    props: {
      menuData: Array,
      placeholder: String,
      defaultVal: String,
      treeClass: String,
      disabled: {
        type: Boolean,
        default: false
      },
    },
    mounted() {
      this.itemData = this.getDefaultVal(this.menuData)
      this.initData(this.menuData)
    },
    methods: {
      initData(data) {
        data.map(p => {
          if(p.state == 0) {
            p.children.map( c => {
              c.state = 0
              this.initData([c])
            })
          }
        })
      },
      filterNode(value, data, node) {
        return data.state == 1
      },
      handleNodeClick(data) {
        this.$emit('input', data.id);
        this.itemData = data.label || data.id
        this.visible = false
      },
      getDefaultVal(data) {
        if (this.defaultVal == 'sqlSave' ) {
          return  ''
        }
        if (_.isEmpty(data) || _.isEmpty(this.defaultVal)) {
          return ''
        }

        let item = this.find(this.defaultVal, data)
        // console.log(item.label, '==========', item)
        if (item) {
          return item[0].label
        } else {
          return  ''
        }
      },
      find(v, list) {
        let data;
        (list || []).map(i => {
          if (i.id === v) {
            data = [i];
          } else {
            const child = this.find(v, i.children);
            if (child) {
              data = child;
            }
          }
        });
        return data;
      }
    },
    watch: {
      menuData() {
        if (_.isEmpty(this.menuData)) {
          return
        }
         this.initData(this.menuData)
      },
      defaultVal() {
        this.itemData = this.getDefaultVal(this.menuData)
      },
      visible() {
        if (this.visible) {
          this.$nextTick(() => {
            this.$refs.treeFilter.filter('')
          })
        }
      }
    }
  }
</script>


