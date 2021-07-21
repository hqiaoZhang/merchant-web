/*
 * @Author: zhanghongqiao 
 * @Date: 2021-07-20 12:29:55 
 * @Email: 991034150@qq.com 
 * @Description: 商家入驻
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2021-07-21 09:30:44
 */

<template>
  <div class="router_container container_w100 tenants">
     <!-- <el-breadcrumb separator-class="el-icon-arrow-right"> 
        <el-breadcrumb-item>商家入驻</el-breadcrumb-item>
      </el-breadcrumb> -->
      <div class="main_container white_bg"> 
         <el-form ref="ruleForm" :model="form" label-width="110px" inline :rules="rules">
         
         <el-row>
           <h4 class="title">账户信息</h4>
            <el-form-item label="登录名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item> 

            <el-form-item label="登录手机号" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item> 

            <el-form-item label="密码" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item> 

            <el-form-item label="确认密码" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item> 
         </el-row>
          
        <el-row>
          <h4 class="title">服务商信息</h4>
          <el-form-item label="服务商手机号" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item> 
         </el-row>

         <el-row>
          <h4 class="title">公司信息</h4>
            <el-form-item label="公司名称" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="营业执照" prop="name">
                <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">请上传营业执照</div>
              </el-upload>
            </el-form-item>

            <el-form-item label="卫生许可证" prop="name">
                <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">请上传卫生许可证</div>
              </el-upload>
            </el-form-item>
         </el-row>


         <el-row>
           <h4 class="title">法人信息</h4>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item> 

            <el-form-item label="法人手机号" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>    
         </el-row>

         <el-row>
           <el-form-item label="身份证正面" prop="name">
              <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">请上传身份证正面</div>
            </el-upload> 
            </el-form-item>

            <el-form-item label="身份证反面" prop="name">
              <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">请上传身份证反面</div>
            </el-upload> 
            </el-form-item>
         </el-row>
    
          
          <el-row>
             <h4 class="title">开户行信息</h4>
             <el-form-item label="开户人" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

             <el-form-item label="银行卡号" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>

               <el-form-item label="开户行" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
          </el-row>  

          <el-row>
            <h4 class="title">入驻协议</h4>
            <el-form-item label="">
              <!-- <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="textarea">
              </el-input>  -->
              <el-checkbox>同意协议并入驻</el-checkbox>&nbsp;&nbsp;<a>入驻商城服务协议</a>
            </el-form-item>
          </el-row>  
          <el-form-item class="footer">
            <el-button type="primary" @click="submitForm('ruleForm')">立即入驻</el-button>
            <!-- <el-button>取消</el-button> -->
          </el-form-item>
        </el-form>
      </div>
  </div> 
</template>

<script>
 import { Header } from "@/components/common";
import './index.scss'
  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        dialogImageUrl: '',
        dialogVisible: false,
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
        textarea: `一、总则 
甲、乙双方根据中华人民共和国法律、法规等相关规定，本着诚信、互惠、规范的原则，经友好协商，就甲方接入腾讯众创空间企业服务平台之相关合作事项，达成一致协议。 
二、如无特别说明，下列术语在本协议中的定义为： 
（一）众创空间企业服务平台，是指由腾讯公司提供技术支持和服务，且由腾讯公司以外的商户发布和出售服务的网络交易平台网站、域名为http://c.qq.com/。众创空间企业服务平台向商户提供的服务以下简称“平台服务”。
（二）商户：申请成为众创空间企业服务平台的商户必须是符合本协议第三条规定的法律实体。
（三）商户注册：是指商户登陆众创空间企业服务平台（http://open.qq.com/ 、http://c.qq.com/），并按要求填写相关信并获得众创空间企业服务平台服务账户的过程。
（四）服务：是指商户通过众创空间企业服务平台向用户提供的财务、法务、推广、运营、设计等服务。
（五）财付通服务：是指由财付通支付科技有限公司（以下简称财付通公司）为商户、用户完成交易、转移资金提供的支付服务，详情见财付通公司网站（www.tenpay.com）相关规则及说明。
 
三、申请条件
申请入驻众创空间企业服务平台的商户必须全部满足以下条件：
（一） 符合《2017众创空间企业服务平台招商标准》（具体以乙方公布的为准）的要求，并根据《2017年众创空间企业服务平台招商标准》的要求向乙方或乙方指定合作方提交其在申请服务时应当提供的证明文件或其他相关证明，且获得众创空间企业服务平台认可。
（二） 同意并遵守本协议及众创空间企业服务平台公布的其他规则。
（三） 在众创空间企业服务平台完成商户注册并通过乙方审核。

四、信息确认
（一）商户必须通过乙方或乙方指定的信息确认方（以下简称“信息确认方”）对商户在申请入驻时提供的相关资料和信息进行核实、确认。具体的信息进行核实、确认的相关资料和信息包括但不限于以下内容：
1，登记的法律实体在实际经营所在地工商部门是否有合法有效的注册记录；
2，登记的联系人在该法律实体的业务身份是否属实；
3，登记的联系人是否获得公司授权；
4，商户提供的营业执照、税务登记证、商标注册证、授权书等相关资料是否属实；
5，法律法规要求及《2017年众创空间企业服务平台招商标准》和乙方另行所要求需核查的其他信息。
（二）若商户所提供的资料不真实或资料变更或其他原因导致商户未能通过信息确认，商户可在修改资料后要求再次进行信息确认。
（三）对上述信息的任何变更，商户应及时通知乙方，并以书面形式提交“信息变更的再确认申请”，将变更信息交由信息确认方依程序再次确认核实，如再确认未能通过，乙方有权终止本协议而无需承担任何责任。
（四）商户同意为其未及时的通知或更新其信息及上述信息的真实性、完整性与合法性担责，若因此给乙方、乙方用户、众创空间企业服务平台合作伙伴等造成损失的，商户同意赔偿全部损失。
`
      }
    },
    components: {
      Header
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      submitForm(formName) {
        this.$router.push('/payment')
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
    }
  }
</script>

<style>

</style>
