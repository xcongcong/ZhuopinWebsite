import React, { Component } from 'react'
import {Card,Select,Input,Button,Table,message} from 'antd'
import LinkButton from '../../Link-Button'
import {reqProducts, reqSearchProducts} from '../../../api'
import {PAGE_SIZE} from '../../../utils/constants'
import {reqUpdateStatus} from '../../../api'  //商品上架下架
const Option =Select.Option
export default class Product extends Component {
    state={
        total:0,//商品总数量
        products:[],//商品的数组
        loading:false,
        searchName:'',// 按关键字搜索
        searchType:'productName',//根据什么类型搜索
        // Status:'1', //默认商品是上架状态，2是下架状态
    }



    initColumns=()=>{//初始化Table列的数组
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render:(price)=> //加人名币符号
                    '¥'+price
            },
            {
                title: '状态',
                width:100,
                // dataIndex: 'status',
                render:(product)=>{//加人名币符号 相当于after ：：before作用
                    const {status,_id} = product
                    console.log(status,_id)
                    const newStatus = status === 1?2:1
                    return(
                        <span>
                            <Button type='primary' onClick={()=>{this.upDateStatus(_id,newStatus)}}>{status===1?'下架':'上架'}</Button>
                            {/* 当前商品的状态↓ */}
                            <span>{status===1?'在售':'已下架'}</span>  
                        </span>
                    )
                
                } 
            },
            {
                title: '操作',
                render:(product)=>{//加人名币符号 相当于after ：：before作用
                    return(
                        <span>
                            {/* 将product传递给目标路由组件--------------------------------------第二个参数 */}
                            <LinkButton onClick={()=>{this.props.history.push('/admin/detail',{product})}}>详情</LinkButton>&nbsp;
                            
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                
                } 
            },
            
        ];
    }

    getProducts=async(pageNum)=>{//请求指定分页
        this.pageNum=pageNum; //存储pageNum 当前页码，让其他方法能看见
        this.setState({loading:true});
        const {searchName,searchType} =this.state
        //如果搜索关键字有值，说明要做搜索分页
        let result
        if(searchName){
            result=await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
        }else{//一般请求
            result=await reqProducts(pageNum,PAGE_SIZE) //后台分页请求
        }
        this.setState({loading:false});//隐藏loading

        if(result.data.status===0){//请求成功
            //取出分页数据，跟新状态
            const {total,list}=result.data.data
            this.setState({
                total,
                products:list
            })
        }
    }

    upDateStatus = async(productId,status)=>{ // 点击下架按钮触发的事件回调
        const result =await reqUpdateStatus(productId,status)
        console.log(result)
        if(result.data.status===0){
            message.success('下架成功')
            this.getProducts(this.pageNum)
        }
    }

    componentWillMount(){
        this.initColumns()
    }
    componentDidMount(){
        this.getProducts(1) //默认展示第一页
    }
    render() {
        const {products,total,loading,searchType,searchName} = this.state

        const title=(
            <span>
                <Select value={searchType} style={{width:150}} onChange={value=>this.setState({searchType:value})}> 
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>&nbsp;&nbsp;
                <Input 
                    placeholder="请输入关键字" 
                    style={{width:150}} 
                    value={searchName}
                    onChange={event=>this.setState({searchName:event.target.value})}
                    />
                <Button type='primary' onClick={()=>{this.getProducts(1)}}>搜索</Button>
            </span>
        )
        const extra=(
            <Button type='primary' onClick={()=>{this.props.history.push('/admin/addupdata')}}>
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                loading={loading}
                rowKey='_id'
                bordered
                dataSource={products} columns={this.columns} //展示的数据
                pagination={{
                    current: this.pageNum,
                    onChange:(pageNum)=>{this.getProducts(pageNum)},
                    total,defaultPageSize:PAGE_SIZE,showQuickJumper:true}}  //分页器
                />
            </Card>
        )
    }
}
