import React, { memo, useContext } from 'react'
import { connect } from 'react-redux'
import { ResaurantCounter } from '../Restaurant'
import * as actions from '../../../../store/actions/homeAction'
import './downmodel.scss'
interface IProps {
  sortBy: any [],
  get_resturant: Function,
  lat: number,
  lng: number,
  currentSorType: string,
  support_ids: string[]
  set_current_sort_type: Function,
  activity_types: string

}
const DownModel = memo((props: IProps) => {
  const {
    sortBy,
    get_resturant,
    lat,
    lng,
    set_current_sort_type,
    support_ids,
    currentSorType,
    activity_types
  } = props
  const {
    currentType,
    setType,
    setShowMsk,
    setInputTopClass,
    setFilterTopClass,
  } = useContext(ResaurantCounter) as any
  const handleUpdate = (item: string, code: string) => {
    // 记录当前排序类型 用于下拉加载
    set_current_sort_type(code)
    // get_resturant(lng, lat, 0, 8, code)
    get_resturant(lat, lng, 0, 7, code, support_ids, activity_types)

    setType(item)
    // 隐藏蒙版
    setShowMsk(false)
    setInputTopClass('')
    setFilterTopClass('')
  }
  return (
    <div className='down-model'>
      <ul className='down-list'>
        {sortBy && sortBy.map((item: any) => (
          <li className="down-item" key={item} onClick={() => handleUpdate(item.get('name'), item.get('code'))}>
            <span
              className={`down-item-left ${currentType === item.get('name') ? 'down-select' : ''}`}
            >{item.get('name')}</span>
            <i className={`down-item-right iconfont icon-duigou ${currentType === item.get('name') ? 'item-right-show' : ''}`}></i>
          </li>
        ))}
      </ul>
    </div>
  )
})

const mapStateToProps = (state: any) => ({
  sortBy: state.getIn(['home', 'filterNavTab', 'sortBy']),
  lat: state.getIn(['home', 'lat']),
  lng: state.getIn(['home', 'lng']),
  currentSorType: state.getIn(['home', 'currentSorType']),
  support_ids: state.getIn(['home', 'support_ids']),
  activity_types: state.getIn(['home', 'activity_types']),
})

export default connect(mapStateToProps, actions)(DownModel)