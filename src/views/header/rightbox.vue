<template>
    <div class="outer_1">
        <div class="right_box">
            <div class="show_weather">
                <div class="address">{{ loaclInfo.location }}</div>
                <div class="other_info">
                    <span class="week">{{ loaclInfo.week }}</span>
                    <span class="weather">{{ loaclInfo.tq }}</span>
                    <span class="temperature">{{ temperature }}</span>
                </div>
            </div>
            <div class="outer_box" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="user_box">
                    <el-avatar :size="50" :src="userInfo?.avatar_url" icon="el-icon-user-solid"
                        @click.native="handleAvatar"></el-avatar>
                    <transition name="el-fade-in">
                        <div v-show="mouseIn">
                            <loginC @closeCard="hiddenCard" />

                        </div>
                    </transition>

                </div>
            </div>
        </div>
        <el-dialog class="avatar_dialog_tag" title="头像" @closed="fileUrls = []" destroy-on-close append-to-body
            :visible.sync="DialogVisible" width="425px">
            <div class="center_content">
                <el-avatar :size="120" :src="user_avatar" icon="el-icon-user-solid"></el-avatar>
            </div>
            <div class="btns">
                <el-button size="small" round @click="updataAvatar">选择头像</el-button>
                <el-button v-show="fileUrls.length" type="primary" size="small" plain round
                    @click="saveAvatar">确定</el-button>
            </div>
        </el-dialog>
        <uploadcp :fileType="format" :fileUrls.sync="fileUrls" @successCB="updataAgin" ref="uploadRef" />
    </div>
</template>

<script>
import { getVisitorInfo } from '@/api/webGet.js'
import { mapState } from 'vuex'

import loginC from './login/login'
import uploadcp from '@/components/upload.vue'
export default {
    name: 'rightBox',
    components: { loginC, uploadcp },
    data() {
        return {
            format: ['bmp', 'png', 'tif', 'gif', 'jpeg', 'jpg'],
            loaclInfo: {
                location: '',
                week: '',
                tq: '',
                high: "",
                low: "",
            },
            mouseIn: false,
            DialogVisible: false,
            fileUrls: []
        }
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.user.userInfo,
        }),
        temperature() {
            if (this.loaclInfo.low) {
                return `${this.loaclInfo.low} ~ ${this.loaclInfo.high}`
            } else {
                return ""
            }
        },
        user_avatar() {
            if (this.fileUrls[0]) {
                return this.fileUrls[0]
            } else if (this.userInfo.avatar_url) {
                return this.userInfo.avatar_url
            } else {
                return ""
            }
        }
    },
    beforeMount() {
        this.getdeviceInfo()
    },
    methods: {
        hiddenCard() {
            this.mouseIn = false
        },
        handleMouseEnter() {
            // 鼠标移入处理逻辑
            this.mouseIn = true
        },
        handleMouseLeave() {
            // 鼠标移出处理逻辑
            this.hiddenCard()
        },
        getdeviceInfo() {
            getVisitorInfo().then(res => {
                if (Object.prototype.toString.call(res) === '[object Object]' && res.location) {
                    this.loaclInfo = res
                }
                // console.log(res);
            })
        },
        handleAvatar() {
            if (this.userInfo.name) {
                this.DialogVisible = true
            }
        },
        updataAvatar() {
            this.$refs.uploadRef.uploadFile()
        },
        saveAvatar() {
            this.$refs.uploadRef.saveToCloud()
            this.DialogVisible = false
        },
        updataAgin() {
            this.$store.dispatch('user/updateUser', true).then(() => {
                this.$message.success('头像更新成功')
            })

        }

    }

}
</script>

<style lang="scss" scoped>
.outer_1 {
    align-self: center;
}
.right_box {
    display: flex;
    align-items: center;

    .show_weather {
        margin-right: 50px;
        color: white;

        .address {
            font-size: 17px;
            padding-bottom: 10px;
        }

        .other_info {
            text-align: right;
            padding-left: 30px;
            font-size: 14px;

            .weather {
                margin: 0 15px;
            }
        }
    }

    .outer_box {
        height: 100%;
        display: flex;
        align-items: center;
    }

    .user_box {
        border-radius: 50%;
        width: 50px;
        height: 50px;
        background-color: bisque;
        position: relative;
        cursor: pointer;
    }
}
</style>
<style lang="scss">
.avatar_dialog_tag {
    .el-dialog {
        border-radius: 8px;

        .el-dialog__body {
            text-align: center;
            padding-top: 0;

            .center_content {
                display: flex;
                justify-content: center;
            }

            .btns {
                margin-top: 30px;
            }
        }
    }
}
</style>