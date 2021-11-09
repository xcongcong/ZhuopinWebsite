import React, { Component } from 'react'
import Header from '../header'
import Content from '../content'
import PubSub from 'pubsub-js' //引入
import {message} from 'antd'


export default class Website extends Component {
    componentDidMount(){
        PubSub.publish('tiaozhuan',this.props)

        //通知
        message.success('由于开发模式与生产环境不同，页面适配及后台系统正在修复中')
        message.success('后台系统开发中，不代表最终品质！')
    }
    render() {
        return (
            <div className="website">
                <Header/>
                <Content/>
            </div>
        )
    }
}
