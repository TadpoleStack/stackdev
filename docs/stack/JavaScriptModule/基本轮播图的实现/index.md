### 基本轮播图的实现

#### 淡入淡出

```js
class slider {
    constructor(obj) {
        this.width = obj.box.offsetWidth;
        this.height = obj.box.offsetHeight;
        this.timer = null;
        this.imgArray = [];
        this.liArray = [];
        this.currOrd = 0;
        this.initData(obj);
        this.createUI();
        this.go();
        this.addEvent();
    }
    initData(obj) {
        let defaultObj = {
            box: null,
            imgs: null,
            timeSpace: 4000,
            effectTime: 1000,
            pointerColor: '#cccccc',
            pointerHeightColor: 'orange',
            pointerWidth: 30,
            pointerHeight: 30,
            pointerBorderRadius: '50%',
            pointerPrev: null,
            pointerNext: null
        }
        for (let key in defaultObj) {
            obj[key] && (defaultObj[key] = obj[key]);
        }
        for (let key in defaultObj) {
            this[key] = defaultObj[key];
        }
    }
    createUI() {
        this.box.style.position = 'relative';
        let Oul = document.createElement('ul');
        Oul.style.cssText = "width:100%;position:absolute;left:0;top:85%;list-style:none;z-index:2;display:flex;justify-content:center";
        for (let i in this.imgs) {
            let Oimg = document.createElement('img');
            let Oli = document.createElement('li');
            Oimg.style.cssText = "position:absolute;top:0;display:block";
            Oli.style.cssText = "margin:0 20px;cursor:pointer";
            if (i == 0) {
                Oimg.style.opacity = 1;
                Oli.style.backgroundColor = this.pointerHeightColor;
            } else {
                Oimg.style.opacity = 0;
                Oli.style.backgroundColor = this.pointerColor;
            }
            Oimg.src = this.imgs[i];
            Oimg.style.width = this.width + 'px';
            Oimg.style.height = this.height + 'px';
            Oli.style.width = this.pointerWidth + 'px';
            Oli.style.height = this.pointerHeight + 'px';
            Oli.style.borderRadius = this.pointerBorderRadius;
            this.imgArray.push(Oimg);
            this.liArray.push(Oli);
            this.box.appendChild(Oimg);
            Oul.appendChild(Oli);
        }
        this.box.appendChild(Oul);
    }
    go() {
        this.timer = setInterval(() => {
            let outOrd = this.currOrd;
            this.currOrd++;
            this.currOrd = this.currOrd % this.imgArray.length;
            this.showImg(outOrd, this.currOrd);
            this.showLi(outOrd, this.currOrd);
        }, this.timeSpace);
    }
    showImg(outOrd, currOrd) {
        if (outOrd == currOrd) return;
        this.imgArray[currOrd].style.opacity = 0;
        this.imgArray[outOrd].style.opacity = 1;
        this.changeOpacity(this.imgArray[outOrd], this.imgArray[currOrd]);
    }
    showLi(outOrd, currOrd) {
        this.liArray[outOrd].style.backgroundColor = this.pointerColor;
        this.liArray[currOrd].style.backgroundColor = this.pointerHeightColor;
    }
    stop() {
        clearInterval(this.timer);
    }
    jumpImgLi(i) {
        let outOrd = this.currOrd;
        this.currOrd = i;
        this.showImg(outOrd, this.currOrd);
        this.showLi(outOrd, this.currOrd);
    }
    addEvent() {
        this.box.onmouseenter = () => {
            this.stop();
        }
        this.box.onmouseleave = () => {
            this.go();
        }
        for (let i in this.liArray) {
            this.liArray[i].onclick = () => {
                this.jumpImgLi(i);
            }
        }
        if (this.pointerPrev != null && this.pointerNext != null) {
            this.pointerNext.onclick = () => {
                this.jumpImgLi((this.currOrd + 1) % this.liArray.length);
            }
            this.pointerPrev.onclick = () => {
                let prevTemp = this.currOrd - 1;
                if (prevTemp < 0) {
                    prevTemp = this.liArray.length - 1;
                }
                this.jumpImgLi(prevTemp);
            }
        }
    }
    changeOpacity(outOrd, currOrd) {
        let opacityTimer = null;
        let opacityValue = 0;
        opacityTimer = setInterval(() => {
            opacityValue += 1 / 100;
            if (opacityValue >= 1) {
                clearInterval(opacityTimer);
                opacityValue = 1;
            }
            outOrd.style.opacity = 1 - opacityValue;
            currOrd.style.opacity = opacityValue;
        }, this.effectTime / 100)
    }
}
```

##### 调用
```js
let sliderImg = new slider({
        box : document.getElementById('box'),//放置轮播图的Dom（必填）
        imgs : ['img/01.jpg','img/02.jpg','img/03.jpg','img/04.jpg','img/05.jpg','img/06.jpg'],//图片数组（必填）
        timeSpace:4000,//换图片的时间
        effectTime : 100,//淡入淡出的时间
        pointerColor: '#999',//指示器颜色
        pointerHeightColor:'orange',//指示器高亮的颜色
        pointerWidth:30,//指示器宽
        pointerHeight:30,//指示器高
        pointerBorderRadius:'50%',//指示器边框属性
        pointerPrev : document.getElementById('prev'),//轮播图左按钮
        pointerNext : document.getElementById('next')//轮播i图右按钮
        })
```

#### 左右滑动

```js
class slider {
    constructor(obj) {
        this.width = obj.box.offsetWidth;
        this.height = obj.box.offsetHeight;
        this.imgArray = [];
        this.liArray = [];
        this.timer = null;
        this.currOrd = 0;
        this.initData(obj);
        this.createUI();
        this.go();
        this.addEvent();
    }
    initData(obj) {
        let defaultObj = {
            box: null,
            imgs: null,
            timeSpace: 4000,
            effectTime: 1000,
            pointerColor: '#eeeeee',
            pointerHeightColor: 'orange',
            pointerWidth: 30,
            pointerHeight: 30,
            pointerBorderRadius: '50%',
            pointerPrev: null,
            pointerNext: null
        }
        for (let key in defaultObj) {
            obj[key] && (defaultObj[key] = obj[key]);
        }
        for (let key in defaultObj) {
            this[key] = defaultObj[key];
        }
    }
    createUI() {
        this.box.style.position = 'relative';
        this.box.style.overflow = 'hidden';
        let Oul = document.createElement('ul');
        Oul.style.cssText = "width:100%;position:absolute;z-index:2;left:0;top:85%;list-style:none;display:flex;justify-content:center";
        for (let i in this.imgs) {
            let Oimg = document.createElement('img');
            let Oli = document.createElement('li');
            Oimg.style.cssText = "position:absolute;top:0;display:block";
            Oli.style.cssText = "margin: 0 20px;cursor:pointer";
            if (i == 0) {
                Oimg.style.left = 0;
                Oli.style.backgroundColor = this.pointerHeightColor;
            } else {
                Oimg.style.left = this.width + 'px';
                Oli.style.backgroundColor = this.pointerColor;
            }
            Oimg.src = this.imgs[i];
            Oimg.style.width = this.width + 'px';
            Oimg.style.height = this.height + 'px';
            Oli.style.width = this.pointerWidth + 'px';
            Oli.style.height = this.pointerHeight + 'px';
            Oli.style.borderRadius = this.pointerBorderRadius;
            this.imgArray.push(Oimg);
            this.liArray.push(Oli);
            this.box.appendChild(Oimg);
            Oul.appendChild(Oli);
        }
        this.box.appendChild(Oul);
    }
    go() {
        this.timer = setInterval(() => {
            let outOrd = this.currOrd;
            this.currOrd++;
            this.currOrd = this.currOrd % this.imgArray.length;
            this.showImg(outOrd, this.currOrd);
            this.showLi(outOrd, this.currOrd);
        }, this.timeSpace);
    }
    showImg(outOrd, currOrd) {
        if (outOrd == currOrd) return;
        this.imgArray[outOrd].left = 0;
        this.imgArray[currOrd].left = this.width + 'px';
        this.changePlace(this.imgArray[outOrd], this.imgArray[currOrd]);
    }
    showLi(outOrd, currOrd) {
        this.liArray[outOrd].style.backgroundColor = this.pointerColor;
        this.liArray[currOrd].style.backgroundColor = this.pointerHeightColor;
    }
    stopImg() {
        clearInterval(this.timer);
    }
    jumpImgLi(i) {
        let outOrd = this.currOrd;
        this.currOrd = i;
        this.showImg(outOrd, this.currOrd);
        this.showLi(outOrd, this.currOrd);
    }
    addEvent() {
        this.box.onmouseenter = () => {
            this.stopImg();
        }
        this.box.onmouseleave = () => {
            this.go();
        }
        for (let i in this.liArray) {
            this.liArray[i].onclick = () => {
                this.jumpImgLi(i);
            }
        }
        if (this.pointerPrev != null && this.pointerNext != null) {
            this.pointerNext.onclick = () => {
                this.jumpImgLi((this.currOrd + 1) % this.liArray.length);
            }
            this.pointerPrev.onclick = () => {
                let prevTemp = this.currOrd - 1;
                if (prevTemp < 0) {
                    prevTemp = this.liArray.length - 1;
                }
                this.jumpImgLi(prevTemp);
            }
        }
    }
    changePlace(outOrd, currOrd) {
        let placeTimer = null;
        let step = this.width / 100;
        let outOrdPlace = 0;
        let currOrdPlace = this.width;
        placeTimer = setInterval(() => {
            outOrdPlace -= step;
            currOrdPlace -= step;
            if (outOrdPlace <= -this.width || currOrdPlace <= 0) {
                outOrdPlace = -this.width;
                currOrdPlace = 0;
                clearInterval(placeTimer);
            }
            outOrd.style.left = outOrdPlace + 'px';
            currOrd.style.left = currOrdPlace + 'px';
        }, this.effectTime / 100);
    }
}
```

##### 调用
```js
let sliderImg = new slider({
        box : document.getElementById('box'),//选中的Dom（必填）
        imgs : ['img/07.jpg','img/08.jpg','img/09.jpg','img/010.jpg','img/011.jpg','img/012.jpg'],//图片数组（必填）
        timeSpace : 4000,//多长时间换图片
        effectTime : 500,//换图片滑动效果的时间
        pointerColor : 'gray',//轮播图指示器（小豆点）的颜色
        pointerHeightColor : '#ac0',//指示器高亮颜色
        pointerWidth : 80,//指示器宽
        pointerHeight : 10,//指示器高
        pointerBorderRadius : '0%',//指示器圆角属性
        pointerPrev : document.getElementById('prev'),//左切换按钮
        pointerNext : document.getElementById('next')//右切换按钮
    });
```