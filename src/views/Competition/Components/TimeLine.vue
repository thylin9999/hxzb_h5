<template>
    <div class="p-relative">
        <div class="time-line">
            <ul
                class="time-ul flex "
                :style="scrollStyle"
            >
                <li
                    class="time-item font-12 p-t-5 p-b-5"
                    v-for="time in dates"
                    :key="time.date"
                    :class="{'is-active': currentDate === time.date }"
                    @click="choseDate(time)"
                >
                    <div class="flex-column h-100 font-regular justify-center flex align-center font-12">
                        <span class="date">{{ time.date }}</span>
                        <span class="weekday">{{ time.weekName }}</span>
                    </div>
                </li>
            </ul>
            <div
                class="calender-button p-absolute h-100 bg-center bg-no-repeat"
                @click="show = true"
            >
            </div>
            <van-calendar
                color="#4859DE"
                :show-mark="false"
                v-model="show"
                :min-date="timeRange.minDate"
                :max-date="timeRange.maxDate" @confirm="onConfirm" />
        </div>
    </div>
</template>

<script>
import { Calendar } from 'vant'
import dayjs from 'dayjs'
import { weekDay } from '../../../utils/utils'
const isoweek = require('dayjs/plugin/isoWeek')
export default {
    name: 'TimeLine',
    components: {
        [Calendar.name]: Calendar
    },
    props: {
        showPrev: {
            type: Boolean,
            default: false
        },
        showDaysNumber: {
            type: Number,
            default: 14
        },
        maxDate () {
            // return this.showPrev ? new Date() : null
            return new Date(2022, 10, 3)
        }
    },
    data () {
        return {
            times: [],
            currentDate: dayjs().format('MM-DD'),
            currentTime: '',
            show: false
        }
    },
    computed: {
        dates () {
            // 赛程往后14天，赛果，往前 7天
            const dates = []
            if (this.showPrev) {
                // 赛程
                for (let i = 0; i <= 14; i++) {
                    const date = dayjs().add(i, 'day')
                    dates.push({
                        id: dayjs(date).format('YYYY-MM-DD'),
                        date: dayjs(date).format('MM-DD'),
                        week: dayjs(date).isoWeekday(),
                        weekName: weekDay[dayjs(date).isoWeekday()]
                    })
                }
            } else {
                for (let i = 0; i <= 7; i++) {
                    const date = dayjs().subtract(i, 'day')
                    dates.unshift({
                        id: dayjs(date).format('YYYY-MM-DD'),
                        date: dayjs(date).format('MM-DD'),
                        week: dayjs(date).isoWeekday(),
                        weekName: weekDay[dayjs(date).isoWeekday()]
                    })
                }
            }
            return dates
        },
        timeRange () {
            if (this.dates && this.dates.length) {
                return {
                    minDate: new Date(this.dates[0].id),
                    maxDate: new Date(this.dates[this.dates.length - 1].id)
                }
            } else {
                return {}
            }
        },
        scrollBox () {
            return {
                width: this.dates.length * 55 + 40
            }
        },
        scrollStyle () {
            return {
                width: this.scrollBox.width + 'px'
            }
        }
    },
    created () {
        dayjs.extend(isoweek)
    },
    methods: {
        choseDate (time) {
            this.currentDate = time.date
            this.currentTime = time.id
            this.updateTime()
        },
        onConfirm (date) {
            this.show = false
            this.currentDate = dayjs(date).format('MM-DD')
            this.currentTime = dayjs(date).format('YYYY-MM-DD')
            this.updateTime()
        },
        updateTime () {
            this.$emit('update:time', this.currentTime)
            this.$emit('refresh')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.time-line {
    margin: 0 auto;
    width: 375px;
    background-color: $background-gray;
    overflow-x: overlay;
    border: 1px solid $un-active-color;
    .time-ul {
        width: fit-content;
        padding-right: 45px;
    }
    .time-item {
        width: 55px;
        height: 54px;
        .date {
            color: $text-black-3;
        }
        .weekday {
            color: $text-gray;
        }
        &.is-active {
            .date, .weekday {
                color: $active-color;
            }
        }
    }
    .calender-button {
        right: 0;
        top: 0;
        width: 40px;
        background-color: $background-gray;
        box-shadow: -1px 0px 7px 0px rgba(151, 151, 151, 0.5);
        background-image: url('../../../assets/images/calender.png');
        background-size: 18px 18px;
    }
}
</style>
