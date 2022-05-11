<template>
<div class="footer p-fixed w-100">
    <ul class="flex align-center h-100">
        <li
            v-for="menu in menus"
            :key="menu.key"
            class="flex flex-column flex-1 align-center"
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
                    key: 'home'
                },
                {
                    id: 2,
                    name: '赛事',
                    key: 'competition'
                },
                {
                    id: 3,
                    name: 'APP',
                    key: 'app'
                },
                {
                    id: 4,
                    name: '我的',
                    key: 'my'
                }
            ]
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
