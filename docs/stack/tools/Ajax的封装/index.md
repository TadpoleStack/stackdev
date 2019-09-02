### Ajax的封装

#### 封装Ajax的get和post请求：
```js
/*  封装ajax函数
    type：请求方式
    url：请求地址
    data：发送的数据，string类型(eg：a=b&c=d) or object类型（eg：{a:b,c:d}）
    success: 请求成功后执行的回调函数
    beforeSend: 发送之前执行的回调函数
    complete：请求完成执行的回调函数
*/
function ajax({type = 'GET', url, data = '', success, async = true, beforeSend, complete}) {
    type = type.toUpperCase();
    // 创建xhr对象
    let xhr = new XMLHttpRequest();
    // 处理数据
    if(typeof data === 'object') {
        var str = '';
        for(var attr in data) {
            str += attr + '=' + encodeURIComponent( data[attr] ) + '&';
        }
        data = str.slice(0, -1);
    }
    // GET请求
    if(type === 'GET' && data !== '') {
        url += '?' + data;
    }
    // 配置请求方式、请求地址、是否异步
    xhr.open(type, url, async);
    // 执行beforeSend函数
    if(beforeSend) {
        beforeSend();
    }
    // 发送请求
    if(type != 'GET') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    } else {
        xhr.send();
    }
    // 等待接收
    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200) {
                if(success) {
                    success(xhr.responseText);
                }
            }
            // 执行complete回调函数
            if ( complete ) {
                complete();
            }
        }
    };
}
```
```js
    //调用
    var btn = document.getElementById('btn');
    var box = document.getElementById('box');
    btn.onclick = function () {
        ajax({
            url: '1.php',
            beforeSend: function () {
                box.after('请求中...');
            },
            success: function (data) {
                data = JSON.parse(data);
                data.forEach( v => {
                    var newLI = document.createElement('li');
                newLI.innerHTML = v.name;
                box.append(newLI);
                });
                console.log(data);
            },
            complete: function () {
                box.nextSibling.remove();
            }
        });
    };
```

#### 基于Promise

```js
function ajax({type = 'GET', url, data = '', success, async = true, beforeSend, complete}) {
    return new Promise(function (resolve, reject) {
        type = type.toUpperCase();
        // 创建xhr对象
        let xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        // 处理数据
        if(typeof data === 'object') {
            var str = '';
            for(var attr in data) {
                str += attr + '=' + encodeURIComponent( data[attr] ) + '&';
            }
            data = str.slice(0, -1);
        }
        // GET请求
        if(type === 'GET' && data !== '') {
            url += '?' + data;
        }
        // 配置请求方式、请求地址、是否异步
        xhr.open(type, url, async);
        // 执行beforeSend函数
        if(beforeSend) {
            beforeSend();
        }
        // 发送请求
        if(type != 'GET') {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(data);
        } else {
            xhr.send();
        }
        // 等待接收
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){
                if(xhr.status == 200) {
                    if(success) {
                        success(xhr.responseText);
                    }
                    resolve(xhr.responseText);
                } else {
                    reject(xhr.statusInfo);
                }
                // 执行complete回调函数
                if ( complete ) {
                    complete();
                }
            }
        };
    });
}
```