<template>
<div class="w-200 h-100 font-regular">
    <div class="header-user w-100 flex p-t-30 bg-no-repeat bg-center p-relative">
        <div
            class="logo bg-no-repeat border-50 bg-center p-absolute"
            :style="{
                backgroundImage: `url(${userLogo})`
            }"
        ></div>
    </div>
    <div class="m-t-5 m-b-10 p-l-25 flex row w-100 align-center">
        <div
            class="user-name flex flex-column flex-start"
            v-if="!isLogin"
        >
           <span
               class="login-text font-medium d-inline-block m-b-5"
               @click="goToLogin"
           >登录</span>
           <span class="font-14 tips m-b-5">点击登录，体验更多功能与互动</span>
        </div>
        <div v-else>
            <span>{{ nickname }}</span>
        </div>
    </div>
    <div class="content">
        <div class="user-list p-t-10 font-regular">
            <template
                v-for="item in list"
            >
                <van-cell
                    v-if="item.key !== 'logout' || (item.key === 'logout' && isLogin)"
                    :title="item.text"
                    :key="item.key"
                    is-link
                    @click.native="clickRow(item)"
                >
                    <template #icon>
                        <svg-icon
                            class="m-r-15"
                            :icon-class="item.preIcon"
                            />
                    </template>
                </van-cell>
            </template>
        </div>

    </div>
</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { Cell, Icon, Toast } from 'vant'
export default {
    name: 'My.vue',
    components: {
        [Cell.name]: Cell,
        [Icon.name]: Icon,
        [Toast.name]: Toast
    },
    computed: {
        ...mapState('user', ['nickname', 'token', 'avatar']),
        ...mapGetters('user', ['isLogin']),
        showUserName () {
            return this.isLogin ? this.isLogin : '您当前是游客身份'
        },
        userLogo () {
            return this.token ? this.avatar : require('../../assets/images/my/logo.png')
        },
        needTokens () {
            return ['updatePassword', 'subscribeHost', 'myBooked', 'info', 'advice']
        }
    },
    data () {
        return {
            list: [
                {
                    key: 'subscribeHost',
                    preIcon: 'wifi',
                    text: '订阅主播'
                },
                {
                    key: 'myBooked',
                    preIcon: 'calender',
                    text: '我的预约'
                },
                {
                    key: 'onlineCustom',
                    preIcon: 'custom',
                    text: '在线客服'
                },
                {
                    key: 'updatePassword',
                    preIcon: 'lock',
                    text: '修改密码'
                },
                // {
                //     key: 'advice',
                //     preIcon: 'message',
                //     text: '意见反馈'
                // },
                // {
                //     key: 'info',
                //     preIcon: 'info',
                //     text: '消息通知'
                // },
                {
                    key: 'logout',
                    preIcon: 'info',
                    text: '退出登录'
                }
            ]
        }
    },
    methods: {
        ...mapActions('user', ['logoutAction']),
        goToLogin () {
            this.$router.push({
                name: 'Login'
            })
        },
        clickRow (item) {
            if (!this.token && this.needTokens.includes(item.key)) {
                Toast('请先登录')
                return
            }
            if (item.key === 'updatePassword') {
                this.$router.push({
                    name: 'UpdatePassword'
                })
            } else if (item.key === 'subscribeHost') {
                this.$router.push({
                    name: 'SubscribeHost'
                })
            } else if (item.key === 'myBooked') {
                this.$router.push({
                    name: 'BookList'
                })
            } else if (item.key === 'advice') {
                this.$router.push({
                    name: 'Feedback'
                })
            } else if (item.key === 'logout') {
                this.logoutAction()
            } else if (item.key === 'onlineCustom') {
                window.open('https://tb.53kf.com/code/client/b8ccba789e8f30713194b500e84013f22/1')
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
        //background-image: url('../../assets/images/my/logo.png');
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
        .van-cell, .van-icon, .svg-icon {
            line-height: 44px;
        }
        .svg-icon{
            height: 44px;
        }

    }
}
</style>
