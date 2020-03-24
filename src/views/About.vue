<template>
  <div class="about">
      <h1>烘焙坊</h1>
      <h3 v-for="(item,index) in news" :key="index">
        {{item.coverTitle}}
      </h3>
    <!--jsonp跨域-->
    <h1>我的位置: {{add}}</h1>
    <h2>新冠肺炎国外数据</h2>
      <div v-for="item in feiyan" :key="item.docid">
          {{item.country}}
          {{item.sure_cnt}}
      </div>
    <!--文件上传-->
    <input type="file" ref="file">
     <van-button plain type="info" @click="upImg">上传</van-button>
     <img :src="pic" v-if="pic" width="200">
    <h1>电影票房排名</h1>
    <h3 v-for="(item,index) in movies" :key="index">
        {{item.MovieName}}--票房:{{item.amount}}
    </h3>
      <h1>爱笑话</h1>
      <van-pull-refresh v-model="isLoading" @refresh="getJoks(2)">
        <div class="pannel" v-for="item in joks" :key="item.docid">
            <h3>{{item.title}}</h3>
            <p> {{item.summary}}</p>
        </div> 
      </van-pull-refresh>
      <div style="margin-bottom:58px">
          <van-button plain type="info" @click="getJoks(1)">更多</van-button>
      </div> 
      
  </div>
</template>
<script>
import jsonp from '../assets/js/jsonp'
export default {
  created(){
    this.getJoks();
    this.getMovies();
    this.getAdd();
    this.getFeiyan();
     this.getHbf();
  },
  data(){
    return {joks:[],
            page:1,
            isLoading:false,
            movies:[],
            pic:'',
            add:'',
            feiyan:"",
            news:[]}
  },
  methods:{
    getHbf(){
      this.$http.get("https://api.hongbeibang.com/recommend/getRandContent?_t=1584928832786&csrfToken=&type=3&pageSize=10")
      .then(res=>{
        this.news = res.data.data.data;
      })
      .catch(err=>{console.log(err)})
    },
    getFeiyan(){
      this.$http.get("http://localhost:8080/feiyan/special?uc_param_str=pccplomi&feiyan=1&district=1&tabStart=0&tabEnd=1&tabBrief=1&aid=3804775841868884355")
      .then(res=>{
        this.feiyan = res.data.data.feiyan.cities
        .filter(item=>item.country!="中国")
        .sort((a,b)=>a.sure_cnt>b.sure_cnt?-1:1)
      })
      .catch(err=>{console.log(err)})
    },
    getAdd(){
      jsonp("http://api.map.baidu.com/location/ip?ak=I5p02PxH5e459CAk9vt4elbXNTkgfxde",{},
     (err,data)=>{
       this.add = data.content.address;
     })
    },
    upImg(){
      let file = this.$refs.file.files[0];
      let data = new FormData();
      data.append('file',file);
      let configs = {
        // headers:{'Content-Type':'multipart/form-data'}
      }
      this.$http({
        method:'post',
        url:'/ajax/file.php',
        data,
        configs
      })
      .then(res=>{
        console.log(res);
        if(res.data.error==0){
          this.pic = 'http://www.520mg.com'+res.data.pic;
          this.$refs.file.value= '';
        }
      })
    },
    getMovies(){
      this.$http.post(
        "http://www.endata.com.cn/API/GetData.ashx",
        "MethodName=BoxOffice_GetPcHomeList",
        {headers:{"Content-Type":"application/x-www-form-urlencoded"}})
        .then(res=>{
          console.log(res.data);
          this.movies = res.data.Data.Table1.sort((a,b)=>{return a.amount>b.amount?-1:1})
        })
        .catch(err=>{
          console.log(err);
        })
    },
    getJoks(type=1){
      if(type==2){
        this.isLoading =true;
      }
      this.$http.get("/mi/list.php?page="+this.page)
      .then(res=>{
          if(type==1){
              this.joks = this.joks.concat(res.data.result.filter(item=>item.title));
              //过滤掉没有的title的数据
          }else if(type==2){
              this.joks =res.data.result.filter(item=>item.title).concat(this.joks);
        }
         
        this.page++;
        this.isLoading =false;
        console.log(this.isLoading)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>
<style scpoed>
    .pannel{
      margin: 0.2rem;
      border: 1px solid #ccc;
    }
    .pannel h3{
      color:#f30;
      text-align: center;
      margin-bottom: 0.1rem;
    }
    .pannel p{
      text-indent: 0.2rem;
      line-height: 30px;
    }
</style>
