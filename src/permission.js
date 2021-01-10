import router from "@/router/index"
import store from "@/store"
import {addRouters} from "@/util/func";
router.beforeEach(async (to,from,next)=>{

    if(to.path=="/login"){
        next();
    }else{

        if(store.state.app.routerLink.length==0){

        try{
            let routerLink = await store.dispatch("app/init");
            let routers = await addRouters(routerLink);

            router.addRoutes(routers)

            next({ ...to, replace: true });
        }catch(error){
            console.log(error);
            next('/login');
        }

    }else{
            next();
        }
    }
})


router.afterEach((to, from) => {})