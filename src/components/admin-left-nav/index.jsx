import React, { Component } from 'react'
import './index.css'
import LOGO from '../../images/LOGO2.png'
import { Menu,} from 'antd';
import {  //antd引入
    HomeOutlined,
    AppstoreAddOutlined,
    UserOutlined,
    BarChartOutlined,
    SafetyOutlined,
    MailOutlined,
    } from '@ant-design/icons';

import {Link} from 'react-router-dom'
    
    const { SubMenu } = Menu;

export default class Leftnav extends Component {
    render() {
        return (
            <div className="left-nav">
                <div className="left-nav-header">
                    <img src={LOGO} alt="LOGO" />
                    <h1>矢易科技后台</h1>
                </div>

                <div style={{ width: '100%' }}>
                    {/* <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                    {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                    </Button> */}
                    <Menu
                    defaultSelectedKeys={['1']} //指定默认选中打开
                    // defaultOpenKeys={['sub1']}  //指定默认选中打开
                    mode="inline"
                    theme="dark"
                    >
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            <Link to='/admin/home'>
                                首页
                            </Link>
                        </Menu.Item>

                        <SubMenu key="sub1" icon={<AppstoreAddOutlined />} title="商品">
                            <Menu.Item key="5">{<MailOutlined />} 品类管理</Menu.Item>
                            <Menu.Item key="6">{<MailOutlined />} 商品管理</Menu.Item>
                        </SubMenu>

                        <Menu.Item key="2" icon={<UserOutlined />}>
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
                        </SubMenu>
                    </Menu>
                </div>

                
            </div>
        )
    }
}
