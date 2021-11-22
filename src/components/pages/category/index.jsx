import React, { Component } from 'react'
import {Card,Button,Table,Modal} from 'antd'
import {PlusOutlined} from '@ant-design/icons';
import LinkButton from '../../Link-Button';
import {reqCategorys} from '../../../api/index'
import AddForm from '../../../components/pages/category/add-category-form'
export default class Category extends Component {
    state={
        loading: false, //等待数据的转圈状态
        categorys:[],
        parentId:'0', //当前显示一级分类列表
        parentIdName:'',//当前分类名称
        subCategorys:[], //二级分类列表
        showStatus:0,//表示添加跟新确认框是否显示，0：都不显示，1代表显示添加，2代表显示修改分类
    }
    //显示指定一级分类列表的子列表
    showSubCategorys=(category)=>{
        //跟新请求二级列表状态
        this.setState({
            parentId:category._id,
            parentIdName: category.name,
        },()=>{
            this.getCategorys()
            console.log('我是ID',this.state.parentId)
        })
        console.log('我是ID2',this.state.parentId)
    }
    //显示一级分类列表
    showCategorys=()=>{
        //跟新为一级列表状态
        this.setState({
            parentId:'0',
            parentName:'',
            subCategorys:[]
        })
    }
    getCategorys=async()=>{
        this.setState({loading:true})
        const {parentId}=this.state
        const result =await reqCategorys(parentId)
        console.log('返回的结果',result)
        this.setState({loading:false})
        if(result.data.status===0){
            const data = result.data.data  //ajax请求来的数据数组
            if(parentId==='0'){//跟新一级分类列表
                this.setState({categorys:data})
            }else{//跟新二级分类列表
                this.setState({
                    subCategorys:data
                })
            }
            
            
        }else{
            alert('请求失败')
        }
    }

    showAdd=()=>{//点击添加显示输入框-------------------
        this.setState({
            showStatus:1
        })
        console.log(this.state.showStatus)
    }

    showUpdate=()=>{// 显示修改分类框----------------
        this.setState({
            showStatus:2
        })
    }

    handleCancel=()=>{ //隐藏添加跟新确认框-----------------------------
        this.setState({
            showStatus:0
        })
    }
    
    addCategory=()=>{ //添加分类--------------------------------

    }

    updateCategory=()=>{//跟新分类--------------------------------

    }


    componentWillMount(){//生命周期------------------------
        this.columns = [
            {
            title: '分类名称',
            dataIndex: 'name',
            key: 'name',
            },
            {
            title: '操作',
            width:300,
            render:(category)=>( //返回需要的标签。由antd定义
                <span>
                    <LinkButton onClick={this.showUpdate}>修改分类</LinkButton>&nbsp;&nbsp;
                    {/* <LinkButton onClick={this.showSubCategorys}>查看子分类</LinkButton> */}
                    {this.state.parentId==='0'?<LinkButton onClick={() =>{this.showSubCategorys(category)}}>查看子分类</LinkButton>:null}
                    
                </span>
                )
            },
        ];
    }
    componentDidMount(){
        this.getCategorys() //组件加载发送ajax请求列表
    }
    render() {
        const {loading,subCategorys,parentId,parentName,categorys,showStatus} = this.state
        const title = parentId ==='0'?'一级分类列表':(
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <i>→</i>
                <span>{parentName}</span>
            </span>
        )
        const extra =<Button type="primary" onClick={this.showAdd}><PlusOutlined/>添加</Button> 
        
        return (
            <Card title={title} extra={extra} style={{width: '100%',height: '100%'}}>
                <Table
                    dataSource={parentId==='0'? categorys:subCategorys}
                    columns={this.columns}
                    bordered
                    rowKey='_id'
                    pagination={{defaultPageSize:'4',showQuickJumper:'ture'}}
                    loading={loading}  //配置分页器
                    />

                <Modal title="添加分类" visible={showStatus===1} onOk={this.addCategory} onCancel={this.handleCancel} destroyOnClose={true}>
                        <AddForm/>
                </Modal>

                <Modal title="修改分类" visible={showStatus===2} onOk={this.updateCategory} onCancel={this.handleCancel} destroyOnClose={true}>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                </Modal>
            </Card>
        )
    }
}
