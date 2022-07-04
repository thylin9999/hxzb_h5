<template>
    <div class="h-100 overflow-y-auto" v-if="anchorInfo">
        <div class="host-header flex justify-between font-regular align-center p-l-10 p-r-10">
            <div class="user-info flex align-center">
                <div class="user-icon bg-center bg-no-repeat"></div>
                <div class="user-name font-13  m-l-10">
                    <span>{{ anchorInfo.anchor_name }}</span>
                    <div class="collect-info">
                        <svg-icon class="icon-13" icon-class="fire"></svg-icon>
                        <span class="font-14">{{ anchorInfo.heat }}</span>
                    </div>
                </div>
            </div>
            <div class="subscribe">
                <span class="font-12 text-color d-inline-block text-center"
                      @click="subscription"> {{ is_follow == 0 ? '订阅' : '已订阅' }} </span>
            </div>
        </div>
        <div class="recommend m-t-20">
            <div class="list-header flex justify-between align-center p-b-15 p-l-10 p-r-10">
                <div class="hot-recommend flex align-center">
                    <!--                <svg-icon class="icon-17" icon-class="media"></svg-icon>-->
                    <span class="tv-icon bg-center bg-size-100 bg-no-repeat"></span>
                    <span class="download-button p-l-5 font-medium font-500">{{ $t('Home.recommendBroadcast') }}</span>
                </div>
                <div class="font-12 light-text-color font-regular view-more">
                    <span @click="viewMore">查看更多</span>
                    <van-icon name="arrow" color="#8D8D8D"></van-icon>
                </div>
            </div>
            <div class="list-section p-l-5 p-r-5">
                <HostBroads
                />
            </div>
        </div>
    </div>
</template>

<script>
import HostBroads from '@/views/Competition/Components/HostBroads'
import { Icon, Toast } from 'vant'
import { subscribeHost } from '@/api/competition'
import { mapGetters, mapState } from 'vuex'

export default {
    props: {
        anchorInfo: {
            type: Object,
            default: function () {
                return {}
            }
        }
    },
    name: 'Host',
    components: {
        HostBroads,
        [Icon.name]: Icon
    },
    data () {
        return {
            is_follow: 0,
            updateKey: +new Date().getTime()
        }
    },
    computed: {
        ...mapState('user', ['nickname', 'token', 'avatar']),
        ...mapGetters('user', ['isLogin']),
        apiParams () {
            return {
                sportId: this.sportTabId,
                subId: this.subTabId
            }
        }
    },
    mounted () {
        if (this.anchorInfo) {
            this.is_follow = this.anchorInfo.is_follow
        }
    },
    methods: {
        viewMore () {
            this.$router.push({
                name: 'Recommend'
            })
        },
        async subscription () {
            if (!this.token) {
                Toast('请先登录')
            } else {
                try {
                    const { code, msg } = await subscribeHost({ anchor_id: this.anchorInfo.member_id })
                    if (code === 200) {
                        this.is_follow = this.is_follow ? 0 : 1
                    } else {
                        Toast(msg)
                    }
                } catch (e) {
                    console.log('出错了')
                }
            }
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

  .collect-info {
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

  .hot-recommend {
    .tv-icon {
      width: 17px;
      height: 17px;
      background-image: url('../../../assets/images/icons/tv.png');
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
