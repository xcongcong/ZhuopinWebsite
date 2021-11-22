
import {  //antd引入
    HomeOutlined,
    AppstoreAddOutlined,
    UserOutlined,
    BarChartOutlined,
    SafetyOutlined,
    AreaChartOutlined,
    LineChartOutlined,
    PieChartOutlined,
    BarcodeOutlined,
    ShopOutlined,
    } from '@ant-design/icons';

const menuList = [
            {
                title: '首页', // 菜单标题名称
                key: '/admin/home', // 对应的 path
                icon: <HomeOutlined />, // 图标名称
            },

            {
                title: '商品',
                key: '/products',
                icon: <AppstoreAddOutlined />,
                children: [ // 子菜单列表
                    {
                    title: '品类管理',
                    key: '/admin/category',
                    icon: <ShopOutlined />,
                    },
                    {
                    title: '商品管理',
                    key: '/admin/product',
                    icon: <BarcodeOutlined />,
                    },
                ]
            },
                {
                    title: '用户管理',
                    key: '/admin/user',
                    icon: <UserOutlined />,
                },
                {
                    title: '角色管理',
                    key: '/admin/role',
                    icon: <SafetyOutlined />,
                },
            {
                title: '图形图表',
                key: '/charts',
                icon: <AreaChartOutlined />,
                children: [
                    {
                        title: '柱形图',
                        key: '/admin/charts/bar',
                        icon: <BarChartOutlined />,
                    },
                    {
                        title: '折线图',
                        key: '/admin/charts/line',
                        icon: <LineChartOutlined />,
                    },
                    {
                        title: '饼图',
                        key: '/admin/charts/pie',
                        icon: <PieChartOutlined />,
                    },
                ]
            },
        ]
    export default menuList