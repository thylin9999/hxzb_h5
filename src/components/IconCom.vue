<template>
<span class="d-inline-block icon bg-center bg-no-repeat"
    :style="iconStyle"
></span>
</template>

<script>
export default {
    name: 'IconCom',
    props: {
        icon: {
            type: String,
            default: ''
        }
    },
    computed: {
        backgroundImg () {
            return require(`../assets/images/icons/${this.icon}.png`)
        },
        iconStyle () {
            return {
                'background-image': `url(${this.backgroundImg})`
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.icon {
    width: 12px;
    height: 12px;
    background-size: 100% 100%;
}
</style>
