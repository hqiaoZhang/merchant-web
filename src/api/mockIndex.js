/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-07 11:22:20
 * @Email: 991034150@qq.com
 * @Description: 所有mock 出口
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-20 11:42:37
 */
// 公用数据
import * as commonApi from './common'
// 首页
import * as indexApi  from './index'
// 调用方管理
import * as manageApi from './manage'


export default {
  ...commonApi,
  ...indexApi,
  ...manageApi,
}
