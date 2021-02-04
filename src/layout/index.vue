<template>
    <el-container>
        <!--        头部-->
        <el-header>
            <layout_head :user="user"></layout_head>
        </el-header>
        <el-container class="box">
            <!--            左侧导航-->
            <el-aside width="210px">
                <layout_nav :nav="nav"></layout_nav>
            </el-aside>
            <el-main class="main-box">
<!--                <layout_tabs :data="tabs"></layout_tabs>-->
                <div class="main-view">
                    <transition name="fade" mode="out-in">
                        <router-view class="routerbox"></router-view>
                    </transition>
                </div>
            </el-main>
        </el-container>
<!--        整体弹窗-->
        <layout_dialog :centerDialogVisible.sync ="centerDialogVisible" :testringdata="testringdata"></layout_dialog>
    </el-container>
</template>

<script>
    // @ is an alias to /src
    import {dllogin} from '@/api/admin'
    import layout_dialog from '../components/Dialog/index'
    import cookie from 'js-cookie'
    import {layout_head, layout_nav, layout_tabs} from './components'

    export default {
        name: 'Home',
        components: {
            layout_head,
            layout_nav,
            layout_tabs,
            layout_dialog
        },
        data() {
            return {
                nav: [],
                tabs: [],
                user:{},
                centerDialogVisible:false,
                testringdata:{}
            }
        },
        created() {
            //设置导航
            this.nav = this.$store.state.app.nav;
            //设置tabs
            this.tabs = this.$store.state.app.tabs;
            //获取用户信息
            this.userFunc();

        },
        watch:{
            '$store.state.dialog.centerDialogVisible':function(newval){
                   if(newval==true){
                       this.centerDialogVisible=newval;
                       this.testringdata=this.$store.state.dialog.data
                   }else{
                       this.centerDialogVisible=newval;
                       this.testringdata={}
                   }
                },

        },
        methods:{
            userFunc(){
                dllogin().then(res=>{
                    if(res.status==200){
                        this.user=res.data;

                        cookie.set("user",JSON.stringify(res.data));
                    }else{
                        this.$message(res.message);
                    }
                })

            }
        }
    }
</script>
<style lang="less" scoped>
    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateX(20%);
        opacity: 0;
    }
    .el-container {
        //顶部
        .el-header {
            background: #214fb4;
        }

        //下面内容区
        .box {

            //左侧导航栏
            .el-aside {
                background-color: rgb(48, 65, 86);
            }

            //下面内容区
            .el-main {
                &.main-box {
                    display: flex;
                    flex-direction: column;
                    background-color: #e0e0e0;
                    padding: 10px;
                }
                .routerbox{
                    background-color: #fff;
                    height:100%;
                    box-sizing: border-box;
                }
                .main-view {
                    flex-grow: 1;
                    overflow:hidden;
                    /*background-color: #fff;*/
                }
            }
        }

    }
</style>