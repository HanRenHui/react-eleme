import { fromJS } from 'immutable'
import { Action } from './../actions/homeAction'
import * as types from './../action-types'
const defaultState = fromJS({
  location: null,
  address: null,
  showLoading: false,
  cityList: [],
  currentCity: ''
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
      return state.setIn(['address', 'formattedAddress'], action.payload)
    case types.SET_CITY_LIST:
      return state.set('cityList', action.payload.cityList)
    case types.SET_CURRENT_CITY: 
      return state.set('currentCity', action.payload)
    default:
      return state
  }
}