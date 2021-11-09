import React, { Component } from 'react'
import './index.css'
import { Menu, Icon,Button,} from 'antd';
import PubSub from 'pubsub-js' //引入发布消息

// import {
//     HomeOutlined,
//     } from '@ant-design/icons';



const { SubMenu } = Menu;   

export default class Leftbar extends Component {
        
    
        flag = true;  //组件内申明不能写 用const ，let ，var     ----------相当于初始化状态
        handle=()=>{
            PubSub.publish('Close-login',false);
            console.log(this)
            const btn = document.querySelector('.menu-btn'); //获取按钮汉堡按钮
            const menu = document.querySelector('.bar') //获取左边导航栏(函数内可以用const，let申明，然后不用加this)
            if(this.flag){   
                this.flag = false;    //没用const，let   就要this调用
                menu.style.left = '0';
                btn.classList.toggle('closed')//点击按钮时候切换X-样式 ------------切换class类名
                // btn.onclick = function(){
                //     this.classList.toggle('closed')//点击按钮时候切换X-样式
                    
                // }
            }else{
                this.flag = true;
                menu.style.left = '-120px';
                btn.classList.remove('closed')//点击按钮时候切换X-样式 ------------切换class类名
    
                }
        }
    
        OpenLogin=()=>{ //显示登陆表单

            PubSub.publish('login',true)  //发布消息
        }
        
        
        rootSubmenuKeys = ['sub1', 'sub2', 'sub4','sub5'];
        state = {
            openKeys: [''],  //openKeys: ['sub4'], 指定默认打开哪一项
        };
            onOpenChange = openKeys => {
                const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
                if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.setState({ openKeys, });
                } else {
                this.setState({
                    openKeys: latestOpenKey ? [latestOpenKey] : [],
                });
                }
            };

            
    render() {
        return (
                <div className="leftbar">
                    <div className="left">
                        <div className="btn1">
                            <div className="menu-btn" onClick={this.handle}>
                                <div className="menu-line"></div>
                                <div className="menu-line"></div>
                                <div className="menu-line"></div>
                            </div>
                        </div>
                    </div>
                    <div className="bar" >
                        {/* <HomeOutlined /> */}
                        {/* <Icon type="caret-down" className="close" />
                        <Icon type="home" /> */}
                        <div style={{width:'20px', height:'20px',position:'absolute',top:'85vh',left:'3.5vh'}}>
                            <Button type="primary" onClick={this.OpenLogin}>用户登陆</Button>
                        </div>
                    <Menu
                    dashed='true'
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                    style={{ width: 120 ,height:'100vh',paddingTop:'10vh',}}
                >
                    <SubMenu
                    key="sub1"
                    title={
                        <span>
                        <Icon type="mail" />
                        <span>公司介绍</span>
                        </span>
                    }
                    >
                    <Menu.Item key="1"  className="text" >公司简介</Menu.Item>
                    <Menu.Item key="2" className="text">团队建设</Menu.Item>
                    <Menu.Item key="3" className="text">品牌墙</Menu.Item>
                    </SubMenu>
                    <SubMenu
                    key="sub2"
                    title={
                        <span>
                        <Icon type="appstore" />
                        <span>创想空间</span>
                        </span>
                    }
                    >
                    <Menu.Item key="5" className="text">Option 5</Menu.Item>
                    <Menu.Item key="6" className="text">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu" >
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                    </SubMenu>
                        <SubMenu 
                            key="sub4"
                            title={
                                <span>
                                <Icon type="setting" />
                                <span>精品案例</span>
                                </span>
                            }
                            >
                            <Menu.Item key="9" className="text">展会运营</Menu.Item>
                            <Menu.Item key="10" className="text">会议活动</Menu.Item>
                            <Menu.Item key="11" className="text">展览展示</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub5"
                            title={
                                <span>
                                <Icon type="setting" />
                                <span>联系我们</span>
                                </span>
                            }
                            >
                            <Menu.Item key="9" className="text">商务合作</Menu.Item>
                            <Menu.Item key="10" className="text">招贤纳士</Menu.Item>
                        </SubMenu>
                        
                </Menu>
                    </div>
                </div>
        )
    }
}
