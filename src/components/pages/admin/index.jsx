import React, { Component } from 'react'
import memoryUtils from '../../../utils/memoryUtils'
import {Redirect,Route,Switch,BrowserRouter} from 'react-router-dom'
import Leftnav from '../../admin-left-nav' //引入左侧导航栏组件
import Headernav from '../../admin-header' //引入顶部组件
import { Layout } from 'antd'; //引入antd布局
import './index.css'
//----------------------引入子路由组件
import Home from '../home'
import Category from '../category'



const { Footer, Sider, Content } = Layout;//引入antd布局


export default class Admin extends Component {
    render() {
        const user = memoryUtils.user //用户对象
        // console.log('admin:',user._id)
        if(!user || !user._id){ 
            // return <Redirect to='/login'/> //判断内存中有没有用户信息，如果没有就跳回登陆，禁止进入 后
        }
        return (
                <Layout style={{height:"100vh"}}>
                    {/* 左侧栏 */}
                    <Sider>
                        <Leftnav/>
                    </Sider>
                    {/* 顶部栏 */}
                    <Layout>
                        <Headernav/>   

                        <Content style={{padding:'2vw',border:'1px solid #ccc'}}>
                            <Switch>
                                <Home/>
                                <Route path="/admin/home" component={Home} />
                                <Route path='/category' component={Category} />
                            </Switch>
                        </Content>

                        <div className="footer">
                            <Footer style={{textAlign:'center',backgroundColor:'#fff',color:'#1890ff',}}>页面开发开发中!</Footer>
                        </div>
                    </Layout>
                </Layout>
        )
    }
}
