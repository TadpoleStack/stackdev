### Nodejs搭建迷你服务器

# 使用Nodejs中的http 模块创建一个迷你服务器能够处理不同的类型的格式显示，如（图片，js,css,视频）

```js
const fs = require("fs")
module.exports = {
	"jpg": function(res,req,filename){
	res.statusCode=200;
	res.setHeader("Content-type","binary","image/jpeg"_);
	fs.readFile(filename,(err,data)=>{
	if(err){
		res.write(err)
		res.end()
	}else{
		res.write(data)
		res.end()
	       }
                }
	"js": function(res,req,filename){
	res.statusCode=200;
	res.setHeader("Content-type","application/x-javascript ; charset=utf-8");
	fs.readFile(filename,(err,data)=>{
	if(err){
		res.write(err)
		res.end()
	}else{
		res.write(data)
		res.end()
	       }
                }
	"css": function(res,req,filename){
	res.statusCode=200;
	res.setHeader("Content-type","text/css ; charset=utf-8");
	fs.readFile(filename,(err,data)=>{
	if(err){
		res.write(err)
		res.end()
	}else{
		res.write(data)
		res.end()
	       }
                }
	"mp4": function(res,req,filename){
	res.statusCode=200;
	res.setHeader("Content-type","video/mpeg4");
	fs.readFile(filename,(err,data)=>{
	if(err){
		res.write(err)
		res.end()
	}else{
		res.write(data)
		res.end()
	       }
                }
	"err": function(res,req){
	res.statusCode=400;
	res.setHeader("Content-type","text/html ; charset=utf-8");
	res.write("出错了")
	res.end()
	}
```