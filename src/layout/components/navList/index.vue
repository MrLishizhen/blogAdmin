<template>
    <div>
        <el-menu
                default-active="1-1"
                class="el-menu-vertical-demo"
                background-color="#304156"
                text-color="#fff"
                active-text-color="#409EFF">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-notebook-1"></i>
                    <span>文章管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">
                        <i class="el-icon-first-aid-kit"></i>
                        <span>随心贴</span>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <i class="el-icon-connection"></i>
                        <span>技术分享</span>
                    </el-menu-item>
                    <el-menu-item index="1-3">
                        <i class="el-icon-date"></i>
                        <span>岁月年华</span>

                    </el-menu-item>
                    <el-menu-item index="1-4">
                        <i class="el-icon-edit"></i>
                        <span>添加文章</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span>网站管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="3-1">
                        <i class="el-icon-collection"></i>
                        <span>导航管理</span>
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="3-2">
                        <i class="el-icon-picture"></i>
                        <span>轮播图管理</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-user-solid"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="2-1">
                        <i class="el-icon-document"></i>
                        <span>用户列表</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>
<style>
    .el-menu-item-group__title {
        padding: 0 !important;

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