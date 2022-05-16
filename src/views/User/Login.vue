<template>
    <div class="w-100 h-100 login-box bg-center bg-no-repeat p-relative text-color">
        <span class="p-absolute close-button">
            <svg-icon @click.native="goBack" icon-class="close1"></svg-icon>
        </span>
        <div class="logo-box bg-center bg-no-repeat p-absolute"></div>
        <div class="login-section">
            <div class="header-title flex flex-column">
                <span class="login-text">登录</span>
                <span class="access">注册登录即代表你已同意 <span class="link">《用户协议》</span></span>
            </div>
            <div class="form-field">

            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name: 'Login',
    methods: {
        ...mapActions('user', ['login']),
        async submit () {
            const { status } = await this.login()
            if (status === 200) {
                // 登录成功
                this.$router.push({ path: '/' })
            }
        },
        goBack () {
            this.$router.push({
                name: 'My'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.login-box {
    background-image: url('../../assets/images/login/bg.png');
    background-size: 100% 100%;
}
.close-button {
    left: 25px;
    top: 25px;
}
.logo-box {
    width: 135px;
    height: 85px;
    background-image: url('../../assets/images/login/logo.png');
    background-size: 100% 100%;
    left: 120px;
    top: 48px;
}
.login-section{
    padding-top: 165px;
    padding-left: 35px;
    padding-right: 35px;
    .login-text {
        font-size: 28px;
        line-height: 40px;
    }
    .access {
        font-size: 13px;
        .link {
            color: #ECBE49;
        }
    }
}
::v-deep {
    .close-button {
        .svg-icon {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
