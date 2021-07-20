/*
 * @Author: zhanghongqia
 * @email: 991034150@qq.com
 * @Date: 2018-06-07 21:41:42
 * @Description: 公用API出口文件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-20 11:43:43
 */

 // 菜单导航
import menuData from './menu'
export const fetchMenus = {
  url: '/function/getFunctionByUserId',
  enableMock: true, // 是否使用本地假数据
  mock: menuData.mock
}

// 登录
export const fetchLogin = {
  url: '/login',
  config: {
    method: 'POST',
    isMsg: true, // 是否需要后端的msg
  }
}

// 退出登录
export const fetchLogout = {
  url: '/auth/logout',
  config: {
    method: 'POST',
  },
}
 