import React, { Component } from 'react'
import {Form,Input,Tree} from 'antd'
import menuList from '../../../config/menuConfig'
const Item =Form.Item
export default class AuthForm extends Component {


    // getTreeNodes=(menuList) =>{
    //     return newMenuList = menuList.map(item=>{
    //         const title = item.title
    //     })
    // }
    constructor(props){
        super(props)
        //根据传入的角色的menu生成初始状态
        const {menus} = this.props.role
        this.state={
            checkedKeys:menus
        }
    }
        
        onCheck = (checkedKeys) => {//当选中某一个node的回调
            this.setState({checkedKeys})
        };

        // 为父组件提供最新menus的方法
        getMenus=()=>this.state.checkedKeys


    componentWillMount(){
        this.menuList = menuList
    }
    //根据新传入的role来更新checkedkeys状态
    UNSAFE_componentWillReceiveProps(nextProps){ 
        //组件将接好收一个新的属性的时候才会调用，在render()之前，初次不会调用
        const menus = nextProps.role.menus
        this.setState({checkedKeys:menus})
    }
    componentDidMount(){
        console.log('wdaw',menuList)
        
        this.treeData = [
            {
            title: '平台权限',
            key: '0-0',
            children: [
                {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: false,
                children: [
                    {
                    title: 'leaf',
                    key: '0-0-0-0',
                    disableCheckbox: false,
                    },
                    {
                    title: 'leaf',
                    key: '0-0-0-1',
                    },
                ],
                },
                {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [
                    {
                    title: (
                        <span
                        style={{
                            color: '#1890ff',
                        }}
                        >
                        sss
                        </span>
                    ),
                    key: '0-0-1-0',
                    },
                ],
                },
            ],
            },
        ];
    }

    



    render() {
        const {role} =this.props   //父组件传递过来的
        const {checkedKeys} = this.state
        return (
            <div>
                <Item label="角色名称">
                    <Input value={role.name} disabled/>
                </Item>

                <Tree
                defaultExpandAll={true}
                checkable
                // defaultExpandedKeys={['0-0-0', '0-0-1']}
                // defaultSelectedKeys={['0-0-0', '0-0-1']}
                // defaultCheckedKeys={['0-0-0', '0-0-1']}
                // onSelect={this.onSelect}
                onCheck={this.onCheck}
                checkedKeys={checkedKeys}
                treeData={this.menuList}
                />
            </div>
        )
    }
}
