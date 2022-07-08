<template>
<div class="footer p-fixed w-100 p-t-10">
    <ul class="flex align-center h-100 m-b-5">
        <li
            v-for="menu in menus"
            :key="menu.key"
            class="flex flex-column flex-1 align-center p-relative bar-item"
            @click="goToPage(menu)"
            :class="{'app-logo-bar bg-no-repeat ': menu.key === 'Download'}"
        >
            <template v-if="menu.key !== 'Download'">
                <svg-icon

                    :icon-class="activeId === menu.id ? menu.icon + '_sel' : menu.icon"
                />
                <span class="m-t-5 font-16 font-regular">{{ menu.name }}</span>
            </template>
            <span class='app-logo w-100 h-100 bg-center bg-no-repeat bg-size-100 p-absolute d-inline-block h-100'></span>
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
                {
                    id: 3,
                    name: 'APP',
                    key: 'Download',
                    icon: 'Download'
                },
                {
                    id: 4,
                    name: '我的',
                    key: 'My',
                    icon: 'person'
                }
            ],
            activeId: 1
        }
    },
    watch: {
        $route: {
            handler () {
                const icon = this.$route.meta.icon
                if (icon) {
                    console.log(this.menus.find(x => x.icon === icon), this.menus, icon)
                    this.activeId = this.menus.find(x => x.icon === icon).id
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        goToPage (menu) {
            this.activeId = menu.id
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

    .app-logo-bar{
        height: 50px;
        .app-logo {
            width: 50px;
            height: 50px;
            background-image: url('../../assets/images/common/match-logo.png');
            background-repeat: no-repeat;
            background-position: center 0;
            border-radius: 50%;
        }
    }

}
::v-deep {
    .bar-item {
        height: 50px;
        .icon {
            width: 22px;
            height: 20px;
        }
    }

}
</style>
