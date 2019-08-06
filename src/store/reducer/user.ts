import { Action } from '../../interface/user'
import { fromJS } from 'immutable'
import * as types from '../action-types'
const defaultState = fromJS({
  userinfo: null,
  address: []
})
export default function reducer(state=defaultState, action: Action) {
  switch(action.type) {
    case types.SET_USER_INFO: 
      return state.set('userinfo', fromJS(action.payload))
    case types.LOG_OUT: 
      return state.set('userinfo', null)
    case types.EDIT_NAME: 
      return state.setIn(['userinfo', 'name'], action.payload)
    case types.UPDATE_ADDRESS: 
      return state.set('address', fromJS(action.payload))
    default: 
      return state 
  }  
}