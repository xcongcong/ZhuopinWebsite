import ajax from './ajax'
import jsonp from 'jsonp'
const BASE=''

//const取名字
export const reqLogin = (username,password)=>ajax('/login',{username,password},'POST')  //请求登陆


//品类管理，获取一级分类或二级分类列表
export const reqCategorys = (parentld)=>ajax('/manage/category/list',{parentld},'GET')
//添加分类
export const reqAddCategory =(categoryName,parentld)=>ajax('/manage/category/add',{categoryName,parentld},'POST')
//跟新分类
export const reqUpdateCategory =(categoryId,categoryName)=>ajax('/manage/category/update',{categoryId,categoryName},'POST')


//获取商品分页列表-----------------商品管理
export const reqProducts =(pageNum,pageSize)=>ajax('/manage/product/list',{pageNum,pageSize},'GET')
//搜索商品分页/        根据商品描述或者商品名称------让一个变量值作为属性名
export const reqSearchProducts=({pageNum,pageSize,searchName,searchType})=>ajax('/manage/product/search',{pageNum,pageSize,[searchType]:searchName},'GET')

//获取分类名称----------------------商品管理-商品详情
export const reqCategory=(categoryId)=>ajax('/manage/category/info',{categoryId},'GET')

//商品下架上架-----------------------商品管理
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status}, 'POST')

//角色权限，获取所有角色列表
export const reqRoles=()=>ajax('/manage/role/list',{},'GET')
//添加角色
export const reqAddRole=(roleName)=>ajax('/manage/role/add',{roleName},'POST')
// 添加角色权限
export const reqUpdateRole=(role)=>ajax('/manage/role/update',role,'POST')





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

