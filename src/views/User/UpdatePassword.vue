<template>
<div class="bg-gray">
    <van-nav-bar
        title="重置密码"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-form class="m-t-10" validate-first @failed="onFailed">
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
            v-model="oldPassword"
            name="旧密码"
            label="旧密码"
            placeholder="请输入旧密码"
            :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <van-field
            v-model="newPassword"
            name="新密码"
            label="新密码"
            placeholder="请输入新密码"
            :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <van-field
            v-model="confirmPassword"
            name="确认密码"
            label="确认密码"
            placeholder="请确认新密码"
            :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <div class="m-t-30 p-l-20 p-r-20">
            <van-button class="font-16 submit-button" block type="info" native-type="submit">确定</van-button>
        </div>
    </van-form>
</div>
</template>

<script>
import { NavBar, Form, Field, Button } from 'vant'
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
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            pattern: /\d{6}/
        }
    },
    methods: {
        onClickLeft () {
            console.log('返回')
            this.$router.go(-1)
        },
        onFailed (errorInfo) {
            console.log('failed', errorInfo)
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
