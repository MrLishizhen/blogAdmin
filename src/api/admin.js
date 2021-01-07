import Axios from '../util/http'
import qs from 'qs'
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