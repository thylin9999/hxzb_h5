<template>
<div class="text-center">
    <div class="no-data w-100 h-100 bg-center bg-no-repeat m-b-10">
    </div>
    <span class="font-14 font-regular text-gray ">暂无数据</span>
</div>
</template>

<script>
export default {
    name: 'NoData'
}
</script>

<style lang="scss" scoped>
.no-data {
    width: 105px;
    height: 80px;
    background-image: url('../assets/images/notFound.png');
    background-size: 100% 100%;
}
</style>
