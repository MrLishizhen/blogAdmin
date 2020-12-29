<template>
    <div class="header">
        <div class="header-logo">

        </div>
        <div class="header-list">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,i) in bar" :key="i.toString()">
                    <span class="color">{{item}}</span>
                </el-breadcrumb-item>

            </el-breadcrumb>
        </div>
        <div class="header-user">
            <div class="user">
                <div class="user-img"><img src=""></div>
                <div class="user-name">秋雨</div>
            </div>
            <ul class="list">
                <li>
                    账号设置
                </li>
                <li>退出登录</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Head",
        data(){
            return{

            }
        },
        created() {

        },
        computed:{
          bar(){
              let bar = this.$store.state.app.bar;
              let i = bar.indexOf('');
              if(i==-1){
                  return bar;
              }else{
                  let data = [];
                  bar.forEach((item)=>{
                      if(item!=''){
                          data.push(item);
                      }
                  })
                  return data;
              }
          }
        },
        mounted(){

        }
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
            flex-shrink: 0;
            border-radius: 3px;
            background:url("../../assets/home/logo.png") no-repeat center/100%;
        }
        .header-list{
            flex-grow: 1;
            margin-left:120px;
            .color{
                color:#fff;
                &:hover{
                  color:#fff;
                }
            }
        }
        .header-user{
            flex-shrink: 0;
            width:200px;
            height:100%;
            /*background-color: #E6E6EC;*/
            position:relative;
            .user{
                width:100%;
                height:100%;
                display:flex;
                justify-content: center;
                align-items: center;
                .user-img{
                    flex-shrink: 0;
                    width:50px;
                    height:50px;
                    margin-left:20px;
                    img{
                        width:100%;
                        height:100%;
                        border-radius: 5px;
                    }
                }
                .user-name{
                    flex-grow: 1;
                    height:100%;
                    line-height:60px;
                    padding-left:20px;
                    text-align:left;
                    color:#fff;
                }
            }
            &:hover .list{
                display:block;
            }
            .list{
                width:100%;
                height:90px;
                padding:5px;
                box-sizing: border-box;
                background-color: #fff;
                display:none;
                top:60px;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                position:absolute;
                bottom:0;
                left:0;
                z-index:4000;
                li{
                    height:40px;
                    line-height:40px;
                    cursor: pointer;
                    &:hover{
                        background-color: #f0f0f0;
                    }
                }
            }
        }
    }
</style>