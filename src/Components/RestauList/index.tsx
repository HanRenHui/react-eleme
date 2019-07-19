import React, { memo, useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/homeAction'
import NoResult from './../NoResult'
import './restauList.scss'
import RestuaItem from './../RestuaItem'
interface IProps {
  get_resturant: Function,
  rests: any,
  lat: number,
  lng: number,
  isNull: boolean,
  support_ids: string[],
  activity_types: string,
  hasNext: boolean,
  currentSorType: string,
  showLoading: Boolean,
  currentOffset: number,
  set_current_offset: any
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
    set_current_offset
  } = props
  let [isLoading, setIsLoading] = useState(false)
  let [page, setPage] = useState(0)
  const moveRef = useRef(null)
  useEffect(() => {
    // 请求餐厅列表
    // offset 为5的时候为false
    if (lat !== 0 && lng !== 0) {
      get_resturant(lat, lng, 0, 8, '0', support_ids, activity_types)
      set_current_offset(currentOffset + 1)
    }
  }, [lat, lng])


  useEffect(() => {
    const cb = () => {
      // console.log(hasNext)
      let { clientHeight, scrollTop, scrollHeight } = (document.body as any)
      // setTimeout(() => {
      if (scrollTop + clientHeight >= scrollHeight - 30 && !isLoading && hasNext && !isNull) {
        
        get_resturant(lat, lng, currentOffset, 8, currentSorType, support_ids, activity_types)
        set_current_offset(currentOffset + 1)
        setIsLoading(true)
      }
      // }, 50)

    }
    window.addEventListener('touchmove', cb)
    return () => {
      window.removeEventListener('touchmove', cb)
    }
  }, [hasNext, isLoading, currentOffset])

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
          // console.log('list 666',list)
          let img_path: string = getRestData(list).get('image_path')
          let firstPart: string = img_path.slice(0, 1)
          let secPart: string = img_path.slice(1, 3)
          let thrPart: string = img_path.slice(3)
          let postFix: string
          const restList = getRestData(list)
          // 配送距离format
          let distance
          if (restList.get('distance') > 1000) {
            distance = restList.get('distance') / 1000
            distance = distance.toFixed(2) + 'k'
          } else {
            distance = restList.get('distance')
          }
          if (img_path.length === 36) {
            postFix = img_path.slice(-4)
          } else {
            postFix = img_path.slice(-3)
          }
          // 店铺图片地址
          const allPath =
            `https://fuss10.elemecdn.com/${firstPart}/${secPart}/${thrPart}.${postFix}?
        imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/`
          // 判断是不是品牌店铺
          let isBrand = false
          let supports = restList.get('supports')
          supports.forEach((item: any) => {
            if (item.get('name') === '开发票') {
              isBrand = true
            }
          })
          return <RestuaItem
            restList={restList}
            allPath={allPath}
            isBrand={isBrand}
            distance={distance}
            key={restList.get('id')}
          />
        })
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
  currentOffset: state.getIn(['home', 'currentOffset'])

})
export default connect(mapStateToProp, actions)(RestauList)






















