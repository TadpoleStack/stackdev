### js数组去重总结

#### 1、利用ES6 Set
```js
Array.prototype.unique = function () {
  return Array.from(new Set(this))
}
```
如若不考虑兼容性，这种去重的方法代码最少。但是这种方法还无法去掉“{}”空对象

#### 2、利用for嵌套for，然后splice去重（ES5）
```js
Array.prototype.unique = function () {
    for (var i=0; i<this.length; i++){
        for (var j=i+1; j<this.length; j++){
            if (this[i]===this[j]){
                this.splice(j,1);
                j--;
            }
        }
    }
    return this;
}
```
双层循环，外层循环元素，内层循环时比较值。值相同时，则删去这个值。缺点NaN 和 {}没有去掉。

#### 3、利用indexOf去重
```js
Array.prototype.unique = function () {
    if (!Array.isArray(this)) {
        console.error("Type Error！")
        return;
    }
    var array = [];
    for (var i = 0; i < this.length; i++) {
        if (array.indexOf(this[i]) === -1) {
            array.push(this[i])
        }
    }
    return array;
}
```
新建一个空数组，遍历原数组，判断结果数组是否存在当前元素，如果有相同的值则跳过，不相同则push进新数组。 缺点NaN 和 {}没有去掉。

#### 4、利用sort去重
```js
Array.prototype.unique = function (){
    if (!Array.isArray(this)) {
        console.error("Type Error！")
        return;
    }
    var arr = this.sort();
    var array = [arr[0]];
    for (var i = 1;i<arr.length;i++){
        if (arr[i] !== arr[i-1]){
            array.push(arr[i]);
        }
    }
    return array;
}
```
利用sort()对数组排序，然根据排序后的结果进行遍历及相邻元素对比。 
缺点NaN 和 {}没有去掉。

#### 5、根据对象属性不能相同的特点进行去重
```js
Array.prototype.unique = function(){
    if (!Array.isArray(this)) {
        console.error("Type Error！")
        return;
    }
    var obj = {},array=[];
    for (var i=0;i<this.length;i++){
        if (!obj[this[i]]){
            array.push(this[i])
            obj[this[i]]=1;
        } else{
            obj[this[i]]++;
        }
    }
    return array;
}
```
利用对象属性不相同进行去重， 
缺点NaN 和 {}没有去掉，布尔值true也直接去了。

#### 6、利用includes去重
```js
Array.prototype.unique = function(){
    if (!Array.isArray(this)) {
        console.error("Type Error！")
        return
    }
    var array = [];
    for (var i = 0;i<this.length;i++){
        if (!array.includes(this[i])){
            array.push(this[i])
        }
    }
    return array;
}
```
缺点{}没有去掉

#### 7、利用hasOwnProperty去重
```js
Array.prototype.unique = function(){
    var obj = {};
    var that = this
    return that.filter(function(item,index,that){
        return obj.hasOwnProperty(typeof item + item)? false : (obj[typeof item+item] = true)
    })
}
```
所有元素都去重了。

#### 8、利用filter
```js
Array.prototype.unique = function(){
    var that = this;
    return that.filter(function(item,index,that){
        //当前元素，在原始数组中的第一个索引 == 当前的索引值否则返回当前元素
        return that.indexOf(item,0) === index;
    });
}
```
所有元素都去重了。

#### 8、利用递归去重
```js
Array.prototype.unique = function(){
    var array = this;
    var len = array.length;
    array.sort(function(a,b){
        return a-b;
    })
    function loop(index){
        if (index>=1){
            if (array[index] === array[index-1]){
                array.splice(index,1)
            }
            loop(index-1)
        }
    }
    loop(len-1);
    return array;
}
```

#### 10、利用map数据结构去重
```js
Array.prototype.unique = function(){
    var map = new Map();
    var array = new Array();//用于返回结果
    for (var i=0;i<this.length;i++){
        if (map.has(this[i])){//若有key值
            map.set(this[i],true);
        } else {
            map.set(this[i],false);//若无key值
            array.push(this[i])
        }
    }
    return array;
}
```
创建一个空Map数据结构，遍历需要去重的数组，把数组的每一个元素作为key存到Map中。由于Map中不会出现相同的key值，所以最终得到的就是去重的结果。

#### 11、利用reduce + includes
```js
Array.prototype.unique = function(){
    return this.reduce((prev,cur)=>prev.includes(cur)?prev:[...prev,cur],[]);
}
```