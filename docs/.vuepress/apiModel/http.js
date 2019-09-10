import axios from 'axios'
import qs from 'qs'
import api_list from './api'


  const http = async function(method='GET',apiName=null,data={}){
    try {
        let res;
        if(method.toLocaleUpperCase()==='GET'){ res = await axios.get(api_list[apiName].api, {params: data})}
        else if(method.toLocaleUpperCase()==='POST'){res = await axios.post(api_list[apiName].api, qs.stringify(data))}
        res = res.data
        return new Promise((resolve) => {
          if (res.code === 200) {
            resolve(res)
          } else {
            this.$message({message:"不好意思哈~~~，数据出错啦！正在修复，请等待！"})
          }
        })
      } catch (err) {
        this.$message({message:"不好意思哈~~~，数据出错啦！正在修复，请等待！"})
        console.log(err)
      }
  }
export default http;