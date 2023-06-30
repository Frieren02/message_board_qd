<template>
    <div class="header_container">
        <div class="flex_box">
            <leftBox/>
            <rightBox/>
        </div>
    </div>
</template>

<script>
import leftBox from './leftbox.vue'
import rightBox from './rightbox.vue'

export default {
    name: 'appHeader',
    components: { leftBox, rightBox },
    data() {
        return {
            
        }
    },

}
</script>

<style lang="scss">
.header_container {
    position: fixed;
    top: 0;
    width: 100%;
    // opacity: 0.8;
    z-index: 1;
    .flex_box {
        display: flex;
        justify-content: space-between;
        background-color: rgba(80,92,126,.8);
        padding: 14px 20px;
        padding-left: 30px;
    }
}
</style>