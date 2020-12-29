import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../layout/index.vue'
import heart from '../views/heart'
import share from '../views/share'
import years from "../views/years"
import addArticle from '../views/addArticle'
import navAdministration from '../views/navAdministration'
import imgAdministration from '../views/imgAdministration'
import user from '../views/user'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Home/heart'
  },
  {
    path:'/Home',
    name:"Home",
    component:Home,
    children:[
      {
        path:'heart',
        component:heart//随心贴
      },
      {
        path:'share',
        component:share//技术分享
      },
      {
        path:"years",
        component:years,//岁月年华
      },
      {
        path:"addArticle",
        component:addArticle//添加文章
      }
      ,
      {
        path:"navAdministration",//导航管理
        component:navAdministration
      },
      {
        path:"imgAdministration",//banner管理
        component:imgAdministration
      },
      {
        path:"user",//用户管理
        component:user
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
