import { getUserInfo, login, register } from '../../api/user'
import { setToken, removeToken, setItem, removeSessionStorageItem } from '../../utils/cookie'
import { statusCode } from '../../utils/statusCode'
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
            commit('SET', data.data)
            return true
        } catch (error) {
            console.log(error, 'error')
            return false
        }
    },
    async login ({ state, dispatch, commit }, payload) {
        try {
            const { data } = await login(payload)
            if (data.code === statusCode.success) {
                setToken(data.token)
                const params = {
                    ...data.data, token: data.token
                }
                setItem('userInfo', JSON.stringify(params))
                commit('SET', params)
                return {
                    code: data.code
                }
            } else {
                return data
            }
        } catch (error) {
            console.error(error, 'error')
        }
    },
    async register ({ state, dispatch, commit }, payload) {
        try {
            const { data } = await register(payload)
            console.log(data, 'data')
            if (data.code === statusCode.success) {
                return {
                    code: data.code
                }
            } else {
                return data
            }
        } catch (error) {
            console.error(error, 'error')
        }
    },
    logoutAction ({ state, dispatch, commit }) {
        // 菜单等 路由信息也应该删除。。。
        // 去除token
        removeToken()
        removeSessionStorageItem('userInfo')
        // 删除用户信息
        commit('SET', { token: null, nickname: null, age: null })
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
