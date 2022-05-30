<template>
<div class="p-relative h-100 p-t-15">
    <div class="m-l-10  add-host bg-center bg-no-repeat">
        <div class="add-bg h-100 flex justify-between align-center">
            <div class="m-l-15 user-name font-regular text-color flex align-center">
                <div class="user-icon bg-center bg-no-repeat text-center p-relative">
                    <span class="host d-inline-block p-absolute text-center font-12">主播</span>
                </div>
                <span class="font-14 font-500 text-color p-l-5">战神巴蒂渣渣</span>
            </div>
            <div class="user-qq m-r-30 font-13 font-regular font-500 text-center text-color bg-center bg-no-repeat">
                QQ：1242154125
            </div>
        </div>
    </div>
    <div class="message-section p-l-15 p-r-15">
        <message-row />
        <message-row />
        <message-row />
        <message-row />
        <message-row />
        <message-row />

    </div>
    <div class="footer p-l-15 p-r-15 w-100 p-absolute">
        <input-message/>
    </div>
</div>
</template>

<script>
import InputMessage from '@/components/InputMessage'
import MessageRow from '@/views/Broadcast/components/MessageRow'
export default {
    name: 'ChatRoom',
    components: {
        InputMessage,
        MessageRow
    }

}
</script>

<style lang="scss" scoped>
.add-host {
    width: 355px;
    height: 58px;
    .add-bg{
        background-image: url('../../../assets/images/host-bg.png');
        background-size: 100% 100%;
    }
    .user-name {
        .user-icon {
            width: 50px;
            height: 50px;
            margin-top: -20px;
            background-image: url('../../../assets/images/my/logo.png');
            background-size: 100% 100%;
        }
        .host {
            width: 44px;
            height: 16px;
            line-height: 16px;
            background-image: url('../../../assets/images/host-title-bg.png');
            background-size: 100% 100%;
            bottom: -5px;
            left: 2px;
        }
    }
}
.message-section {
    height: calc(100% - 135px);
    overflow-y: overlay;
}
.user-qq {
    width: 126px;
    height: 26px;
    line-height: 26px;
    background-image: url('../../../assets/images/qq-bg.png');
    background-size: 100% 100%;
}

.footer {
    height: 38px;
    left: 0;
    bottom: 20px;
}
</style>
