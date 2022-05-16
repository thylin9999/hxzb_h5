<template>
  <div class="home h-100">
    <div class="swiper w-100">
        <swiper-banner />
    </div>
    <div class="p-t-10 p-b-10 divider"></div>
    <div class="list m-t-10">
        <div class="list-header flex justify-between align-center p-b-10">
            <div class="hot-recommend flex align-center">
                <hot-icon class="h-100 d-inline-block"/>
                <span class="download-button p-l-5">{{ $t('Home.recommendBroadcast')}}</span>
            </div>
            <div class="font-12 light-text-color view-more">
                <span @click="viewMore">查看更多</span>
                <svg-icon icon-class="rightArrow"></svg-icon>
            </div>
        </div>
        <div class="list-section p-l-5 p-r-5">
            <ul class="flex flex-wrap">
                <li
                    v-for="competition in competitions"
                    :key="competition.id"
                    class="w-50 p-r-5 p-l-5 p-b-10"
                >
                    <div class="competition-preview w-100"
                        :style="{
                            backgroundImage: `url(${competition.img})`
                        }"
                    >
                    </div>
                    <div class="competition-name flex justify-between align-center">
                        <span>{{ competition.team1.name }}</span>
                        <span>VS</span>
                        <span>{{ competition.team2.name }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { getLiveList } from '@/api/competition'
import { statusCode } from '@/utils/statusCode'
import SwiperBanner from '@/components/SwiperBanner'
import HotIcon from '@/components/HotIcon'
export default {
    name: 'Home',
    components: {
        SwiperBanner,
        HotIcon
    },
    data () {
        return {
            banner: 'https://cdn.podapi.com/image/slide/20210930/aa47247b900012c9e5236744adfa087b.png',
            competitions: [
                {
                    team1: {
                        name: '球队1',
                        id: 1
                    },
                    team2: {
                        name: '球队2',
                        id: 2
                    },
                    user: {
                        name: '主播1',
                        viewers: {
                            count: 10101010
                        }
                    }
                }
            ]
        }
    },
    created () {
        this.init()
    },
    methods: {
        async init () {
            try {
                const { data } = await getLiveList()
                console.log(data, 'data')
                if (data.code === statusCode.success) {
                    this.competitions = data.data
                }
            } catch (e) {
                console.log(e, '出错了')
            }
        },
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
    height: 133px;
}
.divider{
    background-color: rgb(247,247,247);
}
.list-section {
    .competition-preview {
        height: 110px;
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-position: center;
    }
}
.list-header {
    font-size: 15px;
    .hot-recommend {
        line-height: 21.5px;
        height: 21.5px;
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
