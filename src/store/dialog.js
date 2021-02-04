
export default {
    namespaced: true,
    state: {
        centerDialogVisible:false,
        data:{
            url:"",
            compontShow:false,
            title:"信息弹窗",
            width:'50%',
            height:'50%'
        },
    },
    getters: {},
    mutations: {
        init(state,data){
            state.centerDialogVisible=data.isShow;
            const dialogData = Object.assign(state.data,data.Obj);

        }
    },
    actions: {


    }
}