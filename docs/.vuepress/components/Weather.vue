<template>
    <div class="code" @tap="open">
        <div id="he-plugin-simple"></div>
    </div>
</template>
<script>
import apilist from '../api'
import secret from '../secretConfig'
import axios from 'axios'
import { setPriority } from 'os';
export default {
    name:'Weather',
    data(){
        return{
            heweatherKey:secret.heweather,
            place:'',
            type:'now'
        }
    },
    methods:{
        Weatherfn(){
            let scriptNode = document.createElement('script');
            scriptNode.src = apilist.weather_tool1.api;
            document.body.appendChild(scriptNode);
              var WIDGET = {
                CONFIG: {
                    "modules": "01234",
                    "background": 2,
                    "tmpColor": "4A4A4A",
                    "tmpSize": 16,
                    "cityColor": "4A4A4A",
                    "citySize": 16,
                    "aqiSize": 16,
                    "weatherIconSize": 24,
                    "alertIconSize": 18,
                    "padding": "10px 10px 10px 10px",
                    "shadow": "1",
                    "language": "zh",
                    "borderRadius": 5,
                    "fixed": "false",
                    "vertical": "middle",
                    "horizontal": "center",
                    "key": "d642293d653748d7a76379c0c1afaed5"
                }
            }
            window.WIDGET = WIDGET
        },
        open(){
            window.open("https://widget-page.heweather.net/h5/index.html?bg=1&md=0123456&lc=accu&key=91b6d1e8bdcb4e0583d961a099e12d54","_self")
        }
    },
    created(){
        this.Weatherfn()
    }
}
</script>
<style lang="stylus" scoped>
.code{
    width 50%
}
@media screen and (max-width 1366px) and (min-width 0px){
    .code{
        width 100%
    }
}
@media screen and (min-width 1366px){
    .code{
        width 50%
    }
}
</style>

