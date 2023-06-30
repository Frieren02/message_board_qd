<template>
    <div class="loading">
        <i class="el-icon-loading"></i>
        <span>正在登录中...</span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            code: '',
        }
    },
    created() {
        // http://127.0.0.1:5002/?code=d7e0059abcb861e021d23e57a97fb47831b8b5772291ac21d1a77307e04dfa93#/oauth
        var url = window.location.href; // 获取页面路由
        if (url.indexOf("code") != -1) {
            this.code = url.split("=")[1];
            this.giteeLoginV();
        } else {
            this.$router.replace('/')
        }
    },
    methods: {
        giteeLoginV() {
            this.$store.dispatch('user/giteeLogin', { code: this.code }).then((res) => {
                this.$message.success('登录成功')
                setTimeout(() => {
                    this.$router.replace('/')
                }, 1000);
            }).catch(err => {
                console.log(err);
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.loading {
    display: flex;
    justify-content: center;
    padding-top: 200px;
}
</style>