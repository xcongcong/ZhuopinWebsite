import React, { Component } from 'react'
import { Button,Card,Table, } from 'antd'
import {PAGE_SIZE} from '../../../utils/constants'
import { reqRoles } from '../../../api'

export default class Role extends Component {
    getRoles= async ()=>{
        
        const result =await reqRoles()
        // console.log(result)
        if(result.data.status===0){//角色列表请求成功
            alert('角色请求成功')
            const roles = result.data
        }else{
            alert('请求失败')
        }
    }
    state={
        roles: [
            {
                    "menus":[
                        "/home",
                        "/role",
                        "/products",
                        "/category",
                        "/product"
                ],
                "_id":"11",
                "name":"经理",
                "create_time":15546256542,
                "_v":0,
                "auth_time":15546256542,
                "auth_name":"admin"
            },
            {
                "menus":[
                    "/home",
                    "/role",
                    "/products",
                    "/category",
                    "/product"
            ],
            "_id":"22",
            "name":"经理",
            "create_time":15546256542,
            "_v":2,
            "auth_time":15546256542,
            "auth_name":"admin"
        },
        {
            "menus":[
                "/home",
                "/role",
                "/products",
                "/category",
                "/product"
        ],
        "_id":"33",
        "name":"销售",
        "create_time":15546256542,
        "_v":0,
        "auth_time":15546256542,
        "auth_name":"admin"
    },
        ]
    }

    initColumn=()=>{
        this.columns=[
            {
                title: '角色名称',
                dataIndex:'name'
            },
            {
                title: '创建时间',
                dataIndex:'create_time'
            },
            {
                title: '授权时间',
                dataIndex:'auth_time'
            },
            {
                title: '授权人',
                dataIndex:'auth_name'
            },

        ]
    }

    onRow=(role)=>{
        return{
            onClick:event =>{ //监听用户点击的哪一行
                console.log('row onClikc()',role)
            }
        }
    }


    componentWillMount(){
        this.initColumn()
    }

    componentDidMount(){
        this.getRoles()
    }

    
    render() {
        const{roles} = this.state;
        const titile=(
            <span>
                <Button type="primary">创建角色</Button>&nbsp;
                <Button type="primary" disabled>设置角色权限</Button>
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
                    rowSelection={{type: 'radio'}} //设置可以单选
                    onRow={this.onRow}//监听用户点击的哪一行
                
                
                
                />

            </Card>
        )
    }
}
