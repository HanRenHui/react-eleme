import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { connect } from 'react-redux'
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
import './home.scss'


interface IProps {
  address: any,
  show_loading: any,
  swiper: any,
  get_swiper_data: Function,
  history: History,
  get_location(): void
}

const Home = (props: IProps) => {
  const {
    address,
    show_loading,
    get_swiper_data,
    swiper,
    history,
    get_location
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
      get_location()
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
  // 蒙版出现则禁止body滚动 防止页面穿透
  useEffect(() => {
    if (showAdd || showCity) {
      document.getElementsByClassName('home')[0].classList.add('alpha')
    } else if (!showAdd || !showCity) {
      document.getElementsByClassName('home')[0].classList.remove('alpha')

    }
  }, [showAdd, showCity])

  return (
    <>
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
              <img src="//fuss10.elemecdn.com/e/ee/df43e7e53f6e1346c3fda0609f1d3png.png?imageMogr/format/webp/thumbnail/!282x188r/gravity/Center/crop/282x188/" alt="广告" />
            </div>
          </div>
        </div>
        {/* 推荐餐厅 */}
        <Resaurant
          homeRef={homeRef}
          history={history}
          setInputTopClass={setInputTopClass}
          setFilterTopClass={setFilterTopClass}
          filterTopClass={filterTopClass}
        />
      </div>
      <CSSTransition timeout={300} classNames='fade1' in={showAdd}>
        <AddressModel hide={setShowAddModel} setShowCityModel={setShowCitySelect} />
      </CSSTransition>
      <CSSTransition timeout={300} classNames='fade2' in={showCity}>
        <CitySelect show={showCity} setShowCitySelect={setShowCitySelect} />
      </CSSTransition>
    </>

  )
}

const mapStateToProps = (state: any) => ({
  address: state.getIn(['home', 'address']),
  swiper: state.getIn(['home', 'swiper']),
})

export default connect(mapStateToProps, actions)(Home)

