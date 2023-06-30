<template>
   <div class="register_out">
      <div class="card">
         <span class="title">用户注册</span>
         <div class="border_box">
            <el-form ref="form" :model="formData" :rules="rules">
               <el-form-item prop="user">
                  <el-input v-model="formData.user" :maxlength="10" placeholder="请输入用户名" />
               </el-form-item>
               <el-form-item prop="password">
                  <el-input v-model="formData.password" type="password" :maxlength="255"  autocomplete="off" placeholder="请输入密码" />
               </el-form-item>
               <el-form-item prop="aginP">
                  <el-input v-model="formData.aginP" type="password" autocomplete="off" placeholder="请确认密码" />
               </el-form-item>
               <el-form-item prop="QEmail">
                  <el-input v-model="formData.QEmail" type="email" placeholder="请输入邮箱" />
               </el-form-item>
            </el-form>
            <el-button @click="sendEmail">发送邮件</el-button>
            <div class="tip">
               <span class="jump_email" @click="toEmail">发送邮件后请前往QQ邮箱进行验证</span>
               <!-- https://mail.qq.com/ -->
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { sendEmail } from '@/api/myServer.js'
import { formValidator } from '@/utils/validatorRules.js'

export default {
   data() {
      const validatePass = (rule, value, callback) => {
         if (this.formData.aginP !== '') {
            this.$refs.form.validateField('aginP');
         }
         callback();
      };
      const validatePass2 = (rule, value, callback) => {
         if (value === '') {
            callback(new Error('请再次输入密码'));
         } else if (value !== this.formData.password) {
            callback(new Error('两次输入密码不一致!'));
         } else {
            callback();
         }
      };
      return {
         formData: {
            user: '',
            password: '',
            aginP: '',
            QEmail: ''
         },
         rules: {
            user: [formValidator.default],
            QEmail: [formValidator.default, formValidator.email],
            password: [
               formValidator.default,
               formValidator.password,
               { validator: validatePass, trigger: 'blur' },
            ],
            aginP: [{ validator: validatePass2, trigger: 'blur' }]
         },
      }
   },
   methods: {
      async sendEmail() {
         try {
            await this.checkform()
            const { user, password, QEmail } = this.formData
            sendEmail({
               user,
               password,
               QEmail
            }).then(res => {
               if (res.code == 200) {
                  this.$message.success('邮件已发送到您的邮箱！')
               }
            })
         } catch (error) {
            console.log(error);
         }

      },
      checkform() {
         return new Promise((resolve, reject) => {
            this.$refs.form.validate((valid) => {
               if (valid) {
                  resolve(true)
               } else {
                  reject(false)
               }
            })
         })
      },
      toEmail() {
         window.open("https://mail.qq.com/");
      }
   },
}
</script>

<style lang="scss" scoped>
.register_out {
   display: flex;
   height: calc(100vh - 108px);
   justify-content: center;
   align-items: center;

   .card {
      .title {
         font-size: 20px;
      }

      .border_box {
         border: 1px solid;
         border-color: var(--textColor);
         border-radius: 7px;
         padding: 20px;
         padding-bottom: 10px;
         text-align: center;

         .el-button--default {
            color: white;
            background-color: #505c7e;
            border-radius: 14px;
            padding: 10px 30px;
         }

         .tip {
            font-size: 12px;
            color: rgb(173, 165, 165);
            text-align: right;
            margin-top: 7px;

            .jump_email {
               cursor: pointer;
            }
         }
      }
   }
}
</style>