import React, { memo, useEffect } from 'react'
import './choosemodel.scss'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/homeAction'

interface IProps {
  chooseTop?: {top: string}
  current_category: string
  chooseBy: any,
  clear_all_select: any,
  currentSelect: any,
  set_support_ids: any,
  set_activity_mode: any,
  // 记录所选商家服务类型(多选)
  support_ids: any,
  // 记录优惠活动所选类型(单选)
  activity_types: string,
  get_resturant: any,
  lng: number,
  lat: number,
  currentSorType: string,
  setShowMsk: Function,
  setInputTopClass?: (msg: string) => void,
  setFilterTopClass?: (msg: string) => void,
  set_current_offset: Function
}

/**
 * 筛选 面板
 */


const DownModel = memo((props: IProps) => {
  const {
    chooseBy,
    set_activity_mode,
    set_support_ids,
    activity_types,
    support_ids,
    clear_all_select,
    get_resturant,
    currentSorType,
    lng,
    lat,
    setShowMsk,
    setInputTopClass,
    setFilterTopClass,
    set_current_offset,
    chooseTop,
    current_category
  } = props
  // let [mulSelect, setMulSelect] = useState<number[]>([])
  let clearBtnUerfurl = false
  if (activity_types !== "-1" || support_ids.size > 0) {
    clearBtnUerfurl = true
  }
  useEffect(() => {
    // 初始化
    clear_all_select()
  }, [])
  const handleSureBtn = () => {
    // 输入框位置还原
    setInputTopClass && setInputTopClass('')
    // 筛选tab位置还原
    setFilterTopClass && setFilterTopClass('')
    // 隐藏蒙版
    setShowMsk(false)
    // 重置当前页
    set_current_offset(1)
    get_resturant(lat, lng, 0, 8, currentSorType, support_ids, activity_types, current_category)

  }
  let style = {}
  if (chooseTop) {
    style = chooseTop
  }
  return (
    <div className='choose-model' style={style}>
      <div className="choose-model-part">
        <p className="choose-model-title">{chooseBy && chooseBy.getIn(['first', 'title'])}</p>
        <ul className="choose-model-part-list">
          {chooseBy && chooseBy.getIn(['first', 'options']).map((item: any, idx: number) => {
            return (
              <li
                className={`choose-model-part-item ${support_ids.includes(item.get('support_ids[]')) ? 'item-selected ' : ''}`}
                key={item.get('name')}
                onClick={() => set_support_ids(item.get('support_ids[]'))}
              >
                {
                  item.get('icon')
                    ? <img
                      src={item.get('icon')}
                      className="part-item-icon"
                      alt={item.get('icon')}
                    />
                    : null
                }
                <span className="part-item-content">{item.get('name')}</span>
              </li>
            )
          })}
        </ul>
        <p className="choose-model-title">{chooseBy && chooseBy.getIn(['second', 'title'])}</p>
        <ul className="choose-model-part-list">
          {chooseBy && chooseBy.getIn(['second', 'options']).map((item: any, idx: number) => {
            return (
              <li
                className={`choose-model-part-item ${activity_types === item.get('activity_types[]') ? 'item-selected ' : ''}`}
                key={item.get('name')}
                onClick={() => set_activity_mode(item.get('activity_types[]'))}
              >
                {
                  item.get('icon')
                    ? <img src={item.get('icon')} className="part-item-icon" alt={item.get('icon')} />
                    : null
                }
                <span className="part-item-content">{item.get('name')}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <span
        className={`choose-model-clear ${clearBtnUerfurl ? 'clear-useful' : ''}`}
        onClick={clear_all_select}
      >清空</span>
      <span
        className="choose-model-ok"
        onClick={handleSureBtn}
      >确定</span>
    </div>
  )
})

const mapStateToProps = (state: any) => ({
  chooseBy: state.getIn(['home', 'filterNavTab', 'chooseBy']),
  currentSelect: state.getIn(['home', 'currentSelect']),
  support_ids: state.getIn(['home', 'support_ids']),
  activity_types: state.getIn(['home', 'activity_types']),
  lng: state.getIn(['home', 'lng']),
  lat: state.getIn(['home', 'lat']),
  currentSorType: state.getIn(['home', 'currentSorType']),
  set_current_offset: state.getIn(['home', 'set_current_offset']),
  current_category: state.getIn(['msite', 'currentCategory'])
})

export default connect(mapStateToProps, actions)(DownModel)





