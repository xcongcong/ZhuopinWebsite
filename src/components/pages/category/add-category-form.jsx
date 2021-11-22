import React, { Component } from 'react'
import {Form,Select,Input,} from 'antd'

const Item = Form.Item
const Option = Select.Option
export default class AddForm extends Component {
    render() {
        return (
            <Form>
                <Item>
                    <Select defaultValue='一级分类'></Select>
                    {/* <Select>
                        <Option  defaultvalue='列表'>一级分类</Option>
                        <Option  value='列表'>家用电器</Option>
                    </Select> */}
                </Item>
                
                <Input placeholder='请输入分类名称'/>
            </Form>
        )
    }
}
