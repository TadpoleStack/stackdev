### js阻止冒泡和取消默认


#### js阻止冒泡

```js
    function stopPropagation(evt){
        var e = evt  || window.event;
        if(document.all){//判断是否是IE
            e.cancelBubble = true;
        }else{
            e.stopPropagation();
        }
    }
```

#### js取消默认

```js
    //方法一：
    function preventDefault(evt){
        var e = evt  || window.event;
        if(e.preventDefault){
            e.preventDefault();
        }else{//针对IE的处理
            e.returnValue=false;
        }
    }
    //方法二：
    例如a标签跳转或者鼠标默认菜单可以直接用函数的 return false 进行阻止
```