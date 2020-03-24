<template>
    <div class="category">
        <van-nav-bar title="分类" left-arrow>
            <van-icon name="search" slot="right "/>
        </van-nav-bar>
        <div class="content">
            <div class="left">
                <div class="item" v-for="(item,index) in cate" :key="index">
                    {{item.category_name}}
                </div>
            </div>
            <div class="right">
                <div class="all" v-for="(item,index) in contents" :key="index">
                <div class="title">
                     <van-divider>{{}}</van-divider>
                </div>
                    <div class="content">
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {cate:[],contents:[]}
    },
    created(){
        this.getCate();
        this. getContent();
    },
    methods:{
        getCate(){
            this.$http.get("/mi/category.php")
            .then(res=>{
                this.cate = res.data.data;
            })
            .catch(err=>{console.log(err)})
        },
        getContent(){
            this.$http.get("http://biger.applinzi.com/category.php")
             .then(res=>{
                this.contents = res.data.data;
                console.log(this.contents)
            })
            .catch(err=>{console.log(err)})
        }
    }
}
</script>
<style scoped>
    .category{
        display: flex;
        flex-direction: column;
    }
    .content{
        flex:1;
        display: flex;
        overflow: hidden;
        height: 100%;
    }
    .left{
        width: 1.5rem;
        height: 100%;
        overflow:auto;
        border-right: 1px solid #fafafa;
    }
    .left .item{
        height: 0.88rem;
        line-height: .88rem;
        text-align: center;
        font-size: .23rem;
        border-bottom: 1px solid #fafafa;
    }
    .right{
        padding: 0.2rem;
        flex:1;
        height: 100%;
        overflow:auto;
    }
    .right .title{
        margin: 0 auto;
        font-size: .28rem;
        text-align: center;
        font-weight: 400;
        margin-top: .2rem;
        height: 1.28rem;
        line-height: 1.28rem;
    }

</style>