import React, { Component } from 'react'
import {Card,Button}from 'antd'
import ReactEcharts from 'echarts-for-react' //安装并引入echarts
export default class Bar extends Component {

    state={ //初始状态
        xiaoliang:[5, 20, 36, 10, 10, 20], //销量数组
        kucun:[3, 60, 1, 50, 60, 15], //库存数组
    }


    updata=()=>{ //跟新数据
        this.setState(state =>({
            xiaoliang:state.xiaoliang.map(item => item+10),
        }))
    }
    

    getOption=(xiaoliang,kucun)=>{//返回柱状图的配置对象
        return {
            //状态读取写法--------------------------------------------
            title: {
                    text: '商品柱状图'
                },
                tooltip: {},
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                legend:{
                    data:['销量','库存']
                },
                yAxis: {},
                series: [
                    {
                    name: '销量',
                    type: 'bar',
                    data: xiaoliang
                    },
                        {
                        name: '库存',
                        type: 'bar',
                        data: kucun
                        },
                ] 


            //原版写法--------------------------------------------
                // title: {
                //     text: 'ECharts 入门示例'
                // },
                // tooltip: {},
                // xAxis: {
                //     data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                // },
                // legend:{
                //     data:['销量','库存']
                // },
                // yAxis: {},
                // series: [
                //     {
                //     name: '销量',
                //     type: 'bar',
                //     data: [5, 20, 36, 10, 10, 20]
                //     },
                //         {
                //         name: '库存',
                //         type: 'bar',
                //         data: [3, 60, 1, 50, 60, 15]
                //         },
                // ] 
        }
    }

    render() {
        const {xiaoliang,kucun} = this.state
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.updata}>更新</Button>
                </Card>
                <Card title="柱状图一">
                    <ReactEcharts option={this.getOption(xiaoliang,kucun)} style={{height: 300}}/>
                </Card>
            </div>
            
        )
    }

}
