import React, { Component } from 'react'
import './index.css'
import { reqWeather } from '../../api/index'
import { formateDate } from '../../utils/dateUtils'

export default class Headernav extends Component {
    state={
        currentTime:formateDate(Date.now()), //当前时间字符串格式
        wethercity:'',
        weather:'',
        WeatherImg:'',
    }

    getTime=()=>{
        setInterval(()=>{
            //每隔一秒获取时间并跟新状态数据
            const currentTime=formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    getWeather=async()=>{
        const result = await reqWeather(510100)
        this.setState({weather:result.weather})//跟新天气状态
        this.setState({wethercity:result.city})
        // console.log('我是天气',weather)
    }
    componentDidMount(){
        this.getTime()
        this.getWeather()
    }
    componentWillUnmount(){
        //组件卸载时
    }
    render() {
        const{currentTime,weather,wethercity}=this.state
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎:admin</span>
                    <a href="javascript:">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        {/* <img src="" alt="" /> */}
                        <span>{wethercity}</span>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
