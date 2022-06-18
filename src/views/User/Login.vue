<template>
    <div class="w-100 h-100 login-box bg-center bg-no-repeat p-relative text-color">
        <span class="p-absolute close-button">
            <svg-icon @click.native="goBack" icon-class="safe"></svg-icon>
        </span>
        <div class="logo-box bg-center bg-no-repeat p-absolute"></div>
        <div class="login-section w-100 h-100">
            <div class="form-field font-regular">
                <van-form class="m-t-10"  @submit="onSubmit">
                    <!-- 通过 pattern 进行正则校验 -->
                    <input-with-icon class="m-b-10">
                        <span slot="icon" class="flex align-center">
                            <svg-icon icon-class="phone"></svg-icon>
                            <span class="m-l-10 font-13">+86</span>
                        </span>
                        <van-field
                            class="m-l-10 text-color"
                            v-model="form.account.value"
                            placeholder="请输入账号"
                        />
                    </input-with-icon>
                    <input-with-icon v-if="showCode" class="m-b-10">
                        <svg-icon icon-class="safe" slot="icon"></svg-icon>
                        <van-field
                            class="m-l-10"
                            v-model="form.code.value"
                            name="验证码"
                            placeholder="请输入验证码"
                        />
                        <template slot="suffix">
                            <span class="font-13 font-regular">获取验证码</span>
                        </template>
                    </input-with-icon>
                    <input-with-icon class="m-b-10">
                        <svg-icon icon-class="password" slot="icon"></svg-icon>
                        <van-field
                            class="m-l-10"
                            v-model="form.password.value"
                            name="密码"
                            placeholder="请输入密码"
                        />
                    </input-with-icon>
                    <div class="m-t-15 submit-button">
                        <van-button
                            class="font-16"
                            block type="default" round
                            native-type="submit">{{ isRegister ? '立即注册' : '立即登录'}}</van-button>
                    </div>
                    <div class="footer-text m-t-30 font-13 font-regular flex justify-between">
                        <span @click="registerOrLogin">{{ isRegister ? '立即登录' : '立即注册'}}</span>
                        <span :class="{'visibility-hidden': isRegister}" @click="forgetPassword">忘记密码</span>
                    </div>
                </van-form>
            </div>
        </div>
        <van-loading type="spinner" v-if="showLoading"/>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Form, Field, Button, Icon, Loading, Toast } from 'vant'
import InputWithIcon from '@/views/User/Components/InputWithIcon'
import { phone, isRequire } from '@/utils/validator'
import { codeMap, statusCode } from '@/utils/statusCode'

export default {
    name: 'Login',
    components: {
        [Icon.name]: Icon,
        [Form.name]: Form,
        [Field.name]: Field,
        [Button.name]: Button,
        [Loading.name]: Loading,
        [Toast.name]: Toast,
        InputWithIcon
    },
    data () {
        return {
            form: {
                account: {
                    value: '',
                    validator: [isRequire('账号'), phone]
                },
                code: {
                    value: '',
                    validator: [isRequire('验证码')]
                },
                password: {
                    value: '',
                    validator: [isRequire('密码')]
                }
            },
            errorInfo: [],
            isRegister: false,
            showCode: false,
            showLoading: false
        }
    },
    methods: {
        ...mapActions('user', ['login', 'register']),
        async submit () {
            const request = this.isRegister ? this.register : this.login
            const res = await request({
                account: this.form.account.value,
                password: this.form.password.value
            })
            console.log(res, 'res')
            if (res.code === statusCode.success) {
                // 登录or注册成功
                if (this.isRegister) {
                    Toast(codeMap.registerSuccess)
                    const account = this.form.account.value
                    this.registerOrLogin()
                    this.form.account.value = account
                } else {
                    this.$router.push({ path: '/' })
                }
            } else {
                // 失败
                Toast(res.msg)
                if (res.msg.includes('密码')) {
                    this.form.password.value = ''
                } else if (res.msg.includes('账号')) {
                    this.initForm()
                }
            }
        },
        onSubmit () {
            this.validateForm()
            if (!this.errorInfo.length) {
                this.submit()
            } else {
                // 给出提示
                Toast(this.errorInfo[0])
                this.errorInfo = []
            }
        },
        forgetPassword () {
            console.log('忘记密码')
        },
        validateForm () {
            // 分别校验 三个值
            Object.keys(this.form).forEach(key => {
                if (!this.showCode && key === 'code') {

                } else {
                    this.validateRow(key)
                }
            })
        },
        validateRow (key) {
            this.form[key].validator.forEach(validator => {
                const { message } = validator(this.form[key].value)
                if (message) {
                    this.errorInfo.push(message)
                }
            })
        },
        registerOrLogin () {
            this.isRegister = !this.isRegister
            // this.showCode = !!this.isRegister
            this.initForm()
        },
        initForm () {
            this.errorInfo = []
            Object.keys(this.form).forEach(key => {
                this.form[key].value = ''
            })
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
    width: 170px;
    height: 55px;
    background-image: url('../../assets/images/login/logo.png');
    background-size: 100% 100%;
    left: 103px;
    top: 75px;
}
.login-section{
    padding-top: 215px;
    padding-left: 60px;
    padding-right: 60px;
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
    .van-form {
        .van-field {
            background-color: transparent;
            padding: 18px 0;
        }
        .van-field__control{
            color: #fff;
        }
        .van-field__error-message{
            position: absolute;
            left: 0;
            top: 100%;
        }
    }
    .submit-button{
        .van-button--normal{
            line-height: 60px;
            height: 60px;
            font-family: PingFang-SC-Medium;
            font-weight: 400;
            color: #4859DE;
        }
    }

}
</style>
