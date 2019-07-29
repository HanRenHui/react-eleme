import { fromJS } from 'immutable'
import * as types from './../action-types'
import { Action } from './../interface/settlement'
const defaultState = fromJS({
  buycar: [],
  address: {},
  flag: false,
})

export default function reducer(state: any = defaultState, action: Action) {
  switch(action.type) {
    case types.SET_BUY_CAR: 
      return state.set('buycar', fromJS(action.payload))
    case types.SET_ADD: 
      return state.set('address', fromJS(action.payload))
    case types.SET_FLAG: 
      return state.set('flag', action.payload)
    default: 
      return state 
  }
}