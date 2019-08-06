import React, { memo, useState, useEffect, createContext } from 'react'
import * as actions from '../../../../store/actions/homeAction'
import { connect } from 'react-redux'
import RestauList from '../RestauList'
import NoResult from './../../../../Components/NoResult'
import { Link } from 'react-router-dom'
import SortTab from './../../../../Components/SortTab'
import { createNavTab } from './../../../../models/NavTab'
import {
  CurrentOffset,
  CurrentSortType
} from './../../../../interface/Home'
import './restaurant.scss'
export const ResaurantCounter = createContext({})

interface IProps {
  setInputTopClass?: (msg: string) => void
  setFilterTopClass?: (msg: string) => void
  filterTopClass?: string
  get_filter_data: Function
  get_resturant: Function
  support_ids: string []
  activity_types: string
  set_current_offset(offset: number): CurrentOffset
  set_current_sort_type: (type: string) => CurrentSortType
  history: History
  userInfo: any
  homeRef: any
  navTab: any
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
    set_current_sort_type,
    activity_types,
    support_ids,
    set_current_offset,
    history,
    userInfo,
    homeRef,
  } = props

  // 用于标记当前排序类型
  const [currentType, setType] = useState('综合排序')
  // 用于标记筛选那一栏是否被选中
  // 用于标记是否显示排序下拉面板
  const [showSort, setShowSort] = useState(false)
  // 用于标记是否显示黑色蒙版
  const [showMsk, setShowMsk] = useState(false)
  // 用于标记是否显示筛选下拉面板
  const [showChoose, setChooseSort] = useState(false)

  const handleMaskClick = () => {
    // 隐藏蒙版
    setShowMsk(false)
    // 隐藏排序面板
    setShowSort(false)
    // 隐藏筛选面板
    setChooseSort(false)
    setInputTopClass && setInputTopClass('')
    setFilterTopClass && setFilterTopClass('')
  }
  // 请求filter tab的数据
  useEffect(() => {
    get_filter_data()
  }, [get_filter_data])
  const providerObj = {
    setType,
    setShowMsk,
    setInputTopClass,
    setFilterTopClass
  }

  return (
    <div className="restaurant">
      <ResaurantCounter.Provider value={providerObj}>
        {/* 筛选tab */}
        <SortTab
          navTab={navTab && createNavTab(navTab.toJS())}
          filterTopClass={filterTopClass}
          setShowMsk={setShowMsk}
          setShowSort={setShowSort}
          setChooseSort={setChooseSort}
          showMsk={showMsk}
          set_current_offset={set_current_offset}
          set_current_sort_type={set_current_sort_type}
          get_resturant={get_resturant}
          support_ids={support_ids}
          activity_types={activity_types}
          currentType={currentType}
          showSort={showSort}
          showChoose={showChoose}
          setInputTopClass={setInputTopClass}
          setFilterTopClass={setFilterTopClass}
          setType={setType}
        />
        {/* 餐厅列表 */}
        {
          userInfo
            ? <RestauList history={history} homeRef={homeRef} />
            : (
              <div className="login-tip">
                <NoResult
                  img="//fuss10.elemecdn.com/2/67/64f199059800f254c47e16495442bgif.gif"
                  title="没有结果"
                  style={{ top: '38%' }}
                  des="登陆后查看更多商家"
                />
                <Link to='/login'>
                  <span className="log-btn">登录</span>
                </Link>
              </div>
            )
        }
        {/* 蒙版 */}
        <div
          className={`filter-mask ${showMsk ? '' : 'mask-hide'}`}
          onClick={handleMaskClick}
        ></div>
      </ResaurantCounter.Provider>

    </div>
  )
})
const mapState = (state: any) => ({
  navTab: state.getIn(['home', 'filterNavTab', 'navTab']),
  support_ids: state.getIn(['home', 'support_ids']),
  activity_types: state.getIn(['home', 'activity_types']),
  set_current_offset: state.getIn(['home', 'set_current_offset']),
  userInfo: state.getIn(['user', 'userinfo'])
})

export default connect(mapState, actions)(Restaurant)