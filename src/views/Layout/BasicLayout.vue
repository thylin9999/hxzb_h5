<template>
    <div class="h-100 basic-layout flex flex-column">
        <div class="flex-1 content " >
            <router-view class="flex-1 overflow-y-auto"></router-view>
        </div>
    </div>
</template>
<script>
// import LeftMenu from './LeftMenu.vue'
// import Breadcrumb from './Breadcrumb.vue'
// import Header from './Header.vue'
import { mapState } from 'vuex'
export default {
    name: 'BasicLayout',
    components: {
        // Header
    },
    computed: {
        ...mapState('user', ['token', 'userName'])
    },
    mounted () {
    }
}
</script>
<style lang="scss" scoped>
.content {
    padding-bottom: 50px;
    //width: calc(100% + 16px);
}
</style>
