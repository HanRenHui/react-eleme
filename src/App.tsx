import React, { useEffect } from 'react'
import routes from './util/routes'
import BottomTab from './Components/BottomTab'
import { connect } from 'react-redux'
import * as actions from './store/actions/homeAction'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

interface IProps {
  set_user_info: any
}
const App = (props: IProps) => {
  const { set_user_info } = props
  useEffect(() => {
    let user = localStorage.getItem('user')
    if (user) {
      set_user_info(JSON.parse(user))
    }
  }, [])
  return (
    <Router>
      {routes.map((route) => (
        <Route
          path={route.path}
          exact={route.exact}
          component={route.component}
          key={route.key}
        />
      ))}
      <BottomTab />
    </Router>
  )
}

export default connect(null, actions)(App)