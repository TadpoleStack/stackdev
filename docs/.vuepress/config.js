module.exports = {
    title: 'Tadpole——技术栈',
    description: '这里是Tadpole的技术栈',
    head: [
        ['link', { rel: 'icon', href: '/icon.png' }]
      ],
      markdown: {
          lineNumbers: true
      },

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
