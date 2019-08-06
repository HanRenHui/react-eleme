import { List, fromJS } from 'immutable'
import { Action } from '../../interface/Home'
import * as types from './../action-types'
const defaultState = fromJS({
  location: null,
  address: null,
  showLoading: false,
  cityList: [],
  currentCity: '',
  swiper: [],
  // 总的列表数据
  resturants: {
    items: [],
    isNull: false,
    hasNext: undefined,
  },
  filterNavTab: {},
  lng: 0,
  lat: 0,
  // 记录所选商家服务类型(多选)
  support_ids: [],
  // 记录优惠活动所选类型(单选)
  activity_types: "-1",
  // 标记当前排序类型  默认: 综合排序
  currentSorType: '0',
  currentOffset: 1,
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
      return state.set('showLoading', false)
    case types.SELECT_ADDRESS:
      return state.setIn(['address', 'address'], action.payload)
    case types.SET_CITY_LIST:
      return state.set('cityList', action.payload.cityList)
    case types.SET_CURRENT_CITY:
      return state.set('currentCity', action.payload)
    case types.SET_SWIPER_DATA:
      return state.set('swiper', fromJS(action.payload))
    case types.REQ_RESTURANT:

      if (!action.payload.items.length) {
        return state.setIn(['resturants', 'isNull'], true)
      } else {
        let current = state.getIn(['resturants', 'items'])
        let newData = List.isList(current)
          ? current.concat(fromJS(action.payload.items))
          : current.concat(action.payload.items)
        let allRests = List.isList(newData) ? newData : fromJS(newData)

        return state
          .setIn(['resturants', 'items'], allRests)
          .setIn(['resturants', 'hasNext'], action.payload.has_next)
          .setIn(['resturants', 'isNull'], false)

      }
    case types.REQ_FILTER_DATA:

      return state.set('filterNavTab', fromJS(action.payload))
    case types.CLEAR_ALL_RESTS:
      // 将商家列表置为空
      return state.setIn(['resturants', 'items'], [])

    case types.SET_LAT_LNT:
      // 设置经纬度
      return state
        .set('lat', action.payload.lat)
        .set('lng', action.payload.lng)
    case types.SET_DELIVER:
      // 设置商家服务(多选)
      const code = action.payload
      let support_ids = state.get('support_ids')
      if (support_ids.includes(code)) {
        // 已经选中了该服务 则剔除
        let newSupport = support_ids.filter((item: String) => item !== code)
        return state.set('support_ids', newSupport)
      } else {
        // 加入list
        return state.set('support_ids', support_ids.concat(code))
      }
    case types.SET_ACTIVITY:
      // 请求店铺列表等相关操优惠活动

      if (state.get('activity_types') === action.payload) {
        return state.set('activity_types', '-1')
      }
      return state.set('activity_types', action.payload)
    case types.CLEAR_ALL_SELECT:
      // 清空所有算则的优惠活动和商家服务
      return state
        .set('activity_types', "-1")
        .set('support_ids', fromJS([]))
    case types.SET_CURRENT_SORT_TYPE:
      return state.set('currentSorType', action.payload)
    case types.SET_CURRENT_OFFSET:
      return state.set('currentOffset', action.payload)
    default:
      return state
  }
}