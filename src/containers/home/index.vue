/*
* @Author: xiexiaoying
* @Date: 2021-01-29 14:43
* @Email: 634021337@qq.com
* @Description: 首页
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-20 12:20:23
*/
<template>
  <div class="project_index">
    <section :class="{active: item.orderId == selectOrder.orderId}"  v-for="(item, index) in orderList" @click="handleOpenDetail(item)">
      <h4>{{item.orderName}} 
      </h4>
      <p class="desc">{{item.describe}}</p>
      <div class="lab_info">
        <el-row>
          <label>负责人：</label>{{item.orgName}}
        </el-row >
        <el-row>
          <label>创建时间：</label>{{item.createTime}}
        </el-row >
        <el-row class="">
          <el-col :span="12"><label>作业数：</label>{{item.jobs}}</el-col>
          <el-col :span="12"><label>资产数：</label>{{item.tables}}</el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>
  import './index.scss'
  import { mapGetters } from "vuex";
  import { fetch } from '@/utils/request'
  import { messagePopup, setCookie, getCookie } from "@/utils/util";

  export default {
    data() {
      return {
        orderList: [],
        selectOrderId: '',
        selectOrder: {orderId: getCookie('df_project_id')}
      }
    },
    computed: mapGetters(['userId']),
    components: {},
    mounted() {
      this.requestOrderList()
      this.$nextTick(() => {
        this.calcWidth()
      })
      $(window).resize(() => {
        this.calcWidth()
      });
    },
    methods: {
      handleEdits(item) {
        this.selectOrderId = item
      },
      handleOperation() {

      },
      handleOpenDetail(item) {
        this.selectOrder = item
        setCookie('df_project_id', item.orderId)
      },
      calcWidth() {
        let width = $('.project_index').width();
        let divWidth;
        $('.project_index section').css('margin-right', '24px');
        if (width < 896) {
          divWidth = width;
        } else if (width >= 896 && width < 1344) {
          divWidth = (width - 24) / 2;
          $('.project_index section:nth-child(2n)').css('margin-right', '-12px');
        }
        if (width >= 1344 && width < 1792) {
          divWidth = (width - 48) / 3;
          $('.project_index section:nth-child(3n)').css('margin-right', '-12px');
        }
        if (width >= 1792) {
          divWidth = (width - 72) / 4;
          $('.project_index section:nth-child(4n)').css('margin-right', '-12px');
        }
        $('.project_index section').css('width', divWidth + 'px');
      },
      requestOrderList() {
        fetch('fetchGetOrders', {businessTypes: "", userId: this.userId}, data => {
          this.orderList = data
          this.$nextTick(() => {
            this.calcWidth()
          })
        })
      },

    },
    watch: {}
  }
</script>
