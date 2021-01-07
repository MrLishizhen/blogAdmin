import router from "@/router/index"
import store from "@/store"
import {addRouters} from "@/util/func";
router.beforeEach(async (to,from,next)=>{
    console.log(to);
    if(to.path=="/login"){
        next();
    }else{
        try{
            let routerLink = await store.dispatch("app/init");
            let routers = await addRouters(routerLink);
            // router.matcher = new Router().matcher;
            // router.selfaddRoutes = function (params){
            //     router.matcher = new Router().matcher;
            //     router.addRoutes(params)
            // }
            router.addRoutes(routers)

            next({ ...to, replace: true });
        }catch(error){
            console.log(error);
            next('/login');
        }

    }

})


router.afterEach((to, from) => {})