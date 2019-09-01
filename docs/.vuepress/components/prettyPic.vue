<template>
    <div class="prettyPic_page_box">
        <div class="prettyPic_line" v-for="(item,idx) in data" :key="idx">
            <img width="60%" height="60%" :src="item.img" alt="图片加载出错啦！不好意思！">
            <!-- <el-image :lazy="true" style="width:60%;height:60%;" :src="item.img"/> -->
            <p>{{item.time}}</p>
        </div>
    </div>
</template>

<script>
import apiList from '../apiModel/api'
export default {
    data(){
        return{
            data:[]
        }
    },
    created(){
        this.prettyPicfn();
    },
    methods:{
        prettyPicfn(){
            let data_cache = localStorage.getItem('prettyPic');
            let h_cache = localStorage.getItem('curhour');
            if(data_cache&&h_cache==new Date().getHours()){this.data=JSON.parse(data_cache);return;}
            this.$axios.post(apiList.openSource_prettyPic.api).then((res) => {
                this.data = res.data.result;
                localStorage.setItem('prettyPic',JSON.stringify(this.data))
            }).catch((err) => {
                console.error(err);
                this.$notify({
                    title:"出错了！不好意思！",
                    message:"我会尽快修复的，不要着急！",
                    offset:100
                })
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
.prettyPic_page_box
    .prettyPic_line
        p
            font-size 16px
            color #7c7c7c

</style>