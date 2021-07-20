/*
 * @Author: zhanghongqiao 
 * @Date: 2020-10-21 14:55:39 
 * @Email: 991034150@qq.com 
 * @Description: 重置
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-03-23 16:39:34
 */

<style lang="scss">
.tips_dialog {
  p {
    font-size: 18px;
    color: #1D84EF;
    text-align: center;
    margin-top: 34px;
  }
}
</style>

<template>
      <el-dialog
      :close-on-click-modal="false"
      :show-close="false"
      title="" 
      custom-class="tips_dialog"
      :visible.sync="dialogVisible"
      width="408px"
      :before-close="handleClose">
      <p>{{text || '确定要删除选中项吗'}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button class="white_btn" @click="handleClose(false)">取消</el-button>
        <el-button class="blue_btn"  @click="handleClose('ok')">{{'确定' || btnText}}</el-button> 
      </span>
    </el-dialog>
</template>


<script>
  export default {
    data() {
      return {
        dialogVisible: false,
      };
    },
    model: {
      event: 'change'
    },
    props: {
      isShowTip: Boolean,
      text: String,
      subText: String,
      isShow: Boolean,
      title: String,
      btnText: String
    },
    mounted() {
      // 显示时会传入0
      this.dialogVisible = this.isShow
    },
    methods: {
      handleClose(type) {   
        this.$emit('change', typeof type  == 'function' ? false : type)
        this.dialogVisible = false
      },
    },
    watch: {
      isShow: function () {
        // 显示时会传入0
        this.dialogVisible = this.isShow
      }
    }
  };
</script>