// import router from 'vue-router'
import router from "../router";
import {nav} from '../api/admin'
import {navChildren,deepClone} from '../util/func'
export default {
    namespaced: true,
    state: {
        routerLink:[],
        nav: [
            // {
            //     name: "文章管理",
            //     id: '1',
            //     fid: "0",
            //     routerUrl: "",
            //     icon: "el-icon-notebook-1",
            //     children: [
            //         {
            //             name: "随心贴",
            //             id: '4',
            //             fid: "1",
            //             routerUrl: "/Home/heart",
            //             icon: "el-icon-first-aid-kit",
            //         },
            //         {
            //             name: "技术分享",
            //             id: '5',
            //             fid: "1",
            //             routerUrl: "/Home/share",
            //             icon: "el-icon-connection",
            //         },
            //         {
            //             name: "岁月年华",
            //             id: '6',
            //             fid: "1",
            //             routerUrl: "/Home/years",
            //             icon: "el-icon-date",
            //         },
            //         {
            //             name: "添加文章",
            //             id: '7',
            //             fid: "1",
            //             routerUrl: "/Home/addArticle",
            //             icon: "el-icon-edit",
            //         },
            //     ]
            // },
            // {
            //     name: "网站管理",
            //     id: '2',
            //     fid: "0",
            //     routerUrl: "",
            //     icon: "el-icon-s-tools",
            //     children: [
            //         {
            //             name: "导航管理",
            //             id: '8',
            //             fid: "2",
            //             routerUrl: "/Home/navAdministration",
            //             icon: "el-icon-collection",
            //         },
            //         {
            //             name: "轮播图管理",
            //             id: '9',
            //             fid: "2",
            //             routerUrl: "/Home/imgAdministration",
            //             icon: "el-icon-picture",
            //         },
            //     ]
            // },
            // {
            //     name: "用户管理",
            //     id: '3',
            //     fid: "0",
            //     routerUrl: "",
            //     icon: "el-icon-user-solid",
            //     children: [
            //         {
            //             name: "用户列表",
            //             id: '10',
            //             fid: "3",
            //             routerUrl: "/Home/user",
            //             icon: "el-icon-document",
            //         },
            //     ]
            // }
        ],
        bar: ['首页'],
        // tabs: [
        //     {
        //         name: "随心贴",
        //         id: '4',
        //         fid: "1",
        //         routerUrl: "/Home/heart",
        //         icon: "el-icon-first-aid-kit",
        //         hot: true,
        //     }
        // ]
    },
    getters: {},
    mutations: {
        bar(state, data) {
            state.bar = data;
        },
        init(state,data){
            state.nav = data;
        },
        initRouter(state,data){
            state.routerLink=data;
        }

    },
    actions: {
        init({state,commit}){
            return new Promise((resolve,reject)=>{
                nav().then(res=>{
                    commit('initRouter',res.data);

                    let navData = deepClone(res.data);
                    let data = navChildren(navData);
                    commit("init",data);
                    resolve(res.data);
                })
            })

        }

    }
}