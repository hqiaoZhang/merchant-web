/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-29 21:07:35
 * @Description: 路由配置
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-21 09:31:34
 */

import Vue from 'vue'
import Router from 'vue-router'
//在路由跳转的时候同一个路由多次添加是不被允许的
//重写路由的push方法
// const VueRouterPush = Router.prototype.push
// Router.prototype.push = function push (to) {
//     return VueRouterPush.call(this, to).catch(err => err)
// }

// 注册Router
Vue.use(Router)
// 配置项
import config from '@/config/base.config'
// 登录
const Login = () => import('@/containers/login/index.vue')
// 首页
const Home = () => import('@/containers/home/index.vue')

//  管理
const manage  = () => import('@/containers/manage/index.vue')
 
// 商家入驻
const tenants = () => import('@/containers/tenants/index.vue')
// 付款
const payment = () => import('@/containers/payment/index.vue')
const routes = [
  {
    path: '*',
    redirect: `/index`,
    component: Home // 首页
  },{
    path:`/index`, // 首页
    name: '首页',
    component: Home
  },{
    path:`/login`, // 登录
    name: '登录',
    component: Login
  },
  {
    path: `/manage`,
    name: '店铺管理',
    component: manage
  },{
    path: `/tenants`,
    name: '商家入驻',
    component: tenants 
  },{
    path: `/payment`,
    name: '订单支付',
    component: payment  
  }
]

export default new Router({
  // mode: 'history',
  base: config.routerPath,
  routes
})
