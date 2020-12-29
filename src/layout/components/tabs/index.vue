<template>
    <div class="tabs">
        <span class="tabls-item"  v-for="item in data" :key = 'item.id'>
            <span class="tabls-item-text">{{item.text}}</span>
            <i  class="tabls-item-i el-icon-circle-close"></i>
        </span>
    </div>
</template>

<script>
    export default {
        name: "tabs",
        data(){
            return{


            }
        },
        props:['data']
    }
</script>

<style scoped>
.tabs{
    height:40px;
    flex-shrink: 0;
    background-color: #fff;
}

</style>