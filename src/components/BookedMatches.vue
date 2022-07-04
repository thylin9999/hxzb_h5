<template>
    <div class="book-matches p-t-20">
        <div class="list-header flex justify-between align-center p-b-15 p-l-10 p-r-10">
            <div class="hot-recommend flex align-center">
                <span class="match-icon bg-center bg-size-100 bg-no-repeat"></span>
                <span class="download-button p-l-5 font-medium font-500">今日赛事</span>
            </div>
        </div>
        <div class="block w-100 p-l-10 p-r-10 flex justify-between align-center">
            <div class="overflow-x-auto match-box">
                <div class="match-list  flex align-center flex-no-wrap">
                    <match-card
                        class="m-r-10"
                        v-for="match in list"
                        :key="match.id"
                        :match="match"
                        @refresh="fetchData"
                    />
                </div>
            </div>
            <div class="view-more flex align-center justify-center bg-center bg-no-repeat bg-size-100">
                <span
                    class="text-color m-l-n-5 font-12 font-medium"
                    @click="viewMore"
                >查看更多</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getHotMatches } from '@/api/competition'
import MatchCard from '@/components/MatchCard'
import { Toast } from 'vant'
import dayjs from 'dayjs'
import { statusCode } from '@/utils/statusCode'
import { matchStatus } from '@/utils/utils'

export default {
    name: 'BookedMatches',
    components: {
        MatchCard,
        [Toast.name]: Toast
    },
    data () {
        return {
            list: []
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            try {
                const { data, code, msg } = await getHotMatches({
                    day: dayjs().format('YYYY-MM-DD')
                })
                if (code === statusCode.success) {
                    this.list = data.list.reduce((all, match) => {
                        all.push({
                            ...match,
                            isSubscribe: match.appointment * 1 === 1,
                            isGoing: !matchStatus[match.state]
                        })
                        return all
                    }, [])
                } else {
                    Toast(msg)
                }
            } catch (e) {
                console.log('出错了')
            }
        },
        viewMore () {
            this.$router.push({
                name: 'Competition'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.book-matches {
    font-size: 15px;
    .hot-recommend {
        line-height: 22px;
        height: 22px;
        .tv-icon {
            width: 17px;
            height: 17px;
            background-image: url('../assets/images/icons/tv.png');
        }
        .match-icon {
            width: 17px;
            height: 17px;
            background-image: url('../assets/images/icons/match.png');
        }
    }
    .match-box {
        overflow-y: hidden;
        width: calc(100% - 50px);
    }
}
.match-list {
    width: fit-content;
}
.view-more {
    height: 105px;
    width: 35px;
    background-image: url('../assets/images/common/view-more.png');
    span {
        writing-mode: vertical-lr;
        line-height: 14px;
        letter-spacing: 8px;
    }
}
</style>
