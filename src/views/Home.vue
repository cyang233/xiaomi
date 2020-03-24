<template>
  <div class="home">
              <Header></Header>
     <van-tabs v-model="active" animated title-active-color="#f30" class="htabs">
    <van-tab v-for="item in tabs" :title="item.name" :key="item.page_id" @click="changeHD">
        <Page :item="item"></Page>
  </van-tab>
</van-tabs>
  <!-- <button @click="$router.go(-1)">go返回</button>
    <img alt="Vue logo" src="../assets/images/logo.png">
    <router-link to="/about">笑话</router-link>
    <br>
      <router-link to="/cat/123">产品123</router-link><br>
      <router-link to="/cat/abc">产品abc</router-link><br>
      <router-link to="/cat/abc?from=China">产品456</router-link>
        -->
  </div>

</template>

<script>
import Header from '../components/Header.vue'
// import Header from '@/components/Header.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Page from '@/components/Page.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld,Header,Page
  },
  data(){return {active:0,tabs:[]}},
  created(){
    this.getPage();
  },
  methods:{
    getPage(){
       this.$http.get("/mi/page.php")
      .then(res=>{
      this.tabs = res.data.data.tabs;
      })
    },
    //单击页面回到最顶部
    changeHD(){
      let el = document.querySelector(".htabs .van-tabs__content");
      el.scrollTop = 0;
    }

  }
}
</script>
<style>
/* 顶部和导航区域固定-内容区域滚动 */
  .home{
    display: flex; 
    /* 弹性布局 */
    flex-direction: column; 
    /* 垂直方向 */
  }
  .htabs{
    flex:1;
    /* 自适应高 */
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* 超出部分隐藏 */
  }
  .htabs .van-tabs__content{
    flex:1;
    /* 自适应高 */
    overflow: auto;
    scroll-behavior: smooth;
  }
</style>