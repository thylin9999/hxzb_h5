<template>
<div class="message-row flex font-regular">
<!--    <div class="icon bg-center  bg-no-repeat"></div>-->
    <div class="message-box flex-1 p-l-10" v-if="['1010','1040'].includes(msgCon.type)">
        <span class="font-12 text-gray user-name">{{ msgCon.nickname }}</span>
        <div class="message font-14 text-black-3">{{ msgCon.msg }}</div>
    </div>
    <div class="message-box notice-box flex-1 p-l-10" v-if="['1120'].includes(msgCon.type)">
        <span class="font-12 text-gray notice">{{ '系统提示：' }}</span>
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
  .message-row{
    margin: 1px 0;
  }
.icon {
    width: 40px;
    height: 40px;
    background-image: url('../../../assets/images/my/logo.png');
    background-size: 100% 100%;
}
.message-box {
    //background-color: #efefef;
    .user-name {
        color: #1c73e9;
        line-height: 17px;
    }
  .notice{
    color: #b26f20;
  }
    .message {
        line-height: 20px;
    }
}

.notice-box{
  background-color: #fffaf6;
}
</style>
