import React, { memo, useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/homeAction'
import NoResult from '../../../../Components/NoResult'
import './restauList.scss'
import RestuaItem from '../RestuaItem'
import { getImgPath, formatDistance } from '../../../../util/getImgPath'
import { Icon } from 'antd-mobile'

interface IProps {
  get_resturant: Function
  rests: any
  lat: number
  lng: number
  isNull: boolean
  support_ids: any
  activity_types: string
  hasNext: boolean
  currentSorType: string
  showLoading: Boolean
  currentOffset: number
  set_current_offset: any
  history: History
  clear_all_rests: Function
  homeRef: any,
  current_category: string 
}

const getRestData = (list: any) => {
  return list.get('restaurant')
}

const RestauList = memo((props: IProps) => {
  const {
    get_resturant,
    rests,
    lat,
    lng,
    isNull,
    support_ids,
    activity_types,
    hasNext,
    currentSorType,
    showLoading,
    currentOffset,
    set_current_offset,
    history,
    homeRef,
    clear_all_rests,
    current_category
  } = props
  useEffect(() => {
    // 重置当前页
    set_current_offset(1)
  }, [])
  useEffect(() => {
    return () => {
      // 组件卸载 清空餐厅列表
      clear_all_rests()
    }
  }, [])
  useEffect(() => {
    // 请求餐厅列表
    if (lat !== 0 && lng !== 0) {
      get_resturant(lat, lng, 0, 7, '0', support_ids, activity_types)
    }
  }, [lat, lng])

  let [isLoading, setIsLoading] = useState(false)
  let loadmoreBtn

  const moveRef = useRef(null)
  // 用于标记是否已经添加滚动事件
  if (isLoading) {
    loadmoreBtn = (
      <span className='loadmore-content'>
        <Icon type="loading" /> 正在加载中
      </span>
    )
  } else {
    loadmoreBtn = (
      <span className='loadmore-content'>下拉加载更多</span>
    )
  }
  useEffect(() => {
    const cb = () => {
      let { clientHeight, scrollHeight } = document.body
      let scrollTop = document.body.scrollTop ? document.body.scrollTop:  document.documentElement.scrollTop
      if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading && hasNext && !isNull) {
        get_resturant(lat, lng, currentOffset, 7, currentSorType, support_ids, activity_types, current_category)
        set_current_offset(currentOffset + 1)
        setIsLoading(true)
      }
    }
    let Home = homeRef.current 
    Home.addEventListener('touchmove', cb)
    return () => {
      Home.removeEventListener('touchmove', cb)
    }
  }, [ isNull, isLoading, currentOffset, currentSorType, support_ids, activity_types, homeRef, hasNext, current_category])
  useEffect(() => {
    if (!showLoading) {
      setIsLoading(false)
    }
  }, [showLoading])

  const parentRef = useRef(null)
  if (isNull) {
    return (
      <div className="resturant-list" ref={moveRef}>
        <NoResult
          img="//fuss10.elemecdn.com/2/50/8019fbaebac2aaa76e2d9b5e5b407gif.gif"
          title="附近没有外卖商家"
          style={{ top: '38%' }}
          des="饿了么正在以光速来到你身边"
        />
      </div>
    )
  }

  return (
    <ul ref={parentRef} className="resturant-list">
      {
        rests && rests.map((list: any, index: number) => {
          // 店铺图片地址
          let img_path: string = getRestData(list).get('image_path')
          const allPath = getImgPath(img_path, 0) || ''
          const restList = getRestData(list)
          // 配送距离format
          let distance = formatDistance(restList.get('distance'), restList)
          // 判断是不是品牌店铺
          let isBrand = restList.get('is_premium')
          let isNew = restList.get('is_new')

          return (
            <RestuaItem
              history={history}
              restList={restList}
              allPath={allPath}
              isBrand={isBrand}
              isNew={isNew}
              distance={distance}
              key={restList.get('name')}
            />
          )
        })
      }
      {
        rests.size
          ? (
            <p className="loadmore">
              {
                hasNext
                  ? loadmoreBtn
                  : '没有更多了'
              }
            </p>
          )
          : null
      }

    </ul>

  )
})


const mapStateToProp = (state: any) => ({
  rests: state.getIn(['home', 'resturants', 'items']),
  lat: state.getIn(['home', 'lat']),
  lng: state.getIn(['home', 'lng']),
  support_ids: state.getIn(['home', 'support_ids']),
  activity_types: state.getIn(['home', 'activity_types']),
  isNull: state.getIn(['home', 'resturants', 'isNull']),
  hasNext: state.getIn(['home', 'resturants', 'hasNext']),
  currentSorType: state.getIn(['home', 'currentSorType']),
  showLoading: state.getIn(['home', 'showLoading']),
  currentOffset: state.getIn(['home', 'currentOffset']),
  current_category: state.getIn(['msite', 'currentCategory'])
})
export default connect(mapStateToProp, actions)(RestauList)





















