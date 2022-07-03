import { getUserInfo, login, register, logout } from '../../api/user'
import { setToken, removeToken, setItem, removeSessionStorageItem } from '../../utils/cookie'
import { statusCode } from '@/utils/statusCode'
const state = {
    age: null,
    account: '',
    avatar: null,
    birth: null,
    level: 1,
    member_id: null,
    nickname: '',
    sign: null,
    token: null // token
}

const actions = {
    async getUserInfo ({ state, dispatch, commit, getters }) {
        try {
            const { data } = await getUserInfo()
            commit('SET', data)
            return true
        } catch (error) {
            console.log(error, 'error')
            return false
        }
    },
    async login ({ state, dispatch, commit }, payload) {
        try {
            const { code, data, msg, token } = await login(payload)
            if (code === statusCode.success) {
                setToken(token)
                const params = {
                    ...data, token
                }
                setItem('userInfo', JSON.stringify(params))
                commit('SET', params)
                return {
                    code
                }
            } else {
                return { code, msg, data: null }
            }
        } catch (error) {
            console.error(error, 'error')
        }
    },
    async register ({ state, dispatch, commit }, payload) {
        try {
            const { code, msg, data } = await register(payload)
            return { code, msg, data }
        } catch (error) {
            console.error(error, 'error')
        }
    },
    async logoutAction ({ state, dispatch, commit }) {
        // 菜单等 路由信息也应该删除。。。
        // 去除token
        try {
            await logout()
        } catch (e) {
            console.log('出错了')
        } finally {
            removeToken()
            removeSessionStorageItem('userInfo')
            // 删除用户信息
            commit('SET', { token: null, nickname: null, age: null })
        }
    }
}

const mutations = {
    SET (state, payload) {
        Object.entries(payload).forEach(item => {
            const key = item[0]
            const value = item[1]
            state[key] = value
        })
    }
}

const getters = {
    isLogin (state) {
        return !!state.token
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
