/*
 * @Author: zhanghongqiao 
 * @Date: 2021-07-21 09:30:14 
 * @Email: 991034150@qq.com 
 * @Description: 支付
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-21 10:11:21
 */

<template>
  <div class="router_container container_w100 payment">
    
    <div class="logo_line">
      <div class="logo"><img src="static/images/logo2.png" />收银台</div>
    </div>
    <div class="pay_price">
      <span class="price">支付金额：<span id="amountStr" class="fc_red" amount="1000.00">¥1000.00</span></span>
      <span class="name_c">
        订单号：  
				<span><a href="http://order.dangdang.com/orderdetails.aspx?orderid=42954073855" target="_blank">42954073855</a></span> 
			</span>
    </div>
    <h3>支付方式</h3>
    <div class="pay_box">
      <img src="static/images/weixin.gif" /><br/>
      <img src="static/images/qrcodeimage.gif" />
    </div>
    <div><el-button  type="primary">立即支付</el-button></div>
  </div>
</template>

<script>
import './index.scss'
export default {
  data() {
    return {
      
    }
  }
}
</script>

<style>

</style>
