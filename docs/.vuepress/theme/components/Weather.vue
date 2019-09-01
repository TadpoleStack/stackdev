<template>
    <van-notice-bar :text="dsc"  @click="open"/>
</template>
<script>
import apilist from '../../apiModel/api'
import secret from '../../secretConfig'
export default {
    name:'Weather',
    data(){
        return{
            dsc:'',
        }
    },
    methods:{
        Weatherfn(){
            let w_cache = localStorage.getItem('weather');
            let h_cache = localStorage.getItem('curhour');
            if(w_cache&&h_cache==new Date().getHours()){
                let w = JSON.parse(w_cache);
                this.dsc= w.basic.admin_area+w.basic.location+w.now.tmp+'℃ '+w.now.cond_txt+w.now.wind_dir+w.now.wind_sc+w.lifestyle.drsg.txt;
                this.status = true;
                return;
            }
       
        let url = `${apilist.weather.api}?location=auto_ip&key=${secret.heweather}`
           this.$axios.get(url).then(res=>{
               if(res.status===200){
                   let lifestyle = {};
                   res.data.HeWeather6[0].lifestyle.forEach(val=>{
                       lifestyle[val.type] = {
                           brf:val.brf,
                           txt:val.txt
                       }
                   })
                   let w = {
                       basic:res.data.HeWeather6[0].basic,
                       now:res.data.HeWeather6[0].now,
                       daily_forecast:res.data.HeWeather6[0].daily_forecast,
                       lifestyle:lifestyle
                   }
                   this.dsc= w.basic.admin_area+w.basic.location+w.now.tmp+'℃ '+w.now.cond_txt+w.now.wind_dir+w.now.wind_sc+w.lifestyle.drsg.txt;
                   this.status = true;
                  localStorage.setItem('weather',JSON.stringify(w));
                   localStorage.setItem('curhour',new Date().getHours())
               }else{
                   this.errStatus = true;
               }
           }).catch(err=>{
               this.errStatus = true;
               console.info(err)
           })
        },
        open(){
            window.open(apilist.weather_page.api,"_target")
        },
    },
    beforecreat(){
        this.status = false;
    },
    mounted(){
        this.$nextTick().then(()=>{
            this.Weatherfn()
        })
    }
}
</script>
<style lang="stylus" scoped>
.noticebarWrap
    position relative
    overflow hidden
    height 2rem
    .noticebar
        width 200%
        margin-left 100%
        position absolute
        left 0
        top 0
</style>

