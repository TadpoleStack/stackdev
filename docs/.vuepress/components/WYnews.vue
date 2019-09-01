<template>
    <div class="news_page_box">
        <div class="new_line" v-for="(item,idx) in newsData" :key="idx">
            <h4 class="pointer" @click.stop="news_datailesfn(item.path)">{{item.title}}</h4>
            <img :src="item.image" alt="">
            <p class="pointer passtime" @click.stop="news_datailesfn(item.path)">{{item.passtime}}</p>
        </div>
    </div>
</template>

<script>
import apiList from '../apiModel/api'
export default {
    data(){
        return{
            newsData:[]
        }
    },
    created(){
        this.WYnewsfn();
    },
    methods:{
        WYnewsfn(){
            let WYnews_cache = localStorage.getItem('WYnews')
            let h_cache = localStorage.getItem('curhour');
            if(WYnews_cache&&h_cache==new Date().getHours()){this.newsData=JSON.parse(WYnews_cache);return;}
            this.$axios.post(apiList.openSource_WYnews.api).then((res) => {
                this.newsData = res.data.result;
                localStorage.setItem('WYnews',JSON.stringify(this.newsData));
            }).catch((err) => {
                this.$notify({
                    title:"出错了！不好意思！",
                    message:"我会尽快修复的，不要着急！",
                    offset:100
                })
                console.error(err)
            });
        },
        news_datailesfn(path){
            window.open(path)
        }
    }
}
</script>

<style lang="stylus" scoped>
.news_page_box
    .pointer
        cursor pointer
    .new_line
        .passtime
            font-size 16px
            color #7c7c7c
</style>