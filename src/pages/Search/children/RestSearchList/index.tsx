import React, { memo, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getImgPath, formatDistance } from './../../../../util/getImgPath'
import RestuaItem from './../../../../Components/RestuaItem'
import './restsearchlist.scss'
import { Icon } from 'antd-mobile'
import * as actions from './../../../../store/actions/searchActions'
import NoResult from './../../../../Components/NoResult'
interface IProps {
  restaurant_with_foods: any,
  rests: any,
  showLoading: Boolean,
  set_offset: any,
  req_search_list: any,
  offset: number,
  kw: string,
  lat: number, 
  lng: number,
  isNull: boolean
}
const getRestData = (list: any) => {
  return list.get('restaurant')
}



const RestSearchList = memo((props: IProps) => {
  const {
    restaurant_with_foods,
    showLoading,
    set_offset,
    offset,
    req_search_list,
    kw,
    lat,
    lng,
    isNull
  } = props
  let [isLoading, setIsLoading] = useState(false)
  let loadmoreBtn
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
  let hasResult
  if (!isNull) {
    hasResult = (
      restaurant_with_foods.map((list: any) => {
        let img_path: string = getRestData(list).get('image_path')
        const allPath = getImgPath(img_path, 0) || ''
        const restList = getRestData(list)
        let distance = formatDistance(restList.get('distance'), restList)
        return <RestuaItem
          restList={restList}
          allPath={allPath}
          distance={distance}
          foods={list.get('foods')}
          key={restList.get('name')}
        />
      })
    ) 
  } else {
    hasResult = (
      <div className="search-list" >
        <NoResult
          img="//fuss10.elemecdn.com/2/50/8019fbaebac2aaa76e2d9b5e5b407gif.gif"
          title="附近没有搜索结果"
          // style={{ top: '38%' }}
          des="换个关键词试试吧"
        />
      </div>
    )
  }
  useEffect(() => {
    const cb = () => {
      let { clientHeight, scrollTop, scrollHeight } = (document.body as any)
      if (scrollTop + clientHeight >= scrollHeight - 40 && !isLoading &&!isNull) {
        req_search_list(offset, kw, lat, lng)
        set_offset(offset + 1)
        setIsLoading(true)
      }
    }
    window.addEventListener('touchmove', cb)
    return () => {
      window.removeEventListener('touchmove', cb)
    }
  }, [ isLoading, offset])

  useEffect(() => {
    if (!showLoading) {
      setIsLoading(false)
    }
  }, [showLoading])

  return (
    <ul className="rest-search-list">
      {hasResult}
      {
        restaurant_with_foods.size && !isNull
          ? (
            <p className="loadmore">
              {loadmoreBtn}
            </p>
          )
          : null
      }
    </ul>
  )
})

const mapStateToProps = (state: any) => ({
  restaurant_with_foods: state.getIn(['search', 'restsSearchList']),
  rests: state.getIn(['home', 'resturants', 'items']),
  showLoading: state.getIn(['home', 'showLoading']),
  offset: state.getIn(['search', 'offset']),
  lat: state.getIn(['home', 'lat']),
  lng: state.getIn(['home', 'lng']),
  isNull: state.getIn(['search', 'isNull'])
  
})

export default connect(mapStateToProps, actions)(RestSearchList)