<template>
<div class="footer p-fixed w-100 ">
    <ul class="flex align-center h-100 ">
        <li
            v-for="menu in menus"
            :key="menu.key"
            class="flex flex-column flex-1  align-center p-relative bar-item"
            @click="goToPage(menu)"
            :class="{'app-logo-bar bg-no-repeat ': menu.key === 'Download', 'is-active': activeId === menu.id }"
        >
            <template v-if="menu.key !== 'Download'">
                <svg-icon
                    :icon-class="activeId === menu.id ? menu.icon + '_sel' : menu.icon"
                />
                <span class="bar-title font-12 font-regular">{{ menu.name }}</span>
            </template>
            <span v-else class='app-logo w-100 h-100 bg-center bg-no-repeat  p-absolute d-inline-block h-100'></span>
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
                    name: 'App',
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
    height: 50px;
    .app-logo-bar{
        height: 50px;
        .app-logo {
            width: 50px;
            height: 58px;
            top: -10px;
            background-image: url('../../assets/images/common/download-app.png');
            background-repeat: no-repeat;
            background-position: center 0;
            background-size: 100% 100%;
        }
    }
    .bar-item {
        .bar-title {
            color: #A2B0CA;
        }
        &.is-active {
            .bar-title {
                color: #434B5D;
            }
        }
    }

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
