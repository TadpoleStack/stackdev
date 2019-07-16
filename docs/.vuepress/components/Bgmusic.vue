<template>
        <audio id="audio" src="/bgmusic.mp3" autoplay loop preload />
</template>

<script>
export default {
    name: "Bgmusic",
    data() {
        return {
            audio:true
        }
    },
    methods: {
        myConsole(){
            console.clear()
            let count=0;
            let str=['关山难越谁悲失路之人',
            '萍水相逢竟是他乡之客',
            '愿每一个你',
            '也都是自己的造梦者',
            '勇敢的做梦',
            '勇敢的生活!',
            '        ————Tadpole']
            let timer = setInterval(()=>{
                console.info('%c'+str[count],'font-size:24px;color:#00d0b1');
                count++;
                count==str.length&&clearInterval(timer)
            },1000)
        }
    },
    mounted() {
        document.addEventListener('keydown',evt=>{
            let e = evt || window.event;
            e.keyCode==123&&this.myConsole()
        })
    },
}
</script>

<style lang="stylus">

</style>