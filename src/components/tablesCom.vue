<template>
    <div class="tableBox" ref="tableBox">
        <el-table
                v-loading="loading"
                ref="table"
                :data="tableData"
                :border="border"
                :height="height"
                style="width:100%"
        >
<!--            表格第一列显示内容-->
            <el-table-column
                 v-if="columnType"
                 :type="columnType"
                 label="序号"
                 width="50"
            >
            </el-table-column>


            <template v-for="(item,i) in col">
<!--                btn按钮组-->
                <el-table-column
                        v-if="item.btns"
                        :prop="item.prop"
                        :label="item.label"
                        :sortable="item.sort"
                        :width="item.width?item.width:'auto'">
                    <template  slot-scope="scope">
<!--                        type:primary,success,info,warning,danger-->
                        <el-button v-for="(btn,btnI) in item.btns" :key="btnI"
                            :type="btn.type"
                            :icon="btn.icon"
                            :disabled="btn.disabled"
                            :size="btn.size"
                            :fixed="btn.fixed"
                        >
                            {{btn.label}}
                        </el-button>
                    </template>
                </el-table-column>
<!--                slot动态展示-->
                <el-table-column
                        v-else-if="item.template&& (typeof item.template)=='function'&&item.slot"
                        :prop="item.prop"
                        :label="item.label"
                        :sortable="item.sort"
                        :width="item.width?item.width:'auto'">
                    <template  slot-scope="scope">
                        <div>
                            <slot :name=" "></slot>
                        </div>
                    </template>
                </el-table-column>
<!--                动态设置内容显示-->
                <el-table-column
                        v-else-if="item.template&& (typeof item.template)=='function'"
                        :prop="item.prop"
                        :label="item.label"
                        :sortable="item.sort"
                        :width="item.width?item.width:'auto'">
                    <template  slot-scope="scope">
                        <div v-html="item.template(scope.row)"></div>
                    </template>
                </el-table-column>
<!--                基础内容-->
                <el-table-column
                    v-else
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width?item.width:'auto'">
                </el-table-column>

            </template>
        </el-table>
        <div class="page" v-if="count">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage"
                    :page-size="page_size"
                    layout="total, prev, pager, next,sizes"
                    :page-sizes="pageSizes"
                    :total="count">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    /*
    * 需求
    * 1.动态传入表头col(包含width label prop )
    * 2.动态传入数据data
    * 3.可以动态改变表格的内容和表头内容(表头内容动态传入暂不进行，先传入label)
    * 4.动态计算表格高度(后期增加page)
    * 5.增加表格序号的修改默认传入序号，可修改为其他的模式
    *
    *
    * */
    export default {
        name:'tables',
        data(){
            return{
                loading:true,
                height:0,
                tableData:[],
                kongdata:[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
                kongcol: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
            }
        },
        watch:{

            data:{
                //如果请求数据为空就把数据清除为kongdata
                handler:function(val){
                    if(val.length==0){
                        this.tableData = this.kongdata;
                    }else{
                        this.tableData = val;
                    }
                    this.loading=false;
                },
                deep:true
            }
        },
        computed:{
            tableDatas:function(){
                // if(this.data.length==0){
                //     return kongdata;
                // }else{
                //     return this.data;
                // }
            }
        },
        props:{
            col:{
                type:Array,
                default: () => [],
            },
            data:{
                type:Array,
                required: true
            },
            columnType:{
                type:String,
                default:"",
            },
            border:{
                type:String,
                default: 'border'
            },
            currentPage:{
                type:Number,
                default:1
            },
            page_size:{
                type:Number,
                default:50
            },
            count:{
                type:Number,
                default:0
            },
            layout:{
                type:String,
                default:"total, prev, pager, next,sizes"
            },
            pageSizes:{
                type:Array,
                default:()=>[50, 100, 150, 200]
            }
        },
        mounted() {
            this.fetTableHeight();
            // // console.log(this.$props.col);
            // let table = this.$refs.tableBox;
            // // // let tableParent = table.parentNode;
            //
            // this.height =  table.clientHeight;
            // console.log(table.clientHeight);

        },
        methods:{
            //监听每页总数切换
            handleSizeChange(val) {
                // this.page_size=val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            resetHeight() {
                return new Promise((resolve, reject) => {
                    this.height= 0;
                    resolve()
                })
            },
            // 设置table高度
            fetTableHeight() {
                this.resetHeight().then(res => {
                    //判断请求的数据
                    if(!this.count<=50){
                        this.height = this.$refs.tableBox.getBoundingClientRect().height-15;
                    }else{
                        this.height = this.$refs.tableBox.getBoundingClientRect().height-60;
                    }

                })
            }
        },


    }
</script>
<style lang="less">
    .has-gutter th {
        height: 40px;
    }

    .el-table th {
        background-color: #f5f7fa;
    }

    .el-table__body-wrapper tr {
        height: 38px;
    }

    .el-table td, .el-table th {
        padding: 0;
    }

    .td-number {
        text-align: center;
    }
   /*.el-table__header .el-table-column--selection div:first-child,.el-table__row .el-table-column--selection div:first-child{*/
   /*     text-align: center;*/
   /* }*/
    .el-table {
        /*height:100%;*/
    }
</style>
<style scoped lang="less">
    .tableBox {
        height: 100%;

        .asc {
            border-bottom-color: #409EFF;
        }

        .desc {
            border-top-color: #409EFF;
        }
        .page{
            display:flex;
            align-items: center;
            height:60px;
            padding-left:15px;
            flex-shrink: 0;
            text-align:left;
        }
    }
</style>