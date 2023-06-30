<template>
    <div class="login_box">
        <template v-if="!token || !userInfo">
            <div class="top_box">
                <el-form ref="loginForm" size="small" :model="formData" :rules="rules">
                    <el-form-item prop="email">
                        <el-input v-model="formData.email" placeholder="请输入邮箱" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="formData.password" type="password" autocomplete="off" placeholder="请输入密码"
                            @keyup.native.enter="handleLogin" />
                        <!-- @keyup.enter.native="handleLogin" -->
                    </el-form-item>
                </el-form>
                <div class="btns">
                    <el-button size="small" @click="handleLogin">登录</el-button>
                    <el-button type="text" @click="closeCard">去注册</el-button>
                </div>
            </div>
            <div class="other_line">
                <span class="prompt">其他第三方登录</span>
            </div>
            <div class="other_login">
                <div class="gitee_login" title="gitee登录" @click="giteeLogin"></div>
            </div>
        </template>
        <template v-else>
            <div class="login_info">
                <div class="name">{{ userInfo.name }}</div>
                <div class="star_num">获得点赞：{{ userInfo.star }}</div>
                <div class="msg_num">发布留言：{{ userInfo.msg_num }}</div>
            </div>
            <div class="logout_btn">
                <el-button size="small" @click="logout">退出登录</el-button>
            </div>
        </template>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { _is_dev_ } from '@/utils'
import { formValidator } from '@/utils/validatorRules.js'

export default {
    name: 'loginBox',
    // components: { tooltip, PDFView },
    data() {
        return {
            formData: {
                email: _is_dev_ ? '2281698112@qq.com' : '',
                password: _is_dev_ ? '123456zxc' : '',
            },
            rules: {
                email: [formValidator.default, formValidator.email],
                password: [formValidator.default, formValidator.password]
            },
        }
    },
    computed: {
        ...mapGetters(['token']),
        ...mapState({
            userInfo: (state) => state.user.userInfo,
        }),
    },
    watch: {
        token: {
            handler: function (val, oldVal) {
                if (val) {
                    this.updateUser()
                }
            },
        }
    },
    methods: {
        save(data) {
            this.$store
                .dispatch('user/login', data)
                .then((res) => {
                    if (res.code == 0) {
                        this.$message.success('登录成功')
                        const { redirect } = this.$route.query
                        this.$router.push({ path: redirect || '/dashboard' })
                    } else {
                        this.$message.warn('发生了错误')
                    }
                })
                .catch(() => {
                    // this.getPicture()
                    console.log('请求错误');
                })
                .finally(() => {
                    // this.loading = false
                })
        },
        updateUser() {
            this.$store.dispatch('user/updateUser', true)
        },
        logout() {
            this.$store.dispatch('user/logout', true).then(()=> {
                this.$message.success('已退出登录')
                this.$router.replace('/')
            }).catch(() => {
                console.log('退出时发送了错误')
            }).finally( () => {

            })
        },
        closeCard() {
            this.$emit("closeCard", false)
            this.$router.push({
                path: '/register'
            })
        },
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.save(this.formData)
                    // console.log('通过');
                } else {
                    return false
                }
            })
        },
        giteeLogin() {
            const client_id = process.env.VUE_APP_GITEE_CLIENT_ID
            const redirect_uri = encodeURIComponent(process.env.VUE_APP_GITEE_REDIRECT_URI)
            window.open(`https://gitee.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`, "_self");
        }

    },

}
</script>

<style lang="scss" scoped>
.login_box {
    position: absolute;
    top: calc(100% + 15px);
    right: 0;
    width: 215px;
    cursor: default;
    // height: 300px;
    border-radius: 10px;
    background-color: black;
    // filter: blur(1px);
    opacity: 0.95;
    padding: 10px 0;

    &::before {
        content: '';
        position: absolute;
        width: 18px;
        height: 28px;
        top: -13px;
        right: 22px;
        transform: rotate(60deg);
        background-color: black;
        opacity: 0.9;
        // filter: blur(1px);
    }

    .top_box {
        padding: 0 10px;

        .btns {
            display: flex;
            justify-content: space-between;

            .el-button--default {
                border-radius: 100px;
                padding: 7px 45px;
                font-size: 16px;
            }

            .el-button--text {
                padding: 0;
            }
        }
    }

    .other_line {
        text-align: center;
        color: white;
        padding: 3px 0;

        .prompt {
            position: relative;
            font-size: 12px;

            &::before,
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                border-bottom: 1px solid white;
                width: 59px;
            }

            &::before {
                right: calc(100% + 5px);
            }

            &::after {
                left: calc(100% + 5px);
            }
        }
    }

    .other_login {
        display: flex;
        justify-content: center;

        .gitee_login {
            cursor: pointer;
            width: 26px;
            height: 26px;
            background: url('~@/assets/other_login/ico.png') no-repeat center/cover;
        }
    }

    .login_info {
        padding: 3px 15px 20px;
        color: white;

        .name {
            font-size: 19px;
            text-align: center;
            line-height: 1.8;
        }

        .msg_num,
        .star_num {
            font-size: 16px;
            line-height: 1.8;
        }
    }

    .logout_btn {
        text-align: center;
    }
}</style>