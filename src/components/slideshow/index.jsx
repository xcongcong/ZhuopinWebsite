import React, { Component } from 'react'
import { Carousel } from 'antd';
import './index.css'
import png1 from './images/1.png'
import png2 from './images/2.png'
import png3 from './images/3.png'



export default class Slideshow extends Component {
    render() {
        return (
            <div>
                <Carousel autoplay>
                <div>
                    <img src={png1} alt="img"/>
                </div>
                <div>
                    <img src={png2} alt="img"/>
                </div>
                <div>
                    <img src={png3} alt="img"/>
                </div>
                </Carousel>
            </div>
        )
    }
}
