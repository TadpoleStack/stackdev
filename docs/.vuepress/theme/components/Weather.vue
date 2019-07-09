<template>
    <div v-if="!errStatus&&status" class="noticebarWrap" @click="open">
    <div class="noticebar customColor" :style="`left:${left}%`">
        <span>{{basic.admin_area}}</span> 
         <span>{{basic.location}}</span>
         <span>{{now.tmp}}℃</span>
         <span>{{now.cond_txt}}</span>
         <span>{{now.wind_dir}}</span>
         <span>{{now.wind_sc}}级</span>
         <span v-if="now.vis<2">能见度{{parseInt(now.vis)*1000}}米</span>
         <span>{{lifestyle.drsg.txt}}</span>
    </div>
    </div>
</template>
<script>
import apilist from '../../api'
import secret from '../../secretConfig'
export default {
    name:'Weather',
    data(){
        return{
            errStatus:null,
            status:false,
            basic:null,
            now:null,
            daily_forecast:null,
            lifestyle:null,
            left:0,
            timer:null
        }
    },
    methods:{
        Weatherfn(){
            let w_cache = localStorage.getItem('weather');
            let h_cache = localStorage.getItem('curhour');
            if(w_cache&&h_cache==new Date().getHours()){
                let w = JSON.parse(w_cache);
                this.basic = w.basic;
                this.now = w.now;
                this.daily_forecast = w.daily_forecast;
                this.lifestyle = w.lifestyle;
                this.status = true;
                return;
            }
       
        let url = `${apilist.weather.api}?location=auto_ip&key=${secret.heweather}`
           this.$axios.get(url).then(res=>{
               if(res.status===200){
                   this.basic = res.data.HeWeather6[0].basic;
                   this.now = res.data.HeWeather6[0].now;
                   this.daily_forecast = res.data.HeWeather6[0].daily_forecast;
                   let lifestyle = {};
                   res.data.HeWeather6[0].lifestyle.forEach(val=>{
                       lifestyle[val.type] = {
                           brf:val.brf,
                           txt:val.txt
                       }
                   })
                   this.lifestyle = lifestyle;
                   this.status = true;
                   let weatherStr = JSON.stringify({
                       basic:this.basic,
                       now:this.now,
                       daily_forecast:this.daily_forecast,
                       lifestyle:this.lifestyle
                   })
                   localStorage.setItem('weather',weatherStr);
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
        autoscroll(){
            this.timer = setInterval(()=>{
                this.left -=0.1
                if(this.left<=-200){
                    this.left = 0;
                }
            },10)
        }
    },
    beforecreat(){
        this.status = false;
    },
    mounted(){
        this.Weatherfn()
        this.autoscroll();
    },
    beforeDestroy() {
        if(this.timer!=null){
            clearInterval(this.timer)
            this.timer = null
        }
    },
}
</script>
<style lang="stylus" scoped>
.noticebarWrap
    position relative
    overflow hidden
    height 2rem
    .noticebar
        width 100%
        margin-left 100%
        position absolute
        left 0
        top 0
</style>

