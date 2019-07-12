import React, { useEffect, memo, useState, useCallback } from 'react'
import './home.scss'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLocation } from '../../util/gaodeAPI'
import { Icon } from 'antd-mobile'
import * as actions from './../../store/actions/homeAction'
import { CSSTransition } from 'react-transition-group'
import AddressModel from './../../Components/AddressModel'

interface HomeHeadProps {
  address: any,
  showAddressModel: any
}
const HomeHeaderTop = memo((props: HomeHeadProps) => {
  const { address, showAddressModel } = props
  return (
    <div className="home-header">
      <div className="container">
        <div className="home-header-top" >
          <i className="iconfont icon-dingwei icon-loc"></i>
          <span className='home-header-t-address' onClick={showAddressModel}>
            {address ? address.get('formattedAddress') : '正在定位...'}
          </span>
          <i className="iconfont icon-xiajiantou icon-down"></i>
        </div>
      </div>
    </div>
  )
})

const HomeHeaderBottom = memo(() => {
  return (
    <div className="home-header-input">
      <Link to='/search' className='home-h-input-content'>
        <Icon type="search" className="home-h-in-cont-search" size={'xs'} />
        <span>搜索饿了么商家丶商品名称</span>
        {/* </div> */}
      </Link>
    </div>
  )
})

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
  const [show, setShow] = useState(false)
  const showAddressModel = useCallback(() => {
    setShow(true)
  }, [setShow])
  useEffect(() => {
    if (!address) {
      getLocation()
      show_loading()
    }
  }, [address])
  return (
    <div className="home">
      <HomeHeaderTop address={address} showAddressModel={showAddressModel} />
      <HomeHeaderBottom />
      {
        !address
          ? <PreRenderSwiper />
          : null
      }
      <CSSTransition timeout={300} classNames='fade' in={show}>
        <AddressModel hide={setShow} />
      </CSSTransition>

    </div>
  )
}

const mapStateToProps = (state: any) => ({
  address: state.getIn(['home', 'address'])
})

export default connect(mapStateToProps, actions)(Home)

