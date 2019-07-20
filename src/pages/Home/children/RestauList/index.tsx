import React, { memo, useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/homeAction'
import NoResult from '../../../../Components/NoResult'
import './restauList.scss'
import RestuaItem from '../../../../Components/RestuaItem'
import { getImgPath, formatDistance } from '../../../../util/getImgPath'
import { Icon } from 'antd-mobile'
interface IProps {
  get_resturant: Function,
  rests: any,
  lat: number,
  lng: number,
  isNull: boolean,
  support_ids: any,
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
const useScroll = () => {

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

  useEffect(() => {
    // 请求餐厅列表
    if (lat !== 0 && lng !== 0) {
      get_resturant(lat, lng, 0, 8, '0', support_ids, activity_types)
      set_current_offset(currentOffset + 1)
    }
  }, [lat, lng])

  
  let [isLoading, setIsLoading] = useState(false)
  let loadmoreBtn

 
  const moveRef = useRef(null)
  if (isLoading) {
    loadmoreBtn = (
      <span className='loadmore-content'>
        <Icon type="loading"/> 正在加载中
      </span>
    )
  } else {
    loadmoreBtn = (
      <span className='loadmore-content'>下拉加载更多</span>
    )
  }

  useEffect(() => {
    const cb = () => {
      let { clientHeight, scrollTop, scrollHeight } = (document.body as any)
      if (scrollTop + clientHeight >= scrollHeight - 40 && !isLoading && hasNext && !isNull) {
        get_resturant(lat, lng, currentOffset, 7, currentSorType, support_ids, activity_types)
        set_current_offset(currentOffset + 1)
        setIsLoading(true)
      }
    }
    window.addEventListener('touchmove', cb)
    return () => {
      window.removeEventListener('touchmove', cb)
    }
  }, [hasNext, isLoading, currentOffset, currentSorType, support_ids, activity_types])

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
          // 店铺图片地址
          let img_path: string = getRestData(list).get('image_path')
          const allPath = getImgPath(img_path, 0) || ''
          const restList = getRestData(list)
          // 配送距离format
          let distance = formatDistance(restList.get('distance'), restList)


          // 判断是不是品牌店铺
          let isBrand = false
          let supports = restList.get('supports')
          supports.forEach((item: any) => {
            if (item.get('name') === '开发票') {
              isBrand = true
            }
          })

          return (
            <RestuaItem
              restList={restList}
              allPath={allPath}
              isBrand={isBrand}
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
                  ?  loadmoreBtn 
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
  currentOffset: state.getIn(['home', 'currentOffset'])

})
export default connect(mapStateToProp, actions)(RestauList)







// http://localhost:1888/proxy/restapi/shopping/v3/restaurants?latitude=37.24478929&longitude=117.7531064&offset=0&limit=7&code=0&support_ids=[]&activity_types=-1














