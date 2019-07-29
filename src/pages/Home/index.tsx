import React, { useEffect, memo, useState, useCallback, useMemo, useRef } from 'react'
import './home.scss'
import { connect } from 'react-redux'
import { getLocation } from '../../util/gaodeAPI'
import * as actions from './../../store/actions/homeAction'
import { CSSTransition } from 'react-transition-group'
import AddressModel from './children/AddressModel'
import CitySelect from './children/CitySelect'
import Resaurant from './children/Restaurant'
import HomeHeaderBottom from './children/HomeHeaderBottom'
import Swiper from 'swiper'
import HomeHeaderTop from './children/HomeHeaderTop'
import PreRenderSwiper from './children/PreRenderSwiper'
import RendereSwiper from './children/RendereSwiper'


interface IProps {
  address: any,
  show_loading: any,
  swiper: any,
  get_swiper_data: Function,
  history: any
}

const Home = (props: IProps) => {
  const {
    address,
    show_loading,
    get_swiper_data,
    swiper,
    history
  } = props
  const [showAdd, setShowAddModel] = useState(false)
  const [showCity, setShowCitySelect] = useState(false)
  const swiperData = useMemo(() => swiper, [swiper])
  // 用于控制input和筛选条件是否贴着顶部
  const [inputTopClass, setInputTopClass] = useState('')
  const [filterTopClass, setFilterTopClass] = useState('')
  const homeRef = useRef(null)
  const showAddressModel = useCallback(() => {
    setShowAddModel(true)
  }, [setShowAddModel])
  // 获取定位
  useEffect(() => {
    if (!address) {
      getLocation()
      show_loading()
    }
  }, [address, show_loading])
  // 获取轮播图数据
  useEffect(() => {
    get_swiper_data()
  }, [])
  // 轮播图初始化
  useEffect(() => {
    new Swiper('.swiper-container', {
      autoplay: false,
    });
  }, [])
  // 监听页面滚动 加载更多
 
 
  return (
    <div className="home" ref={homeRef}>

      <HomeHeaderTop address={address} showAddressModel={showAddressModel} />
      <HomeHeaderBottom inputTopClass={inputTopClass} />
      {
        !address
          ? <PreRenderSwiper />
          : <RendereSwiper swiperData={swiperData} />
      }
      {/* 广告 */}
      <div className='home-ads padding'>
        <div className="home-ads-content">
          <div className="home-ads-c-left">
            <h4>品质套餐</h4>
            <p>搭配齐全吃得好</p>
            <span>立即抢购></span>
          </div>
          <div className="home-ads-c-right">
            <img src="https://fuss10.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?imageMogr/format/webp/thumbnail/!282x188r/gravity/Center/crop/282x188/" alt="" />
          </div>
        </div>
      </div>
      {/* 推荐餐厅 */}
      <Resaurant
        history={history}
        setInputTopClass={setInputTopClass}
        setFilterTopClass={setFilterTopClass}
        filterTopClass={filterTopClass}
      />
      <CSSTransition timeout={300} classNames='fade1' in={showAdd}>
        <AddressModel hide={setShowAddModel} setShowCityModel={setShowCitySelect} />
      </CSSTransition>
      <CSSTransition timeout={300} classNames='fade2' in={showCity}>
        <CitySelect show={showCity} setShowCitySelect={setShowCitySelect} />
      </CSSTransition>

    </div>
  )
}

const mapStateToProps = (state: any) => ({
  address: state.getIn(['home', 'address']),
  swiper: state.getIn(['home', 'swiper']),
})

export default connect(mapStateToProps, actions)(Home)

