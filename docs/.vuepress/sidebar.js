module.exports = [
    {
        title: '技术栈简介',   // 必要的
        path: '/'      // 可选的
      },
      {
        title: 'Vue',
        children: [
            {title:'Vue总结',path:'/Vue/'},
            {title:'Vuex总结',path:'/Vue/Vuex'},
            {title:'Vue-Router总结',path:'/Vue/Vue-Router'}
        ]
      },
      {
        title:'JavaScript',
        children:[
            { title:'JavaScript总结', path:'/JavaScript/'}
        ]
      },
      {
        title:'Node',
        children:[
            {title:'Node总结',path:'/Node/'}
        ]
      }
]