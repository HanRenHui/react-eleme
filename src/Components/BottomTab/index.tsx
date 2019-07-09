import React, { memo } from 'react'
import './bottomtab.scss'
import { Link, withRouter } from 'react-router-dom'

const routes = [
  { path: '/', title: '首页', icon: 'iconfont ele icon-changyonglogo40' },
  { path: '/search', title: '搜索', icon: 'iconfont icon-biaoqing' },
  { path: '/order', title: '订单', icon: 'iconfont icon-dingdan' },
  { path: '/my', title: '我的', icon: 'iconfont icon-wode1' },
]

interface ItemProps {
  path: string,
  title: string,
  icon: string,
  currentPath: string
}

const TabItem = memo((props: ItemProps) => {
  const { path, title, icon, currentPath } = props
  return (
    <Link to={path} className="bottom-nav-link">
      <i className={`${icon} ${currentPath === path ? 'checked' : ''}`}></i>
      <span 
        className={`bottom-nav-span ${currentPath === path ? 'checked' : ''}`}
      >{title}</span>
    </Link>
  )
})



const BottomTab: React.FC = memo((props: any) => {
  const currentPath = props.location.pathname
  return (
    <div className="bottom-nav">
      {routes.map(item => (
        <TabItem
          path={item.path}
          title={item.title}
          key={item.title}
          icon={item.icon}
          currentPath={currentPath}
        />
      ))}
    </div>
  )
})
export default withRouter(BottomTab)