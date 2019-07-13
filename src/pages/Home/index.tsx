import React, { useEffect, memo, useState, useCallback } from 'react'
import './home.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLocation } from '../../util/gaodeAPI'
import { Icon } from 'antd-mobile'
import * as actions from './../../store/actions/homeAction'
import { CSSTransition } from 'react-transition-group'
import AddressModel from './../../Components/AddressModel'
import CitySelect from '../../Components/CitySelect'
interface HomeHeadProps {
  address: any,
  showAddressModel: any
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
            {address ? address.get('formattedAddress') : '正在定位...'}
          </p>
          <i className="iconfont icon-xiajiantou icon-down"></i>
        </div>
      </div>
    </div>
  )
})
// 首页搜索框组件
const HomeHeaderBottom = memo(() => {
  return (
    <div className="home-header-input">
      <Link to='/search' className='home-h-input-content'>
        <Icon type="search" className="home-h-in-cont-search" size={'xs'} />
        <span>搜索饿了么商家丶商品名称</span>
      </Link>
    </div>
  )
})
// 骨架屏
const PreRenderSwiper = () => {
  let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  return (
    <div className="prerender-swiper">
      {arr.map((item: number) => (
        <div className="pre-s-item" key={item}>
          <div className="pre-s-i-top"></div>
          <div className="pre-s-i-bottom"></div>
        </div>
      ))}
    </div>
  )
}


interface IProps {
  address: any,
  show_loading: any
}

const Home = (props: IProps) => {
  const { address, show_loading } = props
  const [showAdd, setShowAddModel] = useState(false)
  const [showCity, setShowCitySelect] = useState(false)
  const showAddressModel = useCallback(() => {
    setShowAddModel(true)
  }, [setShowAddModel])
  useEffect(() => {
    if (!address) {
      getLocation()
      show_loading()
    }
  }, [address, show_loading])
  return (
    <div className="home">
      <HomeHeaderTop address={address} showAddressModel={showAddressModel} />
      <HomeHeaderBottom />
      {
        !address
          ? <PreRenderSwiper />
          : null
      }
      <CSSTransition timeout={300} classNames='fade1' in={showAdd}>
        <AddressModel hide={setShowAddModel} setShowCityModel={setShowCitySelect}/>
      </CSSTransition>
      <CSSTransition timeout={300} classNames='fade2' in={showCity}>
        <CitySelect show={showCity} setShowCitySelect={setShowCitySelect}/>
      </CSSTransition>

    </div>
  )
}

const mapStateToProps = (state: any) => ({
  address: state.getIn(['home', 'address'])
})

export default connect(mapStateToProps, actions)(Home)

