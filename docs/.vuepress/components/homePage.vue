<template>
    <div class="homePage">
    </div>
</template>

<script>
import secretConfig from '../secretConfig'
import apilist from '../apiModel/api'
export default {
    name:"homePage",
    data(){
        return{
            adcode:''
        }
    },
    created(){
        this.aMap();
        this.tipfn();
    },
    methods:{
        tipfn(){
            this.$notify({
                title:"正在建设中......",
                message:"页面正在建设中，还没好！不好意思哈~~~",
                offset:100,
                duration:10000
            })
        },
         aMap(){
            const url = `${apilist.amap_ip.api}?key=${secretConfig.aMapkey}`
            this.$axios.get(url).then((res) => {
                this.adcode = res.data.adcode;
                console.info(res.data);
                this.aMap_weatherfn();
            }).catch((err) => {
                console.error(err);
            });
        },
        aMap_weatherfn(){
            const url = `${apilist.amap_weather.api}?key=${secretConfig.aMapkey}&city=${this.adcode}`
            this.$axios.get(url).then(res=>{
                console.info(res.data)
            }).catch(err=>{
                console.error(err)
            })
        }
    }
  
}
</script>

<style lang="stylus" scoped>

</style>
