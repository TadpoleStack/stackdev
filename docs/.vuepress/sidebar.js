module.exports = {
  '/stack/':[
    {
      title: '技术栈简介',   // 必要的
      path: '/stack/introduce/'      // 可选的
    },
    {
      title: 'Vue知识库',
      children: [
          {title:'Vue总结',path:'/stack/Vue/'},
          {title:'Vuex总结',path:'/stack/Vue/Vuex'},
          {title:'Vue-Router总结',path:'/stack/Vue/Vue-Router'}
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
          {title:'Nodejs搭建迷你服务器',path:'/stack/Node/Nodejs搭建迷你服务器'}
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

