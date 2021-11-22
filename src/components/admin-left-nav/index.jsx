import React, { Component } from 'react'
import './index.css'
import LOGO from '../../images/LOGO2.png'
import { Menu,} from 'antd';

import menuList from '../../config/menuConfig' //引入动态显示菜单列表，根据数组显示结构
import {Link,withRouter} from 'react-router-dom'
    
    const { SubMenu } = Menu;

class Leftnav extends Component {
    getMenuNodes=(menuList)=>{ // 菜单数组生成对应的标签数组
        const path = this.props.location.pathname
        return menuList.map(item =>{  //item指数组中的每一个对象---------------------
            if(!item.children){ //如果没有子菜单就返回
                return(
                    <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key}>
                                {item.title}
                            </Link>
                    </Menu.Item>
                )
            }else{ //渲染子菜单

                //默认打开当前的子选项,查找一个与当前子路径匹配的item
                const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                //如果存在，说明当前item的子列表需要展开
                if(cItem){
                    this.openKey = item.key
                }
                
                return(
                    <SubMenu key={item.key} icon={item.icon} title={item.title}>
                            {/* <Menu.Item key="5">{<MailOutlined />} 品类管理</Menu.Item>
                            <Menu.Item key="6">{<MailOutlined />} 商品管理</Menu.Item> */}
                            {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }
        })
    }
    componentWillMount(){ //在第一次render之前
        this.menuNodes = this.getMenuNodes(menuList)  //改变函数执行顺序
    }



    render() {
        
        //得到当前请求的路径
        let path = this.props.location.pathname
        if(path.indexOf('/product')===0){ //说明当前请求的是商品或其子路由界面
            path ='/product'
        }
        //得到需要打开的子菜单项
        const openKey = this.openKey
        

        return (
            <div className="left-nav">
                <div className="left-nav-header">
                    <img src={LOGO} alt="LOGO" />
                    <h1>矢易科技后台</h1>
                </div>

                <div >
                    {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button> */}
                    <Menu
                    SelectedKeys={[path]} //指定默认选中打开
                    defaultOpenKeys={[openKey]}  //指定默认选中打开
                    mode="inline"
                    theme="dark"
                    >       
                    {/* 动态生成的菜单--------------------------------------------------------------- */}
                            {
                                this.menuNodes //调用动态生成菜单函数
                            }
                        {/* 下面是写死情况----------------------------------------------------- */}
                        {/* <Menu.Item key="1" icon={<HomeOutlined />}>
                            <Link to='/admin/home'>
                                首页
                            </Link>
                        </Menu.Item> */}

                        {/* <SubMenu key="sub1" icon={<AppstoreAddOutlined />} title="商品">
                            <Menu.Item key="5">{<MailOutlined />} 品类管理</Menu.Item>
                            <Menu.Item key="6">{<MailOutlined />} 商品管理</Menu.Item>
                        </SubMenu> */}

                        {/* <Menu.Item key="2" icon={<UserOutlined />}>
                            <Link to='/admin/user'>
                                用户管理
                            </Link>
                        </Menu.Item>

                        <Menu.Item key="3" icon={<SafetyOutlined />}>
                            <Link to='/admin/role'>
                                角色管理
                            </Link>
                        </Menu.Item>

                        <SubMenu key="sub2" icon={<BarChartOutlined />} title="数据可视化">
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            
                            <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                            </SubMenu>
                        </SubMenu> */}
                    </Menu>
                </div>

                
            </div>
        )
    }
}
export default withRouter(Leftnav)
