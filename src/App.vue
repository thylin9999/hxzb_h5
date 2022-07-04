<template>
  <div id="app" class="p-relative">
        <router-view/>
      <Footer v-if="!hideFooter"/>
  </div>
</template>
<script >
import Footer from '@/views/Layout/Footer'
import { mapState, mapActions, mapMutations } from 'vuex'
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
        const token = getItem('token')
        if (token) {
            this.getUserInfo()
        }
    },
    methods: {
        ...mapActions('user', ['getUserInfo']),
        ...mapMutations('user', ['SET'])
    }
}
</script>
<style lang="scss" scoped>
#app {
    height: 100%;
}
</style>
