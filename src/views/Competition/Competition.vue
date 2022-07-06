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
    <div class="sub-class  p-relative">
        <div class="bottom-line w-100  p-absolute"></div>
        <van-tabs
            v-model="subTabId"
            title-active-color="#333"
            title-inactive-color="#333"
        >
            <van-tab
                v-for="subItem in subTabs"
                :key="subItem.id"
                :name="subItem.id"
                :title="subItem.name"></van-tab>
        </van-tabs>
    </div>
    <div
        class="competition-section "
        :class="{'p-t-15': isCompetitionList }"
    >
        <CompetitionSchedule
            :show-time-line="showTimeLine"
            :key="updateKey"
            :league-type="sportTabId"
            :playing="subTabId"
        />
    </div>
</div>
</template>

<script>
import CompetitionSchedule from '@/views/Competition/Components/CompetitionSchedule'
import { Tabs, Tab } from 'vant'
export default {
    name: 'Competition',
    components: {
        CompetitionSchedule,
        [Tabs.name]: Tabs,
        [Tab.name]: Tab
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
                }
                // {
                //     id: 4,
                //     name: '其他'
                // }
            ],
            subTabs: [
                {
                    id: 5,
                    name: '全部',
                    comName: 'CompetitionSchedule'
                },
                {
                    id: 2000,
                    name: '进行中',
                    comName: 'CompetitionSchedule'
                },
                {
                    id: 1000,
                    name: '赛程',
                    comName: 'CompetitionWithTime',
                    showPrev: false
                },
                {
                    id: 3000,
                    name: '赛果',
                    comName: 'CompetitionWithTime',
                    showPrev: true
                }
            ],
            sportTabId: 1,
            subTabId: 5,
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
        currentSubTab () {
            return this.subTabs.find(x => x.id === this.subTabId)
        },
        comName () {
            return this.currentSubTab.comName
        },
        showTimeLine () {
            return [1000, 3000].includes(this.subTabId)
        },
        isCompetitionList () {
            return this.subTabId === 1 || this.subTabId === 2
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
            // this.subTabId = 5
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
        height: 1px;
        z-index: 2;
        background-color: $un-active-color;
    }
}
.competition-section {
    height: calc(100% - 95px);
    padding-bottom: 50px;
    overflow-x: hidden;
    overflow-y: overlay;
}
::v-deep {
    .sub-class {
        .van-tabs__line {
            width: 25%;
            z-index: 3;
            background-color: $active-color;
        }
    }
}
</style>
