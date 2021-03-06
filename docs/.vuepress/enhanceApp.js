
import Element from 'element-ui';//element-ui
import 'element-ui/lib/theme-chalk/index.css';

import { NoticeBar } from 'vant';
import 'vant/lib/notice-bar/index.css'
import $axios from 'axios';//axios
import $http from './apiModel/http'

export default ({
 Vue, // VuePress 正在使用的 Vue 构造函数
 options, // 附加到根实例的一些选项
 router, // 当前应用的路由实例
 siteData // 站点元数据
}) => {
 Vue.use(Element)
 Vue.use(NoticeBar)
 Vue.prototype.$axios = $axios
 Vue.prototype.$http = $http
}