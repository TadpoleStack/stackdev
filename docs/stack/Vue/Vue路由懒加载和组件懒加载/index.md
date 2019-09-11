### Vue路由懒加载和组件懒加载

在单页应用中，如果没有应用懒加载相关技术，在webpack打包后的文件将会异常的大，造成进入首页时，需要加载的内容过多、延时过长、不利于用户体验。运用懒加载(按需加载，即在需要的时候的时候进行加载)则可以将页面进行划分，需要的时候加载页面，可以有效的分担首页所承担的加载压力，减少首页加载用时。

####  1、路由懒加载

##### (一)、先看一下未使用路由懒加载

```js
    import Vue from 'vue'
    import Router from 'vue-router'
    import Tadpole from '@/components/Tadpole'//这里的组件直接进行导入
    Vue.use(Router)

    export default new Router({
        routes: [
            {
                path: '/',
                name: 'Tadpole',
                component:Tadpole//在渲染对应的路由视图层时直接渲染
            }
        ]
    })
```
如若未使用路由懒加载，在打包时会把路由对应的组件全部打包在一起，虽然在加载完毕后跳转路由会非常快，但是首屏加载时间特别长。

##### (二)、require方式路由懒加载

```js
//写法如下：component：resolve=>(require(['需要加载的路由的地址'])，resolve)
import Vue from 'vue'
import Router from 'vue-router'
    //通过require引入（第一种方式）
    const Tadpole = resolve =>{
    require.ensure(['@/components/Tadpole',() => {
    　　resolve(require('@/components/Tadpole'))
    }])
    }
    //通过require引入（第二种方式）—— 要简便一些
    const Tadpole = resolve => require(['@/components/Tadpole'], resolve)
Vue.use(Router)
 
export default new Router({
 routes: [
  {
   path: '/',
   name: 'Tadpole',
   component: Tadpole//通过上面的require方式引入组件，在访问路由时加载渲染对应的视图组件
  }
 ]
})

```
这种require方式是nodejs引入相应模块的写法

##### (三)、ES6的import方式路由懒加载

```js
//写法如下：const Tadple = （）=>import('需要加载的模块地址')
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
//通过ES6的import进行模块的导入 
const Tadple = ()=>import("@/components/Tadple")
export default new Router({
 routes: [
  {
   path: '/',
   name: 'Tadple',
   component:Tadple
  }
 ]
})
```

#### 2、组件懒加载
组件的加载和路由懒加载类似也是通过import和require动态导入

```js
// 通过import引入
<script>
const Tadpole = ()=>import("@/components/Tadple");
export default {
 components:{Tadpole},
}
</script>
```

```js
// 通过require引入
<script>
export default {
 components:{
  "Tadpole":resolve=>(["@/components/Tadple"],resolve)
 }
}
</script>
```