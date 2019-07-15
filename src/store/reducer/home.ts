import { fromJS } from 'immutable'
import { Action } from './../actions/homeAction'
import * as types from './../action-types'
const defaultState = fromJS({
  location: null,
  address: null,
  showLoading: false,
  cityList: [],
  currentCity: '',
  swiper: [],
  resturants: [],
  // sortType: ['综合排序', '好评优先', '销量最高', '起送价最低', '配送最快', '配送费最低', '人均从低到高', '人均从高到低', '通用排序'],
  filterNavTab: {},
  // 记录当前选中的筛选类型
  currentSelect: { 1: undefined, 2: undefined },
})

export default function reducer(state: any = defaultState, action: Action) {
  switch (action.type) {
    case types.SET_LOCATION:
      return state.set('location', fromJS(action.payload))
    case types.SET_ADDRESS:
      return state.set('address', fromJS(action.payload))
    case types.SHOW_LOADING:
      return state.set('showLoading', true)
    case types.HIDE_LOADING:
      if (state.get('location') || state.get('address')) {
        return state.set('showLoading', false)
      }
      return state
    case types.SELECT_ADDRESS:
      return state.setIn(['address', 'formattedAddress'], action.payload)
    case types.SET_CITY_LIST:
      return state.set('cityList', action.payload.cityList)
    case types.SET_CURRENT_CITY:
      return state.set('currentCity', action.payload)
    case types.SET_SWIPER_DATA:
      return state.set('swiper', fromJS(action.payload))
    case types.REQ_RESTURANT:
      return state.set('resturants', fromJS(action.payload.items))
    case types.REQ_FILTER_DATA:
      return state.set('filterNavTab', fromJS(action.payload))
    case types.SET_TYPE_SELECT:
      const { part, item, flag } = action.payload
      if (part === 0) {
        return state.setIn(['filterNavTab', 'chooseBy', part, 'data', item, 'select'], flag)
      } else {
        const currentSelect = state.get('currentSelect')
        const lastSelectItem = currentSelect.get(part)
        return state
          // 将其他设为未选中
          .setIn(['filterNavTab', 'chooseBy', part, 'data', lastSelectItem, 'select'], false)
          // 设置特定的为选中
          .setIn(['filterNavTab', 'chooseBy', part, 'data', item, 'select'], flag)
          // 修改选中记录
          .setIn(['currentSelect', part], flag ? item : undefined)
      }
    case types.CLEAR_ALL_SELECT:
      state.getIn(['filterNavTab', 'chooseBy']).forEach((part: any, index: number) => {
        part.get('data').forEach((item: any, idx: number) => {
          state = state.setIn(['filterNavTab', 'chooseBy', index, 'data', idx, 'select'], false)
        })
      })
      return state.set('currentSelect', fromJS({ 1: undefined, 2: undefined }))
    default:
      return state
  }
}