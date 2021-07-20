/*
* @Author: zhanghongqia
* @email: 991034150@qq.com
* @Date: 2018-06-10 18:27:03
* @Description: 应用程序模板入口
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-20 14:06:57
*/

<template>
  <div id="app"> 
    <!-- 未登录状态 --> 
    <template v-if="logged">
      <router-view />
    </template>
 
    <template v-else>
      <Header :userName="fullName" 
        :menuList="topMenuList"
        :topActiveId="topActiveId"
        :logout="logout" />
      <SideMenu :sourceData="sideMenu" v-if="haveSideMenu"  :defaultActive="leftActiveId" :isCollapse="isOpenSideMenu"/>
      <!-- 路由跳转部分 -->
    <router-view class="router_container"
            :class="{container_w100: !haveSideMenu, hide_sideMenu: isOpenSideMenu}"></router-view>
    </template>
  </div>
</template>

<script>
let activeId = ''
import { fetch } from "@/utils/request";
import { mapGetters } from "vuex";
import {Header, SideMenu } from '@/components/common'
import {setCookie, getCookie} from '@/utils/util'
import baseconfig from '@/config/base.config'
export default {
  data()  {
    return {
      whiteList: baseconfig.whiteList,
      sideMenu: [], 
      loading: null, 
      router: window.location.hash.split('#')[1]
    }
  },
  computed: mapGetters({
    logged: 'logged',  // 登录状态
    topMenuList: 'topMenuList', // 顶部菜单导航
    areaList: 'areaList', // 地区列表
    userId: 'userId', // 用户id
    fullName: 'fullName',   
    leftActiveId: 'leftActiveId',
    topActiveId: 'topActiveId', // 当导航菜单导航状态
 
    isClickkTop: 'isClickkTop',
    rootMenu: 'rootMenu',
    isOpenSideMenu: 'isOpenSideMenu',
    haveSideMenu: 'haveSideMenu' // 是否有左侧菜单
  }),
  components: {
    Header,
    SideMenu
  },
  mounted() {
    // 未登录跳转到登录页
    if (this.logged) {
      this.setLogin()
    }
    if (_.isEmpty(this.userId)) {
      return;
    }
    let leftActiveId = sessionStorage.getItem('leftActiveId')
    this.$store.commit('setSideMenuDefActive', leftActiveId)
    // 数据请求
    this.requestData()
    this.setContentMInHeight()
    if(this.haveSideMenu) {
      this.sideMenu = this.rootMenu[this.topActiveId]
    }
    this.setDocTitle()
  },
  methods: {
    requestData() {
      // 为true是未登录
      if (this.logged) {
        this.setLoginState()
        return
      } 
      // 获取顶部菜单数据数据
      this.$store.dispatch('topMenuRequest', {userId: this.userId, module: 1}) 
    },
    /**
     * 修改密码请求
     * @Object pramas 请求参数
     */
    requestChangePwd(pramas) {

      fetch('fetchChangePwd', pramas, (data) => {
        if(data.erroCode == 2000) {
          messagePopup(this, '密码修改成功', 'success')
          this.setLoginState()
          return true
        }else {
          messagePopup(this, data.erroMsg, 'error')
          return false
        }
      })
    },
    // 获取logo
    requestLogo() {
      fetch('fetchLogo', data => {
        this.logoUrl = data
      })
    },
     /*
       * 退出
       */
    logout() {
      // //  退出中提示信息
      // this.loading = this.$loading({
      //   text: "正在退出",
      //   spinner: "el-icon-loading",
      //   background: "rgba(0, 0, 0, 0.3)"
      // });
      this.setLoginState(1);
    },
    /**
     * 设置登录状态
     * @Nubmer type 调用类型1,是直接退出登录，2是修改密码后退出
     */
    setLoginState(type) {
      //  type === 1 ? this.loading.close() : ""; // 关闭弹窗
      // 修改登录状态
      this.$store.commit("setLoginState", true);
      // fetch('fetchLogout')
      // 未登录
      
      if(this.logged) {
        this.setLogin() 
      }
      if(type == 1) {
        this.$router.push(`login`); 
      }
    },
    // 退出登录，跳转到网格化登录页
    setLogin() {    
      setCookie('df_user_id', '')
      setCookie('df_user_name', '') 
      // sessionStorage.clear() 
    },
    setContentMInHeight() {
      this.$nextTick(() => {
          let doc = document.getElementsByClassName('content_min_height')[0]
          if(doc) {
            let wh = window.innerHeight - 64
            document.getElementsByClassName('content_min_height')[0].style.minHeight = wh +'px'
          }
        })
    },
    // 获取当前菜单名称
    getMenuTitle(data, key) {
      if(_.isEmpty(data)) {
        return
      }
      this.menuName = ''
      for(let i = 0; i< data.length; i++)  {
        if(data[i].id == key) {
           this.menuName = data[i].menuName
           return this.menuName
        }
        if(!this.menuName && data[i].childList) {
          this.getMenuTitle(data[i].childList, key)
        }
      }
      return this.menuName
    },
    // 设置html标题
    setDocTitle() {
      let menuName = ''
      if(this.haveSideMenu) {
         menuName = this.getMenuTitle(this.sideMenu, this.leftActiveId)
      }else {
         menuName = this.getMenuTitle(this.topMenuList, this.topActiveId)
      }
      // 作业任务 > 实例详情特殊处理
      if(!menuName || this.$router.history.current.path.includes('jobTask/details')) {
        menuName = this.$router.history.current.name
      }  
      document.title = menuName
      //  this.$nextTick(() => {
      //    $('.el-breadcrumb__inner').html(menuName)
      //  })

    },
    // 获取菜单ID
    getMenuActiveId(data, menuUrl) {
      if(_.isEmpty(data)) {
        return
      }
      data.map(item => {
         let path =  menuUrl.split('/') 
        if(item.menuUrl.includes(`${window.location.pathname}#/`+path[1])) { 
          return activeId = item.id
        }
        if(!_.isEmpty(item.childList)) {
          this.getMenuActiveId(item.childList, menuUrl)
        }
      })
      return activeId
    },
    setMenuActiveId(data, path) {
      if(_.isEmpty(data)) {
        return
      }
      // 一级
      let topMenu = this.topMenuList
      let haveChildren = false
      for(let i = 0; i<topMenu.length; i++) {
        let item = topMenu[i]
        if(item.menuUrl.includes(path)) {
          this.$store.commit('setCurrentTopMenuId', item.id)
          this.$store.commit('setSideMenuState', item.haveChildren)
          this.sideMenu = []
          return
        }
      }
      // 二级
      let array =  path.split('/')  
      let topId = this.rootMenu[`${window.location.pathname}#/${array[1]}`]  
      this.$store.commit('setCurrentTopMenuId', topId)
      for(let key in data) {
        let menus = data[key]
        if (Array.isArray(menus)) { 
          let leftId = this.getMenuActiveId(menus, path) 
          this.$store.commit('setSideMenuDefActive', leftId)
          this.sideMenu = data[this.topActiveId]
          this.$store.commit('setSideMenuState', true)
        }
      }
    },
  },
   watch: {
      // 监听登录状态
      logged() {
        // 登录成功获取顶部导航菜单
        if(!this.logged) {
          this.requestData()
        }
      },
      qrcodeLogo() {
        this.$store.dispatch('appCodeRequest')
      },
      leftActiveId(id) { 
        this.setDocTitle()
      },
      cityName() {
         // 城市发生变化重新获取菜单
        this.$store.dispatch('topMenuRequest', {userId: this.userId, module: this.module})
      },
      rootMenu(data) {
        this.setMenuActiveId(data, window.location.hash.slice(1))
        this.setDocTitle()
      },
      // 顶部菜单变化
      topActiveId(id) {
        let menu = this.topMenuList 
        for(let i = 0; i< menu.length; i++) {
          if(menu[i].id == id) {
            this.$store.commit('setSideMenuState', menu[i].haveChildren)
            // 没有二级菜单
            if(!menu[i].haveChildren) { 
              window.location.href = menu[i].menuUrl
              this.$store.commit('setSideMenuDefActive', menu[i].id)
              return
            }
            this.sideMenu = this.rootMenu[id]
          }
        }
      },
      // 二级菜单变化（默认展开第一个页面）
      sideMenu(datas) { 
        if(_.isEmpty(datas)) {
          return
        }
        let data = datas[0]
        // 是否有三级菜单
        if(data.haveChildren && this.isClickkTop) {
          window.location.href = data.childList[0].menuUrl  
          this.$store.commit('setSideMenuDefActive', data.childList[0].id)
        }else {
          if(!this.isClickkTop) {
            return
          }
          window.location.href = data.menuUrl 
          this.$store.commit('setSideMenuDefActive', data.id)
        }
      },
      $route(to, from) {
        $('html,body').animate({scrollTop:0}, 100);
        const menuName = this.getMenuTitle(this.sideMenu, to.path) 
        // // 获取从菜单接口获取名称，菜单没有从路由获取
        if(menuName) {
          document.title = menuName
        }else {
          document.title = to.name
        }
        this.setMenuActiveId(this.rootMenu, to.path)

        this.setContentMInHeight()
        //  手动输入登录
        this.router = to.path  
        // let isLogin = to.path.indexOf(`/login`); 
        // if (isLogin !== -1) { 
        //   this.setLoginState();
        // }
      }
    }
};
</script>