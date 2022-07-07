<template>
    <div class="broadcast h-100" :key="updateKey" v-if="roomInfo">
        <van-nav-bar
                title="直播详情"
                left-arrow
                @click-left="onClickLeft"
        />
        <div class="view-video">
            <video-display :videoInfo="roomInfo" />
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
            <keep-alive>
                <component :roomInfo="roomInfo" :anchorInfo="anchorInfo" :is="contentComp"></component>
            </keep-alive>
        </div>
    </div>
<!--    <van-loading v-else class="loading" size="24px" type="spinner" color="#1989fa">加载中...</van-loading>-->
</template>

<script>
import { Tab, Tabs, NavBar, Toast } from 'vant'
import VideoDisplay from '@/components/VideoDisplay'
import ChatRoom from '@/views/Broadcast/components/ChatRoom'
import Host from '@/views/Broadcast/components/Host'
import { getRoomInfo } from '@/api/competition'

export default {
    name: 'Index',
    props: ['id'],
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Toast.name]: Toast,
        VideoDisplay,
        ChatRoom,
        Host
    },
    data () {
        return {
            roomInfo: null,
            anchorInfo: null,
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
    mounted () {
        this.init()
    },
    methods: {
        async init () {
            try {
                Toast.loading({
                    duration: 0,
                    forbidClick: true,
                    message: '加载中...',
                    loadingType: 'spinner'
                })
                const { data, code, msg } = await getRoomInfo({ room_id: this.$route.query.room_id })
                if (code === 200) {
                    this.roomInfo = data.room_info
                    this.anchorInfo = data.anchor_info
                } else {
                    Toast(msg)
                }
            } finally {
                Toast.clear()
            }
        },
        onClickLeft () {
            this.$router.push('/')
        }

    }
}
</script>

<style lang="scss" scoped>
    .loading{
      width: 100%;
      height: 100%;
    }

  .host-component {
    height: calc(100% - 320px);
  }

  ::v-deep {
    .chat-host-live-broadcast {
      .van-tabs__line {
        width: 96px;
      }
    }
  }

  >>> .van-toast--unclickable{
      background-color: #000;
  }
</style>
