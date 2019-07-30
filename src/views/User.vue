<template>
    <div class="user">
       <tophead title="个人数据"></tophead>
       <div class="user_data">
       <userdata title="数据情况"></userdata>
       <userdata1 title="数据情况"></userdata1>
       <userdata2 title="数据情况"></userdata2>
       </div>
    </div>
</template>

<script>
import TopHead from '../components/TopHead';
import UserData from '../components/UserData';
import UserData1 from '../components/UserData1';
import UserData2 from '../components/UserData2';

    export default {
        name: 'user',
        data() {
            return {};
        },
        components: {
            tophead: TopHead,
            userdata: UserData,
            userdata1: UserData1,
            userdata2: UserData2
        }
    }
</script>

<style lang="scss" scoped>
.user{
    display: flex;
    flex-direction: column;
    height: 100%;
    .user_data{
        flex: 1;
        text-align: center;
        font-size: px2rem(26);
        margin-top: px2rem(10);
        color: blueviolet;
        display: flex;
         justify-content: space-around;
    }
}
</style>