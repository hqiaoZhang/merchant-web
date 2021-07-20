/*
 * @Author: zhanghongqiao 
 * @Date: 2018-11-13 17:37:53 
 * @Email: 991034150@qq.com 
 * @Description: 左边菜单
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-05-19 09:45:10
 */

 <template>
   <div class="side-menu" :class="{w56: defIsCollapse}">
    <el-menu  :default-active="defaultActive" :collapse="defIsCollapse" :open="defaultActive" 
      @open="handleOpen" @select="handleSelect">
      <template v-for="item in sourceData">  
        <!-- 一级菜单 -->
        <el-menu-item v-if="isEmpty(item.childList)"  
          :key="item.id" :index="item.id">  
          <!-- <router-link :to="{path: `${item.menuUrl}`}">
              <i class="iconfont">&#xe636;</i>
              <span>{{item.menuName}}</span>
          </router-link>   -->
           <a :key="item.id" :href="item.menuUrl" > 
              <i class="iconfont" v-html="item.icon || '&#xe686;'"></i>
              {{item.menuName}}
            </a>  
            
        </el-menu-item>  
        <!-- 有二级菜单 -->
        <el-submenu v-if="!isEmpty(item.childList)"  
            popper-class="top-menu-popper"  
            :key="item.id" :index="item.id">  
          <template slot="title">  
             <i class="iconfont" v-html="item.icon || '&#xe686;'"></i>
            <span slot="title">{{item.menuName}}</span>
          </template> 
          <MenuItem :menus="item.childList" />
        </el-submenu>  
      </template>  
    </el-menu>
    <transition name="el-zoom-in-center">
      <span @click="handleOpenMenu" class="footer_btn open_btn" v-if="defIsCollapse"></span>
    </transition>
    <transition name="el-zoom-in-center">
      <span @click="handleColseMenu" class="footer_btn close_btn" v-if="!defIsCollapse">
        <i class="open_btn"></i> </span>
    </transition>
   </div>
 </template>

 <script>
 import './index.scss'
 import MenuItem from './menuItem.vue' 
 import { isEmpty } from 'lodash'
 export default {
   data() {
     return { 
       defIsCollapse: false,
     }
   },
   props: {
     sourceData: Array,
     defaultActive: String,
     isCollapse: Boolean,
   },
   components: {
     MenuItem
   },
   mounted() {
     this.defIsCollapse = this.isCollapse
   },
   methods: {
     isEmpty: isEmpty,
     handleOpenMenu() {
       this.defIsCollapse = false 
       this.$store.commit('setOpenSideMenu', false)
     },
     handleColseMenu() {
       this.defIsCollapse = true
       this.$store.commit('setOpenSideMenu', true)
     },
      // 选种项  
      handleSelect(key) { 
        this.$store.commit('setSideMenuDefActive', key)
      },
      // 打开
      handleOpen(key, keyPath) {
        return
        this.$store.commit('setSideMenuDefActive', key)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    watch: {
      isCollapse: function() {
        this.defIsCollapse = this.isCollapse
      }
    }
 }
 </script>
 
 
