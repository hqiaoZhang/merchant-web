 <template>
  <div class="header">
     <div class="logo">
        <!-- <img v-if="logoUrl" :src="`${cHost}/file/view/${logoUrl}`">   -->
        <img src="static/images/logo.png"> 
    </div>
     <div class="top_menus">
      <a :href="item.menuUrl" :class="{active: item.id==topActiveId}" @click="handleMenu(item)" v-for="item in menuList" :key="item.id">
         <i class="iconfont" v-html="item.icon || '&#xe642;'"></i>
        <span>{{item.menuName}}</span>
      </a>
      <!-- <div class="header_active_bar"></div> -->
    </div> 
    <div class="right"> 
      <div class="user_name"
           @click="isShow = !isShow" >
        <img src="static/images/user.jpg">
        <span>{{userName}}</span>
      </div>
      <div class="logout" title="退出" @click="logout"><i class="iconfont">&#xe608;</i></div>
       
    </div>
  </div>
</template>

 <script> 
 import './index.scss' 
export default {
  data() {
    return { 
    };
  }, 
  props: {
    logoUrl: String,
    menuList: Array, 
    logout: {
      type: Function,
      default: () => {}
    },
    requestChangePwd: Function,
    topActiveId: String,
    cityName: String,
    userName: String, 
  },
  methods: {
    handleMenu(item) {
      this.$store.commit('setCurrentTopMenuId',  item.id)
      this.$store.commit('setSideMenuState', item.haveChildren) 
    }, 
  }
};
</script>