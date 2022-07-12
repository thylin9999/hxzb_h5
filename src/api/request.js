import axios from 'axios'
import { statusCode } from '@/utils/statusCode'
import { getToken } from '@/utils/cookie'
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

instance.interceptors.response.use(response => {
    const requestUrl = response.config.url
    const whiteList = [
        url.login,
        url.register
    ]
    // 响应拦截器
    if (response && response.data.code === statusCode.success && !whiteList.includes(requestUrl)) {
        return response.data
    } else {
        return response.data
    }
}, errorHandle)

export default instance
