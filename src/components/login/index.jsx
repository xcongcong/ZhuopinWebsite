import React, { Component } from 'react'
import { Form, Input, Button, Checkbox,message } from 'antd';
import './index.css'
import close from './images/guanbi.png'

import PubSub from 'pubsub-js' //引入发布消息

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

            onFinish = (values) => {   //表单验证成功的回调
                // console.log('Success:', values);
                console.log(values)
                message.success('登陆成功')
                //replace跳转到页面
                this.state.data.history.replace('/admin')
            };

            onFinishFailed = (errorInfo) => {
                console.log(errorInfo)
                message.error('登陆出错,请重试')
            };


    render() {
        return (
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
                                {
                                    required: true,
                                    message: '请输入您的用户名!',
                                },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="密码"
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: '请输入您的密码!',
                                },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>



                            <Form.Item
                                wrapperCol={{
                                offset: 8,
                                span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登陆
                                </Button>
                            </Form.Item>
                        </Form>
                </div>
            </div>
            
        )
    }
}
