module.exports = {
  '/stack/':[
    {
      title: '技术栈简介',   // 必要的
      path: '/stack/introduce/'      // 可选的
    },
    {
      title: 'Tools类总结',
      children: [
        {title:'js获取url参数',path:'/stack/tools/js获取url参数'},
        {title:'js获取cookie',path:'/stack/tools/js获取cookie'},
        {title:'js阻止冒泡和取消默认',path:'/stack/tools/js阻止冒泡和取消默认'},
        {title:'js获取DOM属性',path:'/stack/tools/js获取DOM属性'}
      ]
    },
    {
      title: 'Vue知识库',
      children: [
          {title:'Vue-watch、computed和methods',path:'/stack/Vue/Vue-watch、computed和methods'},
          {title:'Vuex总结',path:'/stack/Vue/Vuex总结'},
          {title:'Vue-Router总结',path:'/stack/Vue/Vue-Router总结'},
          {title:'Vue-Router导航和传参',path:'/stack/Vue/Vue-Router导航和传参'}
      ]
    },
    {
      title:'JavaScript知识库',
      children:[
          { title:'JavaScript总结', path:'/stack/JavaScript/'}
      ]
    },
    {
      title:'css知识库',
      children:[
        { title:'css总结', path:'/stack/css/'}
      ]
    },
    {
      title:'小程序知识库',
      children:[
        {title:'mpvue',path:'/stack/MiniProgram/'}
      ]
    },
    {
      title:'Node知识库',
      children:[
          {title:'Nodejs搭建迷你服务器',path:'/stack/Node/Nodejs搭建迷你服务器'},
          {title:'Nodejs连接MySQL',path:'/stack/Node/Nodejs连接MySQL'}
      ]
    }
  ],
  '/homepage/':[
    {
      title:'个人主页',
      children:[
          {title:'个人简介',path:'/homepage/'}
      ]
    }
  ]
}

