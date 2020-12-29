<template>
    <div>
        <el-menu
                :default-active="defaultActive"
                class="el-menu-vertical-demo"
                background-color="#304156"
                text-color="#fff"
                router
                @select="select"
                active-text-color="#409EFF">
            <el-submenu :index="item.id" v-for="item in nav" :key='item.id.toString()'>
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.name}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :index="items.routerUrl" v-for="items in item.children" :key="items.id.toString()">
                        <i :class="items.icon"></i>
                        <span>{{items.name}}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "navlist",
        data() {
            return {
                path: ""
            }
        },

        computed: {

            //设置默认的选中
            defaultActive() {
                let nav = this.$props.nav;
                let route = this.$route.path;

                let defaultA = 0
                let data = ['首页'];
                let name = '';
                let fname = '';
                for (let i = 0; i < nav.length; i++) {
                    for (let j = 0; j < nav[i].children.length; j++) {
                        if (nav[i].children[j].routerUrl == route) {
                            name = nav[i].children[j].name;
                            fname = nav[i].name;
                            if (fname != '') {
                                data.push(fname);
                            }
                            if (name != '') {
                                data.push(name);
                            }
                            break;
                        }
                    }
                }
                this.$store.commit('app/bar', data);
                defaultA = route;
                return defaultA;
            }

        },
        methods: {
            select(index, indexPath) {

                let nav = this.$props.nav;
                let tabs = this.$store.state.app.tabs;
                let [i, paths] = indexPath;

                let data = nav[i - 1];
                let name = '';
                // let show = 0;
                if (data.children) {
                    let path = data.children.find(item => item.routerUrl == paths);
                    // path.hot = true;
                    // for (let i = 0; i < tabs.length; i++) {
                    //     if (tabs[i].name == path.name) {
                    //         show = 1;
                    //
                    //     }else{
                    //         tabs[i].hot = false;
                    //     }
                    //
                    // }
                    // if (show != 1) {
                    //     path.hot = true;
                    //     tabs.push(path);
                    //
                    // }
                    // this.$store.commit('app/tabs', tabs);
                    path ? name = path.name : name = "";
                }
                let list = ['首页'];
                if (data.name != '') {
                    list.push(data.name);
                    if (name != '') {
                        list.push(name);
                    }
                }
                this.$store.commit('app/bar', list);
            }
        },
        props: ['nav']
    }
</script>
<style>
    .el-menu-item-group__title {
        padding: 0 !important;

    }

    .el-menu .el-submenu .el-menu-item {
        height: 40px;
        line-height: 40px;
    }
</style>
<style scoped>
    .el-menu {
        padding-top: 20px;
        border-right: 0;
        text-align: left;
    }

    .el-menu-item.is-active {
        color: #fff !important;
        background-color: #409EFF !important;
    }

</style>