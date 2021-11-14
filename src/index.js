import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom'

import storageUtils from './utils/storageUtils';
import memoryStorage from './utils/memoryUtils';
//读取浏览器缓存中的用户数据，login组件 store第三方库保存的
// const user =storageUtils.getUser()
// memoryStorage.user=user




ReactDOM.render(
    <BrowserRouter>
          <App />
    </BrowserRouter>,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
