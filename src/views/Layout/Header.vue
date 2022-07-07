<template>
    <div class=" header flex justify-between align-center p-l-10 p-r-10 m-b-15">
        <div class="logo">
            <img class="w-100" src="../../assets/images/logo.png" alt="">
        </div>
<!--        <span>返回首页</span>-->
        <span class="download-button d-inline-block text-center font-15 text-color" @click="downloadApp">下载App</span>
    </div>
</template>
<script>

export default {
    name: 'Header',
    data () {
        return {
            logo: 'https://qiuyou.live/h5/img/logo.38d15be9.png',
            // eslint-disable-next-line no-undef
            appDownloadUrl: _appDownloadUlr
        }
    },
    methods: {
        downloadApp () {
            window.open(this.appDownloadUrl, '_blank')
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
        line-height: 30px;
        font-size: 15px;
        height: 34px;
        border-radius: 17px;
        color: #1D3F67;
        border: 2px solid #1D3F67;
    }
}
</style>
