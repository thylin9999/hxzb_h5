<template>
<div class="footer p-fixed w-100">
    <ul class="flex align-center h-100">
        <li
            v-for="menu in menus"
            :key="menu.key"
            class="flex flex-column flex-1 align-center"
            @click="goToPage(menu)"
        >
            <svg-icon :icon-class="menu.key" />
            <span>{{ menu.name }}</span>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    name: 'Footer',
    data () {
        return {
            menus: [
                {
                    id: 1,
                    name: '首页',
                    key: 'Home'
                },
                {
                    id: 2,
                    name: '赛事',
                    key: 'Competition'
                },
                {
                    id: 3,
                    name: 'APP',
                    key: 'App'
                },
                {
                    id: 4,
                    name: '我的',
                    key: 'My'
                }
            ]
        }
    },
    methods: {
        goToPage (menu) {
            console.log(menu)
            this.$router.push({
                name: menu.key
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.footer{
    border-top: 1px solid rgb(0,0,0);
    height: 50px;
    left: 0;
    bottom: 0;
}
</style>
