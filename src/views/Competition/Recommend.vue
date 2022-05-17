<template>
<div class="w-100 h-100">
    <header-with-back title="推荐直播"/>
    <div class="competition-section p-t-5">
        <Competitions
            :params="apiParams"
        />
    </div>
</div>
</template>

<script>
import HeaderWithBack from '@/views/Layout/HeaderWithBack'
import Competitions from '@/views/Competition/Components/Competitions'
export default {
    name: 'Recommend',
    components: {
        HeaderWithBack,
        Competitions
    },
    data () {
        return {
            competitions: []
        }
    },
    computed: {
        apiParams () {
            return {
                sportId: this.sportTabId,
                subId: this.subTabId,
                pagination: {
                    pageSize: 20,
                    currentPage: 1
                }
            }
        }
    },
    created () {
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
.competition-section {
    padding-bottom: 50px;
    height: calc(100% - 50px);
    overflow-y: overlay;
}
</style>
