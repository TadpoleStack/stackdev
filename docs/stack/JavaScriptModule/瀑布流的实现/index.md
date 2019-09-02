### 瀑布流的实现

#### 1、通过position定位，动态计算实现

```js
class Waterflow{
    constructor(obj){
        this.imgArr = obj.imgurl
        this.itemWidth = obj.itemWidth
        this.flowBox = null
        this.createImgs()
        this.judge()
    }
    createImgs(){
        this.imgArr.forEach(val => {
            let imgDom = document.createElement("img");
            imgDom.src = val;
            imgDom.className = "waterflow"
            imgDom.style.cssText = `position:absolute;width:${this.itemWidth}px;`;
            document.body.appendChild(imgDom);
        });
    }
    judge(){
        this.flowBox = document.querySelectorAll(".waterflow");
        let timer = setInterval(()=>{
            if(this.flowBox[this.flowBox.length-1].offsetHeight>0){
                this.upDataImg()
                clearInterval(timer)
            }
        })
        window.addEventListener("resize",()=>{
            this.upDataImg()
        })
    }
    upDataImg(){
         //获取视宽
         let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
         //计算列数
         let colums = parseInt(clientWidth/this.itemWidth);
         //定义一个数组获取每一列的当前高度
         let arr = [];
         for(let i=0;i<colums;i++){
             arr.push(0);
         }
         //计算间隔
         let space = (clientWidth-this.itemWidth*colums)/(colums+1);
         //计算left 和 top 值
         for(let i=1;i<=this.flowBox.length;i++){
             let currColums = (i-1)%colums;
             this.flowBox[i-1].style.left = (currColums*this.itemWidth+(currColums+1)*space)+"px";
             this.flowBox[i-1].style.top = arr[currColums]+'px';
 
             arr[currColums] = arr[currColums] + this.flowBox[i-1].offsetHeight+10;
         }
    }
}
```
##### 调用
```js
var flow = new Waterflow({
          imgurl:["https://localhost/images/test.jpg","https://localhost/images/test.jpg"],//图片数组
          itemWidth:200//单个图片的宽
   })
```

#### 2、通过Ajax获取资源，动态计算最小高度
#####结构
```html
       <div id="box"></div>
```
#####样式
```css
    #box{
        width: 100%;
        overflow: hidden;
    }
    #box ul{
        list-style:none;
        padding:10px;
        float: left;
    }
    #box ul li{
        border: 1px solid #cccccc;
        padding: 10px;
        margin-bottom: 10px;
        box-shadow: 3px 8px 8px #888888;
    }
    #box ul img{
        width:200px;
        display:block;
        cursor: pointer;
        box-shadow: 1px 1px 1px #cccccc;
    }
```
```js
var uls = document.getElementsByTagName('ul');
    function setColumn(){
        let maxWidth = document.getElementById('box').offsetWidth;
        let columns = parseInt(maxWidth/250);
        for(let i=0;i<columns;i++){
            let Oul = document.createElement('ul');
            document.getElementById('box').appendChild(Oul);
        }
    }
    function minHeight(){
        let index = 0,minHeight=uls[0].offsetHeight;
        for(let i=0;i<uls.length;i++){
            if(uls[i].offsetHeight<minHeight){
                minHeight=uls[i].offsetHeight;
                index = i;
            }
        }
        return index;
    }
    function lodingImg(){
        let xhr = new XMLHttpRequest();
        xhr.open('get','test_img.json',true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4&&xhr.status==200){
                let data =JSON.parse(xhr.responseText);
                for(let i=0;i<data.length;i++){
                    let Oimg = document.createElement('img');
                    let Oli = document.createElement('li');
                    Oimg.src = data[i];
                    Oli.appendChild(Oimg);
                    uls[minHeight()].appendChild(Oli);
                }
            }
        }
        xhr.send();
    }
    window.onload = function(){
        setColumn();
        lodingImg();
    }
```