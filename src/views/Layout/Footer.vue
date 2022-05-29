<template>
<div class="footer p-fixed w-100 p-t-10">
    <ul class="flex align-center h-100">
        <li
            v-for="menu in menus"
            :key="menu.key"
            class="flex flex-column flex-1 align-center bar-item"
            @click="goToPage(menu)"
        >
            <svg-icon :icon-class="menu.icon" />
            <span class="m-t-5 font-16 font-regular">{{ menu.name }}</span>
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
                    key: 'Home',
                    icon: 'home'
                },
                {
                    id: 2,
                    name: '赛事',
                    key: 'Competition',
                    icon: 'competition'
                },
                // {
                //     id: 3,
                //     name: 'APP',
                //     key: 'App'
                // },
                {
                    id: 4,
                    name: '我的',
                    key: 'My',
                    icon: 'my'
                }
            ]
        }
    },
    methods: {
        goToPage (menu) {
            this.$router.push({
                name: menu.key
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.footer{
    left: 0;
    bottom: 0;
    z-index: 999;
    background-color: #fff;
}
::v-deep {
    .bar-item {
        .icon {
            width: 22px;
            height: 20px;
        }
    }

}
</style>
