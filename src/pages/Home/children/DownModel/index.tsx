import React, { memo, useContext } from 'react'
import { connect } from 'react-redux'
import { ResaurantCounter } from '../Restaurant'
import * as actions from '../../../../store/actions/homeAction'
import './downmodel.scss'
interface IProps {
  sortBy: any[]
  lat: number
  lng: number
  current_category: string
  get_resturant: Function
  support_ids: string[]
  set_current_sort_type: Function
  activity_types: string
  currentType: string
  setShowMsk: (flag: boolean) => void
  setType: (type: string) => void
  filterTop?: {top: string}
}
const DownModel = memo((props: IProps) => {
  const {
    sortBy,
    get_resturant,
    lat,
    lng,
    set_current_sort_type,
    support_ids,
    activity_types,
    setType,
    currentType,
    setShowMsk,
    filterTop, 
    current_category
  } = props
  const {
    setInputTopClass,
    setFilterTopClass,
  } = useContext(ResaurantCounter) as any
  const handleUpdate = (item: string, code: string) => {
    // 记录当前排序类型 用于下拉加载
    set_current_sort_type(code)
    get_resturant(lat, lng, 0, 7, code, support_ids, activity_types, current_category)
    setType(item)
    // 隐藏蒙版
    setShowMsk(false)
    setInputTopClass && setInputTopClass('')
    setFilterTopClass && setFilterTopClass('')

  }
  let style 
  if (filterTop) style = filterTop
  return (
    <div className='down-model' style={style}>
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
  support_ids: state.getIn(['home', 'support_ids']),
  activity_types: state.getIn(['home', 'activity_types']),
  current_category: state.getIn(['msite', 'currentCategory'])

})

export default connect(mapStateToProps, actions)(DownModel)