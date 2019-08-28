### Vue-watch、computed和methods的异同

在Vue中监听-watch、计算属性-computed和方法methods是比较常用的，在这里详细总结一下他们的用法、区别。

#### 1、methods

methods中存放Vue中的函数，它的执行依赖于事件的触发，通过Vue中的v-on指令进行事件的触发执行对应的函数，函数执行后更新视图。Vue实例创建后 methods 将被混入到 Vue 实例中，因此在其他的生命周期内可以通过VM和this.函数名 来访问methods中的函数。

```js
data(){
  return{
     status:false
  }
},
methods:{
    toggle:function(){//写法一
       this.status=!this.status
    }
}
```

```js
methods:{
    toggle(){//写法二，直接通过ES6中class类的形式书写
       this.status=!this.status
    }
}
```

#### 2、computed

 由于Vue提供了template模板，可以在模板上进行计算如v-if、v-show、以及插值表达式{{}}等。但是简单的逻辑判断可以写在模板上，稍复杂的逻辑就闲的代码冗余了。在此Vue提供了计算属性computed（算是Vue特有的，像angular和react是没有计算属性的）。计算属性是响应式的，它会根据所依赖的data属性的变化进行响应式的计算 ，可以把它当作data中的属性来用。computed计算的值是会缓存的，只有他的依赖项改变时才重新计算。当然 如果某个依赖 (比如非响应式属性) 在该Vue实例范畴之外，则计算属性是不会被更新,适用于多个依赖项，计算出一个结果。
 ```js
data(){
    return{
     rmb:"￥10.00"
    }
},
computed:{
   dollar(){
      return "$"+this.rmb.splice(1)*6.7
   }
}
 ```

 #### watch

 watch做为Vue中的侦听器，在处理大数据时经常用到。它会监听Vue实例中的数据，根据数据的改变来执行程序或触发某一个函数。watch监听的对象会接收两个参数第一个是监听的新值第二个是旧值。适用于一个依赖项要执行多道程序。

 ```js
data(){
    return{
      a:1
    }
}, 
watch: {
    a(newval, oldval) {
    //newval属性改变后的新值,lodval属性改变前的旧值
      console.log(newval,oldval)
    }
}
 ```
这里要注意的是watch监听的对象嵌套层级过多，watch就不管用了，解决方法—深拷贝。
```js
data(){
    return{
      a:{
         [1,2,{3,[4,{a:5}]}]
       }
    }
},
watch:{
    a: {
        handler(n, o) {
          console.info(n)
        },
        deep: true
      }
}
```
#### 总结

- computed是计算属性，是依赖其他属性计算得出的结果；watch是监听某一个值的变化执行对应的方法 。
- computed的值在getter执行后是会缓存的，只有在它依赖的属性值改变之后，下一次获取computed的值时才会重新调用对应的getter来计算；watch在每次监听的值变化时，都会执行回调。如果一个值依赖多个属性（多对一），用computed肯定是更加方便的。如果一个值变化后会引起一系列操作，或者一个值变化会引起一系列值的变化（一对多），用watch更加方便。
- watch的回调里面会传入监听属性的新旧值，通过这两个值可以做一些特定的操作；computed通常就是简单的计算 ，但是要return一定有返回值。
- methods里面的方法不包含主动监听的能力，且相对于computed来讲没有缓存能力，每次会重新执行；但比较灵活，可以手动去调取 。
- methods和watch中都可以进行异步操作，而computed中只能进行简单的计算，返回计算结果。