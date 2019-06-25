const apiList = {
    "wechat":{
        "method":"GET"||"POST",
        "url":"http://v.juhe.cn/weixin/query",
        "demo":"http://v.juhe.cn/weixin/query?key=您申请的KEY"
    },
    "calendar":{
        "method":"GET"||"POST",
        "url":"http://v.juhe.cn/calendar/day",
        "demo":"http://v.juhe.cn/calendar/day?date=2015-1-1&key=您申请的appKey"
    },
    "joke":{
        "method":"GET"||"HTTP",
        "url":"http://v.juhe.cn/joke/content/list.php",
        "demo":"http://v.juhe.cn/joke/content/list.php?key=您申请的KEY&page=2&pagesize=10&sort=asc&time=1418745237"
    },
    "hostorytoday":{
        "method":"GET"||"POST"||"HTTP",
        "url":"http://api.juheapi.com/japi/toh",
        "demo":"http://api.juheapi.com/japi/toh?key=您申请的KEY&v=1.0&month=11&day=1"
    },
    "news":{
        "method":"GET"||"POST",
        "url":"http://v.juhe.cn/toutiao/index",
        "demo":"http://v.juhe.cn/toutiao/index?type=top&key=APPKEY"
    },
    "weather":{
        "method":"GET"||"POST"||"HTTP",
        "url":"http://apis.juhe.cn/simpleWeather/query",
        "demo":"http://apis.juhe.cn/simpleWeather/query?city=%E8%8B%8F%E5%B7%9E&key="
    },

}

module.exports = {
    apiList
}