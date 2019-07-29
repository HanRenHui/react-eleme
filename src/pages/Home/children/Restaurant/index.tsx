import React, { memo, useState, useEffect, createContext } from 'react'
import * as actions from '../../../../store/actions/homeAction'
import { connect } from 'react-redux'
import DownModel from '../DownModel'
import ChooseModel from '../ChooseModel'
import { CSSTransition } from 'react-transition-group'
import './restaurant.scss'
import RestauList from '../RestauList'
export const ResaurantCounter = createContext({})

interface IProps {
  setInputTopClass: Function,
  setFilterTopClass: Function,
  filterTopClass: string,
  get_filter_data: Function,
  navTab: any,
  get_resturant: Function,
  lng: number,
  lat: number,
  set_current_sort_type: Function,
  support_ids: string [],
  activity_types: string,
  set_current_offset: any,
  history: any
}


const Restaurant = memo((props: IProps) => {
  // 用于标记当前筛选条件
  const {
    setInputTopClass,
    setFilterTopClass,
    filterTopClass,
    get_filter_data,
    navTab,
    get_resturant,
    lng,
    lat,
    set_current_sort_type,
    activity_types,
    support_ids,
    set_current_offset,
    history
  } = props
  const [current, setCurrent] = useState(0)
  // 用于标记是否显示黑色蒙版
  const [showMsk, setShowMsk] = useState(false)
  // 用于标记是否显示排序下拉面板
  const [showSort, setShowSort] = useState(false)
  // 用于标记是否显示筛选下拉面板
  const [showChoose, setChooseSort] = useState(false)
  // 用于标记当前排序类型
  const [currentType, setType] = useState('综合排序')
  // 用于标记筛选那一栏是否被选中

  const handleUpdate = (index: number) => {
    switch (index) {
      case 0:
        setShowMsk(true)
        setShowSort(true)
        setChooseSort(false)
        setInputTopClass('home-input-top')
        setFilterTopClass('filter-top')
        set_current_offset(1)
      document.body.scrollTop = 0

        break
      case 1:
        set_current_sort_type('5')
        get_resturant(lat, lng, 0, 7, '5', support_ids, activity_types)
        set_current_offset(1)
      document.body.scrollTop = 0

        break
      case 2:
        set_current_sort_type('666')
        get_resturant(lat, lng, 0, 7, '666', support_ids, activity_types)
        document.body.scrollTop = 0
        set_current_offset(1)

        break
      case 3:
        setShowMsk(true)
        setChooseSort(true)
        setShowSort(false)
        setInputTopClass('home-input-top')
        set_current_offset(1)

        setFilterTopClass('filter-top')
      document.body.scrollTop = 0

        return
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
              key={item.get('name')} onClick={() => handleUpdate(index)}

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
        <RestauList history={history}/>
        {/* 蒙版 */}
        <div
          className={`filter-mask ${showMsk ? '' : 'mask-hide'}`}
          onClick={handleMaskClick}
        ></div>
        {/* 左边下拉 */}
        <CSSTransition
          timeout={200}
          classNames='down1'
          in={showMsk && showSort}
        >
          <DownModel />
        </CSSTransition>
        {/* 右边下拉 */}
        <CSSTransition
          timeout={200}
          classNames='down2'
          in={showMsk && showChoose}
        >
          <ChooseModel 
            setShowMsk={setShowMsk}
            setInputTopClass={setInputTopClass}
            setFilterTopClass={setFilterTopClass}
          />
        </CSSTransition>
      </ResaurantCounter.Provider>

    </div>
  )
})
const mapState = (state: any) => ({
  navTab: state.getIn(['home', 'filterNavTab', 'navTab']),
  lng: state.getIn(['home', 'lng']),
  lat: state.getIn(['home', 'lat']),
  support_ids: state.getIn(['home', 'support_ids']),
  activity_types: state.getIn(['home', 'activity_types']),
  set_current_offset: state.getIn(['home', 'set_current_offset'])
})

export default connect(mapState, actions)(Restaurant)