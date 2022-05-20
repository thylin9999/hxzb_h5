<template>
<div class="w-100 h-100">
    <TimeLine
        :time.sync="currentTime"
        :show-prev="showPrev"
    />
    <div class="battles p-t-15">
        <template
            v-for="battle in battles"
        >
            <competition-battle
                :battle="battle"
                :key="battle.id"
            />
        </template>
        <span class="no-more w-100 d-inline-block text-gray text-center">没有更多了～</span>
    </div>
</div>
</template>

<script>
import TimeLine from '@/views/Competition/Components/TimeLine'
import dayjs from 'dayjs'
import CompetitionBattle from '@/views/Competition/Components/CompetitionBattle'
import { getBattles } from '@/api/competition'
import { statusCode } from '@/utils/statusCode'

export default {
    name: 'CompetitionWithTime',
    props: {
        showPrev: {
            type: Boolean,
            default: false
        }
    },
    components: {
        TimeLine,
        CompetitionBattle
    },
    data () {
        return {
            currentTime: dayjs().format('MM-DD'),
            battles: []
        }
    },
    computed: {
        apiParams () {
            return {
                date: this.currentTime
            }
        }
    },
    watch: {
        currentTime () {
            this.fetchData()
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            console.log('发送请求没')
            const { data } = await getBattles(this.apiParams)
            if (data.code === statusCode.success) {
                this.battles = data.data.reduce((all, item) => {
                    all.push({
                        ...item,
                        statusName: item.status === 1 ? '未开始' : (item.status === 2 ? '进行中' : '已结束')
                    })
                    return all
                }, [])
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.battles {
    height: calc(100% - 70px);
    overflow-y: overlay;
}
.no-more{
    font-size: 13px;
}
</style>
