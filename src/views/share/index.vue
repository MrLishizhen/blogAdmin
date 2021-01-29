<template>
    <div class="share">
        <div class="share-top">
            <el-form ref="form" :inline="true">
                <el-form-item label="文章名称：">
                    <el-input v-model="form.article_title"></el-input>
                </el-form-item>
                <el-form-item label="文章副标题：">
                    <el-input v-model="form.article_subtitle"></el-input>
                </el-form-item>
                <el-form-item label="标签：">
                    <el-select v-model="form.article_label">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="前端" value="web"></el-option>
                        <el-option label="设计" value="ui"></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="文章作者：">
                    <el-input v-model="form.article_user"></el-input>
                </el-form-item>
                <el-form-item label="时间范围：">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.article_date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align:center">-</el-col>
                    <el-col :span="11">
                        <el-date-picker placeholder="选择时间" v-model="form.article_date2" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search">搜索</el-button>

                </el-form-item>
            </el-form>
        </div>
        <div class="share-com">
            <tablelsz  :col="tableDatas.col" :data="tableDatas.data" :columnType="'index'"></tablelsz>
        </div>

    </div>
</template>

<script>
    import tablelsz from '@/components/tablesCom.vue';
    import {getTable} from "@/api/admin.js";
    export default {
        name: "share",
        data(){
            return{
                tableDatas:{
                    data:[],
                    col:[],
                    index:"index"
                },
                form:{
                    article_title:"",//主标题
                    article_subtitle:"",//副标题
                    article_label:"",//标签
                    article_date1:"",//开始时间
                    article_date2:"",//结束时间
                    article_user:""
                },
                currentPage:1,
                page_size:50,
                count:1000,
            }
        },
        components:{tablelsz},
        created() {
            this.gettable()
        },
        methods:{


            gettable(){
                const data = {};
                data.article_title=this.form.article_title;
                data.article_subtitle = this.form.article_subtitle;
                data.article_label = this.form.article_label;
                data.date = this.form.article_date1 ? this.form.article_date1 :"" +"#" + this.form.article_date2 ? this.form.article_date2:"";
                data.article_user = this.form.article_user;
                data.currentPage = this.currentPage;
                data.page_size = this.page_size;
                //获取数据
                getTable(data).then(res=>{
                    let col = [
                        {
                            label:"主标题",
                            prop:"article_title",

                        },
                        {
                            label :"副标题",
                            prop:"article_subtitle"
                        },
                        {
                            label:"标签",
                            prop:"article_label"
                        },
                        {
                            label:"作者",
                            prop:"article_user",
                            sort:true,
                            template:(e)=>{
                                return e.article_user
                            }
                        },
                        {
                            label :"点赞数",
                            prop:"article_hot",
                            sort:true
                        },{
                            label:"文章浏览量",
                            prop:"article_count"
                        },{
                            label:"操作",
                            prop:"",
                            fixed:'right',
                            template:(e)=>{

                            }
                            // btns:[
                            //     {
                            //         label:"删除",
                            //         type:"danger",
                            //         icon:"",
                            //         disabled:false,
                            //         size:'mini'
                            //     },{
                            //         label:"隐藏",
                            //
                            //     }
                            // ]
                        }
                    ];
                    if(res.status==200){
                        this.tableDatas.data=res.data;
                        this.tableDatas.col = col;
                    }else{

                    }
                    // console.log(res);
                });
            }
        }
    }
</script>

<style scoped lang="less">
.share{
    height:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    .share-top{
        padding:10px 15px 0;
        text-align:left;
        flex-shrink: 0;
    }

    .share-com{
        flex-grow: 1;
        box-sizing: border-box;
        padding:0 15px;
    }
}
</style>