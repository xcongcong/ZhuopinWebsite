import React, { Component } from 'react'
//这里是 角色列表----------------------添加用户的按钮
import {Form,Input,Button} from 'antd'
const Item = Form.Item


export default class AddForm extends Component {
    formRef = React.createRef();

        componentDidMount(){
            // 得到 Form 实例
            const form = this.formRef.current
            this.props.setForm(form)  //把form对象给父组件
        }



    render() {
        return (
            <Form 
                ref={this.formRef}
                onFinish={this.onFinish}
            
            >
                <Item label="角色名称"
                    name="username" 
                    rules={[{ required: true, message: '角色名称必须输入!' },
                    // { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                ]} //校验规则
                    >
                    <Input placeholder="请输入角色名称" onBlur={this.getValues} />
                </Item>
            </Form>
        )
    }
}
