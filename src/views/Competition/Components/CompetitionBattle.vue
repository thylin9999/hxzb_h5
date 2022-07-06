<template>
<div class="w-100 font-regular m-b-10 p-l-15 p-r-15 m-l-5 card flex justify-between text-black-3">
    <div class="left-teams flex flex-column justify-between p-t-15 p-b-15">
        <div class="team-a flex justify-between">
            <div class="team-info">
                <span class="team-icon">
                  <span class="bg"
                    :style="{
                      backgroundImage: `url(${battle.homeLogo})`
                    }"
                  > </span>
                </span>
                <span class="m-l-10 d-inline-block team-name text-ellipsis">{{ battle.homeChs }}</span>
            </div>
            <span class="score text-center">{{ battle.homeScore }}</span>
        </div>
        <div class="team-b flex justify-between">
            <div class="team-info ">
                <span class="team-icon">
                  <span class="bg"
                        :style="{
                      backgroundImage: `url(${battle.awayLogo})`
                    }"
                  ></span>
                </span>
                <span class="m-l-10 d-inline-block team-name text-ellipsis">{{ battle.awayChs }}</span>
            </div>
            <span class="score text-center">{{ battle.awayScore }}</span>
        </div>
    </div>
    <div class="score-time p-t-10 p-b-10 flex-column flex justify-between align-center">
        <span class="battle-time">{{ battle.matchTime | timeFilter }}</span>
        <span
            class="battle-status font-500"
            @click="subscribeHost"
            :class="{
                'is-end': isEnd,
                'is-going': isGoing
            }"
        >
            {{ statusString }}
        </span>
    </div>
    <div class="host flex-column flex justify-between m-t-15 m-b-15 text-right">
        <span class="battle-country">{{ battle.leagueChsShort }}</span>
        <span class="host-name text-gray" v-if="!hasHosts">
            暂无主播
        </span>
        <div class="anchors">
          <div class="anchors-box flex align-center">
              <span
                  v-for="anchor in battle.anchor_list"
                  :key="anchor.room_id"
                  class="item bg-center m-l-5 d-inline-block bg-no-repeat bg-size-100 border-50"
                  @click="goToLiveRoom(anchor)"
                  :style="{
                backgroundImage: anchor.img ? `url(${anchor.img})` : `url(${hostIcon})`
              }"
              ></span>
          </div>
        </div>
    </div>
</div>
</template>

<script>
import { matchStatus } from '@/utils/utils'
import { addSubscribeMatch } from '@/api/competition'
import { Icon, Toast } from 'vant'
import dayjs from 'dayjs'
import { statusCode } from '@/utils/statusCode'
export default {
    name: 'CompetitionBattle',
    filters: {
        timeFilter (value) {
            return dayjs(value).format('HH:mm')
        }
    },
    components: {
        [Icon.name]: Icon,
        [Toast.name]: Toast
    },
    props: {
        battle: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        isGoing () {
            return !this.isNotStart && !this.isEnd
        },
        isEnd () {
            return this.battle.state * 1 === -1
        },
        isNotStart () {
            // 未开始
            // eslint-disable-next-line eqeqeq
            return this.battle.state * 1 === 0
        },
        isAppointment () {
            // eslint-disable-next-line eqeqeq
            return this.battle.appointment * 1 === 2
        },
        hasHosts () {
            return !!this.battle.anchor_list.length
        },
        statusString () {
            return this.isNotStart ? (this.isAppointment ? '已预约' : '预约') : matchStatus[this.battle.state]
        },
        hostIcon () {
            return require('../../../assets/images/chat/user-logo.jpeg')
        }
    },
    methods: {
        async subscribeHost () {
            if (!this.isNotStart) {
                return
            }
            try {
                const { code, msg } = await addSubscribeMatch(this.battle.matchId)
                if (code === statusCode.success) {
                    Toast(msg)
                    this.$emit('refresh')
                } else {
                    Toast(msg)
                }
            } catch (e) {
                console.log('出错了')
            }
        },
        goToLiveRoom (anchor) {
            this.$router.push({
                name: 'Broadcast',
                params: {
                    id: this.battle.matchId // 此id只是用来更新页面的
                },
                query: { room_id: anchor.room_id }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.card {
    width: 355px;
    height: 80px;
    border: 1px solid $un-active-color;
    border-radius: 4px;
    font-size: 13px;
    .team-info {
        width: 100px;
      .team-name {
        width: 65px;
      }
      .team-icon {
        width: 18px;
        height: 18px;
        border: 1px solid #E4E4E4;
        border-radius: 50%;
        display: inline-block;
        .bg {
          display: inline-block;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
    }
    .score {
        width: 35px;
    }
    .score-time {
        .battle-time {
            line-height: 20px;
            height: 20px;
        }
       .battle-status {
           line-height: 26px;
           width: 70px;
           text-align: center;
           border-radius: 15px;
           color: $active-color;
           border: 1px solid $active-color;
           &.is-end{
               border-color: $border-gray;
               color: $border-gray;
           }
       }
    }
    .host{
        width: 80px;
        border-left: 1px solid $un-active-color;
        .anchors {
          width: 100%;
          overflow-x: auto;
          .anchors-box{
              width: fit-content;
          }
        .item {
          width: 20px;
          height: 20px;
        }
      }
    }
}
</style>
