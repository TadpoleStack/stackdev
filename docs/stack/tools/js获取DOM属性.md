### js获取DOM属性

#### 通常在页面上我们需要获取某个DOM节点的某个属性时或许我们会这样写：

```js
    let currDom = document.getElementById('box');
    console.info(currDom.id);
    console.info(currDom.name);
    console.info(currDom.width);
    //等等。。。
```

#### 对于此，这里进行总结一下

+ [DOM].attribute 只能获取HTML模板上的属性和样式，对于写在样式表中的Style样式是获取不上的。
+ 在这里调用浏览器的API进行属性或样式的获取是最有效的办法

#### 以下是判断浏览器进行获取Style的方法

```js
    function getStyle(obj, att) {
        if(obj.currentStyle) { //IE
            return obj.currentStyle[att];
        } else {   //Chrom  firefox
            return window.getComputedStyle(obj,false)[att];
        }
}
```