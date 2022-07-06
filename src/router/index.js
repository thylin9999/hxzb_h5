import Vue from 'vue'
import VueRouter from 'vue-router'
import BasicLayout from '@/views/Layout/BasicLayout'
import EmptyRouterView from '@/views/Layout/EmptyRouterView'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}

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
                component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
                meta: {
                    icon: 'home'
                }
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
                component: () => import(/* webpackChunkName: "My" */ '../views/User/My.vue'),
                meta: {
                    icon: 'person'
                }
            },
            {
                path: '/user/login',
                name: 'Login',
                component: () => import(/* webpackChunkName: "My" */ '../views/User/Login.vue'),
                meta: {
                    hideFooter: true
                }
            },
            {
                path: '/user/register',
                name: 'Register',
                component: () => import(/* webpackChunkName: "My" */ '../views/User/Register.vue'),
                meta: {
                    hideFooter: true
                }
            },
            {
                path: '/user/update-password',
                name: 'UpdatePassword',
                component: () => import(/* webpackChunkName: "My" */ '../views/User/UpdatePassword.vue'),
                meta: {
                    hideFooter: true
                }
            },
            {
                path: '/user/subscribe-host',
                name: 'SubscribeHost',
                component: () => import(/* webpackChunkName: "My" */ '../views/User/SubscribeHost.vue'),
                meta: {
                    hideFooter: true
                }
            },
            {
                path: '/user/book-list',
                name: 'BookList',
                component: () => import(/* webpackChunkName: "My" */ '../views/User/BookedMatches.vue'),
                meta: {
                    hideFooter: true
                }
            },
            {
                path: '/user/feedback',
                name: 'Feedback',
                component: () => import(/* webpackChunkName: "My" */ '../views/User/Feedback.vue'),
                meta: {
                    hideFooter: true
                }
            }
        ]
    },
    {
        path: '/recommend',
        name: 'Recommend',
        component: () => import(/* webpackChunkName: "Recommend" */ '../views/Competition/Recommend.vue'),
        meta: {
            name: 'Recommend',
            icon: 'competition'
        }
    },
    {
        path: '/competition',
        name: 'Competition',
        component: () => import(/* webpackChunkName: "Recommend" */ '../views/Competition/Competition.vue'),
        meta: {
            name: 'Competition',
            icon: 'competition'
        }
    },
    {
        path: '/broadcast/:id',
        name: 'Broadcast',
        component: () => import(/* webpackChunkName: "Broadcast" */ '../views/Broadcast/Index.vue'),
        props: true,
        meta: {
            hideFooter: true,
            icon: 'competition'
        }
    }
]

const router = new VueRouter({
    routes
})

export default router
