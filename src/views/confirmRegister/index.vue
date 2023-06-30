<template>
    <div class="layout_box">
        <div class="msg">
            
            <template v-if="!state">
                <i class="el-icon-loading"></i> 
                <span>{{ msg }}</span>
            </template>
            <template v-else>
                <span>{{ successMsg }}</span>
            </template>
        </div>
    </div>
 </template>
 
 <script>
import { confirmRegister } from '@/api/myServer.js'

 export default {
    data() {
        return {
            msg: '正在注册...',
            successMsg: '即将跳转到首页。',
            state: 0
        }
    },
    beforeMount() {
        this.confirmRegister()
    },
    methods: {
        confirmRegister() {
            const id = this.$route.query.id
            if (!id) {
                this.$nextTick(() => {
                    this.$router.replace('/')
                })
            } else {
                confirmRegister(id).then((res) => {
                    if (res.msg == 'ok') {
                        this.$message({
                            message: '注册成功，欢迎登录',
                            type: 'success',
                            duration: '4500'
                        })
                        this.state = 1
                        setTimeout(() => {
                            this.$router.replace('/')
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            this.$router.replace('/')
                        }, 1000);
                    }
                })
            }
        }
    },
 }
 </script>
 
 <style lang="scss" scoped>
 .layout_box {
    display: flex;
    padding: 250px 0;
    justify-content: center;
    .msg {
        font-size: 22px;
        color: #a1915a;
    }
 }
 </style>