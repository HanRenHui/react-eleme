import React, { memo, useState, useEffect, createContext, useContext } from 'react'
import * as actions from './../../store/actions/homeAction'
import { connect } from 'react-redux'
import DownModel from './../DownModel'
import ChooseModel from './../ChooseModel'
import { CSSTransition } from 'react-transition-group'


import './restaurant.scss'
export const ResaurantCounter = createContext({})

interface IProps {
  setInputTopClass: any,
  setFilterTopClass: any,
  filterTopClass: string,
  get_filter_data: any,
  navTab: any
}

interface ListProps {
  get_resturant: any,
  rests: [],
  sortType: Array<string>
}




let ResaurantList: any = memo((props: ListProps) => {
  const { get_resturant, rests } = props
  useEffect(() => {
    get_resturant(27.818289, 113.107385, 0, 8)
  }, [get_resturant])
  return (
    <ul className="resturant-list">

    </ul>
  )
})
const mapStateToProp = (state: any) => ({
  rests: state.getIn(['home', 'resturants']),
})
ResaurantList = connect(mapStateToProp, actions)(ResaurantList)



const Resaurant = memo((props: IProps) => {
  // 用于标记当前筛选条件
  const {
    setInputTopClass,
    setFilterTopClass,
    filterTopClass,
    get_filter_data,
    navTab
  } = props
  console.log(navTab)
  const [current, setCurrent] = useState(-1)
  // 用于标记是否显示黑色蒙版
  const [showMsk, setShowMsk] = useState(false)
  // 用于标记是否显示排序下拉面板
  const [showSort, setShowSort] = useState(false)
  // 用于标记是否显示筛选下拉面板
  const [showChoose, setChooseSort] = useState(false)
  // 用于标记当前排序类型
  const [currentType, setType] = useState('综合排序')
  const handleClick = (index: number) => {
    switch (index) {
      case 0:
        setShowMsk(true)
        setShowSort(true)
        setChooseSort(false)
        setInputTopClass('home-input-top')
        setFilterTopClass('filter-top')
        break
      case 3:
        setShowMsk(true)
        setChooseSort(true)
        setShowSort(false)
        setInputTopClass('home-input-top')
        setFilterTopClass('filter-top')
        break
    }
    setCurrent(index)
  }
  const handleMaskClick = () => {
    // 隐藏蒙版
    setShowMsk(false)
    // 隐藏排序面板
    setShowSort(false)
    // 隐藏筛选面板
    setChooseSort(false)
    setInputTopClass('')
    setFilterTopClass('')
  }
  // 请求filter tab的数据
  useEffect(() => {
    get_filter_data()
  }, [get_filter_data])
  const providerObj = {
    currentType,
    setType,
    setShowMsk,
    setInputTopClass,
    setFilterTopClass
  }
  return (
    <div className="restaurant">
      <ResaurantCounter.Provider value={providerObj}>
        <p className='restaurant-title'>推荐商家</p>
        {/* 排序tab */}
        <ul className={`restaurant-filter ${filterTopClass}`}>
          {navTab && navTab.map((item: any, index: number) => (
            <li
              className={`restaurant-filter-item ${current === index ? 'filter-weight' : ''}`}
              key={item.get('name')} onClick={() => handleClick(index)}
            >
              < span > {index === 0 ? currentType : item.get('name')}</span>
              {
                item.get('icon')
                  ? <i className={`iconfont ${item.get('icon')}`}></i>
                  : null
              }
            </li>
          ))}
        </ul>
        {/* 餐厅 */}
        <ResaurantList />
        {/* 蒙版 */}
        <div
          className={`filter-mask ${showMsk ? '' : 'mask-hide'}`}
          onClick={handleMaskClick}
        ></div>
        <CSSTransition
          timeout={200}
          classNames='down1'
          in={showMsk && showSort}
        >
          <DownModel />
        </CSSTransition>

        <CSSTransition
          timeout={200}
          classNames='down2'
          in={showMsk && showChoose}
        >
          <ChooseModel />
        </CSSTransition>
      </ResaurantCounter.Provider>

    </div>
  )
})
const mapState = (state: any) => ({
  navTab: state.getIn(['home', 'filterNavTab', 'navTab'])
})

export default connect(mapState, actions)(Resaurant)