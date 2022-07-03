<template>
<div class="bg-gray">
    <van-nav-bar
        title="重置密码"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-form class="m-t-10">
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
            v-model="form.oldPassword.value"
            name="旧密码"
            label="旧密码"
            type="password"
            placeholder="请输入旧密码"
        />
        <van-field
            v-model="form.newPassword.value"
            name="新密码"
            label="新密码"
            type="password"
            placeholder="请输入新密码"
        />
        <van-field
            v-model="form.confirmPassword.value"
            name="确认密码"
            label="确认密码"
            type="password"
            placeholder="请确认新密码"
        />
        <div class="m-t-30 p-l-20 p-r-20">
            <van-button class="font-16 submit-button" block type="info" @click="beforeSubmit">确定</van-button>
        </div>
    </van-form>
</div>
</template>

<script>
import { NavBar, Form, Field, Button, Toast } from 'vant'
import { updatePassword } from '@/api/user'
import { isRequire } from '@/utils/validator'
import { statusCode } from '@/utils/statusCode'
export default {
    name: 'UpdatePassword',
    components: {
        [NavBar.name]: NavBar,
        [Form.name]: Form,
        [Field.name]: Field,
        [Button.name]: Button
    },
    data () {
        return {
            form: {
                oldPassword: {
                    value: '',
                    validator: [isRequire('旧密码')]
                },
                newPassword: {
                    value: '',
                    validator: [isRequire('新密码')]
                },
                confirmPassword: {
                    value: '',
                    validator: [isRequire('确认密码')]
                }
            },
            errorInfo: [],
            pattern: /\d{6}/
        }
    },
    methods: {
        onClickLeft () {
            console.log('返回')
            this.$router.go(-1)
        },
        beforeSubmit (errorInfo) {
            this.validateForm()
            const isOk = this.giveTips()
            if (isOk) {
                this.submit()
            }
        },
        async submit () {
            Toast.loading({
                duration: 0,
                forbidClick: true
            })
            try {
                const { code, msg } = await updatePassword({
                    password: this.form.newPassword.value,
                    verPassword: this.form.confirmPassword.value,
                    oldPassword: this.form.oldPassword.value
                })
                Toast.clear()
                if (code === statusCode.success) {
                    // 去登录页吗？
                    this.$router.push({
                        name: 'Login'
                    })
                } else {
                    Toast(msg)
                }
                console.log(code, 'code')
            } catch (e) {
                console.log('出错了')
                Toast.clear()
            }
        },
        giveTips () {
            let flag = false
            if (!this.errorInfo.length) {
                flag = true
            } else {
                // 给出提示
                Toast(this.errorInfo[0])
                this.errorInfo = []
                flag = false
            }
            return flag
        },
        validateForm () {
            // 分别校验 三个值
            const res = []
            Object.keys(this.form).forEach(key => {
                res.push(this.validateRow(key))
            })
            return res.every(x => x)
        },
        validateRow (key) {
            let flag = true
            this.form[key].validator.forEach(validator => {
                const { message } = validator(this.form[key].value)
                if (message) {
                    this.errorInfo.push(message)
                    flag = false
                }
            })
            return flag
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
::v-deep {
    .van-form {
        .van-field__label {
            line-height: 40px;
            font-family: PingFang-SC-Regular;
            color: #333;
        }
        .van-field__value{
            .van-field__body {
                line-height: 40px;
            }
        }
    }
    .van-button {
        border-radius: 8px;
        background-color: $active-color;
    }
}
</style>
