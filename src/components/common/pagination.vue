/*
 * @Author: zhanghongqiao
 * @Date: 2018-11-14 10:56:32
 * @Email: 991034150@qq.com
 * @Description: 分页
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-02-07 14:51:57
 */

 <style lang="scss">
 .hide_pagination {
   display: none;
 }
.dataShare_pagination {
  float: left;
  width: 100%;
  background: #fff;
  text-align: center; 

  .el-pagination {
    padding: 16px;
  }
  &.footer_fixed{
    bottom: 0;
    // height: 80px;
    &:before {
      display: none;
    }
  }
  .white_bg {
    border-top: 1px solid #F2F6F9;
    border-radius: 0 0 6px 6px;
  }
  .el-input--mini .el-input__inner {
    height: 32px;
    
  }
}
 
</style>


<template>
  <!-- footer_fixed -->
  <div class="dataShare_pagination" v-if="defautPaging.total > ( total || 10)">
    <el-pagination
      class="white_bg"
      layout="total, sizes, prev, pager, next, jumper, slot"
      :page-size="defautPaging.pageSize"
      :page-sizes="defautPaging.pageSizes"
      :current-page="defautPaging.currentPage || 0"
      @size-change="handleSizeChange"
      @current-change="handleCurChange"
      @prev-text="handleCurChange"
      @next-text="handleCurChange"
      :total="defautPaging.total"> 
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defautPaging: {
        pageSize: 10,
        total: 0,
        currentPage: 1,
        pageSizes: [10, 20, 30, 40, 50, 100]
      },
      // currentPage: 0,
    }
  },
  model: {
    event: 'change'
  },
  props: {
    paging: Object,
    total: Number, // 总条目数
    pageSize: Number, // 每页显示条目个数
    currentPage: Number,
  },
  mounted() {
    this.defautPaging = this.paging
  },
  methods: {
    /*
     * 当前页改变
     */
    handleCurChange(val) {
      this.defautPaging.currentPage = val
      this.$emit('change', this.defautPaging)
    },
    handleSizeChange(val) {
      this.defautPaging.pageSize = val
      this.defautPaging.currentPage = 1
      this.$emit('change', this.defautPaging)
    },
    // 点击go
    handleGo() {
      this.$emit('change', this.defautPaging)
    }
  },
  watch: {
     paging(paging) {
       this.defautPaging = paging
    }
  }
}
</script>


