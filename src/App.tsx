import React from 'react'
import routes from './util/routes'
import BottomTab from './Components/BottomTab'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const App = () => {
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
      <BottomTab/>
    </Router>
  )
}

export default App 