import axios from 'axios'
import { statusCode } from '@/utils/statusCode'
import { getToken, removeSessionStorageItem, removeToken } from '@/utils/cookie'
import { Toast } from 'vant'
import Router from '../router/index'
import Store from '../store/index'
import url from './user/url'
const instance = axios.create({
    timeout: 6000,
    // eslint-disable-next-line no-undef
    baseURL: _requestApiUrl
    // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : '/'
})

const errorHandle = (error) => {
    console.log(error, '出错了')
    return Promise.reject(error)
}

instance.interceptors.request.use(config => {
    // 请求拦截器
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, errorHandle)

let isAuthorization = true // 是否退出了
instance.interceptors.response.use(response => {
    const requestUrl = response.config.url
    const whiteList = [
        url.login,
        url.register
    ]
    if (response && response.data.code === statusCode.authorizationFail) {
        // 登录失效
        // 清楚token等
        removeToken()
        removeSessionStorageItem('userInfo')
        Store.commit('user/SET', { token: null, nickname: null, age: null })
        Toast(response.data.msg)
        if (isAuthorization) {
            isAuthorization = false
            // window.location.reload()
            Router.push({
                name: 'My'
            })
            setTimeout(() => {
                isAuthorization = true
            }, 3000)
        }
    }
    // 响应拦截器
    if (response && response.data.code === statusCode.success && !whiteList.includes(requestUrl)) {
        return response.data
    } else {
        return response.data
    }
}, errorHandle)

export default instance
