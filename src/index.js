import 'core-js/es/map'
import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.css'
import 'normalize.css/normalize.css'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.scss'
// 导入mock就会使用mock请求,注释掉进行真实请求
// import './mock/mock.js'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)