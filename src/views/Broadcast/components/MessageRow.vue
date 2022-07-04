<template>
<div class="message-row flex font-regular">
    <div class="icon bg-center  bg-no-repeat"></div>
    <div class="message-box flex-1 p-l-10" v-if="['1010','1040'].includes(msgCon.type)">
        <span class="font-12 text-gray user-name">{{ msgCon.nickname }}</span>
        <div class="message font-14 text-black-3">{{ msgCon.msg }}</div>
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
        },
        msgCon: {
            type: [Object, String],
            default: function () {
                return {}
            }
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
