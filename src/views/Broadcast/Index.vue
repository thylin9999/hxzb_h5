<template>
<div class="broadcast">
    <van-nav-bar
        title="直播详情"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="view-video">
        <video-display />
    </div>
    <div class="chat-host-live-broadcast">
        <van-tabs
            v-model="currentTab"
            title-active-color="#333"
            title-inactive-color="#333"
        >
            <van-tab
                v-for="tab in tabs"
                :key="tab.id"
                :name="tab.id"
                :title="tab.text"></van-tab>
        </van-tabs>
    </div>
</div>
</template>

<script>
import { Tab, Tabs, NavBar } from 'vant'
import VideoDisplay from '@/components/VideoDisplay'
export default {
    name: 'Index',
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        VideoDisplay
    },
    data () {
        return {
            tabs: [
                {
                    id: 1,
                    text: '聊天'
                },
                {
                    id: 2,
                    text: '联系主播'
                },
                {
                    id: 3,
                    text: '直播'
                }
            ],
            currentTab: 2
        }
    },
    methods: {
        onClickLeft () {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep {
    .chat-host-live-broadcast {
        .van-tabs__line {
            width: calc(100% / 3);
        }
    }

}
</style>
