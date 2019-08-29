### gulp4.0的安装与配置

gulp4.x在之前gulp3.x的基础上进行了一波更新，相应的配置和运行方式也发生了一些变化，在此做了一些总结。

#### 1、安装
```js
//先卸载之前的版本以免出错
npm uninstall gulp-cli -g
npm uninstall gulp -g

npm install gulp-cli -g //全局安装gulp-cli
npm install gulp -D //本地安装gulp
touch gulpfile.js
gulp --help
```

#### 2、配置
- 新的任务系统（基于 bach，替换掉了原先基于 orchestrator 的任务系统）
移除 gulp.reset
- gulp.task 不再支持三个参数的用法
- gulp.task 用字符串注册的任务必须是直接在命令行中调用的任务
- gulp.task 可以接受单参数语法，这个参数必须是一个命名函数，函数名会被作为任务名
- 添加了 gulp.series 和 gulp.parallel 方法用于组合任务
- 添加了 gulp.tree 方法用于获取任务树，传入 { deep: true } 参数可以得到一个 archy 兼容的节点列表
- 添加了 gulp.registry 方法以定制注册表
- 添加了 gulp.symlink 方法，功能和 gulp.dest 一致，不过是以软链接的方式
- gulp.dest 和 gulp.symlink 方法添加了 dirMode 参数允许对目标目录更好地控制
- gulp.src 接收的文件匹配字符串会顺序解释，所以你可以写成这样 gulp.src([‘.js’, ‘!b.js’, ‘bad.js’])（排除所有以 b 开头的 JS 文件但是除了 bad.js）
- gulp.src 方法添加了 since 选项，筛选在特定时间点之后修改过的文件（用于增量编译）
- 将命令行分离出来成为一个独立模块，以便节约带宽/空间。用 npm install gulp -g 或 npm install gulp-cli -g 都可以安装命令行，只是 gulp-cli 不包含模块代码所以比较小
- 命令行添加了 –tasks-json 参数，可以导出整个任务树以供他用
- 命令行添加了 –verify 参数用以检查 package.json 中是否包含黑名单插件 ┑(￣Д ￣)┍

#### gulp4.x在gulp3的基础上新增了一些API，和gulp3的用法类似，如下：

+ gulp.src() –全局匹配一个或多个文件
+ gulp.dest() –将文件写入目录
+ gulp.symlink() –与dest相似，但是使用软连接形式
+ gulp.task() –定义任务
+ gulp.lastRun() –获得上次成功运行的时间戳
+ gulp.parallel() –并行运行任务
+ gulp.series() –运行任务序列
+ gulp.watch() –当文件发生变化时做某些操作
+ gulp.tree() –获得任务书树
+ gulp.registry() –获得或注册任务

#### 3、gulpfile.js配置

```js
//在这里进行了简单的配置
var gulp = require("gulp");
var sass = require("gulp-dart-sass");
var ts = require("gulp-typescript")
var uglify = require("gulp-uglify-es").default;//js压缩
var cleancss = require("gulp-clean-css");//css压缩
var imagemin = require("gulp-imagemin");//压缩图片
var htmlmin = require("gulp-htmlmin");//对html页面进行压缩
var babel = require("gulp-babel");//babeles6转es5
var autoprefixer = require("gulp-autoprefixer");//对css添加浏览器后缀
var rename = require("gulp-rename");//重命名

//html
gulp.task("html",done=>{
    gulp.src("*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("./dist"))
    done()
})
//js
gulp.task("js",done=>{
     gulp.src("js/**/*.js")
        .pipe(babel({
            "presets": ['@babel/env']
        }))
        .pipe(uglify({
            mangle: true,//类型：Boolean 默认：true 是否修改变量名
            compress: true//类型：Boolean 默认：true 是否完全压缩
        }))//压缩
        .pipe(rename({suffix: '.min'}))//重命名
        .pipe(gulp.dest("./dist/js"));
    done()
});
//ts
gulp.task("ts",done=>{
    gulp.src("ts/**/*.ts")
        .pipe(ts())
        .pipe(gulp.dest("./dist/js"))
    done()
})
//css
gulp.task("css",done=>{
    gulp.src("css/**/*.css")
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleancss({
            keepSpecialComments: '*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("./dist/css"));
    done()
});
//sass
gulp.task("sass",done=>{
    gulp.src("sass/**/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleancss({
            keepSpecialComments: '*'//保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest("./dist/css"));
    done()
})
//images
gulp.task("images",done=>{
    gulp.src("images/*")
         .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true,    //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true,     //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true       //类型：Boolean 默认：false 多次优化svg直到完全优化
         }))
         .pipe(gulp.dest("./dist/images"))
    done()
})
//default
gulp.task("default",gulp.series("html","ts","js","sass","css","images"));
//监听
gulp.task("watch",done=>{
    gulp.watch("*.html",gulp.series('html'));
    gulp.watch("css/**/*.css",gulp.series("css"));
    gulp.watch("js/**/*.js",gulp.series("js"));
    gulp.watch("sass/**/*.scss",gulp.series("sass"));
    gulp.watch("ts/**/*.ts",gulp.series("ts"));
    gulp.watch("images/*",gulp.series("images"));
    done();
});
```