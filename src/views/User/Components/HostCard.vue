<template>
<div class="card flex bg-white justify-between align-center p-l-15 p-r-15 p-b-10 p-t-10">
    <div class="left-title h-100 flex ">
        <span
            class="user-icon d-inline-block bg-center bg-no-repeat"
            :style="{ 'backgroundImage': `url(${host.url})`}"
        ></span>
        <span class="m-l-10 font-16 font-regular">{{ host.name }}</span>
    </div>
    <div class="right-icon flex justify-center align-center">
        <van-button
            v-if="!isSubscribe"
            plain round type="info"
            @click="subscribe"
        >订阅</van-button>
        <van-button
            v-else
            plain round
        >
            <van-icon name="success" />
        </van-button>

    </div>
</div>
</template>

<script>
import { Icon, Button } from 'vant'
export default {
    name: 'HostCard',
    components: {
        [Icon.name]: Icon,
        [Button.name]: Button
    },
    props: {
        host: {
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
            isSubscribe: false
        }
    },
    created () {
        this.isSubscribe = this.host.isSubscribe
    },
    methods: {
        subscribe () {
            console.log('111')
            this.isSubscribe = true
        }
    }
}
</script>

<style lang="scss" scoped>
.card {
    height: 70px;
    line-height: 70px;
    border-bottom: 1px solid #EBEBEB;
    .left-title {
        .user-icon {
            width: 50px;
            height: 50px;
            background-size: 100% 100%;
            border-radius: 50%;
        }
    }
}
::v-deep {
    .right-icon {
        .van-button {
            line-height: 34px;
            height: 34px;
        }
        .van-icon-success {
            color: #eee;
            font-size: 20px;
        }
    }
}
</style>
