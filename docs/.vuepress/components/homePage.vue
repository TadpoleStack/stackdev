<template>
    <div class="homePage">
        <div id="preload"><div class="preload-bg"></div><div class="tip"><div class="tip-bg"></div><span class="tiptxt">girls</span></div></div>
<div class="swiper-container">
    <div class="swiper-wrapper">
    <div class="swiper-slide" data-poster="uploads/img1.jpg">
        <h2>TuiGirl</h2>
      </div>
    <div class="swiper-slide" data-poster="uploads/img2.jpg">
        <h2>MissLeg</h2>
      </div>
    <div class="swiper-slide" data-poster="uploads/img3.jpg">
        <h2>IMiss</h2>
      </div>
    <div class="swiper-slide" data-poster="uploads/img4.jpg">
        <h2>MFStar</h2>
      </div>
  </div>
    <div id="txt"></div>
  </div>
<canvas id="shows" style="position: absolute; left: 0px; top: 0px;"></canvas>
    </div>
</template>

<script>
import $ from 'jquery'
import Swiper from 'swiper'
import tween from 'tween'
export default {
    name:"homePage",
    data(){
        return{

        }
    },
    methods:{
        swiperfn(){
              	var slides = $('.swiper-slide');
	
    Img = [];
    slides.each(function(index, element) {
    	Img[index] = new Image();
    	Img[index].src = slides.eq(index).attr('data-poster');
    	slidesLength = index
    	//使用附加文本替换virtualTranslate，避免鼠标滚轮失效
    	$("#txt").append('<div class="box">' + slides.eq(index).html() + '</div>')
    });

    tweenObj = {
    	translate: 0
    };
    var canvas = document.getElementById("shows");
    ctx = canvas.getContext("2d");
    window.onload = function() {
		
    	var mySwiper = new Swiper('.swiper-container', {
    		watchSlidesProgress: true,
    		//	virtualTranslate:true,较好的解决方案但会导致滚轮失效
    		mousewheel: true,
    		grabCursor: true,
			autoplay: true,
			speed:700,//限制滚轴时间间隔
    		on: {
    			init: function() {
    				resize(this);
					/*预加载动画*/
					tl = new TimelineMax();
					tl.to(".tip-bg", 0.5, {width:'100%'})
					  .set(".tiptxt",{autoAlpha:0})
					  .to(".tip-bg", 0.5, {x:'101%'}, "+=0.2")
					  .to(".preload-bg", 0.5, {x:'101%'}, "-=0.1")
					  .set("#preload", {autoAlpha:0})
    			},
    			resize: function() {
    				resize(this);
    			},
    			setTranslate: function() {
    				draw(this, 1);
    			},
    		},
    	});
    }

    function resize(swiper) {

    	clientWidth = document.body.clientWidth
    	clientHeight = document.body.clientHeight

    	// 每一个显示块的宽度
    	blockWidth = clientWidth / 5

    	// 使用的图片大小 720/1280=0.5625	
		// 图片裁剪区域
    	if (clientHeight / clientWidth > 0.5625) {
    		cutWidth = 720 * clientWidth / clientHeight
    		cutX = (1280 - cutWidth) / 2
    		cutHeight = 720
    		cutY = 0
    	} else {
    		cutHeight = 1280 * clientHeight / clientWidth
    		cutY = (720 - cutHeight) / 2
    		cutWidth = 1280
    		cutX = 0
    	}

    	canvas.width = clientWidth;
    	canvas.height = clientHeight;

    	draw(swiper);

    }

    function draw(swiper, speed) {
        	if (typeof(speed) == "undefined") {
    		speed = 0.3;
    	}

    	TweenMax.killAll();

    	TweenMax.to(tweenObj, speed, {tlanslate: swiper.translate, ease: Power4.easeOut, onUpdate: function() {

    			//如果超出显示范围添加黑色背景
    			if (swiper.progress < 0 || swiper.progress > 1) {
    				ctx.fillStyle = "#000000";
    				ctx.fillRect(0, 0, clientWidth, clientHeight);
    			}

    			tlanslate = tweenObj.tlanslate

    			for (i = 0; i <= slidesLength; i++) {
					
					
    				percent = -tlanslate / clientWidth - i
					
    				if (Math.abs(percent) <= 1 ) {
						
						n2scale = 2 - Math.abs(percent) * 2
						if (n2scale > 1) {
							n2scale = 1
						}
						n1scale = 1 - Math.abs(percent) * 2
						if (n1scale < 0) {
							n1scale = 0
						}
	
						//画5个块，裁剪出位移差
						ctx.drawImage(Img[i], cutX + cutWidth * percent * 0.2 + cutWidth / 5 * Math.abs(percent) * 2, cutY, cutWidth / 5 * n1scale, cutHeight, (clientWidth * i + tlanslate) * 0.6 + blockWidth * (1 - n1scale), 0, blockWidth * n1scale, clientHeight);
						ctx.drawImage(Img[i], cutX + cutWidth / 5 - cutWidth * percent * 0.1 + cutWidth / 5 - cutWidth / 5 * n2scale, cutY, cutWidth / 5 * n2scale, cutHeight, (clientWidth * i + tlanslate) * 0.6 + blockWidth + blockWidth - blockWidth * n2scale, 0, blockWidth * n2scale, clientHeight);
						ctx.drawImage(Img[i], cutX + cutWidth / 5 * 2 - cutWidth * percent * 0.4, cutY, cutWidth / 5, cutHeight, (clientWidth * i + tlanslate) * 0.6 + blockWidth * 2, 0, blockWidth, clientHeight);
						ctx.drawImage(Img[i], cutX + cutWidth / 5 * 3 - cutWidth * percent * 0.1, cutY, cutWidth / 5 * n2scale, cutHeight, (clientWidth * i + tlanslate) * 0.6 + blockWidth * 3, 0, blockWidth * n2scale, clientHeight);
						ctx.drawImage(Img[i], cutX + cutWidth / 5 * 4 + cutWidth * percent * 0.2, cutY, cutWidth / 5 * n1scale, cutHeight, (clientWidth * i + tlanslate) * 0.6 + blockWidth * 4, 0, blockWidth * n1scale, clientHeight);
                    }

    				//设置文字相对位置，右边缩进0.8，左边加大1.2倍
    				modifer = 1
    				if (i > -tlanslate / clientWidth) {
    					modifer = 0.8
    				}
    				if (i < -tlanslate / clientWidth) {
    					modifer = 1.2
    				}
    				swiper.$el.find('.box').eq(i).transform('translate3d(' + (tlanslate / clientWidth + i) * clientWidth * modifer + 'px, 0, 0)');

    			}

    		}
    	})
        }
        }
    },
    mounted(){
    }
}
</script>

<style lang="stylus" scoped>

</style>
