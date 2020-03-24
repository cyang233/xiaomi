<template>
    <div class="swiper-container" v-if="gallery.length">
        <div class="swiper-wrapper">
            <div class="swiper-slide" 
            v-for="(item,index) in gallery"
            :key="index">
                <img :src="item.url" alt="" width="100%">
            </div>
            
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from 'swiper'
import "swiper/css/swiper.css"
export default {
    props:["gallery"],
    mounted(){
        this.swiper = new Swiper(".swiper-container",{
            loop:true,
            pagination:{
                el:'.swiper-pagination'//小点指示器
            }
        });
    }
}
</script>
<style>
    .swiper-container{
        height: 200px;
        width: 100%;
    }
    .swiper-pagination-bullet-active{
        background-color: #f30;
    }
</style>