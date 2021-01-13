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