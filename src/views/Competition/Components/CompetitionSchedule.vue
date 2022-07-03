<template>
    <div class="h-100 bg-gray">
        <TimeLine
            v-if="showTimeLine"
            :time.sync="currentTime"
            :show-prev="showPrev"
            @refresh="fetchData"
            class="m-b-10"
        />

        <ul v-if="competitions.length"
            class="flex battles flex-wrap p-l-5 p-r-5"
            :class="{'has-time-line': showTimeLine }"
        >
            <template
                v-for="battle in competitions"
            >
                <competition-battle
                    :battle="battle"
                    :key="battle.id"
                    @refresh="fetchData"
                />
            </template>
        </ul>
        <van-empty
            v-else
            class="custom-image"
            :image="require('../../../assets/images/notFound.png')"
            description="暂无数据"
        />
    </div>
</template>

<script>
import CompetitionBattle from '@/views/Competition/Components/CompetitionBattle'
import TimeLine from '@/views/Competition/Components/TimeLine'
import { getMatchList } from '@/api/competition'
import { Toast, Empty } from 'vant'
import { statusCode } from '@/utils/statusCode'
import dayjs from 'dayjs'
// import { statusCode } from '@/utils/statusCode'
export default {
    name: 'CompetitionSchedule',
    props: {
        leagueType: {
            type: [String, Number],
            default: 1 // 足球
        },
        playing: {
            type: [String, Number],
            default: null // 全部
        },
        showTimeLine: {
            type: Boolean,
            default: false
        }
    },
    components: {
        [Toast.name]: Toast,
        [Empty.name]: Empty,
        CompetitionBattle,
        TimeLine
    },
    data () {
        return {
            competitions: [],
            currentTime: dayjs().format('YYYY-MM-DD')
        }
    },
    computed: {
        apiParams () {
            return {
                // eslint-disable-next-line eqeqeq
                playing: this.playing == 5 ? null : this.playing,
                leagueType: this.leagueType,
                // eslint-disable-next-line eqeqeq
                day: this.showTimeLine ? this.currentTime : (this.playing == 5 ? dayjs().format('YYYY-MM-DD') : null)
            }
        },
        showPrev () {
            // eslint-disable-next-line eqeqeq
            return !!(this.playing == 1000)
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            try {
                Toast.loading({
                    duration: 0,
                    forbidClick: true
                })
                const { data, code, msg } = await getMatchList(this.apiParams)
                if (code === statusCode.success) {
                    this.competitions = data ? data.list : []
                } else {
                    Toast(msg)
                }
            } finally {
                Toast.clear()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.battles {
    height: 100%;
    overflow-y: overlay;
    &.has-time-line {
        height: calc(100% - 70px);
    }
}
</style>
