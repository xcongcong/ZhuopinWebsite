import React, { Component } from 'react'
import logo from './images/logo.png'
import './index.css'


export default class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className="right">
                    <img src={logo} alt="logo" />
                </div>
            </div>
        )
    }
}
