import React, { useState, useEffect, useMemo, useRef } from 'react'
import './msiefood.scss'
import MsiteHead from './children/MsiteHead'
import { createHeadList } from './../../models/HeadList'
import BlackMaks from './../../Components/BlackMask'
import MsiteDownModel from './children/MsiteDownModel'
import RestauList from './../Home/children/RestauList'
import SortTab from './../../Components/SortTab'
import { connect } from 'react-redux'
import { createNavTab } from './../../models/NavTab'
import * as actions from './../../store/actions/homeAction'
import  {
  CurrentOffset,
  CurrentSortType
} from './../../interface/Home'
import {
  req_sift_factors,
} from './../../api/msite'
import { AxiosResponse } from 'axios';

interface IProps {
  history: History
  navTab: any
  get_resturant: Function
  set_current_offset(offset: number): CurrentOffset
  set_current_sort_type: (type: string) => CurrentSortType
  support_ids: string []
  activity_types: string

}
const MsiteFood = (props: IProps) => {
  const {
    history,
    navTab,
    get_resturant,
    set_current_offset,
    set_current_sort_type,
    support_ids,
    activity_types,
  } = props
  const [headList, setHeadList] = useState([])
  // 顶部的mask
  const [showMask, setShowMask] = useState(false)
  // 筛选的mask
  const [showSortMask, setShowSortMask] = useState(false)
  // 用于标记是否显示排序下拉面板
  const [showSort, setShowSort] = useState(false)
  // 用于标记是否显示筛选下拉面板
  const [showChoose, setChooseSort] = useState(false)
  // 用于标记当前排序类型
  const [currentType, setCurrentType] = useState('综合排序')
  const handleMaskClick = () => {
    // 隐藏蒙版

    // 隐藏排序面板
    setShowSort(false)
    // 隐藏筛选面板
    setChooseSort(false)
  }
  const MsiteRef = useRef(null)
  // 控制顶部点击
  const [type, setType] = useState(0)

  // 请求头部列表
  useEffect(() => {
    ; (async () => {
      let doc: AxiosResponse = await req_sift_factors()
      const { err_code, data } = doc as any
      if (err_code === 0) setHeadList(data)
    })()
  }, [])

  return (
    <div ref={MsiteRef} className={`msitefood ${showMask ? 'notmove' : ''}`} >
      <MsiteHead
        type={type}
        setType={setType}
        headList={useMemo(() => createHeadList(headList), [headList])}
        rightClick={() => setShowMask(true)}
      />
      <SortTab
        navTab={navTab && createNavTab(navTab.toJS())}
        setShowMsk={setShowSortMask}
        setShowSort={setShowSort}
        setChooseSort={setChooseSort}
        showMsk={showSortMask}
        set_current_offset={set_current_offset}
        set_current_sort_type={set_current_sort_type}
        get_resturant={get_resturant}
        support_ids={support_ids}
        activity_types={activity_types}
        currentType={currentType}
        showSort={showSort}
        showChoose={showChoose}
        setType={setCurrentType}
        flag={true}
        chooseTop={{top: '76px'}}
        filterTop={{top: '76px'}}

      />
  
 
      <RestauList history={history} homeRef={MsiteRef} />
      <BlackMaks show={showMask} hide={() =>  setShowMask(false)} />
      <BlackMaks show={showSortMask} hide={() =>  setShowSortMask(false)} />
      <MsiteDownModel
        show={showMask}
        hide={() => setShowMask(false)}
        setHeadList={setHeadList}
        setType={setType}
      />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  navTab: state.getIn(['home', 'filterNavTab', 'navTab']),
  support_ids: state.getIn(['home', 'support_ids']),
  activity_types: state.getIn(['home', 'activity_types']),

})
export default connect(mapStateToProps, actions)(MsiteFood)

