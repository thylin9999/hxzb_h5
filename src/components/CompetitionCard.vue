<template>
    <div
        class="w-50 p-r-5 p-l-5 p-b-15"
    >
        <div class="competition-preview w-100"
             :style="{
                backgroundImage: `url(${competition.img})`
            }"
        >
        </div>
        <div class="competition-name text-black-3 p-t-10 p-b-5 font-14 flex justify-between align-center font-regular">
            <span>{{ competition.team1.name }}</span>
            <span>VS</span>
            <span>{{ competition.team2.name }}</span>
        </div>
        <div class="host-info text-gray font-12 font-regular flex justify-between align-center">
            <span>{{ competition.user.name }}</span>
            <div class="flex justify-between align-center">
                            <span class="d-inline-block hot-icon">
                                <hot-icon class="h-100 d-inline-block"/>
                            </span>
                <span>{{ competition.user.viewers.count }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import HotIcon from '@/components/HotIcon'
export default {
    name: 'CompetitionCard',
    components: {
        HotIcon
    },
    props: {
        competition: {
            type: Object,
            default: () => ({})
        }
    }
}
</script>

<style lang="scss" scoped>
.competition-preview {
    border-radius: 5px;
    height: 110px;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
}
.competition-name{
    line-height: 20px;
}
.host-info {
    .hot-icon {
        width: 10px;
        height: 10px;
        margin-right: 3px;
    }
}

::v-deep {
    .host-info {
        .svg-icon {
            width: 10px;
            height: 10px;
        }
    }
}
</style>
