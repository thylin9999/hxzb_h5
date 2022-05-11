import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/views/Layout/BasicLayout'
import EmptyRouterView from '@/views/Layout/EmptyRouterView'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: BasicLayout,
        redirect: '/home',
        children: [
            {
                path: '/home',
                name: 'Home',
                component: () => import(/* webpcakChunkName: "Home" */ '../views/Home.vue')
            }
        ]
    },
    {
        path: '/user',
        name: 'User',
        redirect: '/user/my',
        component: EmptyRouterView,
        children: [
            {
                path: '/user/my',
                name: 'My',
                component: () => import(/* webpcakChunkName: "My" */ '../views/User/My.vue')
            },
            {
                path: '/user/login',
                name: 'Login',
                component: () => import(/* webpcakChunkName: "My" */ '../views/User/Login.vue')
            },
            {
                path: '/user/register',
                name: 'Register',
                component: () => import(/* webpcakChunkName: "My" */ '../views/User/Register.vue')
            }
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
