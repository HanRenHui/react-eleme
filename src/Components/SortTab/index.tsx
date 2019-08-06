import React, { memo, useState, useEffect } from 'react'
import { NavTab } from './../../models/NavTab'
import { CSSTransition } from 'react-transition-group'
import DownModel from '../../pages/Home/children/DownModel'
import ChooseModel from '../../pages/Home/children/ChooseModel'
import { connect } from 'react-redux'
import {
  CurrentOffset,
  CurrentSortType
} from './../../interface/Home'
import './sorttab.scss'
interface IProps {
  navTab: NavTab[]
  filterTopClass?: string
  filterTop?: { top: string }
  chooseTop?: { top: string}
  showMsk: boolean
  get_resturant: Function
  lng: number
  lat: number
  support_ids: string[]
  activity_types: string
  currentType: string
  showSort: boolean
  flag?: boolean
  current_category: string
  showChoose: boolean
  setType: (type: string) => void
  setInputTopClass?: (msg: string) => void
  setFilterTopClass?: (msg: string) => void
  setShowMsk: (flag: boolean) => void
  setShowSort: (flag: boolean) => void
  setChooseSort: (flag: boolean) => void
  set_current_offset: (offset: number) => CurrentOffset
  set_current_sort_type: (type: string) => CurrentSortType
}

const SortTab = memo((props: IProps) => {
  const {
    navTab,
    filterTopClass,
    filterTop,
    setFilterTopClass,
    setInputTopClass,
    setShowMsk,
    setShowSort,
    showSort,
    showChoose,
    setChooseSort,
    showMsk,
    set_current_offset,
    set_current_sort_type,
    current_category,
    get_resturant,
    lat,
    lng,
    support_ids,
    activity_types,
    currentType,
    setType,
    chooseTop,
    flag
  } = props

  const [current, setCurrent] = useState(0)

  let style = {}
  if (filterTop) {
    style = filterTop
  }
  const setInputAndFilterTop = () => {
    setInputTopClass && setInputTopClass('home-input-top')
    setFilterTopClass && setFilterTopClass('filter-top')
  }
  useEffect(() => {
    // 初始化排序类型
    set_current_sort_type('0')
  }, [])
  const handleUpdate = (index: number) => {
    switch (index) {
      case 0:
        setShowMsk(true)
        setShowSort(true)
        setChooseSort(false)
        setInputAndFilterTop()
        set_current_offset(1)
        if (document.body.scrollTop > 0) {
          document.body.scrollTop = 0
        } else {
          document.documentElement.scrollTop = 0
        }
        break
      case 1:
        set_current_sort_type('5')
        get_resturant(lat, lng, 0, 7, '5', support_ids, activity_types, current_category)
        set_current_offset(1)
        if (document.body.scrollTop > 0) {
          document.body.scrollTop = 0
        } else {
          document.documentElement.scrollTop = 0
        }
        break
      case 2:
        set_current_sort_type('666')
        get_resturant(lat, lng, 0, 7, '666', support_ids, activity_types, current_category)
        set_current_offset(1)
        if (document.body.scrollTop > 0) {
          document.body.scrollTop = 0
        } else {
          document.documentElement.scrollTop = 0
        }
        break
      case 3:
        setShowMsk(true)
        setChooseSort(true)
        setShowSort(false)
        set_current_offset(1)
        setInputAndFilterTop()
        if (document.body.scrollTop > 0) {
          document.body.scrollTop = 0
        } else {
          document.documentElement.scrollTop = 0
        }


        return
    }
    setCurrent(index)
  }
  return (
    // <div></div>
    <>
      {/* 排序tab */}
      <ul className={`restaurant-filter ${filterTopClass} ${flag ? 'changeTop' : ''}`}>
        {navTab && navTab.map((item: NavTab, index: number) => (
          <li
            className={`restaurant-filter-item ${current === index ? 'filter-weight' : ''}`}
            key={item.name} onClick={() => handleUpdate(index)}
          >
            < span > {index === 0 ? currentType : item.name}</span>
            {
              item.icon
                ? <i className={`iconfont ${item.icon}`}></i>
                : null
            }
          </li>
        ))}
      </ul>
      {/* 左边下拉 */}
      <CSSTransition
        timeout={200}
        classNames='down1'
        in={showMsk && showSort}
      >
        <DownModel
          setType={setType}
          currentType={currentType}
          setShowMsk={setShowMsk}
          filterTop={filterTop}

        />
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
          chooseTop={chooseTop}
        />
      </CSSTransition>
    </>
  )
})
const mapStateToProps = (state: any) => ({
  lng: state.getIn(['home', 'lng']),
  lat: state.getIn(['home', 'lat']),
  current_category: state.getIn(['msite', 'currentCategory'])

})
export default connect(mapStateToProps, null)(SortTab) 