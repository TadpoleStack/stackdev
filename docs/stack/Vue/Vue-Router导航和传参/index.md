### Vue-Router导航和传参

#### 1、声明式导航

    Vue中声明式导航是通过标签 <router-link/>来跳转
```vue
<router-link :to="..."/>
<router-link :to="{name:'home'}" />
<router-link :to="{name:'home',params:{userId:'00236'}}">
<router-link :to="{path:'/home',query:{userId:'00236'}}">
```
在Vue编译执行时 router-link 会被渲染为 a标签，跳转时和a链接跳转类似。to后面跟着一个正常的url地址，当然 router-link 也可以自定义渲染为别的标签，只需通过 tag=“标签名”进行设置。
```vue
<router-link :to="..." tag="li"/>
```

#### 2、编程时导航

在Vue 实例内部，可以通过$router访问路由实例。想要导航到不同的 url，则使用router.push 方法(this.$router.push)。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 url。

```js
// 字符串
this.$router.push('/home')
// 对象
this.$router.push({ path: 'home' })
// 命名的路由
this.$router.push({ name: 'home', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
this.$router.push({ path: '/home', query: { plan: 'private' }})
```

::: warning 注意
如果运用path则params会失效，所以一般情况下 path—query组合，name—params组合
:::

#### 3、操作history

this.$router.go(n)——这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似window.history.go(n)。

```js
// 在浏览器记录中前进一步，等同于 history.forward()
this.$router.go(1)
// 后退一步记录，等同于 history.back()
this.$router.go(-1)
```

#### 4、路由参数

```js
1、
this.$router.push({ path: '/home', query: { plan: 'private' }})
<router-link :to="{path:'/home',query:{plan: 'private'}}" />

// 接收query参数 => this.$route.query.plan

2、
this.$router.push({ name: 'home', params: { userId: '123' }})
<router-link :to="{name:'home',params:{userId:'123'}}" />

// 接收params参数 => this.$route.params.userId 

```
