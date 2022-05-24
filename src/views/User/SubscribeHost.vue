<template>
<div class="bg-gray h-100">
    <van-nav-bar
        title="订阅主播"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="hosts bg-gray p-t-10">
        <host-card
            v-for="host in hosts"
            :host="host"
            :key="host.id"
        />
    </div>
</div>
</template>

<script>
import { NavBar } from 'vant'
import { getHosts } from '@/api/user'
import { statusCode } from '@/utils/statusCode'
import HostCard from '@/views/User/Components/HostCard'
export default {
    name: 'SubscribeHost',
    components: {
        [NavBar.name]: NavBar,
        HostCard
    },
    data () {
        return {
            hosts: []
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        async fetchData () {
            const { data } = await getHosts()
            if (data.code === statusCode.success) {
                this.hosts = data.data
                console.log(this.hosts, data, 'data')
            }
        },
        onClickLeft () {
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/theme/default-vars.scss';
.hosts {
    height: calc(100% - 46px);
    overflow-y: overlay;
}
:v-deep {
    .host .card:last-child {
        border-bottom: none!important;
    }
}
</style>
