<template>
<div class="h-100 overflow-y-auto">
    <div class="host-header flex justify-between font-regular align-center p-l-10 p-r-10">
        <div class="user-info flex align-center">
            <div class="user-icon bg-center bg-no-repeat"></div>
            <div class="user-name font-13  m-l-10">
                <span>矮脚虎</span>
                <div class="collect-info">
                    <svg-icon class="icon-13" icon-class="fire"></svg-icon>
                    <span class="font-14">14131212</span>
                </div>
            </div>
        </div>
        <div class="subscribe">
            <span class="font-12 text-color d-inline-block text-center">订阅</span>
        </div>
    </div>
    <div class="recommend m-t-20">
        <div class="list-header flex justify-between align-center p-b-15 p-l-10 p-r-10">
            <div class="hot-recommend flex align-center">
                <svg-icon class="icon-17" icon-class="media"></svg-icon>
                <span class="download-button p-l-5 font-medium font-500">{{ $t('Home.recommendBroadcast')}}</span>
            </div>
            <div class="font-12 light-text-color font-regular view-more">
                <span @click="viewMore">换一批</span>
                <van-icon name="arrow" color="#8D8D8D"></van-icon>
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
import Competitions from '@/views/Competition/Components/Competitions'
import { Icon } from 'vant'
export default {
    name: 'Host',
    components: {
        Competitions,
        [Icon.name]: Icon
    },
    data () {
        return {
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
            console.log('viewMore')
        }
    }
}
</script>

<style lang="scss" scoped>
.user-icon {
    width: 45px;
    height: 45px;
    background-image: url('../../../assets/images/my/logo.png');
    background-size: 100% 100%;
}
.collect-info{
    line-height: 20px;
}
.subscribe {
    background-color: #ff5116;
    border-radius: 10px;
    line-height: 20px;
    span {
        width: 50px;
    }
}
::v-deep {
    .collect-info {
        .svg-icon {
            width: 13px;
            height: 13px;
        }
    }
}
</style>
