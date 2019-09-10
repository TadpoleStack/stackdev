### mvvm模式数据双向绑定

近几年前端技术栈真是发展的太迅速了，从以前的针对dom操作的框架如jquery，ext.js等框架逐步过渡到当前的 mvc、mvvm模式，让前端开发者将注意力从dom操作逐渐解脱出来，专注于逻辑的实现，开发效率至少提升了很多，mvvm模式的一个核心便是数据的双向绑定，下面通过js来详细说明。

#### 1、双向绑定介绍

就拿vue来说实现实现双向绑定的指令 v-model ：
```html
<input type="text" v-model="value" />
```
当输入框中的内容发生改变时，如若用户在view层输入 “Tadpole”，此时在model层用js处理逻辑代码的地方就会获取用户输入的值。反之，在model层给与value一个值时，view层的值也会进行相应的同步，简而言之双向绑定的时view层和model层，数据绑定即model上的数据在view层和model层是同步绑定的关系。

#### 2、Object.defineProperty属性
用js监听数据的变化并将变化的数据时时的同步到页面,为了实现这个功能我们需要用到js的一个方法Object.defineProperty。

```js
/*  语法：Object.defineProperty(obj,prop,descriptor);
    描述：obj:必需——目标对象
        prop：必需——需定义或修改的属性的名字
        descriptor：必需——目标属性所需要的特性
*/
//一：
var demo = {name:'Tadpole'};
Object.defineProperty(demo,'name',{value:'jack'})
//更改DOM的那么属性值
demo.name = 'MrChen';
console.info(demo.name)//jack
//二：
var demo = {name:'json'};
Object.defineProperty(demo,'name',{value:'jack',writable:'true'})
//更改demo的name属性值
demo.name = 'mike';
console.info(demo.name)//mike

```
分析：上面涉及到了两个属性：value和writable,其中value是对name属性进行赋值，此时如果writable:'false',意思是不对value值进行重写，默认是false，所以第一个例子中name值进行更改后并没有生效，当writable:'true'时就可以对value的值进行重写，如第二个例子中一样设置生效。

#### 3、Object.defineProperty方法

```js
var Tadpole = {name:'MrChen'};
Object.definProperty(Tadpole,'name',{
    set:function(value){
        console.info('执行了');
        name = value;
    },
    get:function(){
        return name;
    }
})
Tadpole.name = 'json';//修改name属性
console  // 执行了
Tadpole.name //json
//当修改defineProperty监听的属性时会执行set方法 => 可做监听器如angular和vue中的$watch;
//当目标对象中的某个属性发生变化时进行相应的函数调用，如在set函数中添加一个自己的处理函数;

var Tadpole = {name:'json'};
Object.definProperty(Tadpole,'name',{
    set:function(value){
        name = value;
    },
    get:function(){
        console.info('获取到了');
        return name;
    }
})
Tadpole.name //获取到了
var Tadpole = {name:'json'};
Object.definProperty(Tadpole,'name',{
    set:function(value){
        console.info('不说话，我可执行了啊！')
        name = value;
    },
    get:function(){
        return '看我成啥样了！';
    }
})
Tadpole.name//看我成啥样了！
```
小结：当defineProperty所监听属性时，此时会调用该函数内部的get方法，获取到的值即为return的值，如上代码，当中值获取属性时不会进入到set方法中，反之亦然。

#### 4、示例
```js
var inputDom = document.querySelector('#input');
var showDom = document.querySelector('#show');
inputDom.addEventListener('blur',modelToView);
//定义一个没有原型链的空对象
var model = new Object(null);
Object.definProperty(model,'user',{
    set:function(value){
        user = value;
        showDom.value = value;
    },
    get:function(){
        return user;
    }
})
function modelToView(){
    model['user'] = inputDom.value;
}
```