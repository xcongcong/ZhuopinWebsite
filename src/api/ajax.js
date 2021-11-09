//封装axios用来发送ajax，返回一个promise对象
import axios from 'axios'
export default function ajax(url,data={},type='GET'){   //暴露一个用export default
    if(type === 'GET'){ //发送的get请求
        return axios.get(url,{params:data})   //此处返回的是一个promise对象，可以 .then()  .cath() 失败或成功的回调
    }else{  //post请求
        return axios.post(url,data,type='POST')
    }
}   
