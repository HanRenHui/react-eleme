import React, { memo, useContext } from 'react'
import { connect } from 'react-redux'
import { ResaurantCounter } from './../Restaurant'
import './downmodel.scss'
interface IProps {
  sortBy: Array<any>,
}
const DownModel = memo((props: IProps) => {
  const { sortBy } = props
  const {
    currentType,
    setType,
    setShowMsk,
    setInputTopClass,
    setFilterTopClass
  } = useContext(ResaurantCounter) as any
  const handleTypeItemClick = (item: string) => {
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
          <li className="down-item" key={item} onClick={() => handleTypeItemClick(item.get('name'))}>
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
  sortBy: state.getIn(['home', 'filterNavTab', 'sortBy'])
})

export default connect(mapStateToProps, null)(DownModel)