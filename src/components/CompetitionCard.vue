<template>
    <div
        class="w-50 p-r-5 p-l-5 p-b-15"
        @click="goToBroadcast"
    >
        <div class="competition-preview w-100"
             :class="{
                'bg-size-auto': !competition.live_cover,
                'bg-size-100': competition.live_cover
             }"
             :style="{
                backgroundImage: `url(${bgImg})`
            }"
        >
        </div>
        <div class="competition-name text-black-3 p-t-10 p-b-5 font-14 flex justify-between align-center font-regular">
            <span class="d-inline-block text-ellipsis">{{ competition.room_title  }}</span>
        </div>
        <div class="host-info text-gray font-12 font-regular flex justify-between align-center">
            <span>{{ competition.nick }}</span>
            <div class="flex justify-between align-center">
                            <span class="d-inline-block hot-icon">
                                <hot-icon class="h-100 d-inline-block"/>
                            </span>
                <span>{{ competition.heat_num }}</span>
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
    },
    computed: {
        bgImg () {
            return this.competition.live_cover
                ? this.competition.live_cover
                : require('../assets/images/common/host-blank.png')
        }
    },
    methods: {
        goToBroadcast () {
            this.$router.push({
                name: 'Broadcast',
                params: {
                    id: this.competition.id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.competition-preview {
    border-radius: 5px;
    height: 110px;
    background-color: #f2f2f2;
    //background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
}
.competition-name{
    line-height: 20px;
}
.host-info {
    .hot-icon {
        width: 8px;
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
