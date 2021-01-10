<template>
    <div class="login">
        <div class="login-box">
            <div class="header">
                <h2>后台登录界面</h2>
            </div>
            <div class="login-content">
                <el-form  :model="formInline" ref="ruleForm" hide-required-asterisk :rules="rules" label-width="100px" class="form">
                    <el-form-item label="用户名" class="form-item" prop="name">
                        <el-input v-model="formInline.name" class="el-inputs" placeholder="输入账号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码"  class="form-item"  prop="pwd">
                        <el-input v-model="formInline.pwd" type="password" class="el-inputs" placeholder="输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码"  class="form-item"  prop="captcha">
                        <el-input v-model="formInline.captcha" class="el-inputs" placeholder="请输入验证码">
                            <template slot="append">
                                <div style="height:100%;border:none"  @click="captchaClick" v-html="captcha"></div>
                            </template>
                        </el-input>
                    </el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import {captcha ,login} from '../../api/admin'
    import cookie from 'js-cookie'
    export default {
        name: "index",
        data(){
            return {
                formInline:{
                    name:"",
                    pwd:"",
                    captcha:"",
                },
                captcha:"",
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    captcha: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ],
                }
            }
        },
        created() {
            captcha().then(res=>{
                this.captcha=res.data;
            });
        },

        methods:{
             submitForm(formName) {
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       login(this.formInline).then(res=>{
                            if(res.status==200){
                                this.$message('登录成功');
                                cookie.set("userToken",res.data);
                                _this.$router.replace("/Home/heart").catch(()=>{});
                            }else{
                                this.captchaClick();
                                this.$message.error(res.message);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            captchaClick(){
                captcha().then(res=>{
                    this.captcha=res.data;
                });
            },
            // routerFunc(){
            //     await this.$store.dispatch("app/init");
            //     let routerlink = this.$store.state.app.routerLink;
            //
            //     let arr = [];
            //     let home= {
            //         path:'/Home',
            //         name:"Home",
            //         component:import(`@/layout/index.vue`),
            //     }
            //     home.children=[];
            //     let routerLinks = routerlink.filter(item=>item.routerName!='');
            //
            //     routerLinks.forEach((item,i)=>{
            //         let data = {};
            //         data.path=item.routerName;
            //         data.component = import(`@/views/${item.routerName}/index.vue`);
            //         home.children.push(data);
            //     });
            //     arr.push(home);
            //
            //     await this.$router.addRoutes(arr);
            //
            // }
        }
    }
</script>


<style>
    .el-form-item__label{
        height:100%;
        line-height:40px!important;
    }
    .el-input__inner:focus{
        border-color:#ccc;

    }
    .el-input__inner{
        height:100%!important;
    }
    .el-input-group__append{
        min-width:80px;
        height:32px;
        border:none;
    }
</style>
<style scoped lang="less">
.login{
    width:100%;
    height:100%;
    background: url(../../assets/home/login.jpeg);
    .login-box{
        width:500px;
        height:400px;
        background-color: rgba(0,0,0,.08);
        position:fixed;
        display:flex;
        flex-direction: column;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);

        .header{
            height:40px;
            line-height:40px;
            text-align:center;
            padding-left:15px;
            color:#e8e8e8;
            padding-top:20px;
        }
        .login-content{
            height:calc(100% - 60px);
            padding:50px 15px 15px;
            box-sizing: border-box;
            .form{
                padding:0 30px;

                .form-item{
                    margin-bottom: 30px;
                }
                .el-inputs{
                    height:40px;
                }
                .el-button{
                    width:50%;

                }
            }
        }
    }
}

</style>