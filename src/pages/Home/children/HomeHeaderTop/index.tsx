import React, { memo } from 'react'
import './homeheadertop.scss'
interface HomeHeadProps {
  address: any,
  showAddressModel(): void
}

// 首页定位组件
const HomeHeaderTop = memo((props: HomeHeadProps) => {
  const { address, showAddressModel } = props
  return (
    <div className="home-header">
      <div className="container home-header-content">
        <div className="home-header-top" >
          <i className="iconfont icon-dingwei icon-loc"></i>
          <p className='home-header-t-address' onClick={showAddressModel}>
            {address ? address.get('address') : '正在定位...'}
          </p>
          <i className="iconfont icon-xiajiantou icon-down"></i>
        </div>
      </div>
    </div>
  )
})

export default HomeHeaderTop