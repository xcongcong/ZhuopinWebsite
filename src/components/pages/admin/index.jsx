import React, { Component } from 'react'
import memoryUtils from '../../../utils/memoryUtils'
import {Redirect} from 'react-router-dom'

export default class Admin extends Component {
    render() {
        const user = memoryUtils.user.username
        if(!user||!user._id){
            return <Redirect to='/login'/> //判断内存中有没有用户信息，如果没有就跳回登陆，禁止进入 后台
        }
        return (
            <div className="admin">
                Hellow:{user}
            </div>
        )
    }
}
