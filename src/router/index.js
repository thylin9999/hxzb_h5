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
                component: () => import(/* webpcakChunkName: "My" */ '../views/User/Login.vue'),
                meta: {
                    hideFooter: true
                }
            },
            {
                path: '/user/register',
                name: 'Register',
                component: () => import(/* webpcakChunkName: "My" */ '../views/User/Register.vue'),
                meta: {
                    hideFooter: true
                }
            }
        ]
    },
    {
        path: '/recommend',
        name: 'Recommend',
        component: () => import(/* webpcakChunkName: "Recommend" */ '../views/Competition/Recommend.vue'),
        meta: {
            name: 'Recommend'
        }
    },
    {
        path: '/competition',
        name: 'Competition',
        component: () => import(/* webpcakChunkName: "Recommend" */ '../views/Competition/Competition.vue'),
        meta: {
            name: 'Competition'
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
