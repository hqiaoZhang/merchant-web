<template>
  <div class="cantainer"
       v-clickoutside="handleClose"
       @mouseenter="handleOver"
       @mouseleave="handleOut">
      <div @click="isshow = !isshow" >
    <el-input
        :placeholder="placeholder || '请选择'"
        v-model="itemData"

        class="no_event"
        :value="value"
        :disabled="disabled"
        >

    </el-input>
<!--  el-select__caret el-input__icon el-icon-arrow-up      el-icon-caret-bottom-->

    <i :class="{'el-icon-arrow-down':true, 'caret':true, 'direction':isshow}" v-show="isclose && !disabled"></i>
     </div>
    <i class="el-icon-circle-close caret zindex10" v-show="!disabled" :class="{'close':isclose}"
       @click="handleCloseIcon"></i>
    <transition name="el-zoom-in-top">
      <div class="downmenu_container" v-show="isshow && !disabled">
        <div class="menu" v-if="menuData.length">
          <Item :menuData="menuData" @checkItem="handleCheckItem"/>
        </div>
        <div class="nodata" v-else>暂无数据</div>
      </div>
    </transition>
  </div>
</template>

<script>
  import '../../../assets/styles/select.multiple.scss'
  import Item from './item.vue';
  import clickoutside from 'element-ui/src/utils/clickoutside'

  export default {
    data() {
      return {
        isfocus: false,
        isshow: false,
        isclose: true,
        itemData: this.value
      }
    },
    props: {
      menuData: Array,
      value: String,
      placeholder: String,
      disabled: {
        type: Boolean,
        default: false
      },
    },

    updated() {
      this.showdata(this.menuData);
    },
    components: {
      Item
    },
    directives: {
      clickoutside
    },
    mounted() {
      this.$nextTick(() => {
         this.showdata(this.menuData);
      })
    },
    methods: {
      focusChange() {
        this.isfocus = true
      },
      // 格式化数据
      formatData(data) {
        if (_.isEmpty(data)) {
          return
        }
        return data.map(item => {
          item.label = item.name
          item.value = item.id
          item.children = item.childSysOrgs
          if (item.children) {
            this.formatData(item.childSysOrgs)
          }
        })
      },
      /**
       * 显示菜单
       * @return {[type]} [description]
       */
      handleShowMenu() {
        this.isshow = true;
      },
      /**
       * 获取点击返回的数据
       * @param  {[type]} val [description]
       * @return {[type]}     [description]
       */
      handleCheckItem(val) {
        this.fordata(this.menuData);
        let itemdom = document.querySelector('#_' + (val.value || val.id));
        itemdom.className = "active";
        this.$emit('input', val.value || val.id);
        this.$emit('business', val.businessType);
        this.itemData = val.label;
        this.isshow = false;
      },
      /**
       * 递归赋初始值
       * @param  {[type]} val [description]
       * @return {[type]}     [description]
       */
      showdata(val) {
        let itemdom = null;
        val.forEach(item => {
          if ((item.value || item.id) == this.value) {
            itemdom = document.querySelector('#_' + (item.value || item.id));
            itemdom.className = "active";
            return this.itemData = item.label;
          }
          if (item.children && item.children.length) {
            this.showdata(item.children);
          }
        })
      },
      /**
       * 递归清除已经渲染的样式
       * @param  {[type]} val [description]
       * @return {[type]}     [description]
       */
      fordata(val) {
        let itemdom = null;
        val.forEach(item => {
          itemdom = document.querySelector('#_' + (item.value || item.id));
          itemdom.className = "";
          if (item.children && item.children.length) {
            this.fordata(item.children);
          }
        })
      },
      /**
       * 自定义指令触发时的操作
       * @return {[type]} [description]
       */
      handleClose() {
        this.isshow = false;
      },
      handleOver() {
        this.itemData ? this.isclose = false : '';
      },
      handleOut() {
        !this.isclose ? this.isclose = true : '';
      },
      handleCloseIcon() {
        this.itemData = '';
        this.$emit('input', '');
        this.fordata(this.menuData);
      }
    },
    watch: {
      value() {
        this.itemData = this.value
      }
    }
  }
</script>
