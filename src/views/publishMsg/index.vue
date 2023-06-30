<template>
    <div class="outer_box">
        <div class="title">留言</div>
        <el-form ref="sendMsgForm" :model="formData" :rules="rules">
            <el-form-item prop="content">
                <div class="bg_outer" :style="textcolorStyle">
                    <div class="bg" :style="contentStyle"></div>
                    <el-input class="msg_content" type="textarea" v-model="formData.content" placeholder="请输入内容"
                        :maxlength="9999" resize="none" :autosize="{ minRows: 6, maxRows: 9 }"></el-input>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button class="zt_color" size="small" round @click="updataBg">自定义背景图片</el-button>
                <template v-if="fileUrls.length">
                    <el-select class="color_input" size="small" v-model="formData.text_color" placeholder="字体颜色">
                        <el-option-group v-for="group in text_color" :key="group.label" :label="group.label">
                            <el-option v-for="item in group.options" :key="item.value" :value="item.value"></el-option>
                        </el-option-group>
                    </el-select>
                </template>
            </el-form-item>
            <el-form-item label="公开" label-width="41px">
                <el-tooltip :content="formData.publicity ? '公开' : '私密'" placement="right">
                    <el-switch v-model="formData.publicity" active-color="#13ce66"></el-switch>
                </el-tooltip>
            </el-form-item>
        </el-form>
        <div class="sendmsg_box">
            <el-button type="primary" round @click="sendMsg">发布留言</el-button>
        </div>
        <uploadcp :fileType="format" :fileUrls.sync="fileUrls" @successCB="uploadEnd" :item="fileInfo" ref="uploadRef" />
    </div>
</template>
 
<script>
import { saveMsg } from '@/api/myServer.js'
import { formValidator } from '@/utils/validatorRules.js'
import { uuid } from '@/utils'
import uploadcp from '@/components/upload.vue'

export default {
    components: { uploadcp },
    data() {
        return {
            format: ['bmp', 'png', 'tif', 'gif', 'jpeg', 'jpg'],
            formData: {
                content: '',
                text_color: '',
                publicity: true,
            },
            rules: {
                content: [formValidator.default],
            },
            fileInfo: {
                fileKey: 'msg_bg',
                _attachmentUuid: "",
            },
            fileUrls: [],
            text_color: [{
                label: '浅色',
                options: [{
                    value: '#FFFFFF',
                }, {
                    value: '#E0ECF8',
                }, {
                    value: '#F7F2E0',
                }]
            }, {
                label: '深色',
                options: [{
                    value: '#000000',
                }, {
                    value: '#610B0B',
                }, {
                    value: '#0B173B',
                }]
            }],
        }
    },
    computed: {
        contentStyle() {
            if (this.fileUrls[0]) {
                return {
                    'background-image': `url('${this.fileUrls[0]}')`
                }
            }
            return {}
        },
        textcolorStyle() {
            if (this.formData.text_color) {
                return {
                    '--textColor': this.formData.text_color
                }
            }
            return {}
        }
    },
    methods: {
        updataBg() {
            this.$refs.uploadRef.uploadFile()
        },
        uploadEnd() {
            this.$message.success('已发布留言')
            this.$router.push('/')
        },
        sendMsg() {
            this.$refs.sendMsgForm.validate(async (valid) => {
                if (valid) {
                    this.$set(this.fileInfo, '_attachmentUuid', uuid(14))
                    const { content, text_color, publicity } = this.formData
                    const res1 = await saveMsg({
                        content_id: this.fileInfo._attachmentUuid,
                        content,
                        privacy: publicity ? 0 : 1,
                        text_color,
                    })
                    if (res1.code == 200 && this.fileUrls.length) {
                        this.$refs.uploadRef.saveToCloud()
                    } else {
                        this.uploadEnd()
                    }
                } else {
                    return false
                }
            })
        }
    },
}
</script>
 
<style lang="scss" scoped>
.outer_box {
    position: relative;
    margin: 0 auto;
    max-width: 560px;

    .title {
        font-size: 20px;
        padding: 40px 0 15px;
    }

    .bg_outer {
        position: relative;

        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 9px;
            background-image: url();
            background: url('') no-repeat center/cover;
            z-index: -1;
            -webkit-filter: opacity(85%);
            filter: opacity(85%);
        }
    }

    .msg_content {
        ::v-deep .el-textarea__inner {
            background-color: transparent;
            border-radius: 9px;
            color: var(--textColor);
        }
    }

    ::v-deep .zt_color {
        background-color: var(--bgColor);
        color: var(--textColor);
        margin-right: 100px;

        &:hover {
            border-color: #c6e2ff;
            background-color: var(--textColor);
            color: var(--bgColor);
        }
    }

    ::v-deep .el-form-item__label {
        color: var(--textColor);
    }

    ::v-deep .color_input {
        .el-input__inner {
            background-color: var(--bgColor);
            color: var(--textColor);

            &:hover {
                border-color: #c6e2ff;
                background-color: var(--textColor);
                color: var(--bgColor);
            }
        }

    }

    .sendmsg_box {
        text-align: center;
    }
}
</style>