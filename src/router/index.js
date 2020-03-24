import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import User from '../views/User.vue'
import Category from '../views/Category.vue'
import NoMatch from '../views/NoMatch.vue'
import Login from '../views/Login.vue'
import Zhuce from '../views/Zhuce.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    alias:['/ind','/main']   //多个名字都能进入home
  },{
    path:'/user',
    name:'user',
    component:User
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  },
  {
    path:"/cat",
    name:'Category',
    component:Category,
    //redirect:'/user'  改变链接地址
    meta:{power:true}
    //power是自定义的元信息，代表当前页面需要权限才能进入
  },
  {
    path:'/product',
    name:'Product',
    component:Product,
    meta:{power:true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:"/zhuce",
    name:"Zhuce",
    component:Zhuce
  },
  {
    path:'*',
    name:'NoMatch',
    component:NoMatch
  }
]

const router = new VueRouter({
  routes
})
import Cookie from '../assets/js/Cookie';
router.beforeEach((to,from,next)=>{
  //if(to.path=='/product'){
    //判断to的路由元信息是否需要权限
    if(to.meta.power){
        if(!Cookie.getCookie('uname')){
          next("/login?tz="+to.path);
        }else{
          next();
        }
      }else{
        next();
      }
 })
export default router
