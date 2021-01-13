import Axios from 'axios'
import cookie from 'js-cookie'
import qs from 'qs'
import router from '../router'
import { Loading, Message } from "element-ui";

import {createTimestamp} from '../api'
import {unLogin} from "../util/func"


let loadingInstance = null; // loading实例
let needLoadingRequestCount = 0; //当前正在请求的数量
//路由请求拦截
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios.defaults.headers.post['Authorization'] = cookie.get("userToken");
Axios.interceptors.request.use(config=>{
    //如果为0则重新创建loading
    //get请求添加时间戳

    if(config.method=='get'&&config.GetShow){
        config.url = config.url+"?"+createTimestamp();
    }else if(config.method=='POST'){
        // config.data = qs.stringify(config.data);

    }

    if(config.loading){
        if(needLoadingRequestCount==0){
            loadingInstance=Loading.service({
                text:"",
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.1)'
            });
        }
        //计数
        needLoadingRequestCount++;
    }
    // console.log(config);
    config.data = qs.stringify(config.data);
    return config

},error=>{
    loadingInstance && loadingInstance.close();
    return Promise.reject(error.response);
})

//响应拦截
Axios.interceptors.response.use(response=>{
    // console.log(response);
    // console.log(loadingInstance,123);

        //计数减少
    if(response.config.loading){
        needLoadingRequestCount--;
        //判断needLoadingRequestCount的数值
        needLoadingRequestCount = needLoadingRequestCount<0?0:needLoadingRequestCount;
        //计数等于0并且有值则关闭loading
        needLoadingRequestCount == 0 && loadingInstance && loadingInstance.close();
    }

    // console.log(response)
    if(response.data.status==401){
        // console.log(1);
        needLoadingRequestCount=0;
        response.data.message='权限验证失败，请重新登录'
        //清除状态
        unLogin();

    }
        return response.data;


},
    error=>{

        if (loadingInstance) {
            needLoadingRequestCount--;
            needLoadingRequestCount = needLoadingRequestCount < 0 ? 0 : needLoadingRequestCount;
            needLoadingRequestCount == 0 && loadingInstance && loadingInstance.close(); //关闭加载动画
        }

        Message({
            message: "请求数据失败",
            type: "error",
            duration: 3 * 1000
        });
        return Promise.reject(error.response);
})

export default  Axios;