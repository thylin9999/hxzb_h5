<template>
<div class="card flex bg-white justify-between align-center p-l-15 p-r-15 p-b-10 p-t-10">
    <div class="left-title h-100 flex align-center">
        <span
            class="user-icon d-inline-block bg-center bg-no-repeat"
            :style="{ 'backgroundImage': `url(${logoUrl})`}"
        ></span>
        <span class="m-l-10 font-16 font-regular">{{ host.anchor_name }}</span>
    </div>
    <div class="right-icon flex justify-center align-center">
        <van-button
            plain round type="info"
            @click="subscribe"
        >{{ isSubscribe ? '取消订阅' : '订阅'}}</van-button>
<!--        <van-button-->
<!--            v-else-->
<!--            plain round-->
<!--        >-->
<!--            <van-icon name="success" />-->
<!--        </van-button>-->

    </div>
</div>
</template>

<script>
import { Icon, Button, Toast } from 'vant'
import { subscribeHost } from '@/api/user'
import { mapState } from 'vuex'
import { statusCode } from '@/utils/statusCode'
export default {
    name: 'HostCard',
    components: {
        [Icon.name]: Icon,
        [Button.name]: Button
    },
    props: {
        host: {
            // anchor_name: "海牛会员5"
            // create_time: "2022-06-30 01:07:19"
            // follow: 4
            // heat: 10000
            // id: 1
            // logo: "http://img.wuhaicj.com/62bf6b1b9607b.jpeg"
            // member_id: 1000005
            // sign: null
            type: Object,
            default: () => ({})
        }
    },
    data () {
        return {
        }
    },
    computed: {
        ...mapState('user', ['token']),
        logoUrl () {
            return this.host.logo ? this.host.logo : ''
        },
        isSubscribe () {
            return this.host.isSubscribe
        }
    },
    methods: {
        async subscribe () {
            if (!this.isSubscribe && !this.token) {
                this.$router.push({
                    name: 'Login'
                })
                return
            }
            try {
                Toast.loading({
                    duration: 0,
                    forbidClick: true
                })
                const { code, msg } = await subscribeHost(this.host.member_id)
                if (code === statusCode.success) {
                    Toast(msg)
                    this.$emit('refresh')
                }
            } catch (e) {
                console.log('出凑了')
            } finally {
                Toast.clear()
            }
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
