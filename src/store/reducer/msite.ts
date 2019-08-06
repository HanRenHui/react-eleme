import { fromJS } from 'immutable'
import * as types from './../action-types'
import { Action } from './../../interface/msite'
const defaultState = fromJS({
  currentCategory: ''
})

export default function reducer(state = defaultState, action: Action) {
  switch(action.type) {
    case types.SET_CURRENT_CATE: 
      return state.set('currentCategory', action.payload)
    case types.CLEAR_CURRENT_CATE: 
      return state.set('currentCategory', '')
    default: 
      return state 
  }
}