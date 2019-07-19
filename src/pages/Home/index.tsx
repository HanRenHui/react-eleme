import React, { useEffect, memo, useState, useCallback, useMemo, useRef } from 'react'
import './home.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLocation } from '../../util/gaodeAPI'
import { Icon } from 'antd-mobile'
import * as actions from './../../store/actions/homeAction'
import { CSSTransition } from 'react-transition-group'
import AddressModel from './../../Components/AddressModel'
import CitySelect from '../../Components/CitySelect'
import Resaurant from './../../Components/Restaurant'

import Swiper from 'swiper'

// import 'swiper/dist/css/swiper.min.css'
interface HomeHeadProps {
  address: any,
  showAddressModel: any
}
interface HomeHeaderBottomProps {
  inputTopClass: string
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
interface SwiperProps {
  swiperData: Array<any>
}
// 骨架屏对应的内容
const RendereSwiper = memo((props: SwiperProps) => {
  const { swiperData } = props
  let firstPart = swiperData.slice(0, 10)
  let secPart = swiperData.slice(-2)
  useEffect(() => {
    new Swiper('.swiper-container', {
      autoplay: false,
      // loop: true
    });
  }, [])
  return (
    <div className="swiper-container" >
      <ul className="swiper-wrapper">
        <li className="container-first swiper-slide">
          {firstPart.map((item: any, index: number) => (
            <div className="s-item" key={index}>
              <img src={item.get('src')} className="s-i-top" alt={item.get('src')} />
              <div className="s-i-bottom">{item.get('title')}</div>
            </div>
          ))}
        </li>
        <li className="container-sec swiper-slide">
          {secPart.map((item: any, index: number) => {
            return <div className="s-item" key={index}>
              <img src={item.get('src')} className="s-i-top" alt={item.get('title')} />
              <div className="s-i-bottom">{item.get('title')}</div>
            </div>
          })}
        </li>
      </ul>

    </div>

  )
})


interface IProps {
  address: any,
  show_loading: any,
  swiper: any,
  get_swiper_data: Function,
}

const Home = (props: IProps) => {
  const {
    address,
    show_loading,
    get_swiper_data,
    swiper,
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

