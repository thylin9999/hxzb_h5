<template>
<div class="box w-100 flex justify-between align-center">
   <div class="input-with-send flex align-center flex-1 p-r-5">
       <van-field class="p-l-15 p-r-5" clearable v-model="newMessage" placeholder="和大家聊聊..." />
       <van-button mini type="info" @click="sendMesage">发送</van-button>
   </div>
</div>
</template>

<script>
import { Field, Button, Toast } from 'vant'
import { mapGetters } from 'vuex'
export default {
    name: 'InputMessage',
    components: {
        [Field.name]: Field,
        [Button.name]: Button
    },
    data () {
        return {
            newMessage: ''
        }
    },
    computed: {
        ...mapGetters('user', ['isLogin'])
    },
    methods: {
        sendMesage () {
            if (!this.newMessage.trim().length) return
            if (!this.isLogin) {
                Toast('请先登录')
            } else {
                this.$emit('getMsg', this.newMessage)
                this.newMessage = ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.box {
    background-color: $background-gray1;
    height: 38px;
    border-radius: 4px;
}
.van-button {
    line-height: 30px;
    height: 30px;
    font-size: 14px;
    font-family: PingFang-SC-Regular;
    padding: 0;
    width: 50px;
    text-align: center;
    border-radius: 3px;
    background: $active-color;
}

::v-deep {
    .van-cell {
        background-color: transparent;
        line-height: 24px;
        padding: 0;
        font-family: PingFang-SC-Regular;
        font-size: 14px;
    }
}
</style>
