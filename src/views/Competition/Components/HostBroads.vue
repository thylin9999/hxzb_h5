<template>
    <div>
      <ul v-if="competitions.length" class="flex flex-wrap p-l-5 p-r-5">
        <template
            v-for="competition in competitions"

        >
          <competition-card
              :key="competition.id"
              :competition="competition"
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
import CompetitionCard from '@/components/CompetitionCard'
import { getLiveList } from '@/api/competition'
import { Toast, Empty } from 'vant'
import { statusCode } from '@/utils/statusCode'
export default {
    name: 'HostBroads',
    props: {
        tabId: {
            type: [String, Number],
            default: 5
        }
    },
    components: {
        [Toast.name]: Toast,
        [Empty.name]: Empty,
        CompetitionCard
    },
    data () {
        return {
            competitions: []
        }
    },
    computed: {
        apiParams () {
            return {
                type: this.tabId === 5 ? 0 : this.tabId
            }
        }
    },
    watch: {
        tabId: {
            handler () {
                this.fetchData()
            },
            immediate: true
        }
    },
    methods: {
        async fetchData () {
            try {
                Toast.loading({
                    duration: 0,
                    forbidClick: true
                })
                console.log(this.apiParams, this.tabId, 'asdf')
                const { code, data, msg } = await getLiveList(this.apiParams)
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

<style scoped>

</style>
