<template>
    <div class="tinymce">
        <div class="article-box">
            <el-form :inline="true" :rules="rules" ref="add" :model="formInline" class="demo-form-inline">
                <el-form-item label="主标题：" prop="article_title">
                    <el-input v-model="formInline.article_title" placeholder="主标题"></el-input>
                </el-form-item>
                <el-form-item label="副标题：" prop="article_subtitle">
                    <el-input v-model="formInline.article_subtitle" placeholder="副标题"></el-input>
                </el-form-item>

                <el-form-item label="文章分类：" prop="type">
                    <el-select v-model="formInline.type"  placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章主题：" prop="briefIntroduction">
                    <el-input v-model="formInline.briefIntroduction" placeholder="文章主题"></el-input>
                </el-form-item>
<!--                <el-form-item label="活动区域">-->
<!--                    <el-select v-model="formInline.region" placeholder="活动区域">-->
<!--                        <el-option label="区域一" value="shanghai"></el-option>-->
<!--                        <el-option label="区域二" value="beijing"></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->

            </el-form>
        </div>

        <div class="editor"><Editor id="tinymce" v-model="content" :init="editorInit" :key="apiKey"></Editor></div>
        <div class="bottons">
            <el-button type="primary" plain @click="article">保存</el-button>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import {addarticle} from "@/api/admin"
    import tinymce from 'tinymce/tinymce'
    import Editor from '@tinymce/tinymce-vue'

    import 'tinymce/themes/silver'
    import 'tinymce/plugins/textcolor'
    import 'tinymce/plugins/advlist'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/lists'
    import 'tinymce/plugins/paste'
    import 'tinymce/plugins/preview'
    import 'tinymce/plugins/fullscreen'
    import 'tinymce/plugins/save'
    import 'tinymce/plugins/image'
    import 'tinymce/icons/default/icons'
    export default {
        name: "tinymce",
        data(){
            return {
                apiKey:"z9tnpf5q5ryv0zqk1f8zr61xrw7r50d1wdobrv0gnmq63u5d",
                content:"",
                formInline:{
                    article_title:"",
                    article_subtitle:"",
                    type:"",
                    briefIntroduction:""
                },
                rules: {
                    article_title: [
                        { required: true, message: '请输入主标题', trigger: 'blur' },
                        { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                    ],
                    article_subtitle: [
                        { required: true, message: '请输入副标题', trigger: 'blur' },
                        { min: 5, max: 15, message: '长度在 5 到 15 个字符', trigger: 'blur' }
                    ],
                    type:[
                        { required: true, message: '请至少选择一个分类', trigger: 'blur' }
                    ],
                    briefIntroduction: [
                        { required: true, message: '请输入文章主题', trigger: 'blur' },
                        { min: 10, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],

                },
                options: [{
                    value: '前端',
                    label: '前端'
                }, {
                    value: '设计',
                    label: '设计'
                }],
                imgString:"",
                editorInit: {
                    placeholder: '在这里输入文字...',
                    language_url: '/tinymce/langs/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/tinymce/skins/ui/oxide',
                    // images_upload_url:"/admin_article/addArticleImg",
                    // images_upload_base_path: '/tmp',
                    // // image_title: false,
                    // automatic_uploads: false,
                    height: 700,
                    images_upload_handler: this.imgUpload,
                    content_css:"/tinymce/skins/content/default/content.css",
                    browser_spellcheck: true, // 拼写检查
                    branding: false, // 去水印
                    elementpath: false, // 禁用编辑器底部的状态栏
                    statusbar: false, // 隐藏编辑器底部的状态栏
                    paste_data_images: true, // 允许粘贴图像
                    menubar: false, // 隐藏最上方menu
                    plugins: 'save advlist table lists paste preview fullscreen image',
                    toolbar: 'fontsizeselect forecolor backcolor bold italic underline strikethrough save image| alignleft aligncenter alignright alignjustify | quicklink h2 h3 blockquote table numlist bullist preview fullscreen'
                }
            }
        },
        methods:{
            imgUpload (blobInfo, success, failure) {
                console.log(123)
                const formData = new FormData();
                formData.append('files', blobInfo.blob(), blobInfo.filename());
                axios.post('/admin_article/addArticleImg', formData,{"Content-Type":"multipart/form-data"}).then((res) => {

                    if(res.data.success) {
                        this.$message({
                            message: '上传成功',
                            type: 'success',
                            center: true
                        });

                        let url = res.data
                        this.imgString += url
                        success(url)
                    } else {
                        this.$message({
                            message: '上传失败',
                            type: 'error',
                            center: true
                        });
                        failure('')
                    }
                }).catch((err) => {
                    this.$message({
                        message: '上传失败',
                        type: 'error',
                        center: true
                    });
                    failure('')
                })
            },
            // func(){
            //     console.log(1)
            // },
            article(){

                this.$refs['add'].validate((valid) => {
                    if (valid) {
                        let data = this.formInline;
                        data.content = this.content;
                        if(data.content==""){
                            this.$message.error("不允许文章内容为空");
                        }
                        //添加文章
                        addarticle(data).then(res=>{
                            if(res.status==200){
                                this.$message({
                                    message: res.message,
                                    type: 'success'
                                });
                            }else{
                                this.$message.error(res.message);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            }
        },
        components: {
            Editor
        }
    }
</script>

<style scoped lang="less">
    .tinymce{
        width:100%;
        height:100%;
        padding:10px;
        box-sizing: border-box;
        .article-box{
            .demo-form-inline{
                text-align:left;
            }
            height:calc(100% - 760px);
        }
        .bottons{
            height:60px;
            line-height:60px;
            text-align:right;
            margin-right:50px;
        }
    }
</style>