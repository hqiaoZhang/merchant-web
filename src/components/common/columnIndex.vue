<template>
  <el-table-column
    label="序号"
    type="index"
    :index="indexMethod"
    :align="align"
    :header-align="align"
    :width="width"
    :fixed="fixed"/>
</template>


<script>
export default {
  props: {
    paging: Object,
    align: {
      type: String,
      default: 'left'
    },
    width: {
      type: Number,
      default: 65
    },
    fixed: Boolean

  },
  methods: {
     // 重置序号
    indexMethod(index) {
      if (this.paging.currentPage > 1) {
        return index + 1 + (this.paging.currentPage - 1) * this.paging.pageSize;
      }
      return index + 1;
    }
  }
}
</script>
