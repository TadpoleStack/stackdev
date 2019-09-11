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
        async WYnewsfn(){
            let WYnews_cache = localStorage.getItem('WYnews')
            let h_cache = localStorage.getItem('curhour');
            if(WYnews_cache&&h_cache==new Date().getHours()){this.newsData=JSON.parse(WYnews_cache);return;}
            const res = await this.$http('post','openSource_WYnews')
            this.newsData = res.data.result;
            localStorage.setItem('WYnews',JSON.stringify(this.newsData));
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