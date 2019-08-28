### Vuex总结

Vuex在Vue中算是非常重要的一个模块，在大型项目中通常会使用到。Vuex是一个专门为Vue框架开发的状态管理模块、第三方状态仓库（俗称前端的数据库），对标react的redux。

#### 1、Vuex的适用场景

- 多个组件共享状态时
- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

在以上条件下Vue组件的父子通信就显得力不从心了，而Vuex正好解决了这个问题。

#### 2、Vuex的核心

<img class="medium-zoom-image" src="./images/vuex核心.png"/>

Vuex本身是用一个store对象来包含所有的应用层级状态，一切操作都是相对于store的（如果应用比较大时可以把store进行模块化划分）。在store中又详细划分了State、Mutation、Action、Getters、Module。

+ state简单来说是存储的状态。
+ Mutation是用来改变状态的方法。
+ 组建通过dispatch提交给Action再由 Action通过store.commit把请求提交给Mutation（ Action 提交的是 mutation，而不是直接变更状态，Action 可以包含任意异步操作）。
+ Getters向外暴露状态（ 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
+ Module是对Vuex进行模块化划分的。

#### 3、示例

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    username:''
  },
  mutations:{
    /**
     * @param state
     * @param args 传递的参数
     * @constructor
     */
    INCLOGIN(state,args){//用来改变state的方法
      state.username = args.data
    }
  },
  actions:{
    /**
     * 用户登录
     * @param store
     * @param args 通过dispatch传递来的参数
     */
    userlogin(store,args){
      store.commit("INCLOGIN",args)
      //‘INCLOGIN’是提交给mutation的方法名，args是传递的参数参数
    }
  },
  getters:{
    /**
     * 向外暴露状态
     * @param state
     * @returns {*}
     * @constructor
     */
    GETUSERNAME(state){//向外暴露Vuex中的状态—username
      return state.username
    }
  }
})
```

```js
this.$store.dispatch({type: "userlogin", data: this.username})
//通过dispatch改变Vuex中的状态，第一个参数即type为Actions中的方法名，
//第二个参数为传递的数据即Actions中的args
this.$store.getters.GETUSERNAME
//通过getters即可访问到Vuex中的状态（通常将状态放在computed中）
```

对于Modulede 模块化写法:

```js
const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```