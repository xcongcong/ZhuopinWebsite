import React, { Component } from 'react'
import { Button,Card,Modal,Table,message } from 'antd'
import {PAGE_SIZE} from '../../../utils/constants'
import { reqRoles } from '../../../api'
import AddForm from './add-form'
import {reqAddRole,reqUpdateRole} from '../../../api' //添加角色
import AuthForm from './auth-form'
import memoryUtils from '../../../utils/memoryUtils'
import {formateDate} from '../../../utils/dateUtils'

export default class Role extends Component {
    state={
        roles: [],
        role:[],//当我选中列表中要加权限的用户
        isShowAdd:false,//是否显示添加角色界面， 默认不显示
        isShowAuth:false, //添加权限的窗口，默认不显示
    }
    getRoles= async ()=>{
        
        const result =await reqRoles()
        // console.log(result)
        if(result.data.status===0){//角色列表请求成功
            // alert('角色请求成功')
            const roles = result.data
        }else{
            alert('请求失败')
        }
    }
    constructor(props){
        super(props)
        this.auth = React.createRef()
    }

    initColumn=()=>{
        this.columns=[
            {
                title: '角色名称',
                dataIndex:'name'
            },
            {
                title: '创建时间',
                dataIndex:'create_time',
                render:(create_time)=>formateDate(create_time) //格式化时间
            },
            {
                title: '授权时间',
                dataIndex:'auth_time',
                render:(auth_time)=>formateDate(auth_time) //格式化时间
            },
            {
                title: '授权人',
                dataIndex:'auth_name'
            },

        ]
    }

    onRow=(role)=>{  //选中的要加权限的用户
        return{
            onClick:event =>{ //监听用户点击的哪一行
                this.setState({role})
            }
        }
    }

    //请求所有角色
    getRoles=async()=>{
        const result = await reqRoles()
        if(result.data.status===0){//角色请求成功
            const roles = result.data.data //取出角色数组
            this.setState({roles})
        }
        console.log('请求角色的数据：',result.data.data)
        console.log(this.state.roles)
    }
    //添加角色----------
    addRole=async()=>{
        // 表单验证，只有通过了才能向下处理

        
        
        const roleName = this.form.getFieldsValue().username //用户的角色名称
        this.form.resetFields()//重置数据
        const result = await reqAddRole(roleName)
        console.log(result)
            if(result.data.status===0){ //请求成功
                message.success('角色添加成功')
                this.getRoles() //重新请求
                this.setState({isShowAdd:false})
            }
        }
    
        upDateRole=async()=>{ //点击确认更改权限的回调------------------------------
            const role =this.state.role
            //得到新的menus
            const menus = this.auth.current.getMenus()
            role.menus = menus
            role.auth_name = memoryUtils.user.username //指定授权人
            
            role.auth_time = formateDate(Date.now())
            

            //请求跟新添加权限
            const result = await reqUpdateRole(role)
            console.log('请求角色',result)
            if(result.data.status===0){
                message.success('设置角色权限成功')
                this.setState({
                    roles:[...this.state.roles],
                    isShowAuth:false,

                })

            }
        }

    componentWillMount(){
        this.initColumn()
    }

    componentDidMount(){
        this.getRoles()
    }

    
    render() {
        const{roles,role,isShowAdd,isShowAuth} = this.state;
        const titile=(
            <span>
                <Button type="primary" onClick={()=>{this.setState({isShowAdd: true})}} >创建角色</Button>&nbsp;
                <Button type="primary" disabled={!role._id} onClick={()=>{this.setState({isShowAuth: true})}}>设置角色权限</Button>
            </span>
        )
        return (
            <Card title={titile}>
                <Table
                    bordered //设置表格边框
                    rowKey='_id'  //设置每一行的id
                    dataSource={roles} 
                    columns={this.columns}
                    pagination={{defaultPageSize:PAGE_SIZE}} //设置一行默认显示多少条内容
                    rowSelection={{  //选择某一个radio：单选框时候的回调
                        type: 'radio',
                        selectedRowKeys:[role._id],
                        onSelect:(role)=>{
                            this.setState({
                                role
                            })
                        }
                    }} //设置可以单选
                    onRow={this.onRow}//监听用户点击的哪一行
                
                />

                <Modal
                    title='添加角色'
                    visible={isShowAdd}  //这个表单是否可见根据这个值判断
                    onOk={this.addRole} //点击确认发送请求添加角色
                    onCancel={()=>{this.setState({isShowAdd:false})}}//取消就隐藏添加角色界面
                >
                    <AddForm  //添加角色的组件界面
                        setForm={(form)=>{this.form = form}}  //传给子组件一个回调函数,从而得到 子组件的form对象！！！！！！--------------------------------------------存到this中
                    />


                </Modal>


                <Modal
                    title='设置角色权限'
                    visible={isShowAuth}  //这个表单是否可见根据这个值判断
                    onOk={this.upDateRole} //点击确认发送请求更改权限
                    onCancel={()=>{this.setState({isShowAuth:false})}}//取消就隐藏权限界面
                >
                    <AuthForm ref={this.auth} role={role}/> 


                </Modal>

            </Card>
        )
    }
}
