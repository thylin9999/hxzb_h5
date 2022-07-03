<template>
    <div class="seamless-warp m-l-10" >
        <swiper
            v-if="listData.length > 1"
            ref="mySwiper"
            class="item"
            :options="swiperOption"
        >
            <swiper-slide
                v-for="(item,index) in listData"
                :key="index"
                class="swiperslide"
            >
                <div class="listdata h-100" >
                    <img class="w-100 h-100" :src="item.local" alt="">
                </div>
            </swiper-slide>
            <div class="swiper-pagination p-r-5" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
    name: 'SwiperBanner',
    components: {
        swiper,
        swiperSlide
    },
    data () {
        return {
            swiperOption: {
                loop: true,
                autoplay: {
                    delay: 10000,
                    disableOnInteraction: false // 手动滑动后继续自动播放
                },
                pagination: {
                    el: '.swiper-pagination'
                }
            },
            listData: [
                {
                    id: 1,
                    title: 'title1',
                    local: require('../assets/images/banners/1.jpg'),
                    url: 'https://cdn.podapi.com/image/slide/20210930/38c8c91a0ce02be8a5f3727b06013e28.png'
                },
                {
                    id: 2,
                    title: 'title2',
                    local: require('../assets/images/banners/2.jpg'),
                    url: 'https://cdn.podapi.com/image/slide/20210930/7660e33b2a333d9d6f3374f05616f8cc.png'
                }
            ]
        }
    }
}

</script>

<style lang="scss" scoped>
.seamless-warp{
    width: 355px!important;
    border-radius: 5px;
    overflow: hidden;
}
.swiperslide{
    width: 100% !important;
    height: 150px;
}

::v-deep {
    .swiper-pagination-bullet {
        width: 30px;
        height: 3px;
        display: inline-block;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 0;
        margin: 0!important;
    }
    .swiper-pagination-bullet-active {
        background-color: #fff;
    }
}
</style>
