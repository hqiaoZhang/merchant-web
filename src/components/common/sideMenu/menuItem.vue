<template>
  <div>
     <el-menu-item v-for="item in menus" :key="item.id"
      v-if="isEmpty(item.childList)" :index="item.id">
        <a :href="item.menuUrl">
             • {{item.menuName}}
        </a>  
      </el-menu-item> 

     <el-submenu v-for="item in menus" :key="item.id" 
      v-if="!isEmpty(item.childList)" :index="item.id">  
      <!-- 三级菜单 -->
      <template slot="title">{{item.menuName}}</template>
      <el-menu-item v-for="subitem in item.childList"
        :index="subitem.id"
        :key="subitem.id">
        <a :href="item.menuUrl">
          {{subitem.menuName}}
        </a>  
      </el-menu-item>
    </el-submenu>
  </div>
 
</template>

<script>
import { isEmpty } from "lodash"
export default {
  name: 'MenuItem',  
  props:{
    menus: Array, 
  },
  methods: {
    isEmpty: isEmpty
  },
 
}
</script>
