import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from './../../store/actions/detailAction'
import DetailHeader from './children/DetailHeader'
import Skeleton from './children/Skeleton'
import DetailVip from './children/DetailVip'
import { Link, Route } from 'react-router-dom'
import './detail.scss'
interface IProps {
  match: any,
  get_detail: Function,
  rst: any,
  history: any,
  menu: any,
  location: any,
  routes: [{
    path: string,
    exact: boolean,
    key: string,
    component: any,
    routes?: any
  }]
}
function tabs(id: number) {
  return [
    { title: '点餐', path: `/detail/${id}/foods` },
    { title: '评价', path: `/detail/${id}/rating` },
    { title: '商家', path: `/detail/${id}/info` },
  ]


}


const RestDetail = (props: IProps) => {
  const { match, get_detail, rst, history, menu, routes, location } = props
  const [showSke, setShowSke] = useState(true)
  let id = match.params.id
  useEffect(() => {
    setShowSke(true)
    if (!menu.size) {
      get_detail()
    }
  }, [menu])
  useEffect(() => {
    if (menu.size) {
      setShowSke(false)
    }
  }, [menu])


  return (
    <>
      <div className="detail">
        <DetailHeader rst={rst} history={history} />
        {/* 麦当劳会员 */}
        <DetailVip />
        {/* 二级路由导航 */}
        <nav className="nav">
          {tabs(id).map((item: any) => (
            <Link
              to={item.path}
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'nav-select' : ''}`}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {/* 二级路由的内容 */}
        {routes.map((route) => (
          <Route
            key={route.key}
            exact={route.exact}
            path={route.path}
            render={(props) => (<route.component routes={route.routes} {...props} />)}
          />
        ))}
      </div>
      <Skeleton show={showSke} />
    </>
  )
}
const mapStateToProps = (state: any) => ({
  rst: state.getIn(['detail', 'rst']),
  menu: state.getIn(['detail', 'menu'])
})
export default connect(mapStateToProps, actions)(RestDetail)  