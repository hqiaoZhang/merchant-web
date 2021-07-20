/*
 * @Author: zhanghongqiao
 * @Date: 2020-01-02 16:41:38
 * @Email: 991034150@qq.com
 * @Description: 调用方管理
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-20 11:45:46
 */

 <style lang="scss">
 #csvFileInput{
    position: absolute;
    right: 0px;
    opacity: 0;
}
 </style>
 <template>
  <div class="manage_list"> 
     <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item>数据服务</el-breadcrumb-item>
        <el-breadcrumb-item>调用方管理</el-breadcrumb-item>
      </el-breadcrumb>
    <div class="top_query">
     
      <div class="form_group">
        <el-input placeholder="搜索调用方"
                  maxlength="50"
                  clearable
                  suffix-icon="el-icon-search"
                  v-model="params.name"></el-input>
      </div> 

        <div class="form_group">
          <span class="lab_txt">状态筛选：</span>
            <el-checkbox-group v-model="params.state">
              <el-checkbox v-for="item in useStates" :label="item.code" 
                :key="item.code">{{item.name}}</el-checkbox>  
            </el-checkbox-group>
        </div> 
    </div>
    <div class="main_container"> 
      <TableList
        :paging="paging"
        :sourceData="tableData"
        v-model="selected" />
        <Pagination :paging="paging" v-model="paging"></Pagination>
    </div> 
      <!-- 删除弹窗 -->
      <TipsPopup  :isShow="isDelete" :text="'请确认是否删除选中的数据源？'" v-model="isDelete" />
       
    </div>
</template>

<script>
import {fetch} from '@/utils/request'
import contant from '@/config/contant'
import TableList from "./tableList";
 
import "./index.scss";
import { messagePopup, isObjectValueEqual } from '@/utils/util'
import { mapGetters } from "vuex";
import { Pagination, TipsPopup } from "@/components/common";
 
export default {
  data() {
    return {  
      isDelete: false,     
      params: { 
        state: [],
        name: '', // 数据源名称
        page: '',  // 第几页
        length: '', 
      },
      tableData: [],
      // 分页参数
      paging: {
        pageSize: 10,
        total: 0,
        currentPage: 1
      },
      
      selected:  [],   
      apiList: [],
      useStates: [
        {
          code: 0,
          name: "停用"
        },{
          code: 1,
          name: "启用"
        }
      ]
    };
  }, 
  components: {
    TableList,
    Pagination,
    TipsPopup, 
  },
  mounted() {   
    this.requestList() 
  },
  methods: {
    requestList(stype) {
       
    }, 
     /**
     * 响应提示
    * @param {Object} data 返回数据
    * @param {String} msg 提示信息
    * @param {Boolean} flag  是否刷新列表(默认刷新)
    */
    responseTips(data, msg) { 
      if (!data) {
        return messagePopup(msg + "失败", "error");
      } 
      if (data.successful) {    
        messagePopup(msg + "成功",   "success");
        this.requestList(2) 
      } else {
        messagePopup(data.error || data.result);
      }
    },  
     
  },
  watch: {
    // 分页参数监听
    'paging.pageSize': 'requestList',
    'paging.currentPage': function() {
      this.requestList(1)
    },
    'params.name':  'requestList',
    'params.state': 'requestList', 
  }
};
</script>
