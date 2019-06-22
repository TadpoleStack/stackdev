module.exports = {
    title: 'Tadpole技术栈',
    description: '愿每一个你，也都是自己的造梦者，勇敢的做梦，勇敢的生活!',
    head: [
        ['link', { rel: 'icon', href: '/ico.png' }]
      ],
    markdown: {
        lineNumbers: true
    },
    evergreen:true,

     /**
     * 主题设置
     */
    themeConfig: {
        nav: require('./nav'),//nav部分模块化
        sidebar: require('./sidebar'),//sidebar部分模块化
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "New content is available.",
                buttonText: 'Refresh'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    }
  }
