/*
 * @Author: zhanghongqiao
 * @Date: 2019-09-30 10:00:10
 * @Email: 991034150@qq.com
 * @Description: 标签
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-01-14 17:32:48
 */

<style lang="scss" scoped>
  @import "~@/assets/styles/constant/index.scss";
  .wm_click_div{
    display: inline-block;
    overflow: hidden;
    box-sizing: border-box;
    height: 32px;
    line-height: 32px;
    // height: 56px;
    .el-radio__label {
      // color: $titleColor;
      padding-left: 0;
    }
  }

  .wm_click_div .wm_click_title{
    display: inline-block;
    float: left;
    margin: 0 10px 0 0;
    color: #818FB4;
  }

  .wm_click_div .wm_click_ul{
    margin: 0;
    display: inline-block;
  }

  .wm_click_div .wm_click_ul li{
    float: left;
    margin: 0 20px 0 0;
    color: #ADB2C0;
    cursor: pointer;
  }
 
  .wm_click_div .wm_click_ul li.active{
    color: #34A3FF;
  }
 </style>

 <template>
   <div class="wm_click_div">
    <ul class="wm_click_title" v-html="title"></ul>
    <ul class="wm_click_ul">
      <span v-for="(item, idx) in sourcedata" :key="idx" > 
        <li :class="{active: defActive.indexOf(item.id) != -1}"
          @click="handleItem(item)">
          <!-- 复选样式 -->
          <span class="el-checkbox__input" v-if="ismulti" :class="{'is-checked': defActive.indexOf(item.id) != -1}">
            <span class="el-checkbox__inner"></span>
              <!-- <input type="checkbox" aria-hidden="false" class="el-checkbox__original" value=""> -->
          </span>
          <!-- 单选样式 -->
          <span class="el-radio__input" :class="{'is-checked': defActive.indexOf(item.id) != -1}" v-else>
            <span class="el-radio__inner"></span>
            <!-- <input type="radio" aria-hidden="true" tabindex="-1" class="el-radio__original" value="3"> -->
          </span>
          <span class="el-radio__label" v-html="formatterSub(item.name)"></span>
        </li>
        <li v-if="addsplit && idx < (sourcedata.length - 1)">|</li>
      </span>
    </ul>
  </div>
 </template>

 <script>
 import {formatterSub} from '@/utils/util'
 export default {
   data: function () {
    return {
      defActive: '',
      saveId: ""

    }
  },
  model: {
    event: 'change'
  },
  props: ['sourcedata', 'active', 'title', 'ismulti', 'addsplit', 'holdcount', 'issort', 'isUpCase'],
  mounted() {
    if (typeof  this.active == 'object') {
      this.defActive = this.active
    } else {
      if (this.active || this.active == 0) {
        this.defActive = [this.active]
      } else {
        this.defActive = []
      }
    }
  },
  methods: {
    // formatterSub: formatterSub,
    formatterSub: function (name) {
      if (this.isUpCase) {
        return name
      } else {
        return formatterSub(name)
      }
    },
     handleItem(item) {
      // 是否多选
      if (this.ismulti) {
        var isActive = this.defActive.indexOf(item.id)
        if (isActive != -1) {
          // 是否可能取消多选
          if (this.defActive.length == this.holdcount) {
            return
          }
          this.defActive.splice(isActive, 1);
        } else {
          this.defActive.push(item.id)
        }
        this.$emit("change", this.defActive);
      } else {
        // holdcount等于0表示 可以取消单选
        if (this.holdcount == 0) {
          this.defActive = [item.id];
          if (this.saveId == item.id) {
            this.defActive = [-1]
          }
          this.saveId = this.defActive
          this.$emit("change", this.defActive[0]);
        } else {
          this.defActive = [item.id];
          this.$emit("change", item.id);
        }
      } 
    },
    // handleItem(item) {
    //   // 是否多选
    //   if (this.ismulti) {
    //     var isActive = this.defActive.indexOf(item.id)
    //     if (isActive != -1 && item.id == 'all') { // 取消全选
    //       // 是否可能取消多选
    //       if (this.defActive.length == this.holdcount) {
    //         return
    //       }
    //       this.defActive = []; // .splice(isActive, 1)
    //     } else if (item.id =='all'){ // 全选
    //       let arr =[]
    //       this.sourcedata.map(item => {
    //         arr.push(item.id)
    //       })
    //       this.defActive = arr
    //     } else if (isActive != -1) {
    //       this.defActive.splice(isActive, 1)
    //       var isActive1 = this.defActive.indexOf('all')
    //       isActive1 !=-1 &&this.defActive.splice(isActive1, 1)
    //     } else {
    //       this.defActive.push(item.id)
    //       if (this.defActive.length == this.sourcedata.length - 1) {
    //         this.defActive.push('all')
    //       }
    //     }
    //     this.$emit("change", this.defActive);
    //   } else {
    //     // holdcount等于0表示 可以取消单选
    //     if (this.holdcount == 0) {
    //       this.defActive = [item.id];
    //       if (this.saveId == item.id) {
    //         this.defActive = [-1]
    //       }
    //       this.saveId = this.defActive
    //       this.$emit("change", this.defActive[0]);
    //     } else {
    //       this.defActive = [item.id];
    //       this.$emit("change", item.id);
    //     }
    //   }
    // },
  },
  watch: {
    active: function () {
      if (typeof  this.active == 'object') {
        this.defActive = this.active
      } else {
        this.defActive = [this.active]
      }
    }
  }
 }
 </script>

