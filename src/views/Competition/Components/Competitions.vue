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
            const { data } = await getLiveList(this.params)
            console.log(data, 'data')
            this.competitions = data.list
            console.log(this.competitions, 'asfd')
        }
    }
}
</script>

<style scoped>

</style>
