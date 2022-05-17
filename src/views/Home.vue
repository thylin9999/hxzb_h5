<template>
  <div class="home h-100">
    <div class="swiper w-100">
        <swiper-banner />
    </div>
    <div class="list m-t-15">
        <div class="list-header flex justify-between align-center p-b-15 p-l-10 p-r-10">
            <div class="hot-recommend flex align-center">
                <hot-icon class="h-100 d-inline-block"/>
                <span class="download-button p-l-5 font-medium font-500">{{ $t('Home.recommendBroadcast')}}</span>
            </div>
            <div class="font-12 light-text-color font-regular view-more">
                <span @click="viewMore">查看更多</span>
                <svg-icon icon-class="rightArrow"></svg-icon>
            </div>
        </div>
        <div class="list-section p-l-5 p-r-5">
            <Competitions
                :params="apiParams"
                :key="updateKey"
            />
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SwiperBanner from '@/components/SwiperBanner'
import HotIcon from '@/components/HotIcon'
import Competitions from '@/views/Competition/Components/Competitions'
export default {
    name: 'Home',
    components: {
        SwiperBanner,
        HotIcon,
        Competitions
    },
    data () {
        return {
            banner: 'https://cdn.podapi.com/image/slide/20210930/aa47247b900012c9e5236744adfa087b.png',
            updateKey: +new Date().getTime()
        }
    },
    computed: {
        apiParams () {
            return {
                sportId: this.sportTabId,
                subId: this.subTabId
            }
        }
    },
    methods: {
        viewMore () {
            this.$router.push({
                name: 'Recommend'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.swiper {
    height: 150px;
}
.divider{
    background-color: rgb(247,247,247);
}
.list-section {

}
.list-header {
    font-size: 15px;
    .hot-recommend {
        line-height: 22px;
        height: 22px;
        .hot-icon {
            width: 17px;
        }
    }
}

::v-deep {
    .view-more {
        .svg-icon {
            width: 16px;
            height: 16px;
            fill: $light-text-color;
        }
    }

}
</style>
