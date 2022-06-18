<template>
  <div id="app" class="p-relative">
        <router-view/>
      <Footer v-if="!hideFooter"/>
  </div>
</template>
<script >
import Footer from '@/views/Layout/Footer'
import { mapState, mapMutations } from 'vuex'
import { getItem } from '@/utils/cookie'
export default {
    name: 'App',
    components: {
        Footer
    },
    computed: {
        ...mapState('user', ['token']),
        hideFooter () {
            return this.$route.meta ? !!this.$route.meta.hideFooter : false
        }
    },
    created () {
        const userInfo = getItem('userInfo')
        if (userInfo) {
            this.SET(JSON.parse(userInfo))
        }
    },
    methods: {
        ...mapMutations('user', ['SET'])
    }
}
</script>
<style lang="scss" scoped>
#app {
    height: 100%;
}
</style>
