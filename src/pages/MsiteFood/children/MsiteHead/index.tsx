import React, { memo, useEffect, Dispatch, SetStateAction } from 'react'
import './msitehead.scss'
import { HeadItem } from './../../../../models/HeadList'
import { connect } from 'react-redux'
import * as actions from './../../../../store/actions/msiteAction'
import {
  CurrentCate,
  ClearCate
} from './../../../../interface/msite'
import {
  CurrentOffset
} from './../../../../interface/Home'
// setType: Dispatch<SetStateAction<number>>
interface IProps {
  lat: number
  lng: number
  type: number
  headList: HeadItem[]
  support_ids: any
  activity_types: string
  currentSorType: string
  rightClick(): void
  setType(index: number): void
  clear_current_cagtegory: () => ClearCate
  set_current_offset: (payload: number) => CurrentOffset
  get_resturant: any
  set_current_category: (payload: string) => CurrentCate
  // get_resturant: Dispatch<SetStateAction<any>>

}

const MsiteHead = memo((props: IProps) => {
  const {
    type,
    lat,
    lng,
    setType,
    headList,
    rightClick,
    support_ids,
    activity_types,
    currentSorType,
    set_current_offset,
    set_current_category,
    get_resturant,
    clear_current_cagtegory
  } = props
  // console.log(set_current_offset)
  const handleClick = (index: number, name: string) => {
    set_current_offset(1)
    get_resturant(lat, lng, 0, 7, currentSorType, support_ids, activity_types, encodeURI(name))
    set_current_category(encodeURI(name))
    setType(index)
  }
  // 组件卸载 清空分类
  useEffect(() => {
    return () => {
      clear_current_cagtegory()
    }
  }, [])
  return (
    <div className="msite-header">
      <ul className="msite-header-list">
        {headList.map((item: HeadItem, index: number) => (
          <li
            key={item.id}
            className={`msite-header-item ${type === index ? 'item-select' : ''}`}
            onClick={() => handleClick(index, item.name)}
          >{item.name}</li>
        ))}
      </ul>
      <section className="msite-header-right" onClick={rightClick}>
        <i className="iconfont icon-xiajiantou1"></i>
      </section>

    </div>
  )
})
const mapStateToProps = (state: any) => ({
  lat: state.getIn(['home', 'lat']),
  lng: state.getIn(['home', 'lng']),
  support_ids: state.getIn(['home', 'support_ids']),
  activity_types: state.getIn(['home', 'activity_types']),
  currentOffset: state.getIn(['home', 'currentOffset']),
  currentSorType: state.getIn(['home', 'currentSorType']),
})
export default connect(mapStateToProps, actions)(MsiteHead) 