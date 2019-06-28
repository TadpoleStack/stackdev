module.exports = {
    weather:{
        method:"GET",
        api:"https://free-api.heweather.net/s6/weather"
    },
    weather_tool1:{
        method:"jsonp",
        api:"https://widget.heweather.net/simple/static/js/he-simple-common.js?v=1.0"
    },
    weather_page:{
        method:"HTTP",
        api:"https://widget-page.heweather.net/h5/index.html?bg=1&md=0123456&lc=accu"
    },
    bMap_ip:{
        method:"jsonp",
        api:"http://api.map.baidu.com/api?v=2.0"
    }
}