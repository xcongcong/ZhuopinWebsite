import React, { Component } from 'react'
import {Card,List} from 'antd'
import LinkButton from '../../Link-Button'
import './index.css'
import {Link} from 'react-router-dom'
import {  //antd引入
    LeftOutlined,
    } from '@ant-design/icons';
import {BASE_IMG_URL} from '../../../utils/constants'
import { reqCategory } from '../../../api'


const Item =List.Item
export default class Detail extends Component {
    state={
        cName1:'',//一级分类名称
        cName2:'',//二级分类名称
    }
    async componentDidMount(){
        const {pCategoryId,categoryId} = this.props.location.state.product //从路由location state中取出发送请求的参数
        if(pCategoryId==='0'){//一级分类下的商品   -----------------这一步判断是因为有的商品没有二级分类
            const result =await reqCategory(categoryId)
            console.log('发送',result)
            const cName1 =result.data.data.name  //一级分类的名称
            this.setState({cName1})
        }else{//二级分类下的商品
            const result1 =await reqCategory(pCategoryId)
            const result2 =await reqCategory(categoryId)
            console.log('发送',result1,result2)
            const cName1 = result1.data.data.name  //一级分类的名称
            const cName2 = result2.data.data.name  //一级分类的名称
            this.setState({
                cName1,
                cName2,
            })
        }
    }
    render() {
        const {name,desc,price,detail,imgs} =this.props.location.state.product //读取路由传递过来的产品对象
        const {cName1,cName2}=this.state
        const title=(
            <span>
                <Link to='/admin/product'>
                    <LinkButton><LeftOutlined /></LinkButton>
                </Link>
                &nbsp;&nbsp;
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className="product-detail">
                <List bordered={true}>
                    <Item>
                        <span className="left">商品名称:</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格:</span>
                        <span>{price}元</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类:</span>
                        <span>{cName1}--{cName2}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片:</span>
                        <span className="product-img">
                            {//遍历图片数组--------------------------------------------
                                imgs.map(img=>(
                                    // 图片前面有基础路径/所以要拼串---
                                    <img src={BASE_IMG_URL + img} alt="img" key={img}/>
                                ))
                            }
                            <img 
                                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fx0.ifengimg.com%2Fres%2F2021%2FDC7860BDEF9AD43CC0FE9B788D54CFF7B7C923A1_size40_w640_h405.jpeg&refer=http%3A%2F%2Fx0.ifengimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639894036&t=4c602168c817cd954ef4d1cb6c1a8a7b" alt="" />
                            <img 
                                src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fn.sinaimg.cn%2Ftech%2Ftransform%2F183%2Fw630h353%2F20211029%2Ff016-16411061386f0526f5a40765ce39592a.png&refer=http%3A%2F%2Fn.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1639894268&t=e588b93ea0efcd051713221b061ab003" alt="" />
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情:</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
