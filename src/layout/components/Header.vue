<template>
    <div class="header">
        <div class="header-logo">

        </div>
        <div class="header-list"></div>
        <div class="header-user"></div>
    </div>
</template>

<script>
    export default {
        name: "Head"
    }
</script>

<style scoped lang="less">
    .header{
        height:100%;
        display:flex;
        align-items: center;
        .header-logo{
            width:60px;
            height:30px;
            border-radius: 3px;
            background:url("../../assets/home/logo.png") no-repeat center/100%;
        }
    }
</style>