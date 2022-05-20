<template>
<div class="w-100 font-regular m-b-10 p-l-15 p-r-15 m-l-10 card flex justify-between text-black-3">
    <div class="left-teams flex flex-column justify-between p-t-15 p-b-15">
        <div class="team-a flex justify-between">
            <div class="team-info">
                <span class="team-icon">
                    <van-icon name="fire-o" color="#ee0a24" />
                </span>
                <span class="m-l-10">{{ battle.teamA.name }}</span>
            </div>
            <span class="score text-center">{{ battle.teamA.score}}</span>
        </div>
        <div class="team-b flex justify-between">
            <div class="team-info ">
                <span class="team-icon">
                    <van-icon name="fire-o" color="#ee0a24" />
                </span>
                <span class="m-l-10">{{ battle.teamB.name }}</span>
            </div>
            <span class="score text-center">{{ battle.teamB.score }}</span>
        </div>
    </div>
    <div class="score-time p-t-10 p-b-10 flex-column flex justify-between align-center">
        <span class="battle-time">{{ battle.startTime }}</span>
        <span
            class="battle-status font-500"
            :class="{
                'is-end': battle.status === 3,
                'is-going': battle.status === 2
            }"
        >
            {{ battle.statusName }}
        </span>
    </div>
    <div class="host flex-column flex justify-between m-t-15 m-b-15 text-right">
        <span class="battle-country">{{ battle.country}}</span>
        <span class="host-name text-gray">
            {{ battle.host.id ? battle.host.name : '暂无主播' }}
        </span>
    </div>
</div>
</template>

<script>
import { Icon } from 'vant'
export default {
    name: 'CompetitionBattle',
    components: {
        [Icon.name]: Icon
    },
    props: {
        battle: {
            type: Object,
            default: () => ({})
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
