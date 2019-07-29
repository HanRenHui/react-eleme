import Home from '../pages/Home'
import My from '../pages/My'
import Order from '../pages/Order'
import Search from '../pages/Search'
import Login from '../pages/Login'
import UserDetail from '../pages/UserDetail'
import RestDetail from '../pages/RestDetail'
import DetailFoods from '../pages/RestDetail/children/DetailFoods'
import DetailRating from '../pages/RestDetail/children/DetailRating'
import DetailInfo from '../pages/RestDetail/children/DetailInfo'
import Remark from '../pages/Settlement/children/Remark'
import Pay from './../pages/Pay'
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
  }
]