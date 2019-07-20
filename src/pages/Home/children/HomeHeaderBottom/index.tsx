import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import './HomeHeaderBottom.scss'
import { Icon } from 'antd-mobile'

interface HomeHeaderBottomProps {
  inputTopClass: string
}

// 首页搜索框组件
const HomeHeaderBottom = memo((props: HomeHeaderBottomProps) => {
  const { inputTopClass } = props
  return (
    <div className={`home-header-input ${inputTopClass}`}>
      <Link to='/search' className='home-h-input-content'>
        <Icon type="search" className="home-h-in-cont-search" size={'xs'} />
        <span>搜索饿了么商家丶商品名称</span>
      </Link>
    </div>
  )
})

export default HomeHeaderBottom