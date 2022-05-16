<template>
  <div id="app" class="p-relative">
        <router-view/>
      <Footer v-if="!hideFooter"/>
  </div>
</template>
<script >
import Footer from '@/views/Layout/Footer'
export default {
    name: 'App',
    components: {
        Footer
    },
    computed: {
        hideFooter () {
            return this.$route.meta ? !!this.$route.meta.hideFooter : false
        }
    }
}
</script>
<style lang="scss" scoped>
#app {
    height: 100%;
}
</style>
