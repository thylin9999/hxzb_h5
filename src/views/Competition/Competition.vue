<template>
<div class="w-100 h-100">
    <div class="first-level-tab p-t-20">
        <ul class="flex justify-around align-center">
            <li
                v-for="tab in sportTabs"
                :key="tab.id"
                class="sport-tab font-16 font-medium flex-1 text-center"
                :class="{'is-active': sportTabId === tab.id }"
                @click="changeSportTab(tab)"
            >
                {{ tab.name }}
            </li>
        </ul>
    </div>
    <div class="sub-class p-l-10 p-r-10 p-relative">
        <div class="bottom-line w-100  p-absolute"></div>
        <ul class="w-100 p-relative z-index-5 flex font-regular align-center">
            <li
                v-for="subItem in subTabs"
                :key="subItem.id"
                class="flex-1 text-center sub-item"
                :class="{'is-active': subTabId === subItem.id }"
                @click="changeSubTab(subItem)"
            >
                {{ subItem.name }}
            </li>
        </ul>
    </div>
    <div
        class="competition-section p-l-5 p-r-5"
        :class="{'p-t-15': isCompetitionList }"
    >
        <component
            :is="comName"
            :key="updateKey"
            v-bind="attrs"
        ></component>
    </div>
</div>
</template>

<script>
import Competitions from '@/views/Competition/Components/Competitions'
import CompetitionWithTime from '@/views/Competition/Components/CompetitionWithTime'
export default {
    name: 'Competition',
    components: {
        Competitions,
        CompetitionWithTime
    },
    data () {
        return {
            sportTabs: [
                {
                    id: 1,
                    name: '足球'
                },
                {
                    id: 2,
                    name: '篮球'
                },
                {
                    id: 3,
                    name: '其他'
                }
            ],
            subTabs: [
                {
                    id: 1,
                    name: '全部',
                    comName: 'Competitions'
                },
                {
                    id: 2,
                    name: '进行中',
                    comName: 'Competitions'
                },
                {
                    id: 3,
                    name: '赛程',
                    comName: 'CompetitionWithTime'
                },
                {
                    id: 4,
                    name: '赛果',
                    comName: 'CompetitionWithTime'
                }
            ],
            sportTabId: 1,
            subTabId: 1,
            competitions: [],
            updateKey: +new Date().getTime()
        }
    },
    computed: {
        apiParams () {
            return {
                sportId: this.sportTabId,
                subId: this.subTabId
            }
        },
        comName () {
            return this.subTabs.find(x => x.id === this.subTabId).comName
        },
        isCompetitionList () {
            return this.subTabId === 1 || this.subTabId === 2
        },
        attrs () {
            return this.isCompetitionList ? {
                params: this.apiParams
            } : {

            }
        }
    },
    watch: {
        apiParams () {
            this.updateKey = +new Date().getTime()
        }
    },
    methods: {
        changeSportTab (tab) {
            this.sportTabId = tab.id
            this.subTabId = 1
        },
        changeSubTab (subItem) {
            this.subTabId = subItem.id
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.first-level-tab{
    .sport-tab{
        margin: 0 35px;
        line-height: 30px;
        height: 30px;
        border-radius: 16px;
        &.is-active {
            background-color: $active-color;
            color: $text-color;
        }
    }
}
.sub-class {
    .sub-item {
        font-size: 13px;
        line-height: 50px;
        font-weight: 400;
        border-bottom: 2px solid transparent;
        &.is-active {
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            border-bottom-color: $active-color;
        }
    }
    .bottom-line{
        left: 0;
        bottom: 0;
        height: 2px;
        background-color: $un-active-color;
    }
}
.competition-section {
    height: calc(100% - 100px);
    padding-bottom: 50px;
    overflow-y: overlay;
}
</style>
