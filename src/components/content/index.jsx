    // import React from "react";
    import { Fullpage, FullpageItem } from "../fullpage/fullpage.jsx";
    import Login from '../login'
    import Slideshow from "../slideshow";
    import Leftbar from '../left-bar'
    import './index.css'
    import PubSub from 'pubsub-js' //引入消息订阅
    import img1 from './images/卓品网站1.jpg'
    import png from './images/卓品网站.png'
    import img2 from './images/page2/卓品网站.jpg'
    import png2 from './images/page2/卓品网站3.png'
    import img3 from './images/卓品网站3.jpg'
    import img5 from './images/page5/卓品网站.jpg'
    import down from '../slideshow/images/向下占行.png'
    import QQ from './images/icon_anow0qpjece/QQ.png'
    import GOUP from './images/icon_anow0qpjece/huidaodingbu.png'

    //page5
    import Page5_1 from './images/page5/_1.png'

    import React, { Component } from 'react'
    
    export default class Content extends Component {
        state={
            data:'',
            login:false,
        }
        
            componentDidMount() { //订阅消息
                PubSub.subscribe('page',(msg,data)=>{
                    
                    this.setState({data:data})
                    // console.log(data)
                });
                const login = document.querySelector('.login')
                if(this.state.login===false){
                    login.style.display = 'none'
                }else{
                    login.style.display = 'block'
                }

                

                PubSub.subscribe('login',(msg,data)=>{
                    // console.log('我是登陆按钮传的数据',data)
                    this.setState({login:data})
                    if(this.state.login===data){
                        login.style.display = 'block'
                    }
                    
                });

                PubSub.subscribe('Close-login',(msg,data)=>{
                    // console.log('我是关闭按钮传的数据',data)
                    this.setState({login:data})
                    if(this.state.login===data){
                        login.style.display = 'none'
                    }
                    
                });
                

                const list =document.querySelectorAll('.company li')
                for(var i=0;i<list.length;i++){
                    list[i].onmouseover=function(){
                        this.style.transform='scale(1.2)'
                        this.style.transition='all 0.5s'
                    }
                    list[i].onmouseout=function(){
                        this.style.transform='scale(1)'
                        this.style.transition='all 0.5s'
                    }
                }
            }

        
        GoTop=()=>{ //快速跳转到顶部
            // const result=this.state.data
            // this.setState({data:result})
            // console.log(result)
            //发送指定的页码数据过去---------
            PubSub.publish('toppage',1)
            console.log(this)

        }

            componentDidUpdate(){
                const login = document.querySelector('.login')
                const page2text = document.querySelector('.text-modle')
                const page2text3 = document.querySelector('.text-modle3')
                if(this.state.data===2){ //第二页判断
                    page2text.style.top = '35vh'
                }else{
                    page2text.style.top = '80vh'
                }
                if(this.state.data===3){ //第三页判断
                    page2text3.style.top = '40vh'
                }else{
                    page2text3.style.top = '80vh'
                }
                
            }

            componentWillUnmount(){
                PubSub.clearAllSubscriptions()
            }
        


        


        render() {
            return (
                    <div className="content">
                        <Leftbar/>
                        <div className="box_container">
                            {/* login登陆-------------------------------------- */}
                            <div className="login">
                                <Login/>
                            </div>
                            
                            {/* 聊天窗口------------------------------------------- */}
                            <div className="liaotian">
                                <div className="qq">
                                    <a href="https://wpa.qq.com/msgrd?v=3&amp;uin=2424772433&amp;site=qq&amp;menu=yes" target="_blank"><img border="0" src={QQ} alt="点击这里给我发消息" title="QQ"/></a>
                                </div>
                                <div className="top" onClick={this.GoTop}>
                                    <a><img border="0" src={GOUP} alt="点击这里给我发消息" title="QQ"/></a>
                                </div>
                            </div>
                            {/* {/* 跳动箭头 *--------------------------------------/} */}
                            <div class="animate-bounce-down">
                                <i>
                                <img src={down} alt="down" className="down"/>
                                </i>
                            </div>
                            {/* 轮播图组件 -----------------------------------*/}
                            <Fullpage>
                            <FullpageItem>
                                <div>
                                    <Slideshow/>
                                </div>
                            </FullpageItem>
                            <FullpageItem>
                                <div>
                                    <img src={img1} alt="img"  />
                                    <div className="text-modle" >
                                        <img src={png} alt="" />
                                    </div>
                                </div>
                            </FullpageItem>
                            <FullpageItem>
                                <div>
                                <img src={img2} alt="img" />
                                    <div className="text-modle3">
                                        <img src={png2} alt="" />
                                    </div>
                                </div>
                            </FullpageItem>
                            <FullpageItem>
                                <div><img src={img3} alt="img" /></div>
                            </FullpageItem>
                            <FullpageItem>
                                <div>
                                    <img src={img5} alt="img" />
                                    <div className="company">
                                        <ul>
                                            <li><img src={Page5_1} alt="DJDC" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                            <li><img src={Page5_1} alt="" /></li>
                                        </ul>
                                    </div>
                                </div>
                            </FullpageItem>
                            <FullpageItem>
                                <div><img src={img2} alt="footer" /></div>
                            </FullpageItem>
                            </Fullpage>
                        </div>
                        
                    </div>
                    
            )
        }
    }
    