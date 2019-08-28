### Vue-Router总结

Vue-Router是Vue.js官方的路由管理器。这里的路由指的是SPA应用程序的路劲管理器。通俗的说，vue-router就是Vue应用的链接路径管理系统。 Vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。传统的页面应用，是用一些超链接来实现页面切换和跳转的，但在Vue-Router单页面应用中，则是路径之间的切换，也就是组件的切换。路由模块的本质 就是建立起url和页面之间的映射关系 。

#### 1、Vue-Router的实现原理

SPA(single page application)单页面应用程序，只有一个完整的HTML页面；它在加载页面时，不会加载整个页面，而是只更新某个指定的容器中内容。单页面应用的核心之一就是更新视图而不重新请求页面。vue-router在实现单页面前端路由时，提供了两种方式：Hash模式和History模式；根据mode参数来决定采用哪一种方式。

#### 2、hash模式

vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 url，于是当url改变时，页面不会重新加载。 hash(#)是url的锚点，代表的是网页中的一个位置，单单改变#后的部分，浏览器只会滚动到相应位置，不会重新加载网页，也就是说 #是用来指导浏览器动作的，对服务器端完全无用，HTTP请求中也不会不包括#；同时每一次改变#后的部分，都会在浏览器的访问历史中增加一个记录，使用”后退”按钮，就可以回到上一个位置；所以说Hash模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。

#### 3、history模式

由于Vue-Router中hash模式会在url中自带#，如果不想要很丑的 hash，我们可以用路由的 history 模式，只需要在配置路由规则时，加入”mode: ‘history'”,这种模式充分利用 history.pushState API 来完成url跳转而无须重新加载页面。

```js
const router = new VueRouter({
  mode: 'history',//设置history模式
  routes: [...]
})
```

::: warning 注意
值得注意的是history模式要用好，还需要后台配置支持。因为Vue是一个SPA的单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 https://www.mewebsite.cn/user/id 就会返回 404。
所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 固定的HTML页面。
:::

```js
const router = new VueRouter({
  mode: 'history',//设置history模式
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    ...
    {
      path:'*',//如果URL错误或者是URL匹配不到静态资源，就重定向到首页
      redirect: "/"
    }
  ]
})
```

#### 4、路由重定向

```js
//路由从重定向通过routes配置来完成，通过 redirect 关键字来设置
const router = new VueRouter({
  routes: [
    { path: '/error', redirect: '/' },//重定向path
    { path: '/error', redirect: { name: 'Login' } },//重定向name
    { path: '/error', redirect:  to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }},
  ]
})
```

#### 5、路由别名

```js
/路由别名通过关键字 alias 设置path路径
const router = new VueRouter({
  routes: [
    { path: '/index', component: index, alias: '/home' }
  ]
})
```

::: tip 重定向和别名的区别
路由重定向就是，当用户访问 /error时，URL 将会被替换成/login，然后匹配路由为 /login。
路由别名就如同 /index 的别名是/home，当用户访问 /home 时，URL 会保持为 /home，但是路由匹配则为 /index，就像用户访问 /index 一样。
:::