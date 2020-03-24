<template>
    <div>
        <div class="ucard">
            <div class="pic">
                <van-icon name="user-circle-o" size=".5rem" color="#fff"></van-icon>
            </div>
            <div class="umsg">
              <p v-if="uname">欢迎回来{{uname}} |
                <button @click="logOut">注销</button>
                </p> 
        <p v-else>游客请<button @click="$router.push('/login?tz=/user')">登录</button></p>
        </div>
        </div> 
    </div>
</template>

<script>
import Cookie from '../assets/js/Cookie';
export default {
    data(){return {uname:''}},
    created(){
        this.uname = Cookie.getCookie('uname')
    },
    methods:{
        logOut(){
             this.$http({
                method:"POST",
                url:"http://www.520mg.com/member/index_login.php",
                data:"dopost=exit",
                configs:{withCredentials:true}
                //允许跨域携带cookie
            })
            .then(res=>{
               if(res.data.status==1){
                    Cookie.delCookie("uname");
                    this.uname="";
                    this.$toast.success("注销成功")
               }
            })
            .catch(err=>{console.log(err); this.$toast.fail("注销失败")})
        }
       
    }
}
</script>

<style>
    .van-nav-bar .van-icon{
        color: #ccc !important;
    }
    .ucard{
        display: flex;
        padding: 0.15rem;
        background-color:#c74b8a;
        color: #fff;
    }
    .umsg{
        flex:1;
        margin-left: 0.15rem;
    }
    .umsg button{
        border-radius: 0.1rem;
        background: #f30;
        padding: 0.05rem;
        border: none;
    }
</style>