<template>
    <div class="tableBox" ref="tableBox">
        <el-table
                :data="tablesData"
                :border="tableData.border||true"
                style="width: 100%;">
            <el-table-column class="td-number"
                             :type="tableData.index||''"
                             width="50"
                             label="序号"
            >
            </el-table-column>
            <template v-for="(item,i) in tablescol">
                <el-table-column
                        v-if="!item.template"
                        :prop="item.prop"
                        :label="item.label"
                        :sortable="item.sort"
                >
                </el-table-column>
                <!--                判断是不是有自己的执行函数-->
                <el-table-column
                        :prop="item.prop"
                        :label="item.label"
                        v-else-if="item.template&& (typeof item.template)=='function'"
                >
                    <template slot="header" slot-scope="scope">
                        <div class="table-header">
                            <div @click="item.sort?setSort(item,$event):''">{{item.label}}
                                <span class="caret-wrapper" v-if="item.sort">
                                    <i class="sort-caret ascending" :class="{'asc':sortVal == 'asc'}" ref="asc"></i>
                                    <i class="sort-caret descending" :class="{'desc':sortVal == 'desc'}" ref="desc"></i>
                                </span>
                            </div>
                        </div>
                    </template>
                    <template slot-scope="scope">
                        <div v-html="item.template(scope.row)"></div>
                    </template>
                </el-table-column>

            </template>
        </el-table>
    </div>
</template>

<script>
    let kongcol = [{},{},{},{},{},{},{},{},{},{}];
    let kongdata=[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
    import {deepClones} from '@/util/func'

    export default {
        name: "tablesCom",
        data(){
            return{
                height:0,
                data:[],//表格原始数据
                sortVal:"",
                tableD:[],//保留活动的值
            }
        },
        computed:{

            tablescol(){

                let col = col;
                if(Array.isArray(col)){
                    if(col.length==0){
                        return kongcol
                    }else{
                        // console.log(col);
                        return col;
                    }
                }else{
                    return kongcol;
                }

            },

            tablesData(){
                let tablesData = this.tableD;
                // this.data = deepClones(data);
                if(Array.isArray(tablesData)){
                    if(tablesData.length==0){
                        return kongdata;
                    }else{
                        return tablesData;
                    }
                }else{
                    return kongdata;
                }
            }
        },
        /*
        * tableData {}
        * 包含表格数据
        * data表格数据
        * height
        * 表格高度
        * border
        * 表格是否有边框
        *
        * */
        props:["tableData",'col'],
        watch:{
            "tableData.data":function(newVal, oldVal) {
                if(Array.isArray(newVal)&&newVal.length>0){
                    this.setheight='index';
                }
                this.tableD = newVal;
                this.data = deepClones(newVal);
            },
        },
        mounted() {
            // //获取元素父元素的高度
            this.$nextTick(()=>{
                this.getHeight();
                console.log(this.height);
                if(!this.height){
                    this.getHeight();
                }
            })

        },
        methods:{
            //动态获取元素高度
            getHeight(){
                let table = this.$refs.tableBox;
                // let tableParent = table.parentNode;

                this.height =  table.clientHeight;
            },
            //动态表示排序坐标
            //明日任务，根据当前排序方式，对数据进行排序
            setSort(val,e){
                //判断点击对象
                let tablesData = this.$props.tableData.data;
                let targetName = e.target;
                let asc = this.$refs.asc[0];
                let desc = this.$refs.desc[0];
                let sortVal = this.sortVal;

                let tab = val.prop;

                if(targetName==asc||targetName==desc){
                    targetName==asc ? sortVal = "asc" : sortVal ="desc";
                    this.sortVal == sortVal?this.sortVal="":this.sortVal=sortVal;
                }else{
                    // console.log(1)
                    if(sortVal==""){
                        sortVal = "asc";
                    }else if(sortVal =="asc"){
                        sortVal ="desc";
                    }else{
                        sortVal = "";
                    }
                    tablesData.sort(function(a,b){
                        if(sortVal==""){
                            //

                        }
                    })
                    this.sortVal = sortVal;
                }



            }
        }

    }
</script>
<style lang="less">
    .has-gutter th{
        height:40px;
    }
    .el-table th{
        background-color: #f5f7fa;
    }
    .el-table__body-wrapper tr{
        height:38px;
    }
    .el-table td, .el-table th{
        padding:0;
    }
    .td-number{
        text-align: center;
    }
    .el-table{
        /*height:100%;*/
    }
</style>
<style scoped lang="less">
    .tableBox{
        height:100%;
        .asc{
            border-bottom-color: #409EFF;
        }
        .desc{
            border-top-color: #409EFF;
        }
    }
</style>