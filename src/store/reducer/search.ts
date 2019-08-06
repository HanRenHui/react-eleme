import { fromJS } from 'immutable' 
import { Action } from '../../interface/Select'
import * as types from './../action-types'
const defaultState = fromJS({
  restsSearchList: [],
  offset: 1, 
  isNull:false
})
export default function reducer(state = defaultState, action: Action) {
  switch(action.type) {
    case types.SET_REST_LIST:
      return state
              .set('restsSearchList', state.get('restsSearchList').concat(fromJS(action.payload.list)))
              .set('isNull', action.payload.isNull)

    case types.CLEAR_LIST: 
      return state.set('restsSearchList', fromJS([]))
    case types.SET_SORT: 
      return state.set('offset', action.payload)
    default:
      return state 
  }
}