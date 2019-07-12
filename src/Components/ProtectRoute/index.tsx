import React from 'react'
import { Route, Redirect } from 'react-router-dom'
interface IProps {
  to: string,
  component: any,
  // location: RouteComponentProps,
}

const ProtectRouter = (props: IProps) => {
  const { component: Component, to } = props
  return (
    <Route
      path={to}
      render={(props) => localStorage.getItem('user') ? <Component {...props} /> : <Redirect to='/login' /> }
    />
  )
}

export default ProtectRouter