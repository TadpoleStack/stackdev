<template>
    <div class="homePage">
    </div>
</template>

<script>
import secretConfig from '../secretConfig'
export default {
    name:"homePage",
    data(){
        return{
            adcode:''
        }
    },
    created(){
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
    }
  
}
</script>

<style lang="stylus" scoped>

</style>
