<template>
    <div class="tinymce">
        <div class="article-box">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="主标题：">
                    <el-input v-model="formInline.article_title" placeholder="主标题"></el-input>
                </el-form-item>
                <el-form-item label="副标题：">
                    <el-input v-model="formInline.article_subtitle" placeholder="副标题"></el-input>
                </el-form-item>
                <el-form-item label="标签：">
                    <el-input v-model="formInline.article_label" placeholder="标签"></el-input>
                </el-form-item>

                <el-form-item label="活动性质：">
                    <el-select v-model="formInline.type" multiple placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章标题：">
                    <el-input v-model="formInline.article_label" placeholder="标签"></el-input>
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
                    article_label:"",
                    type:[]
                },
                options: [{
                    value: '前端',
                    label: '前端'
                }, {
                    value: '设计',
                    label: '设计'
                }],
                editorInit: {
                    language_url: '/tinymce/langs/zh_CN.js',
                    language: 'zh_CN',
                    skin_url: '/tinymce/skins/ui/oxide',
                    height: 700,
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
            article(){
                let data = this.formInline;
                console.log(data);
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