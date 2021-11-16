//此文件用户维持登陆、用户登陆登出
import store from 'store'  //第三方库，用于删除用户，维持登陆
const USER_KEY='user_key'
export default {
        /*
        保存user
        */
        saveUser (user) {
            // localStorage.setItem(USER_KEY, JSON.stringify(user))
            store.set(USER_KEY, user)
        },

        /*
        读取user
        */
        getUser () {
            // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
            return store.get(USER_KEY) || {}
        },

        /*
        删除user
        */
        removeUser () {
            // localStorage.removeItem(USER_KEY)
            store.remove(USER_KEY)
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