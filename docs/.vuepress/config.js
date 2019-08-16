const secret_data = require('./secretConfig');
module.exports = {
    title: 'Tadpole技术栈',//标题
    description: '愿每一个你，也都是自己的造梦者，勇敢的做梦，勇敢的生活!',//描述
    head: [//head标签配置
        ['link', { rel: 'icon', href: '/ico.png' }],
        ['script',{src:'https://cdn.bootcss.com/three.js/45/Three.min.js'}]
      ],
    markdown: {
        lineNumbers: true
    },
    evergreen:true,//兼容性配置
    locales: {
        '/': {
          lang: 'zh-CN'
        }
      },
     /**
     * 主题设置
     */
    themeConfig: {
            nav: require('./nav'),//nav模块化
            sidebar: require('./sidebar'),//sidebar模块化
            // algolia: {//algolia全文搜索
            //   apiKey: '<API_KEY>',
            //   indexName: '<INDEX_NAME>'
            // },
            lastUpdated: '上次更新',//最后一次更新
            searchMaxSuggestoins: 10,
            serviceWorker: {//serviceWorker配置
                updatePopup: {
                    message: "这儿发布了一些新内容！",
                    buttonText: '点击更新'
                }
            },
            // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
            repo: 'TadpoleStack/stackdev',
            // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
            // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
            repoLabel: '查看源码',
            // 以下为可选的编辑链接选项
            // 假如你的文档仓库和项目本身不在一个仓库：
            // docsRepo: 'TadpoleStack/TadpoleStack.github.io',
            // 假如文档不是放在仓库的根目录下：
            // docsDir: 'docs',
            // 假如文档放在一个特定的分支下：
            // docsBranch: 'master',
            // 默认是 false, 设置为 true 来启用
            editLinks: true,
            // 默认为 "Edit this page"
            editLinkText: '感谢您的阅览！'
    },
    plugins: {
        '@vuepress/back-to-top':true,
        '@vuepress/medium-zoom':{
            selector: 'img',
            options: {
              margin: 16
            }
        },
        '@vuepress/last-updated':{
            transformer: (timestamp, lang) => {
              // 不要忘了安装 moment
              const moment = require('moment')
              moment.locale(lang)
              return moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')
          }
        },
        '@vuepress/google-analytics': {
            'ga': secret_data.ga
        }
    },//插件
    globalUIComponents: [//配置全局组件
      'Bgmusic'
    ]
  }
