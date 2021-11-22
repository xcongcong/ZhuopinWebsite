import React, { Component } from 'react'
import {
Card,Button,Form,Input,Cascader,Upload
}from 'antd'
import {Link} from 'react-router-dom'
import LinkButton from '../../Link-Button'
import {  //antd引入
    LeftOutlined,
    } from '@ant-design/icons';
const {Item} = Form
const {TextArea} = Input
export default class AddUpdate extends Component {
    render() {
            const formItemLayout = { //指定Form宽度----------------------------
                labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 6,
                },
                },
                wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 14,
                },
                },
            };


        const title=(
            <span>
                <Link to='/admin/product'>
                    <LinkButton><LeftOutlined /></LinkButton>
                </Link>
                &nbsp;&nbsp;
                <span onClick={()=>{this.props.history.push('/admin/product')}}>添加商品</span>
            </span>
        )
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="商品名称">
                        <Input placeholder="请输入商品名称"/>
                    </Item>
                    <Item label="商品描述">
                        <TextArea autosize={{minRows:4,maxRows:6}} placeholder="请输入商品描述"/>
                    </Item>
                    <Item label="商品价格">
                        <Input prefix="￥" suffix="RMB" placeholder="请输入商品价值" />
                    </Item>
                    <Item label="商品分类">
                        <div>商品分类</div>
                    </Item>
                    <Item label="商品图片">
                        <div>商品图片</div>
                    </Item>
                    <Item label="商品详情">
                        <div>商品分类</div>
                    </Item>
                    <Item>
                        <Button type="primary">提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}
