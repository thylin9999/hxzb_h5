<template>
<div class="w-100 font-regular m-b-10 p-l-15 p-r-15 m-l-10 card flex justify-between text-black-3">
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
    </div>
</div>
</template>

<script>
import { matchStatus } from '@/utils/utils'
import { Icon } from 'vant'
import dayjs from 'dayjs'
export default {
    name: 'CompetitionBattle',
    filters: {
        timeFilter (value) {
            return dayjs(value).format('HH:mm')
        }
    },
    components: {
        [Icon.name]: Icon
    },
    props: {
        battle: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        isGoing () {
            return !matchStatus[this.battle.state]
        },
        isEnd () {
            return !!matchStatus[this.battle.state]
        },
        isNotStart () {
            // 未开始
            // eslint-disable-next-line eqeqeq
            return this.battle.state == 0
        },

        hasHosts () {
            return !!this.battle.anchor_list.length
        },
        statusString () {
            return this.isEnd ? '已结束' : (this.isNotStart ? '未开始' : '进行中')
        }
        // homeLogo () {
        //     return this.battle.homeLogo ? this.battle.homeLogo : require('')
        // }
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
    }
}
</style>
