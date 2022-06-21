<template>
<div class="card text-color font-12 p-t-5">
    <div class="header p-b-5 p-l-10 flex font-500 font-medium justify-between align-center p-r-10">
        <div class="left-title  flex flex-column ">
            <span>韩k3联</span>
            <span>第十七轮</span>
        </div>
        <div class="time">{{ match.time }}</div>
    </div>
    <div class="footer-buttons p-l-10 p-r-10 p-t-15 p-b-15 flex flex-column justify-between">
        <div class="row flex justify-between align-center">
            <div class="left-info flex align-center">
                <span class="icon d-inline-block bg-center bg-no-repeat bg-size-100"></span>
                <span class="m-l-5 text-gray">{{ match.team1.loop }}</span>
            </div>
            <span class="font-16 font-500">{{ match.team1.score }}</span>
        </div>
        <div class="row flex justify-between align-center">
            <div class="left-info flex align-center">
                <span class="icon d-inline-block bg-center bg-no-repeat bg-size-100"></span>
                <span class="m-l-5 text-gray">{{ match.team1.loop }}</span>
            </div>
            <span class="font-16 font-500">{{ match.team1.score }}</span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'MatchCard',
    props: {
        match: {
            type: Object,
            default: () => ({})
        }
    },
    created () {
        console.log(this.match, 'match')
    }
}
</script>

<style lang="scss" scoped>
.card{
    width: 145px;
    height: 105px;
    border-radius: 10px;
    background: linear-gradient(225deg, #081751 0%, #19307C 100%);
}
.header {
    border-bottom: 1px solid #233884;
    .left-title {
        color: #E8EBA8;
        line-height: 14px;
    }
}
.left-info {
    .icon {
        width: 17px;
        height: 15px;
        background-image: url('../assets/images/common/team-flag.png');
    }
}
</style>
