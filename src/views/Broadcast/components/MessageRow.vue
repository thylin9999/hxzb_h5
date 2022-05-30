<template>
<div class="message-row flex font-regular">
    <div class="icon bg-center  bg-no-repeat"></div>
    <div class="message-box flex-1 p-l-10">
        <span class="font-12 text-gray user-name">用户名</span>
        <div class="message font-14 text-black-3">阿斯顿发大水发斯蒂芬阿斯顿发送到发斯蒂芬阿斯蒂芬阿斯顿法师打发是的法师打发阿斯顿法师打发是的法师打发</div>
    </div>
</div>
</template>

<script>
export default {
    name: 'MessageRow',
    props: {
        isMe: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.icon {
    width: 40px;
    height: 40px;
    background-image: url('../../../assets/images/my/logo.png');
    background-size: 100% 100%;
}
.message-box {
    .user-name {
        line-height: 17px;
    }
    .message {
        line-height: 20px;
    }
}
</style>
