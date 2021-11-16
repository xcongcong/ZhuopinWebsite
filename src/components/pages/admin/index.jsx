import React, { Component } from 'react'
import memoryUtils from '../../../utils/memoryUtils'
import {Redirect,Route,Switch,} from 'react-router-dom'
import Leftnav from '../../admin-left-nav' //引入左侧导航栏组件
import Headernav from '../../admin-header' //引入顶部组件
import { Layout } from 'antd'; //引入antd布局
import './index.css'
import PubSub from 'pubsub-js'
//----------------------引入子路由组件
import Home from '../home'
import Category from '../category'
import Role from '../../pages/role'
import User from '../../pages/user'



const { Footer, Sider, Content } = Layout;//引入antd布局


export default class Admin extends Component {
    componentDidMount(){
        PubSub.publish('tiaozhuan2',this.props)
    }
    render() {
        const user = memoryUtils.user //用户对象
        // console.log('admin:',user._id)
        if(!user || !user._id){ 
            return <Redirect to='/login'/> //判断内存中有没有用户信息，如果没有就跳回登陆，禁止进入 后
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
                                {/* <Role/> */}
                                <Route path="/admin/home" component={Home} />
                                <Route path='/admin/category' component={Category} />
                                <Route path="/admin/role" component={Role} />
                                <Route path="/admin/user" component={User} />
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
