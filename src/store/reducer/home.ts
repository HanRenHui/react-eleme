import { Action } from './../actions/homeAction'
import { fromJS } from 'immutable'
import * as types from './../action-types'
const defaultState = fromJS({
  user: undefined
})
export default function reducer(state=defaultState, action: Action) {
  switch(action.type) {
    case types.SET_USER_INFO: 
      return state.set('user', fromJS(action.payload))
    default: 
      return state 
  }  
}