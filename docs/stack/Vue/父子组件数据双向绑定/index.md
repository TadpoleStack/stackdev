### 父子组件数据双向绑定

#### 1、通过 v-moudle 和 props、\$emit

#### 首先 v-moudle 可以拆分为 v-bind:value 和 v-on:input,所以直接通过 props 的 value 和自定义事件 input 来进行数据双向绑定

```js
<template>
    <input type="text" v-model="thisValue" />
</template>

<script>
export default {
    name: 'customOne',
    props: {
        value: {
            //必须使用value
            type: String,
            default: ''
        }
    },
    data() {
        return {
            thisValue: this.value
        }
    },
    watch: {
        thisValue: {
            handler(newValue) {
                this.changeValue(newValue)
            },
            deep: true
        }
    },
    methods: {
        changeValue(value) {
            //自定义事件必须为input
            this.$emit('input', value)
        }
    }
}
</script>
```

##### 父组件调用

```js
<template>
    <customOne v-moudle="info" />
</template>
<script>
export default {
    data() {
        return {
            info: 'Tadpole'
        }
    }
}
</script>
```

#### 2、通过 modle 属性

通过 modle 属性设置

```js
<template>
    <input type="text" v-moudle="data" />
</template>

<script>
export default {
    name: 'customTwo',
    model: {
        prop: 'data',
        event: 'change'
    },
    props: {
        data: {
            type: String,
            default: ''
        }
    },
    watch: {
        data: {
            handler(n) {
                this.changeValue(n)
            },
            deep: true
        }
    },
    methods: {
        changeValue(n) {
            this.$emit('change', n)
        }
    }
}
</script>
//父组件通过v-moudle绑定
```

#### 3、通过 .async 实现

```js
<template>
    <input type="text" v-moudle="value" />
</template>

<script>
export default {
    name: 'customThree',
    props: {
        data: {
            type: String,
            default:''
        }
    },
    data() {
        return {
            value: this.data
        }
    },
    watch: {
        value: {
            handler(n) {
                this.changeData(n)
            }, deep: true
        }
    },
    methods: {
        changeData(data) {//更新data
            this.$emit('update:data', data)
        }
    }
}
</script>
```

父组件调用

```js
<template>
<customThree :data.async="info" />
</template>
<script>
export default{
    data(){
        return{
            info:'Tadpole'
        }
    }
}
</script>
```
