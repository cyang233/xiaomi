<template>
  <div id="app">
      <transition 
      enter-active-class="slideInRight animated"
      leave-active-class="slideOutRight animated"      
    >
         <router-view class="page"/>
    </transition>   
     <!--route-view 存放页面-->
    <div id="nav">
       <a href="" class="lis ind"><router-link to="/">首页</router-link> </a>
      <a href="" class="lis ifl"><router-link to="/cat">分类</router-link></a>
       <a href="" class="lis iab"><router-link to="/product">购物车</router-link> </a>
      <a href="" class="lis imy"><router-link to="/user">我的</router-link></a>
      <!--route-link 切换页面导航-->
    </div>
  </div>
</template>

<script>
import './assets/css/animate.min.css';
export default {
  
}
</script>
<style>
*{margin: 0; padding: 0;}
/* 清零 */
a{text-decoration: none; color: #777;}
/* a 装饰线没有，颜色默认灰色 */
.page{ position: absolute; left:0; right:0; top:0; bottom:.98rem; overflow: auto;background-color: #fff; }
/* 页面固定定位再页面顶部 bottom:49px留出底部栏高度，内容溢出自动 */
.animated{  
  animation-duration: .4s !important;  /* 修改时间 */
}
.slideOutRight{ animation-delay: .4s;filter:brightness(80%)}
#nav{
  display: flex;
  box-shadow: 0,-2px 4px rgba(200,200,200,0);
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: .98rem;
  background-color: #fff;
}
#nav .lis{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex:1;
}
#nav .lis:before{
  content:"";
  display: block;
  height: .44rem;
  width: .44rem;
  background-image: url("./assets/images/home.png");
  background-size: cover;
}
#nav .ifl.active:before{
  background-image: url("./assets/images/home-h.png");
}
#nav .ifl:before{
   background-image: url("./assets/images/cat.png");
}
#nav .iab:before{
   background-image: url("./assets/images/cart.png");
}
#nav .imy:before{
   background-image: url("./assets/images/user.png");
}
.router-link-exact-active{
  color:#f30;
}
</style>
