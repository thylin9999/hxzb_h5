import { getUserInfo, login, register } from '../../api/user'
import { setToken, removeToken } from '../../utils/cookie'
import { statusCode } from '../../utils/statusCode'
const state = {
    age: null,
    userName: null,
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
            console.log(data, 'data')
            if (data.code === statusCode.success) {
                setToken(data.data)
                commit('SET', { token: data.data })
                console.log(state, 'asdf')
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
            if (data.code === statusCode.success) {
                setToken(data.data)
                commit('SET', { token: data.data })
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
        // 删除用户信息
        commit('SET', { token: null, userName: null, age: null })
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

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}
