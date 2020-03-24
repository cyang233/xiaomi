<template>
    <div>
     <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="$router.go(-1)"
    />  
    <van-cell-group style="margin-top:15px">
        <van-field v-model="uname" placeholder="请输入用户名"/>
        <van-field type="password" v-model="pwd" placeholder="请输入密码"/>
    </van-cell-group>
        <div style="margin:15px">
            <van-button color="#f30" block round @click="login">登录</van-button>
            <br>
            <van-button color="#f30" block round @click="$router.push('/zhuce')">注册</van-button>
        </div>
    </div>
</template>

<script>
import Cookie from '../assets/js/Cookie'
export default {
    data(){
        return {uname:"",pwd:''}
    },
    methods:{
        // login(){
        //     Cookie.setCookie("uname",this.uname);
        //     let tz = this.$route.query.tz;
        //     console.log(tz);
        //     if(tz){
        //         this.$router.replace(tz);
        //     }else{
        //          this.$router.replace('/user');
        //     }
           
        // }
        login(){
            this.$http({
                method:"POST",
                url:"http://www.520mg.com/member/index_login.php",
                data:`fmdo=login&dopost=login&userid=${this.uname}&pwd=${this.pwd}`,
                configs:{withCredentials:true}
                //允许跨域携带cookie
            })
            .then(res=>{
                if(res.data.status==1){
                    this.$notify({ type: 'success', message: '登录成功' });
                    Cookie.setCookie("uname",this.uname);
                     let tz = this.$route.query.tz;
                    console.log(tz);
                    if(tz){
                        this.$router.replace(tz);
                    }else{
                        this.$router.replace('/user');
                    }
                }else{
                  this.$notify({ type: 'danger', message: '密码错误' });
                }
            })
            .catch(err=>{console.log(err)})
        }
    }
}
</script>