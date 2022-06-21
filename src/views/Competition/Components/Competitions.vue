<template>
    <ul class="flex flex-wrap p-l-5 p-r-5">
        <template
            v-for="competition in competitions"
        >
            <competition-card
                :key="competition.id"
                :competition="competition"
            />
        </template>
    </ul>
</template>

<script>
import CompetitionCard from '@/components/CompetitionCard'
import { getLiveList } from '@/api/competition'
import { Toast } from 'vant'
// import { statusCode } from '@/utils/statusCode'
export default {
    name: 'Competitions',
    props: {
        params: {
            type: Object,
            default: () => ({})
        }
    },
    components: {
        [Toast.name]: Toast,
        CompetitionCard
    },
    data () {
        return {
            competitions: []
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
                const { data } = await getLiveList(this.params)
                this.competitions = data.list
            } finally {
                Toast.clear()
            }
        }
    }
}
</script>

<style scoped>

</style>
