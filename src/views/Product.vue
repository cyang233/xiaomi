<template>
    <div>
    <h1>产品页面</h1>
          <!--通过js实现跳转页面-->
      <button @click="$router.go(-1)">go返回</button>
      <button @click="$router.back()">back返回</button>
      <br>
      <button @click ="$router.go(1)">go前进</button>
      <button @click ="$router.forward()">forward前进</button>
      <br>
      <button @click="$router.push('/')">push首页</button>
      <button @click="$router.replace('/')">replace首页</button><br>
      <!--replace(不保留当前页面历史记录)-->
      <router-link :to="{name:'Home'}">name切换</router-link>
    </div>
</template>
<script>
export default {
    //页面离开前做一些判断
    beforeRouteLeave(to,from,next){
        let flag = confirm("跳楼大甩卖啊\n真的不考虑下了吗?");
        if(flag){
            next();
        }else{
            next(false)
        }
    }
}
</script>

<style>
    
</style>