<template>
    <div class="homeWrap" :style="`height:${WH}px;`">
        <div class="main" :style="height">
            <h1 class="tit customColor" :style="`top:${Y}px;left:${X}px`">
				<span  v-for="(item,idx) in tit" :key="idx">{{item}}</span>
			</h1>
            <h3 class="dsc customColor" :style="`top:${Y*2.4}px;left:${X*2.4}px`">
				<span v-for="(item,idx) in dsc" :key="idx">{{item}}</span>
			</h3>
            <div class="footer">Copyright © 2019 Tadpole技术栈</div>
        </div>
    </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';
export default {
    name:'Home',
    data(){
        return{
			timer:null,
			tit:['关','山','难','越','谁','悲','失','路','之','人'],
			dsc:['愿','每','一','个','你','都','是','自','己','的','造','梦','者','勇','敢','的','做','梦','勇','敢','的','生','活'],
			WH:1000,//可视区域高度
			X:0,//鼠标视差效果
			Y:0,//鼠标视差效果
			colorArr:['#f5f5f5','rgba(0,255,255,.2)','rgba(127,255,0,.2)','rgba(255,255,0,.2)']
        }
    },
    computed:{
        height(){
            return `height:${this.WH - 120}px`
        }
    },
    methods:{
		tipfn(){
			let count = 1
			this.timer = setInterval(()=>{
			count==3&&this.$notify({title:"welcome!陌生人！",message:"不管怎样，很高心你能来到这里！",offset:80,duration:6000})
			count==6&&this.$notify({title:"本站点是我对一些经验的总结和归纳！",offset:80,duration:6000})
			count==9&&this.$notify({title:"如果有什么能帮助到你，我会非常高兴！",offset:80,duration:6000})
			count==12&&this.$notify({title:"归纳总结点击导航！一些娱乐资讯点击娱乐！",offset:80,duration:6000})
			count==15&&this.$notify({title:"了解更多Tadpole，点击个人主页！谢谢！",offset:80,duration:6000})
			count++;
			count>15&&clearInterval(this.timer)
			},1000)
		},
        init(){
			this.WH = window.innerHeight; 
			window.addEventListener('resize',()=>{
			})
		},
        threeEffect(){
			const that = this;
            var Detector = {
                canvas : !! window.CanvasRenderingContext2D,
                webgl : ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
                workers : !! window.Worker,
                fileapi : window.File && window.FileReader && window.FileList && window.Blob,
                getWebGLErrorMessage : function () {
                    var domElement = document.createElement( 'div' );
                    domElement.style.fontFamily = 'monospace';
                    domElement.style.fontSize = '13px';
                    domElement.style.textAlign = 'center';
                    domElement.style.background = '#bbb';
                    domElement.style.color = '#000';
                    domElement.style.padding = '1em';
                    domElement.style.width = '475px';
                    domElement.style.margin = '5em auto 0';
                    return domElement;
                },
                addGetWebGLMessage : function ( parameters ) {
                    var parent, id, domElement;
                    parameters = parameters || {};
                    parent = parameters.parent !== undefined ? parameters.parent : document.body;
                    id = parameters.id !== undefined ? parameters.id : 'oldie';
                    domElement = Detector.getWebGLErrorMessage();
                    domElement.id = id;
                    parent.appendChild( domElement );
                }
            };
			var Stats=function(){var h,a,n=0,o=0,i=Date.now(),u=i,p=i,l=0,q=1E3,r=0,e,j,f,b=[[16,16,48],[0,255,255]],m=0,s=1E3,t=0,d,k,g,c=[[16,48,16],[0,255,0]];h=document.createElement("div");h.style.cursor="pointer";h.style.width="80px";h.style.opacity="0.9";h.style.zIndex="10001";h.addEventListener("mousedown",function(a){a.preventDefault();n=(n+1)%2;n==0?(e.style.display="block",d.style.display="none"):(e.style.display="none",d.style.display="block")},!1);e=document.createElement("div");e.style.textAlign=
				"left";e.style.lineHeight="1.2em";e.style.backgroundColor="rgb("+Math.floor(b[0][0]/2)+","+Math.floor(b[0][1]/2)+","+Math.floor(b[0][2]/2)+")";e.style.padding="0 0 3px 3px";h.appendChild(e);j=document.createElement("div");j.style.fontFamily="Helvetica, Arial, sans-serif";j.style.fontSize="9px";j.style.color="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";j.style.fontWeight="bold";j.innerHTML="FPS";e.appendChild(j);f=document.createElement("div");f.style.position="relative";f.style.width="74px";f.style.height=
				"30px";f.style.backgroundColor="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";for(e.appendChild(f);f.children.length<74;)a=document.createElement("span"),a.style.width="1px",a.style.height="30px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+b[0][0]+","+b[0][1]+","+b[0][2]+")",f.appendChild(a);d=document.createElement("div");d.style.textAlign="left";d.style.lineHeight="1.2em";d.style.backgroundColor="rgb("+Math.floor(c[0][0]/2)+","+Math.floor(c[0][1]/2)+","+Math.floor(c[0][2]/2)+")";d.style.padding=
				"0 0 3px 3px";d.style.display="none";h.appendChild(d);k=document.createElement("div");k.style.fontFamily="Helvetica, Arial, sans-serif";k.style.fontSize="9px";k.style.color="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";k.style.fontWeight="bold";k.innerHTML="MS";d.appendChild(k);g=document.createElement("div");g.style.position="relative";g.style.width="74px";g.style.height="30px";g.style.backgroundColor="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";for(d.appendChild(g);g.children.length<74;)a=document.createElement("span"),
				a.style.width="1px",a.style.height=Math.random()*30+"px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+c[0][0]+","+c[0][1]+","+c[0][2]+")",g.appendChild(a);return{domElement:h,update:function(){i=Date.now();m=i-u;s=Math.min(s,m);t=Math.max(t,m);k.textContent=m+" MS ("+s+"-"+t+")";var a=Math.min(30,30-m/200*30);g.appendChild(g.firstChild).style.height=a+"px";u=i;o++;if(i>p+1E3)l=Math.round(o*1E3/(i-p)),q=Math.min(q,l),r=Math.max(r,l),j.textContent=l+" FPS ("+q+"-"+r+")",a=Math.min(30,30-l/
				100*30),f.appendChild(f.firstChild).style.height=a+"px",p=i,o=0}}};
			var size = 10, res = 32, sizeres = size * res, halfsizeres = sizeres / 2;
			var buffer1 = [], buffer2 = [], temp;
			var grid = [], plane;
			var scene, camera, light, renderer;
			var geometry, material;
			var mouse, projector, ray, intersects = [];
			var stats;
			if ( Detector.webgl ) {
				init();
				animate();
			} else {
				document.body.appendChild( Detector.getWebGLErrorMessage() );
			}
			function onDocumentMouseMove( event ) {
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
				ray.direction = projector.unprojectVector( mouse.clone(), camera );
				ray.direction.subSelf( camera.position ).normalize();
				intersects = ray.intersectObject( plane );
			}
			function animate() {
				requestAnimationFrame( animate );
				render();
				stats.update();
			}
			function render() {
				if ( intersects.length ) {
					var point = intersects[ 0 ].point;
					var x = Math.floor( point.x / size );
					var y = Math.floor( point.z / size );
					buffer1[ x + y * res ] = 10;
				}
				var bottom = res * res - res;
				// update buffers
				for ( var i = 0, l = res * res; i < l; i ++ ) {
					var x1, x2, y1, y2;
					if ( i % res == 0 ) {
						// left edge
						x1 = 0;
						x2 = buffer1[ i + 1 ];
					} else if ( i % res == res - 1 ) {
						// right edge
						x1 = buffer1[ i - 1 ];
						x2 = 0;
					} else {
						x1 = buffer1[ i - 1 ];
						x2 = buffer1[ i + 1 ];
					}
					if ( i < res ) {
						// top edge
						y1 = 0;
						y2 = buffer1[ i + res ];

					} else if ( i > l - res - 1 ) {
						// bottom edge
						y1 = buffer1[ i - res ];
						y2 = 0;
					} else {
						y1 = buffer1[ i - res ];
						y2 = buffer1[ i + res ];
					}
					buffer2[ i ] = ( x1 + x2 + y1 + y2 ) / 1.9 - buffer2[ i ];
					buffer2[ i ] -= buffer2[ i ] / 10;
				}
				temp = buffer1;
				buffer1 = buffer2;
				buffer2 = temp;
				// update grid
				for ( var i = 0, l = res * res; i < l; i ++ ) {
					grid[ i ].scale.y += ( Math.max( 0.1, 0.1 + buffer2[ i ] ) - grid[ i ].scale.y ) * 0.1;
				}
				renderer.render( scene, camera );
			}
			function init() {
                var container = document.createElement( 'div' );
				container.style.cssText='position:fixed;left:0px;top:0px';
				container.className='container';
                document.querySelector('.homeWrap').appendChild( container );
				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				for ( var i = 0, l = res * res; i < l; i ++ ) {
					buffer1[ i ] = 0;
					buffer2[ i ] = 0;
				}
				scene = new THREE.Scene();
				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.x = 100 + sizeres;
				camera.position.y = 200;
				camera.position.z = 100 + sizeres;
				camera.lookAt( new THREE.Vector3( halfsizeres, - 50, halfsizeres ) );
				scene.add( camera );
				scene.add( new THREE.AmbientLight( 0x808080 ) );
				light = new THREE.SpotLight( 0xffffff, 1.25 );
				light.position.set( - 500, 900, 600 );
				light.target.position.set( halfsizeres, 0, halfsizeres );
				light.castShadow = true;
				scene.add( light );
				geometry = new THREE.CubeGeometry( size, size, size );
				geometry.applyMatrix( new THREE.Matrix4().setTranslation( 0, size / 2, 0 ) );
				material = new THREE.MeshLambertMaterial( { color: 0xd0d0d0 } );
				for ( var i = 0, l = res * res; i < l; i ++ ) {
					let cube = new THREE.Mesh( geometry, material );
					cube.position.x = size + ( ( i % res ) * 10 );
					cube.position.z = size + ( Math.floor( i / res ) * 10 );
					cube.castShadow = true;
					cube.receiveShadow = true;
					scene.add( cube );
					grid.push( cube );
				}
				geometry = new THREE.PlaneGeometry( sizeres, sizeres );
				plane = new THREE.Mesh( geometry, material );
				plane.position.x = halfsizeres;
				plane.position.z = halfsizeres;
				plane.rotation.x = - 90 * Math.PI / 180;
				plane.visible = false;
				scene.add( plane );
				renderer = new THREE.WebGLRenderer();
				renderer.shadowMapEnabled = true;
				renderer.shadowMapSoft = true;
				renderer.shadowCameraNear = 3;
				renderer.shadowCameraFar = camera.far;
				renderer.shadowCameraFov = 50;
				renderer.shadowMapBias = 0.0039;
				renderer.shadowMapDarkness = 0.5;
				renderer.shadowMapWidth = 512;
				renderer.shadowMapHeight = 512;
				var devicePixelRatio = window.devicePixelRatio || 1;
				renderer.setSize( window.innerWidth * devicePixelRatio, window.innerHeight * devicePixelRatio );
				renderer.domElement.style.width = window.innerWidth + 'px';
				renderer.domElement.style.height = window.innerHeight + 'px';
				container.appendChild( renderer.domElement );
				mouse = new THREE.Vector3( 0, 0, 1 );
				projector = new THREE.Projector();
				ray = new THREE.Ray( camera.position );
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			}
        },
		mouseParallax(){
			if(window.innerWidth<1366)return;
			document.addEventListener("mousemove",evt=>{
				let e = evt || window.event;
				let x = e.clientX/window.innerWidth-0.5,y = e.clientY/window.innerHeight-0.5;
				let left = -40*x;let top = -40*y;
				this.X = left;this.Y = top;
			})
		},
		deviceMotionEvent(){
			if(window.DeviceMotionEvent) {
				let speed = 25; 
				let x=0,y=0,z=0,lastX=0,lastY=0,lastZ=0; 
				window.addEventListener('devicemotion', evt=>{ 
					x = evt.accelerationIncludingGravity.x; 
					y = evt.accelerationIncludingGravity.y; 
					z = evt.accelerationIncludingGravity.z; 
					if(Math.abs(x-lastX) > speed || Math.abs(y-lastY) > speed ) { 
					document.querySelector('.homeWrap').style.backgroundColor = this.colorArr[Math.round(Math.random()*this.colorArr.length)]
					} 
					lastX = x; 
					lastY = y; 
					lastZ = z; 
				}, false); 
			} 
		}
	},
    mounted(){
		this.init();
		this.tipfn();
        this.threeEffect();
        this.mouseParallax();
        this.deviceMotionEvent();
	},
	beforeDestroy(){
		clearInterval(this.timer);
		this.timer=null;
	}
}
</script>

<style scoped lang="stylus">
.homeWrap{
    margin-top: 3.6rem;
	background: #f5f5f5;
	user-select:none;
    .main{
        width: 100%;
		overflow-x:hidden;
        position: absolute;
        z-index: 1;
        left: 0px;
        top :3.6rem;
        .tit,.dsc,.footer{
            text-align: center;
		}
        .tit,.dsc{
            padding: .5rem 1rem;
			position:relative;
			line-height:4rem;
			cursor:pointer;
			display:flex;
			flex-wrap:wrap;
			justify-content:center;
			span{
				transition:all .5s;
				animation:fadeInLeft 1s;
				&:hover{
					font-size:3rem;
				}
			}
		}
        .footer{
            width :100%;
            position :fixed;
            bottom :30px;
		}
	}
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>