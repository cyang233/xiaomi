<template>
    <div>
        <div v-for="(section,index) in sections" :key="index">
            <div v-if="section.view_type=='gallery'">
            <!-- view_type=="gallery" 表示视图类型为幻灯片类型-->
                <van-swipe>
                    <van-swipe-item v-for="(item,ind) in section.body.items" :key="ind">
                        <img :src="item.img_url" :style="{width:item.w/100+'rem',height:item.h/100+'rem'}" />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <!-- cells_auto_fill  绝对定位类型 -->
            <div 
            v-if="section.view_type=='cells_auto_fill'" 
            :style="{position:'relative',width:section.body.w/100+'rem',height:section.body.h/100+'rem'}">
            <!-- section.body.w 父元素的宽高 -->
                <div 
                v-for="(item,ind) in section.body.items" :key="ind"
                :style="{position:'absolute',width:item.w/100+'rem',height:item.h/100+'rem',left:item.x?item.x/100+'rem':0,top:item.y?item.y/100+'rem':0}"
                >
                <img :src="item.img_url" width="100%" alt="">
                </div>
            <!-- 设置子元素的宽高xy -->
            </div>
            <div 
            v-if="section.view_type=='divider_line'" 
            :style="{height:section.body.line_height/100+'rem','background-color':section.body.line_color}">            
            </div>
            <!-- 分割线-->
            <div v-if="section.view_type=='list_three_type4'" class="row" style="padding:0.20rem;">
                <div 
                v-for="(item,ind) in section.body.items" 
                :key="ind"
                class="col"
                :style="{'margin-left':ind==1?'.2rem':0,'margin-right':ind==1?'.2rem':0}"
                >
                <img :src="item.img_url" width="100%" alt="">
                <h5>{{item.product_name}}</h5>
                <p>{{item.product_brief}}</p>
                <p>{{item.product_price}}</p>                

                </div>
            </div>
             <!--一行三个-->
              <div v-if="section.view_type=='list_two_type13'" class="row" style="padding:0.20rem;">
                <div 
                v-for="(item,ind) in section.body.items" 
                :key="ind"
                class="col tac"
                :style="{'margin-left':ind==1?'.2rem':0}"
                >
                <img :src="item.img_url" width="100%" alt="">
                <h5>{{item.product_name}}</h5>
                <p>{{item.product_brief}}</p>
                <p>{{item.product_price}}</p>  
                <van-button :color="section.body.btn_color" size="small" :text="item.btn_txt?item.btn_txt:'立即购买'"></van-button>              

                </div>
            </div>
             <!--一行两个-->
        </div>
    </div>
</template>
<style >
    .row{ display:flex;}
    .col{flex:1;}
    .tac{text-align: center;}
</style>
<script>
export default {
    props:["item"],
    data(){return {sections:[]}},
    created(){
        this.getSections();
    },
    methods:{
        getSections(){
            this.$http.get(`http://www.520mg.com/mi/page.php?page_id=${this.item.page_id}&page_type=${this.item.page_type}`)
            .then(res=>{
                this.sections =  res.data.data.data.sections;
                console.log(this.sections);
            })
            .catch(err=>{})
        }
    }
}
</script>