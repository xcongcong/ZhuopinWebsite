//自己封装一个按钮
import React,{ Component} from 'react';
import './index.css'
export default function LinkButton(props){
    return <button className="LinkButton" {...props}></button>
}