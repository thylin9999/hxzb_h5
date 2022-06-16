<template>
<div class="broadcast h-100" :key="updateKey">
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
    <div class="host-component">
        <component :is="contentComp"></component>
    </div>
</div>
</template>

<script>
import { Tab, Tabs, NavBar } from 'vant'
import VideoDisplay from '@/components/VideoDisplay'
import ChatRoom from '@/views/Broadcast/components/ChatRoom'
import Host from '@/views/Broadcast/components/Host'
export default {
    name: 'Index',
    props: ['id'],
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        VideoDisplay,
        ChatRoom,
        Host
    },
    data () {
        return {
            tabs: [
                {
                    id: 1,
                    text: '聊天',
                    com: 'ChatRoom'
                },
                // {
                //     id: 2,
                //     text: '联系主播'
                // },
                {
                    id: 3,
                    text: '直播',
                    com: 'Host'
                }
            ],
            currentTab: 1,
            updateKey: +new Date().getTime()
            // contentComp: 'ChatRoom'
        }
    },
    computed: {
        contentComp () {
            return this.tabs.find(x => x.id === this.currentTab).com
        }
    },
    watch: {
        id () {
            if (this.id) {
                // 重新加载页面
                this.updateKey = +new Date().getTime()
            }
        }
    },
    methods: {
        onClickLeft () {
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.host-component{
    height: calc(100% - 320px);
}
::v-deep {
    .chat-host-live-broadcast {
        .van-tabs__line {
            width: 96px;
        }
    }

}
</style>
