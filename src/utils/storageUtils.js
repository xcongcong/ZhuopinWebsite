//此文件用户维持登陆、用户登陆登出
import store from 'store'  //第三方库，用于删除用户，维持登陆
export default {
    //保存用户
    saveUser(user){
        store.set('user_key', user)  //不加引号就报错，'user_key'是store内部定义的
    },
    //读取用户
    getUser(){
        return store.get('user_key')||{}
    },
    //删除用户，退出登陆
    removeUser(){
        store.remove('user_key')
    }
}



//原生封装↓
// export default {
//     //保存用户
//     saveUser (){
//         localStorage.setItem('user_key', JSON.stringify(user))
//     },
//     //读取用户 ----parse是将字符串转换为json格式   json={"aa":"11","bb":"22"},   stringify是将json转换为字符串方便读取
//     getUser (){
//         return JSON.parse(localStorage.getItem('user_key') || '{}')
//     },
//     //删除用户
//     removeUser (){
//         localStorage.removeItem('user_key')
//     }
// }