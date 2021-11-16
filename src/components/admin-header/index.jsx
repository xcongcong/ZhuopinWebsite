import React, { Component } from 'react'
import './index.css'
import { reqWeather } from '../../api/index'
import { formateDate } from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'
import {Redirect} from 'react-router-dom'
import { Modal, Button } from 'antd';
import PubSub from 'pubsub-js' //引入发布消息
import memoryUtils from '../../utils/memoryUtils'

export default class Headernav extends Component {
    state={
        data:'', //props对象
        currentTime:formateDate(Date.now()), //当前时间字符串格式
        wethercity:'',
        weather:'',
        WeatherImg:'',

    }
    logout=()=>{ //用户退出登陆功能
        const { confirm } = Modal;
        confirm({
                title: '是否要确认退出?',
                // icon: <ExclamationCircleOutlined />,
                // content: 'Some descriptions',
                onOk:()=> {
                    console.log('OK',this)
                    storageUtils.removeUser()
                    memoryUtils.user = {}
                    this.state.data.history.replace('/login')
                },
                onCancel() {
                
                },
            });
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

    componentDidMount(){ //组件挂载时
        this.getTime()
        this.getWeather()

        PubSub.subscribe('tiaozhuan2',(msg,data)=>{
            this.setState({data})
            
        })
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
                    <a href="javascript:" onClick={this.logout}>退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">首页</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        {/* <img src="" alt="" /> */}
                        <span>{wethercity}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="qi-301" viewBox="0 0 16 16"><path d="M7.012 14.985a1 1 0 0 0 2 0 6.605 6.605 0 0 0-1-2 6.605 6.605 0 0 0-1 2zM3.959 14a1 1 0 0 0 2 0 6.605 6.605 0 0 0-1-2 6.605 6.605 0 0 0-1 2zm6.028 0a1 1 0 0 0 2 0 6.605 6.605 0 0 0-1-2 6.605 6.605 0 0 0-1 2zM5.207 1.904h.007a.5.5 0 0 0 .493-.506L5.695.494a.5.5 0 0 0-.5-.494h-.007a.5.5 0 0 0-.493.506l.012.905a.5.5 0 0 0 .5.493zm-2.892.946a.5.5 0 1 0 .698-.716l-.648-.63a.5.5 0 1 0-.697.715zm-.179 2.203a.5.5 0 0 0-.5-.493h-.007l-.905.011a.5.5 0 0 0 .007 1h.007l.904-.011a.5.5 0 0 0 .494-.507zm5.638-2.12a.5.5 0 0 0 .359-.151l.63-.648a.5.5 0 0 0-.716-.698l-.631.648a.5.5 0 0 0 .358.849z"/><path d="M12.028 5.579a2.927 2.927 0 0 0-.37.037 4.364 4.364 0 0 0-7.316 0 2.926 2.926 0 0 0-.37-.037 2.972 2.972 0 1 0 1.16 5.709 4.302 4.302 0 0 0 5.735 0 2.972 2.972 0 1 0 1.16-5.71zm0 4.944a1.959 1.959 0 0 1-.77-.156 1 1 0 0 0-1.05.168 3.303 3.303 0 0 1-4.417 0 1 1 0 0 0-1.05-.168 1.972 1.972 0 1 1-.769-3.788 1.077 1.077 0 0 1 .15.017l.095.012a1 1 0 0 0 .962-.444 3.364 3.364 0 0 1 5.642 0 1 1 0 0 0 .962.444l.095-.012a1.08 1.08 0 0 1 .15-.017 1.972 1.972 0 1 1 0 3.944zM2.482 5.315A3.53 3.53 0 0 1 3.5 5.027a1.831 1.831 0 0 1 1.81-1.603 1.81 1.81 0 0 1 .553.095 4.933 4.933 0 0 1 1.281-.405A2.82 2.82 0 0 0 2.476 5.26c0 .02.006.037.006.056z"/></svg>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
