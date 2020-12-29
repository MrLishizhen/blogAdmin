<template>
    <div class="tabs">
        <span class="tabls-item" :class="{'hot':item.hot}"  v-for="item in tabs" :key = 'item.id.toString()'>
            <span class="tabls-item-text">{{item.name}}</span>
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
        props:['data'],
        computed:{
            tabs(){
                return this.$props.data;
            }
        }


    }
</script>

<style scoped lang="less">
.tabs{
    height:40px;
    flex-shrink: 0;
    background-color: #fff;
    display:flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    .tabls-item{
        cursor: pointer;
        margin-left:10px;
        height:30px;
        line-height:30px;
        padding:0 10px;
        border:1px solid #ccc;
        border-radius: 5px;
        &.hot{
            border-color:#409EFF;
            color:#409EFF;
        }
        &:hover{
            border-color:#409EFF;
            color:#409EFF;
        }

        .tabls-item-text{
            padding-right:5px;
        }
    }
}

</style>