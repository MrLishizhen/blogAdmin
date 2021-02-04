<template>

    <el-dialog
            ref="  "
            :title="testringdata.title?testringdata.title:'信息弹窗'"
            :visible.sync="centerDialogVisible"
            :width="testringdata.width"
            :before-close="clone"
            modal
            append-to-body
            custom-class='customWidth'
    >
        <div class="testing-box">
            <component v-if='testringdata.compontShow' :is="testringdata.url"></component>
            <slot name="testingContent"></slot>
        </div>

    </el-dialog>
</template>

<script>
    //参数
    //1.centerDialogVisible ---弹窗是否关闭
    //2.testringdata-----弹窗的参数
    /*
    高度宽度必填
      1.width:宽度
      2.height:高度
      3.compontShow:是显示组件还是显示插槽
      4.url:要显示的组件的名称---现在只能用一个导入一个 还不能做到直接赋值就能用，以后研究研究
      5.title：title内容
    */
    export default {
        data() {
            return {
                
            };
        },
        props: ["centerDialogVisible","testringdata"],
        components: {
            Map,
        },
        computed:{
            width(){
                // let arr = Object.keys(this.testringdata);
                //
                // if(arr.length==0||this.testringdata==undefined){
                //     return "50%"
                // }else{
                //     return this.testringdata.width?this.testringdata.width:"50%";
                // }
            },

        },
        mounted(){
            //设置弹窗高度
            this.$refs.elDialog.$el.firstChild.style.height=this.testringdata.height?this.testringdata.height:'50%';
        },
        methods:{
            //关闭弹窗
            clone(){
                this.$store.commit("dialog/init",{isShow:false});
                // this.$emit("update:centerDialogVisible",false);//关闭前把父级centerDialogVisible的值改为false
            }
        }
    };
</script>
<style>
    .customWidth{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display:flex;
        flex-direction: column;

        margin-top:0!important;

    }
    .el-dialog__header{
        height:32px;
        padding:0;
        flex-shrink: 0;
        line-height:32px;
        text-align:left;
        padding-left:15px;
        background-color: #3492FF;

    }
    .el-dialog__body{
        flex-grow: 1;
    }
    .el-dialog__title{
        font-size:0.259259rem;
        color:#fff;
    }
    .el-dialog__headerbtn .el-dialog__close{
        color:#fff;
    }
    .el-dialog__headerbtn:hover .el-dialog__close{
        color:#fff;
    }
    .el-dialog__headerbtn{
        top:9px;
        /*top:0.296296rem;*/
        /*margin-top:-0.148148rem;*/
    }
</style>
<style lang="less" scoped>
    .hover{
        /*background: url(../../assets/login/tguo.png) no-repeat right center;*/
        color:#25C95E;
    }
    .bhover{
        /*background: url(../../assets/login/btguo.png) no-repeat right center;*/
        color:#25C95E;
    }
    .testing-box {
        width:100%;
        height:100%;
        h3 {
            margin-top:0;
            padding:0;
            height: 40px;
            line-height: 40px;
            margin-bottom: 20px;
            font-size: 16px;
        }
        .box,.box li{
            padding:0;
            margin:0;
            list-style: none;
        }
        .box{
            margin:0 50px 30px;
            li{
                line-height:50px;
                display:flex;
                width:100%;
                text-align:left;
                .testing-title{
                    flex-shrink: 0;
                    width:100px;
                }
                .testing-cont{
                    flex-grow: 1;
                    font-weight: bold;
                }
                .testing-i{
                    width:28px;
                    padding-right:23px;
                    flex-shrink: 0;
                }
            }
        }
    }
</style>