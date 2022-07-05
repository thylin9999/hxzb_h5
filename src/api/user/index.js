import request from '../request'
import url from './url'
export function getUserInfo (id) {
    return request({
        method: 'get',
        url: url.userInfo,
        params: {
            id
        }
    })
}

export function login ({ account = 'admin', code = 666666, password = '000000' }) {
    return request({
        method: 'POST',
        url: url.login,
        data: {
            account,
            mobile_code: code,
            password
        }
    })
}
export function logout () {
    return request({
        method: 'post',
        url: url.logout
    })
}
export function register ({ account = 'admin', code = 666666, password = '000000' }) {
    return request({
        method: 'POST',
        url: url.register,
        data: {
            account,
            mobile_code: code,
            password
        }
    })
}
// 找回密码
export function findBackPwd ({ account = 'admin', code = 666666, password = '000000' }) {
    return request({
        method: 'post',
        url: url.findBackPwd,
        data: {
            account,
            password,
            mobile_code: code
        }
    })
}

export function getHosts () {
    return request({
        method: 'get',
        url: url.getHosts
    })
}

export function getCode ({ mobile, msType = 1 }) {
    return request({
        method: 'post',
        url: url.getCode,
        data: {
            mobile,
            'msg_type': msType
        }
    })
}

export function updatePassword ({ password, verPassword, oldPassword }) {
    return request({
        method: 'post',
        url: url.updatePassword,
        data: {
            password,
            ver_password: verPassword,
            old_password: oldPassword
        }
    })
}

// 订阅主播
export function getSubscribeHosts () {
    return request({
        method: 'post',
        url: url.getSubscribeHosts
    })
}

export function subscribeHost (anchorId) {
    return request({
        method: 'post',
        url: url.subscribeHost,
        data: {
            anchor_id: anchorId
        }
    })
}
