<template>
<div class="w-200 h-100">
    <div class="header-user w-100 flex p-t-30 bg-no-repeat bg-center p-relative">
       <div class="m-t-5 flex row w-100 align-center">
           <div class="app-logo border-50 m-l-20 m-r-15 bg-no-repeat bg-center"></div>
           <div class="user-name text-color flex flex-column flex-start">
               <span
                   class="login-text text-color"
                   v-if="!userName"
                   @click="goToLogin"
               >点击登录</span>
               <span class="font-12">{{ showUserName }}</span>
           </div>
       </div>
       <div class="download-app w-100 bg-no-repeat bg-center p-absolute"></div>
    </div>
    <div class="content p-t-30">
        <ul class="user-list p-t-10">
            <li
                class="list-item flex justify-between align-center p-l-10 p-r-10"
                v-for="item in list"
                :key="item.key"
            >
                <div class="flex align-center">
                    <svg-icon class="m-r-15" :icon-class="item.preIcon"></svg-icon>
                    <span class="font-12">{{ item.text }}</span>
                </div>
                <svg-icon class="after-icon" icon-class="rightArrow"></svg-icon>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'My.vue',
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
                    preIcon: 'host',
                    text: '订阅主播',
                    link: ''
                },
                {
                    key: 'onlineCustom',
                    preIcon: 'custom',
                    text: '在线客服',
                    link: ''
                },
                {
                    key: 'updatePassword',
                    preIcon: 'safe',
                    text: '修改密码',
                    link: ''
                },
                {
                    key: 'advice',
                    preIcon: 'advice',
                    text: '意见反馈',
                    link: ''
                }
            ]
        }
    },
    methods: {
        goToLogin () {
            this.$router.push({
                name: 'Login'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.header-user {
    height: 180px;
    background-image: url('../../assets/old/bg.png');
    background-size: 100% 100%;
    .row {
        height: 66.5px;
    }
    .app-logo {
        width: 66.5px;
        height: 66.5px;
        background-color: rgba(255, 233, 228, 0.89);
        background-image: url('../../assets/old/app-icon.png');
        background-size: auto 80%;
    }
    .download-app {
        height: 95.5px;
        width: 342px;
        background-image: url('../../assets/old/banner.png');
        background-size: 100% 100%;
        top: 125px;
        left: 16px;
    }
    .user-name {
        .login-text {
            font-size: 21px;
            line-height: 30px;
        }
    }
}

.content {
    height: calc(100% - 180px);
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
}
</style>
