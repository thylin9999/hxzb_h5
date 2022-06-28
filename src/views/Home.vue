<template>
  <div class="home h-100">
    <div class="home-header bg-center bg-no-repeat p-t-10">
        <Header />
        <HeaderTab class="m-b-5" :tab-id="tabId"/>
        <div class="swiper w-100">
            <swiper-banner />
        </div>
    </div>
      <booked-matches />
    <div class="list m-t-15">
        <div class="list-header flex justify-between align-center p-b-15 p-l-10 p-r-10">
            <div class="hot-recommend flex align-center">
                <span class="tv-icon bg-center bg-size-100 bg-no-repeat"></span>
                <span class="download-button p-l-5 font-medium font-500">{{ $t('Home.recommendBroadcast')}}</span>
            </div>
            <div class="font-12 light-text-color font-regular view-more">
                <span @click="viewMore">查看更多</span>
                <van-icon name="arrow" color="#8D8D8D"></van-icon>
            </div>
        </div>
        <div class="list-section p-l-5 p-r-5">
            <Competitions
                :params="apiParams"
                :key="updateKey"
            />
        </div>
        <div class="copyright ">
            <div class="first-line font-12 font-regular text-center">
                软件名称：<span>{{ appInfo.name }}</span> <span>|</span>
                开发者: {{ appInfo.developer }} <span>|</span>
                版本：{{ appInfo.version }} <span>|</span> <br/> 更新时间: <span>{{ appInfo.updateTime }}</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import SwiperBanner from '@/components/SwiperBanner'
import { Icon } from 'vant'
import Competitions from '@/views/Competition/Components/Competitions'
import BookedMatches from '@/components/BookedMatches'
import Header from '@/views/Layout/Header'
import HeaderTab from '@/components/HeaderTab'
import dayjs from 'dayjs'
export default {
    name: 'Home',
    components: {
        SwiperBanner,
        Competitions,
        Header,
        BookedMatches,
        HeaderTab,
        [Icon.name]: Icon
    },
    data () {
        return {
            banner: 'https://cdn.podapi.com/image/slide/20210930/aa47247b900012c9e5236744adfa087b.png',
            updateKey: +new Date().getTime(),
            appInfo: {
                name: '海豹直播app',
                developer: '成都五五柒柒科技有限公司',
                version: 'v.1.0',
                updateTime: dayjs().format('YYYY-MM-DD')
            },
            tabId: 1 // 首页tab
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
.home-header {
    background-image: url('../assets/images/home-bg.png');
    background-size: 100% 100%;
}
.swiper {
    height: 150px;
}
.divider{
    background-color: rgb(247,247,247);
}
.list-section {
    min-height: 200px;
}
.list-header {
    font-size: 15px;
    .hot-recommend {
        line-height: 22px;
        height: 22px;
        .tv-icon {
            width: 17px;
            height: 17px;
            background-image: url('../assets/images/icons/tv.png');
        }
        .match-icon {
            width: 17px;
            height: 17px;
            background-image: url('../assets/images/icons/match.png');
        }
    }
}
.first-line {
    padding: 10px 20px;
    line-height: 20px;
}
::v-deep {
    .view-more {
        .icon {
            width: 16px;
            height: 16px;
            background-size: 8px 16px;
            fill: $light-text-color;
        }
    }

}
</style>
