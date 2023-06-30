<template>
    <div class="left_box">
        <div class="image_box" @click="$router.push('/')"></div>
        <div class="web_title">
            <div class="admin_title">{{ adminTitle }}</div>
            <div class="secondary_title">{{ secondaryTitle }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'leftBox',
    // components: { tooltip, PDFView },
    data() {
        return {
            adminTitle: "secret",
            secondaryTitle: "很多事情值得记录，当然也值得回味。"
        }
    },

}
</script>

<style lang="scss">
.left_box {
    display: flex;
    .image_box {
        cursor: pointer;
        width: 60px;
        height: 80px;
        background: url('~@/assets/home_logo.png') no-repeat center/cover;
    }
    .web_title {
        margin-left: 10px;
        .admin_title {
            text-align: center;
            padding-bottom: 8px;
            font-size: 36px;
            color: white;
        }
        .secondary_title {
            font-size: 15px;
            color: white;
        }
    }
}
</style>