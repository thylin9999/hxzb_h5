<template>
    <div class=" header flex justify-between align-center p-l-10 p-r-10 m-b-15">
        <div class="logo">
            <img class="w-100" src="../../assets/images/logo.png" alt="">
        </div>
<!--        <span>返回首页</span>-->
<!--        <span class="download-button d-inline-block text-center text-color">下载APP</span>-->
    </div>
</template>
<script>

export default {
    name: 'Header',
    data () {
        return {
            logo: 'https://qiuyou.live/h5/img/logo.38d15be9.png'
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.header {
    height: 40px;
    .logo{
        width: 130px;
    }
    .download-button{
        width: 83.5px;
        height: 24.5px;
        line-height: 24.5px;
        font-size: 13px;
        background-color: $button-color;
        border-radius: 12px;
    }
}
</style>
