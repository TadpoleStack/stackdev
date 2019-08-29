### 放大镜效果的实现

通常在电商网站的商品详情页会有商品放大镜类似的效果，在这里封装了放大镜效果（包含设置放大倍数）

##### DOM结构

```html
<div id="bigBox">
        <div id="mirrorBox">
        </div>
        <div id="showBox">
        </div>
    </div>
    <ul id="imgList">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
    </ul>
```
##### style样式
```css
#bigBox{
    position:relative;
    width: 640px;
    height: 360px;
    background-image: url(../img/01.jpg);
    background-size: 100%;
}
#mirrorBox{
    position:absolute;
    width:100px;
    height:80px;
    opacity:0.5;
    display:none;
    background: orange;
}
#showBox{
    position:absolute;
    left:750px;
    top:0px;
    display:none;
    background-image: url(../img/01.jpg);
}
ul li{
    list-style: none;
    width: 80px;
    height: 80px;
    float: left;
    background-size: cover;
}
ul li:nth-child(1){
    background-image: url(../img/01.jpg);
}
ul li:nth-child(2){
    background-image: url(../img/02.jpg);
}
ul li:nth-child(3){
    background-image: url(../img/03.jpg);
}
ul li:nth-child(4){
    background-image: url(../img/04.jpg);
}
```
##### Mirror

```js
class Mirror{
    constructor(obj){
        this.defaultval(obj)
        this.init()
        this.scale()
        obj.switchels&&this.switch()
    }
    defaultval(obj){
        let defaultObj={
            show:null,
            mirror:null,
            box:null,
            switchels:null,
            rate:2
        }
        for (let key in defaultObj) {
            obj[key] && (defaultObj[key] = obj[key]);
        }
        for (let key in defaultObj) {
            this[key] = defaultObj[key];
        }
    }
    init(){
        let showwidth = this.getStyle(this.mirror,'width')
        let showheight =  this.getStyle(this.mirror,'height')
        let boxwidth = this.getStyle(this.box,'width')
        let boxheigth = this.getStyle(this.box,'height')
        this.show.style.backgroundSize = boxwidth.substring(0,boxwidth.length-2)*this.rate+"px "+boxheigth.substring(0,boxheigth.length-2)*this.rate+"px";
        this.show.style.width = showwidth.substring(0,showwidth.length-2)* this.rate + "px";
        this.show.style.height =showheight.substring(0,showheight.length-2)* this.rate + "px";
    }
    scale(){
        this.box.addEventListener("mouseenter",evt=>{
            let e = evt || window.event;
            if(e.target == this.box || e.target == this.mirror){
                this.show.style.display = "block";
                this.mirror.style.display = "block";
            }
        })
        this.box.addEventListener("mouseleave",()=>{
            this.show.style.display = "none";
            this.mirror.style.display = "none";
        })
        this.box.addEventListener("mousemove",evt=>{
            let e = evt || window.event;
            let left = e.pageX - this.box.offsetLeft - this.mirror.offsetWidth/2;
            let top = e.pageY - this.box.offsetTop - this.mirror.offsetHeight/2;
            left<=0&&(left=0)
            top<=0&&(top=0)
            left > this.box.offsetWidth - this.mirror.offsetWidth&&(left=this.box.offsetWidth - this.mirror.offsetWidth)
            top > this.box.offsetHeight - this.mirror.offsetHeight&&(top=this.box.offsetHeight - this.mirror.offsetHeight)
            this.mirror.style.left = left+"px";
            this.mirror.style.top = top+"px";
            showBox.style.backgroundPosition = (-this.rate * left) + 'px ' + (-this.rate * top) + 'px';
        })
    }
    switch(){
        this.switchels[0].parentNode.addEventListener("click",evt=>{
            let e = evt || window.event;
            let bgImg = this.getStyle(e.target,"backgroundImage");
            this.box.style.backgroundImage = bgImg;
            this.show.style.backgroundImage = bgImg;
        })
    }
    getStyle(domObj,attr){
        if (domObj.currentStyle) {
            return domObj.currentStyle[attr];
        } else {
            return window.getComputedStyle(domObj)[attr];
        }
    }
}
```
##### 调用

```js
var mirror = new Mirror({
    show:document.getElementById('showBox'),//展示的元素
    mirror:document.getElementById('mirrorBox'),//随鼠标移动的镜片
    box:document.getElementById("bigBox"),//显示的大盒子
    switchels:document.querySelectorAll("#imgList li"),//可供点击换图片的元素，类型NodeList
    rate:3//放大的倍数
})
```