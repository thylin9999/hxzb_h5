<template>
    <div class="p-relative h-100 p-t-15">
        <!--    <div class="m-l-10  add-host bg-center bg-no-repeat">-->
        <!--        <div class="add-bg h-100 flex justify-between align-center">-->
        <!--            <div class="m-l-15 user-name font-regular text-color flex align-center">-->
        <!--                <div class="user-icon bg-center bg-no-repeat text-center p-relative">-->
        <!--                    <span class="host d-inline-block p-absolute text-center font-12">主播</span>-->
        <!--                </div>-->
        <!--                <span class="font-14 font-500 text-color p-l-5">战神巴蒂渣渣</span>-->
        <!--            </div>-->
        <!--            <div class="user-qq m-r-30 font-13 font-regular font-500 text-center text-color bg-center bg-no-repeat">-->
        <!--                QQ：1242154125-->
        <!--            </div>-->
        <!--        </div>-->
        <!--    </div>-->
        <div class="message-section">
            <message-row v-for="(tem,i) in chatList" :key="i"  :msgCon="tem"/>
        </div>
        <div class="footer p-l-15 p-r-15 w-100 p-absolute">
            <input-message v-on:getMsg = sendMessage />
        </div>
    </div>
</template>

<script>
import InputMessage from '@/components/InputMessage'
import MessageRow from '@/views/Broadcast/components/MessageRow'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'ChatRoom',
    components: {
        InputMessage,
        MessageRow
    },
    data () {
        return {
            connectTime: null,
            countdown: 5, // 倒计时 5秒重连
            timer: null,
            isLeave: false,
            isConnect: false,
            announcement: '',
            webSocket: null,
            value: '600',
            chatList: []
        }
    },
    watch: {
        isConnect (newVal) {
            if (!newVal && !this.isLeave) { // 非主动断线
                this.reConnect()
            }
            if (newVal) { // 连接成功 清楚重连定时器
                clearInterval(this.connectTime)
            }
        }
    },
    computed: {
        ...mapState('user', ['nickname', 'token', 'avatar', 'member_id']),
        ...mapGetters('user', ['isLogin'])
    },
    created () {
        this.connectWebSocket()
    },
    methods: {
        sendMessage (msg) {
            this.send('1040', msg)
        },
        send (num, msg) {
            if (num === '1040') { // 发言
                const sendCon = {
                    type: num,
                    room_id: this.$route.query.room_id,
                    member_id: this.member_id,
                    nickname: this.nickname,
                    msg
                }
                this.webSocket.send(JSON.stringify(sendCon))
            }
        },
        connectWebSocket () {
            const that = this
            // eslint-disable-next-line no-undef
            this.webSocket = new WebSocket(_requestWS)
            this.webSocket.onopen = function (e) {
                if (e.type === 'open') {
                    const sendCon = {
                        type: '1010',
                        room_id: that.$route.query.room_id,
                        nickname: that.nickname,
                        member_id: that.member_id
                    }
                    console.log('---websocke已连接成功---')
                    that.isConnect = true
                    that.webSocket.send(JSON.stringify(sendCon))
                }
            }
            this.webSocket.onmessage = function (evt) {
                if (!evt.data.includes('type')) return
                const obj = JSON.parse(evt.data)
                let item = {}
                if (obj) {
                    switch (obj.type) {
                    case '1000': // 心跳检测
                        console.log(obj)
                        break
                    case '1010': // 用户进入直播间
                        item = {
                            type: '1010',
                            msg: '进入直播间',
                            member_id: obj.member_id ? obj.member_id : null, // 会员
                            nickname: obj.nickname
                        }
                        that.chatList.push(item)
                        // that.$nextTick(() => {
                        //     that.$refs.element.scrollTop = 10000000
                        // })
                        break
                    case '1040': // 普通发言
                        item = {
                            type: obj.type,
                            nickname: obj.nickname,
                            msg: obj.content.msg,
                            member_id: obj.member_id
                        }
                        that.chatList.push(item)
                        // that.$nextTick(() => {
                        //     that.$refs.element.scrollTop = 10000000
                        // })
                        break
                    case '1090': // 1090主播关闭直播
                        item = {
                            type: '1090',
                            msg: '系统提示：主播已下播'
                        }
                        // that.chatList.push(item)
                        // that.$nextTick(() => {
                        //     that.$refs.element.scrollTop = 10000000
                        // })
                        break
                    case '1120': // 系统提示
                        item = {
                            type: '1120',
                            msg: obj.content.msg
                        }
                        that.chatList.push(item)
                        // that.chatList.push(item)
                        // that.$nextTick(() => {
                        //     that.$refs.element.scrollTop = 10000000
                        // })
                        break
                    case '2010': // 信息發送頻繁
                        item = {
                            type: '2010',
                            msg: obj.content
                        }
                        // that.chatList.push(item)
                        // that.$nextTick(() => {
                        //     that.$refs.element.scrollTop = 10000000
                        // })
                        break
                    default: // 1110主播回来
                        break
                    }
                }
            }
            // 关闭链接
            this.webSocket.onclose = function () {
                console.log('webScoket  已经断开')
                if (!this.isLeave) that.isConnect = false
            }
        },
        closeWs () {
            this.webSocket.close()
        },
        reConnect () { // 断线重连
            this.connectTime = setInterval(() => {
                this.connectWebSocket()
                console.log('断线重连')
            }, 5000)
        }
    },
    beforeDestroy () {
        clearInterval(this.connectTime)
        this.isLeave = true // 主动离开 不需重连
        this.closeWs()
    }

}
</script>

<style lang="scss" scoped>
  .add-host {
    width: 355px;
    height: 58px;

    .add-bg {
      background-image: url('../../../assets/images/host-bg.png');
      background-size: 100% 100%;
    }

    .user-name {
      .user-icon {
        width: 50px;
        height: 50px;
        margin-top: -20px;
        background-image: url('../../../assets/images/my/logo.png');
        background-size: 100% 100%;
      }

      .host {
        width: 44px;
        height: 16px;
        line-height: 16px;
        background-image: url('../../../assets/images/host-title-bg.png');
        background-size: 100% 100%;
        bottom: -5px;
        left: 2px;
      }
    }
  }

  .message-section {
    height: calc(100% - 135px);
    overflow-y: overlay;
  }

  .user-qq {
    width: 126px;
    height: 26px;
    line-height: 26px;
    background-image: url('../../../assets/images/qq-bg.png');
    background-size: 100% 100%;
  }

  .footer {
    height: 38px;
    left: 0;
    bottom: 20px;
  }
</style>
