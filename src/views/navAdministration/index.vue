<template>
    <div class="nav-list">
        <div class="nav-list-top">
            <el-button type="primary" icon="el-icon-plus" @click="dialogfunc(0)">添加</el-button>
        </div>
<!--        添加导航栏弹窗-->
        <el-dialog
                :title="dialogTitle"
                :visible.sync="dialogVisible"
                width="450px"
                >
            <div class="input-box">
                <el-input
                        placeholder="请输入内容"
                        v-model="navInput"
                        clearable>
                </el-input>
            </div>
            <div class="input-box">
                <el-input
                        placeholder="请输入路由地址"
                        v-model="navInputUrl"
                        clearable>
                </el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addClose(0)">取 消</el-button>
                <el-button type="primary" @click="dialogI==0?addClose(1):modify()">确 定</el-button>
            </span>
        </el-dialog>
<!--        下面内容-->
        <div class="nav-list-bom">
            <div class="bom-content">
                <el-tree
                        :data="list"
                        node-key="id"
                        default-expand-all
                        :expand-on-click-node="false"
                >
                    <div class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                            <el-checkbox @change="checkChang(data)" :checked="data.list_show==1?true:false"
                                         v-model="data.list_show">{{data.list_show==1?"显示":"隐藏"}}</el-checkbox>
                            <i class="el-icon-delete marginL" @click="deleteNav(data.id)"></i>
                            <i class="el-icon-edit marginL" @click="dialogfunc(1,data.id)"></i>
                        </span>
                    </div>
                </el-tree>
            </div>
        </div>
    </div>
</template>

<script>
    import {navAdministration, navAdministrationState,addNav,deleteState,updateState} from "@/api/admin.js"
    import {navChildren} from "@/util/func";

    export default {
        name: "navAdministration",
        data() {
            return {
                dialogTitle:"添加导航栏",
                dialogI:0,
                dialogVisible: false,//添加弹窗
                nav: [],
                navInput:"",//导航栏
                navInputUrl:"",//导航栏地址
                navInputId:0,
            }
        },
        computed: {
            list() {
                for (let i = 0; i < this.nav.length; i++) {
                    this.nav[i].label = this.nav[i].nav_title;
                }
                return navChildren(this.nav)
            }
        },
        created() {
            this.navAdministrationFunc();
        },
        methods: {
            //判断是修改还是新增
            dialogfunc(i,id){
                if(i==0){
                    //新增
                    this.dialogTitle="添加栏目";
                    this.dialogI=0;
                }else{
                    //修改
                    this.dialogTitle="修改栏目";
                    this.dialogI=1;
                    let data = this.nav.find(item=>item.id==id);
                    console.log(data);
                    this.dialogVisible=true;
                    //拿出当前条目数据
                    this.navInput=data.label;
                    this.navInputUrl = data.icon;
                    this.navInputId=id;
                }
            },
            modify(){
                //准备修改
                let id = this.navInputId;
                let value = this.navInput;
                let url =  this.navInputUrl
                updateState({name:value,icon:url,id:id}).then(res=>{
                    if(res.status==200){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.nav=[];
                        this.navAdministrationFunc();
                    }else{
                        this.$message.error("修改失败")
                    }
                })
            },
            //删除数据
            deleteNav(id) {
                this.$confirm('确认删除？')
                    .then(_ => {
                        deleteState({id}).then(res=>{
                            if(res.status==200){
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
                                this.nav=[];
                                this.navAdministrationFunc();
                            }else{
                                this.$message.error("删除失败")
                            }
                        })
                    })
                    .catch(_ => {});


            },
            //添加数据
            addClose(i) {
                if(i){
                    let value = this.navInput;
                    let url = this.navInputUrl;
                    let index = this.nav.findIndex(item=>item.name==value);
                    if(index==-1){
                       addNav({value:value,fid:0,url:this.navInputUrl}).then(res=>{
                            if(res.status==200){
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                //从新请求数据
                                this.nav=[];
                                this.navAdministrationFunc();
                            }else{
                                this.$message.error("添加失败");
                                this.dialogVisible = false;
                            }

                        })
                    }else{
                        this.$message.error("当前栏目已存在!")
                    }
                }else{
                    this.navInput="";
                    this.navInputUrl="";
                    this.dialogVisible=false;
                }
            },
            //请求后台参数
            navAdministrationFunc() {
                navAdministration().then(res => {
                    if (res.status == 200) {
                        this.nav = res.data;
                    }
                    if(this.dialogVisible){
                        this.dialogVisible=false;
                    }
                })
            },
            //监控每个值的修改
            checkChang(ch) {
                let show = ch.list_show ? 1 : 0;
                navAdministrationState({list_show: show, id: ch.id}).then(res => {
                    if (res.message == '修改成功') {
                        this.$message(res.message);
                    } else {
                        this.$message.error(res.message);
                        let index = this.nav.find(item => item.id == ch.id);
                        index.list_show = !ch.list_show;
                    }

                })
            }
        }
    }
</script>

<style scoped lang="less">
    .nav-list {
        text-align:left;
        height: 100%;
        display: flex;
        flex-direction: column;

        .nav-list-top {
            height: 60px;
            flex-shrink: 0;
            padding: 0 15px;
            display: flex;
            align-items: center;
        }

        .nav-list-bom {
            flex-grow: 1;

            .bom-content {
                max-width: 600px;
            }
        }

        .marginL {
            margin-left: 15px;
        }
        .input-box{
            margin-bottom: 10px;
        }
        .custom-tree-node {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
            padding-right: 8px;
        }
    }
</style>