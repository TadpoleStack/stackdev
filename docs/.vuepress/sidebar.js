module.exports = {
    '/stack/': [
        {
            title: '技术栈简介',   // 必要的
            path: '/stack/introduce/'      // 可选的
        },
        {
            title: 'Vue知识库',
            children: [
                {title: 'mvvm模式数据双向绑定', path: '/stack/Vue/mvvm模式数据双向绑定/'},
                {title: 'Vue路由懒加载和组件懒加载', path: '/stack/Vue/Vue路由懒加载和组件懒加载/'},
                {title: 'Vue-watch、computed和methods', path: '/stack/Vue/Vue-watch、computed和methods/'},
                {title: 'Vuex总结', path: '/stack/Vue/Vuex总结/'},
                {title: 'Vue-Router总结', path: '/stack/Vue/Vue-Router总结/'},
                {title: 'Vue-Router导航和传参', path: '/stack/Vue/Vue-Router导航和传参/'}
            ]
        },
        {
            title: 'JavaScript知识库',
            children: [
                {title: 'js原型链', path: '/stack/JavaScript/js原型链/'},
                {title: 'js浅拷贝和深拷贝', path: '/stack/JavaScript/js浅拷贝和深拷贝/'},
                {title: 'js中this总结', path: '/stack/JavaScript/js中this总结/'},
                {title: 'js数组去重总结', path: '/stack/JavaScript/js数组去重总结/'},
                {title: 'js数组扁平化去重排序', path: '/stack/JavaScript/js数组扁平化去重排序/'},
            ]
        },
        {
            title: 'js功能及效果的实现',
            children: [
                {title:'图片懒加载的实现',path: '/stack/JavaScriptModule/图片懒加载的实现/'},
                {title:'放大镜效果的实现',path: '/stack/JavaScriptModule/放大镜效果的实现/'},
                {title:'基本轮播图的实现',path: '/stack/JavaScriptModule/基本轮播图的实现/'},
                {title:'瀑布流的实现',path: '/stack/JavaScriptModule/瀑布流的实现/'}
            ]
        },
        {
            title: 'css知识库',
            children: [
                {title: 'css总结', path: '/stack/css/'}
            ]
        },
        {
            title: '小程序知识库',
            children: [
                {title: '获取小程序胶囊位置', path: '/stack/MiniProgram/获取小程序胶囊位置/'},
                {title: 'mpvue', path: '/stack/MiniProgram/mpvue/'}
            ]
        },
        {
            title: 'Node知识库',
            children: [
                {title: 'Nodejs搭建迷你服务器', path: '/stack/Node/Nodejs搭建迷你服务器/'},
                {title: 'Nodejs连接MySQL', path: '/stack/Node/Nodejs连接MySQL/'}
            ]
        },
        {
            title: 'Tools类总结',
            children: [
                {title: 'js获取url参数', path: '/stack/tools/js获取url参数/'},
                {title: 'js获取cookie', path: '/stack/tools/js获取cookie/'},
                {title: 'js阻止冒泡和取消默认', path: '/stack/tools/js阻止冒泡和取消默认/'},
                {title: 'js获取DOM属性', path: '/stack/tools/js获取DOM属性/'},
                {title: 'Ajax的封装', path: '/stack/tools/Ajax的封装/'}
            ]
        },
        {
            title: 'Web工具类',
            children: [
                {title: 'gulp4.0的安装与配置', path: '/stack/WebTool/gulp4.0的安装与配置/'},
                {title: 'git常用命令总结', path: '/stack/WebTool/git常用命令总结/'}
            ]
        }
    ],
    '/homepage/': [
        {
            title: '个人主页',
            children: [
                {title: '个人简介', path: '/homepage/'}
            ]
        }
    ],
    '/pastime/':[
        {title:"新闻资讯",path:'/pastime/news/'},
        {title:"美图推荐",path:'/pastime/prettyPic/'},
        {title:"段子分享",path:'/pastime/joke/'}
    ]
}

