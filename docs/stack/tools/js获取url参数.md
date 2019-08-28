### js获取url参数

#### js获取url参数的函数封装

```js
//js获取url参数 
   function getQuery(url,key){
       var keyVal = {};
       var query = url.split('?')[1];
       var info = query.split('&');
       info.forEach(val=>{
           keyVal[val.split('=')[0]] = val.split('=')[1]
       })
        if (key&&keyVal[key]){
            return keyVal[key]
        } else {
            return keyVal
        }
   }
```

#### 调用

```js
//调用一
    let url = 'https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=tadpole技术栈';
    getQuery(url);
//输出
    f: "3"
    ie: "utf-8"
    rsv_bp: "1"
    rsv_idx: "1"
    tn: "baidu"
    wd: "tadpole技术栈"

//调用二
    let url = 'https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=1&rsv_idx=1&tn=baidu&wd=tadpole技术栈';
    getQuery(url,'wd')
//输出
    tadpole技术栈
```