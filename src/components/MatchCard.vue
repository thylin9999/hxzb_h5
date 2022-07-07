<template>
<div class="card text-color font-12 p-t-5">
    <div class="header p-b-5 p-l-10 flex font-500 font-medium justify-between align-center p-r-10">
        <div class="left-title  flex flex-column ">
            <span>{{ match.leagueChsShort }}</span>
<!--            <span>第十七轮</span>-->
        </div>
        <div class="time">
            <span
                @click="book(match)"
                class=" font-12 pointer"
                :class="{'text-white': match.isSubscribe, 'pointer': !match.isSubscribe }"
            >{{
                    match.isGoing ? '比赛中' : matchTime
                }}</span>
        </div>
    </div>
    <div class="footer-buttons p-l-10 p-r-10 p-t-15 p-b-15 flex flex-column justify-between">
        <div class="row flex justify-between align-center">
            <div class="left-info flex align-center">
                <span
                    class="icon d-inline-block border-50 bg-center bg-no-repeat bg-size-100"
                    :style="{
                        backgroundImage: `url(${homeLogo})`
                    }"
                ></span>
                <span class="m-l-5 text-white team-name text-ellipsis">{{ match.homeChs }}</span>
            </div>
            <span class="font-16 font-500">{{ match.homeScore }}</span>
        </div>
        <div class="row m-t-5 flex justify-between align-center">
            <div class="left-info flex align-center">
                <span
                    class="icon d-inline-block border-50 bg-center bg-no-repeat bg-size-100"
                    :style="{
                        backgroundImage: `url(${awayLogo})`
                    }"
                ></span>
                <span class="m-l-5 text-white team-name text-ellipsis">{{ match.awayChs }}</span>
            </div>
            <span class="font-16 font-500">{{ match.awayScore }}</span>
        </div>
    </div>
</div>
</template>

<script>
import { addSubscribeMatch } from '@/api/competition'
import { statusCode } from '@/utils/statusCode'
import { Toast } from 'vant'
import dayjs from 'dayjs'
export default {
    name: 'MatchCard',
    components: {
        [Toast.name]: Toast
    },
    props: {
        match: {
            type: Object,
            default: () => ({})
        }
    },
    computed: {
        matchTime () {
            return dayjs(this.match.matchTime).format('HH:mm')
        },
        homeLogo () {
            return this.match.homeLogo ? this.match.homeLogo : require('../assets/images/common/match-logo.png')
        },
        awayLogo () {
            return this.match.awayLogo ? this.match.awayLogo : require('../assets/images/common/match-logo.png')
        }
    },
    methods: {
        async book (match) {
            if (!match.isGoing) {
                if (this.token) {
                    const { code, msg } = await addSubscribeMatch(match.matchId)
                    if (code === statusCode.success) {
                        Toast(msg)
                        this.$emit('refresh')
                    }
                } else {
                    Toast('请先登录，无法预约！')
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.card{
    width: 147px;
    height: 105px;
    border-radius: 10px;
    background: linear-gradient(225deg, #081751 0%, #19307C 100%);
}
.header {
    border-bottom: 1px solid #233884;
    .left-title {
        color: #E8EBA8;
        line-height: 14px;
    }
}
.left-info {
    .icon {
        width: 17px;
        height: 17px;
        //background-image: url('../assets/images/common/team-flag.png');
    }
    .team-name {
        width: 80px;
    }
}
</style>
