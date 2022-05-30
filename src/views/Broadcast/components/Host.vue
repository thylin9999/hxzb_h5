<template>
<div>
    <div class="host-header flex justify-between font-regular align-center p-l-10 p-r-10">
        <div class="user-info flex align-center">
            <div class="user-icon bg-center bg-no-repeat"></div>
            <div class="user-name font-13  m-l-10">
                <span>矮脚虎</span>
                <div class="collect-info">
                    <svg-icon class="icon-13" icon-class="fire"></svg-icon>
                    <span class="font-14">14131212</span>
                </div>
            </div>
        </div>
        <div class="subscribe">
            <span class="font-12 text-color d-inline-block text-center">订阅</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'Host'
}
</script>

<style lang="scss" scoped>
.user-icon {
    width: 45px;
    height: 45px;
    background-image: url('../../../assets/images/my/logo.png');
    background-size: 100% 100%;
}
.collect-info{
    line-height: 20px;
}
.subscribe {
    background-color: #ff5116;
    border-radius: 10px;
    line-height: 20px;
    span {
        width: 50px;
    }
}
::v-deep {
    .collect-info {
        .svg-icon {
            width: 13px;
            height: 13px;
        }
    }
}
</style>
