import RestDetail from '../pages/RestDetail'
import { lazy } from 'react'
const Home = lazy(() => import('../pages/Home'))
const My = lazy(() => import('../pages/My'))
const Order = lazy(() => import('../pages/Order'))
const Search = lazy(() => import('../pages/Search'))
const Login = lazy(() => import('../pages/Login'))
const UserDetail = lazy(() => import ('../pages/UserDetail'))
// const RestDetail = lazy(() => import ('../pages/RestDetail'))
const DetailFoods = lazy(() => import('../pages/RestDetail/children/DetailFoods'))
const DetailInfo = lazy(() => import('../pages/RestDetail/children/DetailInfo'))
const DetailRating = lazy(() => import('../pages/RestDetail/children/DetailRating'))
const Remark = lazy(() => import ('../pages/Settlement/children/Remark'))
const Pay = lazy(() => import('./../pages/Pay'))
const MsiteFood = lazy(() => import('./../pages/MsiteFood'))

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
    path: '/detail/:id',
    key: 'restdetail',
    exact: false,
    component: RestDetail,
    routes: [
      {
        path: '/detail/:id/foods',
        key: 'foods',
        exact: true,
        component: DetailFoods
      },
      {
        path: '/detail/:id/rating',
        key: 'rating',
        exact: true,
        component: DetailRating
      },
      {
        path: '/detail/:id/info',
        key: 'info',
        exact: true,
        component: DetailInfo
      },

    ]
  },
  {
    path: '/search',
    key: 'search',
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
    component: UserDetail,
  },
  {
    path: '/Remark',
    key: 'Remark',
    exact: true,
    component: Remark
  },
  {
    path: '/pay',
    key: 'pay',
    exact: true,
    component: Pay
  },
  {
    path: '/msitefood', 
    key: 'msitefood', 
    exact: true, 
    component: MsiteFood
  }
]