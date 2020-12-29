<template>
    <el-container>
<!--        头部-->
        <el-header>
            <layout_head></layout_head>
        </el-header>

        <el-container class="box">
<!--            左侧导航-->
            <el-aside width="210px">
                <layout_nav :nav="nav"></layout_nav>
            </el-aside>
            <el-main class="main-box">
                <layout_tabs></layout_tabs>
                <div class="main-view">
                    <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    // @ is an alias to /src

    import {layout_head,layout_nav,layout_tabs} from './components'
    export default {
        name: 'Home',
        components:{
            layout_head,
            layout_nav,
            layout_tabs
        },
        data(){
            return{
                nav:[]
            }
        },
        created() {
           this.nav=this.$store.state.app.nav;
        },
        watch:{
            "$route.path":function(newOver,old){

            }
        }
    }
</script>
<style lang="less" scoped>
    .el-container{
        //顶部
        .el-header{
            background: #214fb4;
        }
        //下面内容区
        .box{

            //左侧导航栏
            .el-aside{
                background-color: rgb(48, 65, 86);
            }
            //下面内容区
            .el-main{
                &.main-box{
                    display:flex;
                    flex-direction: column;
                    background-color: #e0e0e0;
                    padding:10px;
                }
                .main-view{
                    flex-grow: 1;
                    background-color: #fff;
                }
            }
        }

    }
</style>