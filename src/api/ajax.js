/*
* 发送ajax请求的函数模块
* 返回promise
* */
import axios from 'axios'

export default function ajax(url, data={}, type='GET') {
    if(type === 'GET') {
        let paramString = ''
        Object.keys(data).forEach(key =>{
            paramString += key + '=' + data[key] + '&'
        })
        if(paramString) {
            paramString = paramString.substring(0, paramString.length -1)
        }
        return axios.get(url + '?' + paramString)
    }else{
        return axios.post(url,data)
    }
}