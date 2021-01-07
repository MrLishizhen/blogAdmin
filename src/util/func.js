import layout from '@/layout'
export function navChildren(data){
    let navData = data;
    let nav = [];
    //拿出一级
    for(let i = 0;i<navData.length;i++){
        let data = {};
        if(navData[i].fid==0){
            data=navData[i];
            nav.push(data);
        }

    }
    //拿出二级
    for(let i = 0;i<navData.length;i++){
        for(let j= 0;j<nav.length;j++){
            if(nav[j].id==navData[i].fid){
                if(nav[j].children){
                    nav[j].children.push(navData[i]);
                }else{
                    nav[j].children = [];
                    nav[j].children.push(navData[i]);
                }
            }
        }
    }

    return nav;
}

//深拷贝
export function deepClone(obj){
    let objClone = JSON.stringify(obj);
    // //判断是对象还是数组
    // var objClone = Array.isArray(obj)?[]:{};
    // //判断obj是一个对象
    // if(obj && typeof obj ==="object"){
    //     //遍历obj的key值
    //     for(key in obj){
    //         //确认拿到的不是obj继承来的属性
    //         if(obj.hasOwnProperty(key)){
    //             //如果说obj的属性或者方法也是一个对象的话
    //             if(obj[key] && typeof obj[key] === "object"){
    //                 //调用自身，把key值传进去
    //                 objClone[key] = deepClone(obj[key]);
    //             }else{
    //                 //说明仅仅是个属性
    //                 objClone[key] = obj[key];
    //             }
    //         }
    //     }
    // }
    //return 拷贝后的对象
    return JSON.parse(objClone);
}

//生成路由
export function addRouters(data){
    let arr = [];
        let home= {
            path:'/Home',
            name:"Home",
            component:layout,
        }
        home.children=[];
        let routerLinks = data.filter(item=>item.routerName!='');

        routerLinks.forEach((item,i)=>{
            let data = {
                path:item.routerName,
                component:()=>import(`@/views/${item.routerName}/index.vue`),
                name:item["routerName"]+i.toString()
            };

            home.children.push(data);
        });
        arr.push(home);
        return arr;
}