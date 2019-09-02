### js获取cookie

#### js获取cookie的简单封装

```js
    //目前仅仅是简单的设置、获取和删除cookie
   function cookie(status,key,value,expires=1,path="/") {
       switch(status){
           case 'setItem':
               if (expires){
                   let d = new Date();
                   d.setDate(d.getDate() + expdays);
                   expires = d.toGMTString();
               }
               document.cookie=key+"="+value+";expires="+expires+";path="+path
               break;
           case 'getItem':
               let vals = document.cookie.split(';');
               for(var i in vals) {
                   //判断一下,有没有user这个字符串
                   if(vals[i].indexOf(key) != -1) {
                       return vals[i].substring(key.length + 1);
                   }
               }
                break;
            case 'deletItem':
                document.cookie=key+"=' ';expires="+-1;
       }
   }
```

#### 调用

```js
    //设置cookie
    cookie('setItem','nickname','Tadpole',7);

    //获取cookie
    cookie('getItem','nickname')
    //输出=> Tadpole

    //删除cookie
    cookie('deletItem','nickname')
```