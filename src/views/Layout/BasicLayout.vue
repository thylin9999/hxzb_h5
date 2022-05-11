<template>
    <div class="h-100 basic-layout flex flex-column">
        <Header />
        <div class="flex-1 content">
            <router-view class="flex-1 overflow-y-auto"></router-view>
        </div>
        <Footer />
    </div>
</template>
<script>
// import LeftMenu from './LeftMenu.vue'
// import Breadcrumb from './Breadcrumb.vue'
import Header from './Header.vue'
import Footer from '@/views/Layout/Footer'
import { mapState } from 'vuex'
export default {
    name: 'BasicLayout',
    components: {
        // LeftMenu,
        Header,
        Footer
    },
    computed: {
        ...mapState('user', ['token', 'userName'])
    }
}
</script>
<style lang="scss" scoped>
.content {
    margin-bottom: 50px;
    overflow-y: auto;
}
</style>
