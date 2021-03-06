import React, { Component } from 'react'
import { Form, Input, Button,message } from 'antd';
import './index.css'
import close from './images/guanbi.png'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils';
import {Redirect} from 'react-router-dom'
import PubSub from 'pubsub-js' //引入发布消息

import {reqLogin} from '../../api/index' //请求登陆的promise函数

export default class Login extends Component {
            state = {
                data:'',
            }
            componentDidMount(){
                PubSub.subscribe('tiaozhuan',(msg,data)=>{
                        this.setState({data})
                        
                })
            }

            CloseLogin=()=>{
                // alert('关闭')
                PubSub.publish('Close-login',false);  //发布消息
            }
            //---------------------------------------------------------------------------
            onFinish = (values) => {   //表单验证成功的回调
                const {username,password} = values;
                // console.log(username,password)
                if(values){  //不写判断不能.then
                    reqLogin(username,password).then(response=>{
                        const result =response.data
                        if(result.status===0){//密码正确跳转后台
                            const user =result.data
                            memoryUtils.user = user;//保存到内存中
                            
                            storageUtils.saveUser(user)//保存到浏览器缓存

                            message.success('登陆成功')
                            this.state.data.history.replace('/admin')
                        }else{
                            message.error('用户名或密码错误')
                        }
                    }).catch(error=>{
                        message.error('无法连接到服务器')
                    })
                }
                
                // message.success('登陆成功')
                // //replace跳转到页面
                // 
            };

            onFinishFailed = (errorInfo) => {
                console.log(errorInfo)
                message.error('登陆出错,请重试')
            };


    render() {
        //优化，如果内存中有用户信息，说明已经登陆，就自动跳转到管理页面
        const user = memoryUtils.user  //如果内存中有用户信息了----------------------------
        if(user && user._id){
            return <Redirect to={'/admin'}/>
        }


        return (
            <div className="login">
                <div className="login-bg">
                <div className="login-content">
                    <img src={close} alt="guanbi" onClick={this.CloseLogin}/>
                    <h2>用户登陆</h2>
                    <Form
                        // layout='inline'
                        labelAlign='left'
                        name="basic"
                        labelCol={{
                            span: 7,
                        }}
                        wrapperCol={{
                            span: 20,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                        >
                            <Form.Item
                                label="账户"
                                name="username"
                                rules={[
                                {required: true,message: '用户名不能为空!',},
                                {min: 4,message: '用户名不低于四位',},
                                {max: 12,message: '用户名最长不高于十二位',},
                                {pattern:/^[a-zA-Z0-9_]+$/,message: '用户名必须是英文、数字或下划线组成',},
                                ]}
                            >
                                {/* 高阶函数第二次调用传入的 input↓ */}
                                <Input />  
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[
                                {required: true,message: '密码不能为空！',},
                                {min: 4,message: '密码不低于四位',},
                                {max: 12,message: '密码最长不高于十二位',},
                                {pattern:/^[a-zA-Z0-9_]+$/,message: '密码必须是英文、数字或下划线组成',},
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>



                            <Form.Item
                                wrapperCol={{
                                offset: 0,
                                span: 30,
                                }}
                            >
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登陆
                                </Button>
                            </Form.Item>
                        </Form>
                </div>
            </div>
            </div>
            
            
        )
    }
}
