import ajax from './ajax'
import jsonp from 'jsonp'
const BASE=''

//const取名字
export const reqLogin = (username,password)=>ajax('/login',{username,password},'POST')  //请求登陆


//获取所有角色的列表----------------角色管理组件使用
export const reqRoles =()=>ajax(BASE+'/manage/role/list')
//jsonp请求,只能get请求 ，可以跨域不用配置代理
export const reqWeather =(city)=>{
    return new Promise((resolve,reject)=>{
        const url =`//restapi.amap.com/v3/weather/weatherInfo?key=c53b1f4884bd23213e91e1b1d34cf8e6&city=${city}`
        jsonp(url,{},(err,data)=>{
            console.log(err,data.lives[0])
            //成功了取出数据
            if(!err){
                const {weather,city} =data.lives[0]
                resolve({weather,city})
            }else{
                //天气请求失败
            }
        })
    })
    
}

