
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {React,Component,lazy,Suspense } from 'react'
import { Spin } from 'antd';

// import Admin from '../src/components/pages/admin'
// import Website from './components/website'
//-------------懒加载先引入 lazy,Suspense
const Admin = lazy(()=> import('../src/components/pages/admin'))
const Website = lazy(()=> import('./components/website'))

export default class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Suspense fallback={<Spin />}>
            <Switch>
              <Route path='/admin' component={Admin}></Route>
              <Route path='/' component={Website}></Route>
            </Switch>
          </Suspense>
        </BrowserRouter>
    )
  }
}

