<template>
    <div class="bgmusic" @click="toggle">
    
        <a href="javascript:;"></a>
    
        <a href="javascript:;"></a>
    
        <a href="javascript:;"></a>
    
        <a href="javascript:;"></a>
    
        <a href="javascript:;"></a>
    
        <a href="javascript:;"></a>
    
        <a href="javascript:;"></a>
    
        <a href="javascript:;"></a>
    
        <a href="javascript:;"></a>
    
        <a href="javascript:;"></a>
    
        <a href="javascript:;"></a>
    
        <a href="javascript:;"></a>
        <audio id="audio" src="/bgmusic.mp3" autoplay loop preload />
    </div>
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
        toggle(){
            let audio = document.querySelector('#audio');
            if(this.audio){
                audio.play()
                this.audio = false;
            }else{
                audio.pause()
                this.audio = true;
            }
        }
    },
}
</script>

<style lang="stylus">
$size = 6rem
.audio{
    opacity:0;
    width:0;
    height:0;
}
.bgmusic{
	width: $size;
	height: $size;
    position:fixed;
    right:3rem;
    bottom:3rem;
	transform-style: preserve-3d;
	transform: rotateX(30deg) rotateY(30deg);
	animation: moves 10s infinite linear;
}
.bgmusic a{
	display: block;
	text-decoration:none;
	opacity: .4;
	transform-style: preserve-3d;
	border: 1px solid #555;
	transition: all 1s;
}
.bgmusic a:nth-of-type(-n+6){
	width: $size;
	height: $size;
	background: pink;
	position: absolute;
	left: 0;
	top: 0;
}

.bgmusic a:nth-of-type(1){
    transform: translateZ($size/2);
}
.bgmusic a:nth-of-type(2){
    transform: translateZ(-($size/2));
}
.bgmusic a:nth-of-type(3){
    transform:rotateY(90deg) translateZ($size/2);
}
.bgmusic a:nth-of-type(4){
    transform:rotateY(-90deg) translateZ($size/2);
}
.bgmusic a:nth-of-type(5){
    transform:rotateX(90deg) translateZ($size/2);
}
.bgmusic a:nth-of-type(6){
    transform:rotateX(-90deg) translateZ($size/2);
}
.bgmusic a:nth-of-type(n+7){
	width: ($size/2);
	height: ($size/2);
	background: blue;
	position: absolute;
	left: ($size/4);
	top: ($size/4);
}
.bgmusic a:nth-of-type(7){
    transform: translateZ($size/4);
}
.bgmusic a:nth-of-type(8){
    transform: translateZ(-($size/4));
}
.bgmusic a:nth-of-type(9){
    transform:rotateY(90deg) translateZ($size/4);
}
.bgmusic a:nth-of-type(10){
    transform:rotateY(-90deg) translateZ($size/4);
}
.bgmusic a:nth-of-type(11){
    transform:rotateX(90deg) translateZ($size/4);
}
.bgmusic a:nth-of-type(12){
    transform:rotateX(-90deg) translateZ($size/4);
}

@keyframes moves{
	0%{
		transform: rotateX(0deg) rotateY(0deg);
	}
	100%{
		transform: rotateX(360deg) rotateY(360deg);
	}
}

.bgmusic:hover{
	animation: moves 10s infinite linear paused;
}
.bgmusic:hover a:nth-of-type(1){
    transform: translateZ($size);
}
.bgmusic:hover a:nth-of-type(2){
    transform: translateZ(-($size));
}
.bgmusic:hover a:nth-of-type(3){
    transform:rotateY(90deg) translateZ($size);
}
.bobgmusicx:hover a:nth-of-type(4){
    transform:rotateY(-90deg) translateZ($size);
}
.bgmusic:hover a:nth-of-type(5){
    transform:rotateX(90deg) translateZ($size);
}
.bgmusic:hover a:nth-of-type(6){
    transform:rotateX(-90deg) translateZ($size);
}
</style>