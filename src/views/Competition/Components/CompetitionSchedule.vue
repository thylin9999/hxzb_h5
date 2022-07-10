<template>
    <div class="h-100 bg-gray">
        <TimeLine
            v-if="showTimeLine"
            :time.sync="currentTime"
            :show-prev="showPrev"
            @refresh="fetchData"
            class="m-b-10"
        />
        <van-pull-refresh class="h-100" v-model="refreshing" @refresh="onRefresh">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                class=" battles h-100 m-auto p-l-5 p-r-5"
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
            </van-list>
        </van-pull-refresh>

    </div>
</template>

<script>
import CompetitionBattle from '@/views/Competition/Components/CompetitionBattle'
import TimeLine from '@/views/Competition/Components/TimeLine'
import { getMatchList } from '@/api/competition'
import { Toast, Empty, PullRefresh, List, Cell } from 'vant'
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
        [PullRefresh.name]: PullRefresh,
        [List.name]: List,
        [Cell.name]: Cell,
        CompetitionBattle,
        TimeLine
    },
    data () {
        return {
            finished: false,
            loading: false,
            refreshing: false,
            competitions: [],
            pagination: {
                total: 0,
                currentPage: 0,
                pageSize: 20
            },
            currentTime: dayjs().format('YYYY-MM-DD')
        }
    },
    computed: {
        apiParams () {
            return {
                // eslint-disable-next-line eqeqeq
                playing: this.playing == 5 ? null : this.playing,
                leagueType: this.leagueType,
                pageNumber: this.pagination.currentPage,
                pageSize: this.pagination.pageSize,
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
        // this.fetchData()
    },
    methods: {
        onRefresh () {
            // 清空列表数据
            this.finished = false
            // 重新加载数据
            // 将 loading 设置为 true，表示处于加载状态
            this.loading = true
            this.pagination.currentPage = 0
            this.onLoad()
        },
        async onLoad () {
            try {
                this.pagination.currentPage++
                const { data, code, msg } = await getMatchList(this.apiParams)
                if (code === statusCode.success) {
                    if (this.refreshing) {
                        this.competitions = []
                        this.pagination.currentPage = 1
                        this.pagination.total = 0
                        this.refreshing = false
                    }
                    const tempRes = data ? data.list.reduce((all, item) => {
                        all.push({
                            ...item
                        })
                        return all
                    }, []) : []
                    this.competitions.push(...tempRes)
                    this.loading = false
                    this.pagination.currentPage = data.current_page
                    this.pagination.total = data.total
                    if (this.competitions.length >= this.pagination.total) {
                        this.finished = true
                    }
                } else {
                    Toast(msg)
                }
            } catch (e) {
                console.log('出错了')
            }
        },
        async fetchData () {
            try {
                Toast.loading({
                    duration: 0,
                    forbidClick: true
                })
                const { data, code, msg } = await getMatchList(this.apiParams)
                if (code === statusCode.success) {
                    this.competitions = data ? data.list.reduce((all, item) => {
                        all.push({
                            ...item
                        })
                        return all
                    }, []) : []
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
    //padding-bottom: 80px;
    overflow-y: auto;
    &.has-time-line {
        height: calc(100% - 70px);
    }
}
</style>
