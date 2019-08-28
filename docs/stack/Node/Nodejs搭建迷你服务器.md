### Nodejs搭建迷你服务器

#### 使用Nodejs中的http 模块、fs模块、path模块创建一个迷你服务器能够处理不同的类型的格式显示，如（图片，js,css,视频）

```js
const http = require('http');
const fs = require('fs'); //文件系统模块
const path = require('path'); //引入path模块，提供了转换路径方法
let porgram = 'Dir'; //项目在网站根目录下的文件夹
let server = http.createServer((req, res) => {
    let extname = path.extname(req.url);
    if (extname == '.jpg') { //图片资源
        res.setHeader('Content-Type', 'image/jpg');
        let fileAddr = path.join(__dirname, porgram, req.url);
        var readStream = fs.createReadStream(fileAddr);
        readStream.pipe(res);
    } else if (extname == '.png') { //图片资源
        res.setHeader('Content-Type', 'image/png');
        let fileAddr = path.join(__dirname, porgram, req.url);
        var readStream = fs.createReadStream(fileAddr);
        readStream.pipe(res);
    } else if (extname == '.gif') { //图片资源
        res.setHeader('Content-Type', 'image/gif');
        let fileAddr = path.join(__dirname, porgram, req.url);
        var readStream = fs.createReadStream(fileAddr);
        readStream.pipe(res);
    } else if (extname == '.css') { //样式
        res.setHeader('Content-Type', 'text/css;charset=utf-8');
        let fileAddr = path.join(__dirname, porgram, req.url);
        var readStream = fs.createReadStream(fileAddr);
        readStream.pipe(res);
    } else if (extname == '.js') { //脚本
        res.setHeader('Content-Type', 'application/javascript;charset=utf-8');
        let fileAddr = path.join(__dirname, porgram, req.url);
        var readStream = fs.createReadStream(fileAddr);
        readStream.pipe(res);
    } else if (extname == '.mp4') { //视频
        res.setHeader('Content-Type', 'video/mpeg4;charset=utf-8');
        let fileAddr = path.join(__dirname, porgram, req.url);
        var readStream = fs.createReadStream(fileAddr);
        readStream.pipe(res);
    } else if (extname == '.mp3') { //音频
        res.setHeader('Content-Type', 'audio/mp3;charset=utf-8');
        let fileAddr = path.join(__dirname, porgram, req.url);
        var readStream = fs.createReadStream(fileAddr);
        readStream.pipe(res);
    } else if (extname == '.html') { //文档
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        let fileAddr = path.join(__dirname, porgram, req.url);
        var readStream = fs.createReadStream(fileAddr);
        readStream.pipe(res);
    } else {
        res.setHeader('author', 'Tadpole');
        res.setHeader('Content-Type', 'text/html;charset=utf-8');
        let content = fs.readFileSync('demo/index.html', 'utf-8');
        res.write(content);
        res.end();
    }
})
server.listen(3000, 'localhost', () => { //监听3000端口
    console.info('the server is ready on port 3000');
})
```