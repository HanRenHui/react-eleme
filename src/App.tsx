import React, { useEffect, Suspense } from 'react'
import routes from './util/routes'
import BottomTab from './Components/BottomTab'
import ProtectRoute from './Components/ProtectRoute'
import UserDetail from './pages/UserDetail'
import AddAdress from './pages/AddAdress'
import { connect } from 'react-redux'
import * as actions from './store/actions/userAction'
import MyAddress from './pages/MyAddress'
import Settlement from './pages/Settlement'
import './App.scss'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

interface IProps {
  set_user_info: any,
  showLoading: boolean
}
interface IRoute {
  exact: boolean,
  path: string,
  key: string,
  component: any,
  routes?: any
}
const App = (props: IProps) => {
  const { set_user_info, showLoading } = props

  useEffect(() => {
    let user = localStorage.getItem('user')
    if (user) {
      set_user_info(JSON.parse(user))
    }
  }, [set_user_info])
  return (
    <Router>
      <Suspense fallback={<div className="Loading"></div>}>
        {routes.map((route: IRoute) => (
          <Route
            path={route.path}
            exact={route.exact}
            render={(props) => (<route.component routes={route.routes} {...props} />)}
            key={route.key}
          />
        ))}
        <ProtectRoute to="/userdetail" component={UserDetail} />
        <ProtectRoute to="/addaddress" component={AddAdress} />
        <ProtectRoute to="/myaddress" component={MyAddress} />
        <ProtectRoute to="/settlement" component={Settlement} />
        <BottomTab />
        {
          showLoading
            ? <div className="loading-model"><div className="Loading"></div></div>
            : null
        }

      </Suspense>

    </Router>
  )
}

const mapStateToProps = (state: any) => ({
  showLoading: state.getIn(['home', 'showLoading'])
})

export default connect(mapStateToProps, actions)(App)