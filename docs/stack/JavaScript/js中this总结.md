### js中this总结

#### 在这里对于this指向进行总结

#### 1、全局执行
```js
       console.info(this);
       //Window
```
可以看出在全局作用域中 this 指向当前的全局对象 Window。

#### 2、在函数中执行

##### 非严格模式下
```js
function fn(){
    console.info(this);
}
//Window
```
##### 严格模式
```js
"use strict";
function fn(){
    console.info(this);
}
//undefined
```

#### 3、作为对象的方法调用
当一个函数被当作一个对象的方法调用的时候，this 指向当前的对象 obj：
```js
var obj = {
    name:"Tadpole",
    fn:function(){
       console.info(this.name)
    }
}
obj.fn()
//Tadpole
```
如果把对象的方法赋值给一个变量，调用该方法时，this 指向 Window：
```js
var obj = {
    name:"Tadpole",
    fn:function(){
       console.info(this)
    }
}
var temp = obj.fn;
temp();
//Window
```
#### 4、作为一个构造函数使用
在 JS 中，为了实现类，我们需要定义一些构造函数，在调用一个构造函数的时候加上 new 这个关键字：
```js
function person(name){
    this.name=name;
    console.info(this);
}
var p1 = new person("Tadpole")
//person
```
此时，this 指向这个构造函数调用的时候实例化出来的对象。 当然了，构造函数其实也是一个函数，若将构造函数当做普通函数来调用，this 指向 Window:
```js
function person(name){
    this.name=name;
    console.info(this);
}
var p2 = person("Tadpole")
//Window
```

#### 5、定时器中的this
```js
setInterval(function(){
    console.info(this)
},1000)
//Window

setTimeout(function(){
    console.info(this)
})
//Window
```
如果没有特殊指向，setInterval 和setTimeout 的回调函数中 this 的指向都是 Window 。这是因为 JS 的定时器方法是定义在 Window 下的。

#### 6、箭头函数
```js
//全局调用
var obj={
    name:"Tadpole",
    fn:function(){
        console.info(this)
    }
}
obj.fn()//obj

var obj={
    name:"Tadpole",
    fn:()=>{
        console.info(this)
    }
}
obj.fn()//Window
```
不难发现，普通函数作为对象的一个函数被调用，this 指向 obj，箭头函数作为对象的一个函数被调用，this 指向 Window。
```js
var obj={
    name:"Tadpole",
    fn:function(){
        setTimeout(function(){
         console.info(this)
        },1000)
    }
}
obj.fn()//obj

var obj={
    name:"Tadpole",
    fn:()=>{
        setTimeout(()=>{
         console.info(this)
        },1000)
    }
}
obj.fn()//Window
```
若在对象的函数中，普通函数作为定时器延时执行的函数调用，this 指向 Window；箭头函数作为定时器延时执行的函数调用， this 指向定义时所在的对象，也就是 func 中的 this，即 obj。 箭头函数中 this 的值取决于该函数外部非箭头函数的 this 的值，且不能通过 call() 、 apply() 和 bind() 方法来改变 this 的值。

#### 7、 call、apply、bind
```js
//call
fun.call(thisArg[, arg1[, arg2[, ...]]])
```
它会立即执行函数，第一个参数是指定执行函数中 this 的上下文，后面的参数是执行函数需要传入的参数；
```js
//apply
fun.apply(thisArg, [argsArray])
```
它也会立即执行函数，第一个参数是指定执行函数中 this 的上下文，第二个参数是一个数组，是传给执行函数的参数（与 call 的区别）；

```js
//bind
var Tadpole = fun.bind(thisArg[, arg1[, arg2[, ...]]]);
```
它不会执行函数，而是返回一个新的函数，这个新的函数被指定了 this 的上下文，后面的参数是执行函数需要传入的参数；

```js
function person(name,age){
    this.name = name;
    this.age = age;
    console.info(this)
}
var obj={
    name:"Tadpole",
    age:23
}
person.call(obj,"MrChen",18)
//obj,{name:"MrChen",age:18}
person.apply(obj,["Mrchen",18])
//obj,{name:"MrChen",age:18}
var p1 = person.bind(obj,"MrChen",18)
var p2 = new p1();
//person {name:"MrChen",age:18}
```
call、apply 和 bind 的 this 都指向了 obj，都能正常运行；call、apply 会立即执行函数，call 和 apply 的区别就在于传递的参数，call 接收多个参数列表，apply 接收一个包含多个参数的数组；bind 不是立即执行函数，它返回一个函数，需要执行 p2 才能返回结果，bind 接收多个参数列表。

#### 8、改变this指向
##### 使用ES6的箭头函数
```js
var name = "MrChen"
var obj={
    name:"Tadpole",
    fn1:function(){
        console.info(this.name)
    }
    fn2:function(){
        setTimeout(function(){
         this.fn1
        },1000)
    }
}
obj.fn2()
//会报错，setTimeout 里函数的 this 指向 Window，而 Window 对象上是没有fn1 这个函数的。
var name = "MrChen"
var obj={
    name:"Tadpole",
    fn1:function(){
        console.info(this.name)
    }
    fn2:function(){
        setTimeout(()=>{
         this.fn1
        },1000)
    }
}
obj.fn2()
//Tadpole
//因为箭头函数的 this 的值取决于该函数外部非箭头函数的 this 的值，也就是 func2 的 this 的值， 即 obj
```
##### 在函数内部使用 _that = this
```js
var name = "MrChen"
var obj={
    name:"Tadpole",
    fn1:function(){
        console.info(this.name)
    },
    fn2:function(){
        let that = this
        setTimeout(function(){
         that.fn1
        },1000)
    }
}
obj.fn2()
//kk
//此时，fn2也能正常运行。在fn2中，首先设置var that = this，这里的this是指向 fn2 的对象 obj，
// 为了防止在 fn2 中的 setTimeout 被 window 调用而导致的在setTimeout中的this为window。
// 我们将this(指向变量 obj)赋值给一个变量 that，这样，在 fn2 中我们使用that就是指向对象 obj 了。
```
##### 使用call,apply,bind
```js
//call:
var name = "MrChen"
var obj={
    name:"Tadpole",
    fn1:function(){
        console.info(this.name)
    }
    fn2:function(){
        setTimeout(function(){
         this.fn1
        }.call(obj),1000)
    }
}
obj.fn2()//Tadpole
//apply:
var name = "MrChen"
var obj={
    name:"Tadpole",
    fn1:function(){
        console.info(this.name)
    }
    fn2:function(){
        setTimeout(function(){
         this.fn1
        }.apply(obj),1000)
    }
}
obj.fn2()//Tadpole
//bind:
var name = "MrChen"
var obj={
    name:"Tadpole",
    fn1:function(){
        console.info(this.name)
    }
    fn2:function(){
        setTimeout(function(){
         this.fn1
        }.bind(obj)(),1000)
    }
}
obj.fn2()//Tadpole
```
##### new 实例化一个对象（作为构造函数使用）