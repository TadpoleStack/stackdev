<template>
    <div class="joke_page_box">
        <div v-show="!showStatus" class=joke_line v-for="(item,idx) in data" :key="idx" >
            <div class=topLine>
                <img class="face" :src="item.header" alt="">
                <span @click.stop="key=idx;jokeDetailsfn(item);">{{item.name}}</span>
            </div>
            <img  v-if="item.thumbnail" width="50%" height="50%" :src="item.thumbnail" alt="">
            <p @click.stop="key=idx;jokeDetailsfn(item);">{{item.text}}</p>
            <p @click.stop="key=idx;jokeDetailsfn(item);" class="passtime">{{item.passtime}}</p>
            <div @click.stop="key=idx;jokeDetailsfn(item);" class="comments"
                 v-if="item.top_comments_name&&item.top_comments_content">
                {{item.top_comments_name}} ：{{item.top_comments_content}}
            </div>
        </div>
        <div class="jokeDetails" v-show="showStatus">
            <div class="backList" @click="showStatus=false">返回列表</div>
            <div class=topLine>
                <img class="face" :src="datails.header" alt="">
                <span>{{datails.name}}</span>
            </div>
            <img v-if="datails.images" :src="datails.images" alt="">
            <video width="90%" autoplay loop controls v-if="datails.video" :src="datails.video"></video>
            <p>{{datails.text}}</p>
            <p class="passtime">{{datails.passtime}}</p>
            <div class="comments"
                 v-if="datails.top_comments_name&&datails.top_comments_content">
                <img class="commentFace" :src="datails.top_comments_header" alt="">
                {{datails.top_comments_name}} ：{{datails.top_comments_content}}
            </div>
            <div class="next">
                <span class="pointer" @click.stop="jokeDetailsfn(data[key],'before')">上一条</span>
                <span class="pointer" @click.stop="jokeDetailsfn(data[key],'after')">下一条</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:[],
            key:0,
            datails:{},
            showStatus:false
        }
    },
    created(){
        this.jokefn();
    },
    methods:{
        async jokefn(){
            let data_cache = localStorage.getItem('joke');console.info(JSON.parse(data_cache))
            let h_cache = localStorage.getItem('curhour');
            if(data_cache&&h_cache==new Date().getHours()){this.data=JSON.parse(data_cache);return;}
            const res = await this.$http('post','openSource_joke')
            this.data = res.data.result;
            localStorage.setItem('joke',JSON.stringify(this.data))
        },
        async jokeDetailsfn(item,ops){
            if(ops==='before'){
                this.key--;
                if(this.key<0){this.key=0;this.$notify({title:"已经是第一条了！"});return;}
                item = this.data[this.key];
            }else if(ops==='after'){
                this.key++;
                if(this.key>this.data.length-1){this.key=this.data.length-1;this.$notify({title:"没有更多了！"});return;}
                item = this.data[this.key];
            }
            const res = await this.$http('get','openSource_jokeDetail',{sid:item.sid})
            this.datails = res.data.result;
            this.showStatus = true;
        }
    }
}
</script>

<style lang="stylus" scoped>
.pointer
    cursor pointer
.joke_page_box
    .joke_line,.jokeDetails
        margin-top 30px
        .backList
            margin 20px 0
        .topLine
            display flex
            align-items center
            height 80px 
            .face
                width 44px
                height 44px
                margin 10px 10px 10px 0
                border-radius 50%
        .passtime
            color #7c7c7c
            font-size 16px
        .comments
            color #999999
            display flex
            align-items center
            flex-wrap wrap
            .commentFace
                width 30px
                height 30px
                margin-right 20px
                border-radius 50%
        .next
            margin 20px
            display flex
            align-items center
            justify-content space-between

</style>