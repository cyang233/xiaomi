<template>
    <div>
         <h1 style="text-align:center">注册</h1>
            <van-field
                v-model="uname"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="pwd"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
             <van-field
                v-model="email"
                type="password"
                name="邮箱"
                label="邮箱"
                placeholder="邮箱"
                :rules="[{ required: true, message: '请填写邮箱号' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" @click="zhuce">
                    注册
                </van-button>
            </div>
    </div>
</template>
<script>
export default {

    data(){
        return {uname:"",pwd:"",email:""}
    },
    methods:{
        zhuce(){
            this.$http({
                method:"POST",
                url:"/member/reg_new2.php",
                data:`userid=${this.uname}&userpwd=${this.pwd}&email=${this.email}`,
                configs:{withCredentials:true}
            })
            .then(res=>{
                console.log(res);
                if(res.data.status==1){
                      this.$notify({ type: 'success', message: '注册成功' });
                      this.$router.replace('/login');
                }else if(res.data.status==0){
                    this.$notify({ type: 'danger', message: "邮箱格式错误"});
                }
            })
             .catch(err=>{console.log(err)})
        }
    }
}
</script>

<style scpoed>
    
</style>