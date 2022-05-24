<template>
<div class="w-200 h-100 font-regular">
    <div class="header-user w-100 flex p-t-30 bg-no-repeat bg-center p-relative">
        <div class="logo bg-no-repeat bg-center p-absolute"></div>

    </div>
    <div class="m-t-5 m-b-10 p-l-25 flex row w-100 align-center">
        <div
            class="user-name flex flex-column flex-start"
            v-if="!userName"
        >
           <span
               class="login-text font-medium d-inline-block m-b-5"
               v-if="!userName"
               @click="goToLogin"
           >登录</span>
           <span class="font-14 tips m-b-5">点击登录，体验更多功能与互动</span>
        </div>
        <div v-else>
            <span>{{ userName }}</span>
        </div>
    </div>
    <div class="content">
        <div class="user-list p-t-10 font-regular">
            <template
                v-for="item in list"
            >
                <van-cell
                    :title="item.text"
                    :icon="item.preIcon"
                    :key="item.key"
                    is-link
                    @click.native="clickRow(item)"
                >
                </van-cell>
            </template>
        </div>

    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { Cell, Icon } from 'vant'
export default {
    name: 'My.vue',
    components: {
        [Cell.name]: Cell,
        [Icon.name]: Icon
    },
    computed: {
        ...mapState('user', ['userName']),
        showUserName () {
            return this.userName ? this.userName : '您当前是游客身份'
        }
    },
    data () {
        return {
            list: [
                {
                    key: 'subscribeHost',
                    preIcon: 'bar-chart-o',
                    text: '订阅主播'
                },
                {
                    key: 'onlineCustom',
                    preIcon: 'service-o',
                    text: '在线客服'
                },
                {
                    key: 'updatePassword',
                    preIcon: 'shield-o',
                    text: '修改密码'
                },
                {
                    key: 'advice',
                    preIcon: 'envelop-o',
                    text: '意见反馈'
                }
            ]
        }
    },
    methods: {
        goToLogin () {
            this.$router.push({
                name: 'Login'
            })
        },
        clickRow (item) {
            console.log(item, 'item')
            if (item.key === 'updatePassword') {
                this.$router.push({
                    name: 'UpdatePassword'
                })
            } else if (item.key === 'subscribeHost') {
                this.$router.push({
                    name: 'SubscribeHost'
                })
            } else if (item.key === 'advice') {
                this.$router.push({
                    name: 'Feedback'
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.header-user {
    height: 260px;
    background-image: url('../../assets/images/my/my-bg.png');
    background-size: 100% 100%;
    .logo {
        width: 110px;
        height: 110px;
        left: 18px;
        bottom: 10px;
        background-image: url('../../assets/images/my/logo.png');
        background-size: 100% 100%;
    }
    .row {
        height: 66.5px;
    }
}
.user-name {
    .login-text {
        font-size: 26px;
        line-height: 36px;
        color: #444;
    }
    .tips {
        color: #787878;
    }
}

.content {
    height: calc(100% - 340px);
    overflow-y: overlay;
    padding-bottom: 50px;
    .list-item {
        height: 50px;
    }
}
::v-deep {
    .list-item {
        .svg-icon {
            width: 20px;
            height: 20px;
            fill: $dark-color;
        }
        .after-icon {
            width :15px;
            height: 15px;
        }
        border-bottom: 1px solid #f5f6f7;
    }
    .user-list {
        .van-cell {
            font-size: 16px;
            font-family: PingFang-SC-Regular;
            color: #333;
        }
        .van-cell__left-icon {
            font-size: 30px;
            margin-right: 10px;
        }
        .van-cell, .van-icon {
            line-height: 44px;
        }

    }
}
</style>
