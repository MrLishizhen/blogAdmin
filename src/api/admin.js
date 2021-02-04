import Axios from '../util/http'
import qs from 'qs'
import cookie from "js-cookie";
export function nav(){
   return Axios({
        url:'/admin/nav',
        methods:'GET',
       loading:false,
    });
}
export function captcha (){
    return Axios({
        url:'/admin/captcha',
        method:'GET',
        loading:false,
        GetShow: false
    });
}
//登录
export function login(data){
    data.captcha=data.captcha.toLowerCase();
    return Axios({
        url:'/admin/login',
        method:'POST',
        data:data,
        loading:false,
        GetShow: false
    });
}

//获取用户信息
export function dllogin(){
    return Axios({
        url:'/admin/dllogin',
        headers:{
            Authorization:cookie.get("userToken")
        },
        method:'POST',
        loading:false,
        GetShow: false
    });
}
//上传文章/addarticle
export function addarticle(data){
    return Axios({
        url:'/admin_article/addarticle',
        data:data,
        headers:{
            Authorization:cookie.get("userToken")
        },
        method:'POST',
        loading:false,
        GetShow: false
    });
}

//图片上传
export function uploadImge(data){
    return Axios({
        url:'/admin_article/addArticleImg',
        data:data,
        headers:{
            Authorization:cookie.get("userToken")
        },
        method:'POST',
        loading:false,
        GetShow: false
    });
}

//请求后台一级参数
export function navAdministration(){
    return Axios({
        url:'/admin/navAdministration',
        headers:{
            Authorization:cookie.get("userToken")
        },
        method:'POST',
        loading:false,
        GetShow: false
    })
}
//显示隐藏栏目
export function navAdministrationState(data){
    return Axios({
        url:'/admin/navAdministration/state',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}
//添加栏目
export function addNav(data){
    return Axios({
        url:'/admin/navAdministration/addState',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}
//删除栏目
export function deleteState(data){
    return Axios({
        url:'/admin/navAdministration/deleteState',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}

//修改栏目
export function updateState(data){
    return Axios({
        url:'/admin/navAdministration/updateState',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}

//获取文章表格数据
export function getTable(data){
    return Axios({
        url:'/admin/share/gettable',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}

//获取文章表格数据
export function setTableHot(data){
    return Axios({
        url:'/admin/share/setarticle_is',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}
//删除文章
// /share/deleteArticle
export function deleteTable(data){
    return Axios({
        url:'/admin/share/deleteArticle',
        headers:{
            Authorization:cookie.get("userToken")
        },
        data:data,
        method:'POST',
        loading:true,
        GetShow: false
    })
}