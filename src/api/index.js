import ajax from './ajax'

//const取名字
export const reqLogin = (username,password)=>ajax('/login',{username,password},'POST')  //请求登陆