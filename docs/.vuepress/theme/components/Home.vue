<template>
    <div class="homeWrap">
        <div class="main" :style="height">
            <h1 class="tit customColor">关山难越 谁悲失路之人</h1>
            <h3 class="dsc customColor">愿每一个你 都是自己的造梦者 勇敢的做梦 勇敢的生活!</h3>
            <svg class="textSvg" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <g>
                <path d="M163 17 T177 25 T115 51 T136 40 T203 38 T136 69 T161 60 T183 58 T164 65 T172 90 T151 117 T170 78 T190 64 T206 49" stroke="skyblue" stroke-width="3" fill="none"></path>
            </g>
            </svg>
        </div>
        <div class="footer">Copyright © 2019 Tadpole技术栈</div>
    </div>
</template>

<script>
export default {
    name:'Home',
    data(){
        return{
            WH:0
        }
    },
    computed:{
        height(){
            return `height:${this.WH - 120}px`
        }
    },
    methods:{
        init(){
            this.WH = window.innerHeight;
        },
        clickEfect(){
            document.addEventListener('mousedown',evt=>{
                let e = evt || window.event
                let target = e.target || e.srcElement;
                console.info(target)
            })
        }
    },
    mounted(){
        this.init();
        this.clickEfect();
    }
}
</script>

<style scoped lang="stylus">
.homeWrap
    margin-top 3.6rem
    .main
        .textSvg 
            margin 0 auto
            width 100%
            height 150px
        .textSvg path 
            stroke-dasharray:1000;
            stroke-dashoffset:1000;
            -webkit-animation:dash 5s linear infinite;
            animation:dash 3s linear infinite;
        .tit,.dsc
            text-align center
        .tit,.dsc
            padding 0 1rem
    .footer
        text-align center
@keyframes dash {
	to {
	 stroke-dashoffset:0;
   }
}
</style>
