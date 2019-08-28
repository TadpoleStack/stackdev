### Nodejs连接MySQL

#### 1、安装MySQL模块

Node连接MySQL需要安装mysql模块

```js
npm install mysql
```

#### 2、连接MySQL

```js
var express = require('express');
//示例通过express框架搭建
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next) {
    var query = req.query;
    console.info(query.name)
    // host：连接的服务器
    // user：数据库用户名
    // password：设置的MySQL密码
    // database： 要连接的数据库名
    var connection = mysql.createConnection({
        host     : '39.96.170.222',
        user     : 'Tadpole',
        password : '******',
        database : 'database_name'
    });
    connection.connect();
    //进行数据库操作
    var q = `select * from userInfo where userName='${query.name}'`;
    connection.query(q, function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
    connection.end();//关闭连接
});

module.exports = router;

```
#### 3、模块的封装

##### 数据库配置文件

```js

//配置链接数据库参数
module.exports = {
    host : 'localhost',
    port : 3306,//端口号
    database : 'database_name',//数据库名
    user : 'root',//数据库用户名
    password : '******'//数据库密码
}

```
##### 方法的封装

```js
//封装一个db模块并暴露方法
const mysql = require('mysql');//引入mysql模块
const databaseConfig = require('./mysql.config');  //引入数据库配置模块中的数据
 
//向外暴露方法
module.exports = {
    query : function(sql,params,cb){
        //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        var connection = mysql.createConnection(databaseConfig);        
        connection.connect(function(err){
            if(err){
                console.log('链接失败');
                throw err;
            }
         //传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
        connection.query( sql, params, function(err,results,fields ){
           if(err){
                console.log('操作失败');
                throw err;
            }
            //将查询出来的数据返回给callback
            cb && cb(results, fields);
            //results作为数据操作后的结果，fields作为数据库连接的一些字段
            //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
             connection.end(function(err){
                  if(err){
                      console.log('关闭数据库失败！');
                      throw err;
                  }
              });
           });
       });
    }

```

##### 调用

```js
var db=require('../model/mysql.js');
// 查询
db.query('select * from istack_user', [],function(result,fields){
    console.log('查询结果如下');
    console.log(result);
});
//添加
var  addSql = 'INSERT INTO websites(username,password) VALUES(?,?)';
var  addSqlParams =['Tadpole', 'TadpolePassword'];
db.query(addSql,addSqlParams,function(result,fields){
    console.log('添加成功')
})
```