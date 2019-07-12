import Home from '../pages/Home'
import My from '../pages/My'
import Order from '../pages/Order'
import Search from '../pages/Search'
import Login from '../pages/Login'
import UserDetail from '../pages/UserDetail'
export default [
  {
    path: '/',
    exact: true,
    key: '/',
    component: Home
  }, 
  {
    path: '/my',
    exact: true,
    key: 'my',
    component: My
  }, 
  {
    path: '/order',
    key: 'order',
    exact: true,
    component: Order
  },
  {
    path: '/search',
    key:  'search',
    exact: true, 
    component: Search
  },
  {
    path: '/login',
    key: 'login',
    exact: true, 
    component: Login
  },
  {
    path: '/userdetail',
    key: 'userdetail',
    exact: true, 
    component: UserDetail
  }
]