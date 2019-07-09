import { Action } from './../actions/homeAction'
import { fromJS } from 'immutable'
const defaultState = fromJS({

})
export default function reducer(state=defaultState, action: Action) {
  switch(action.type) {
    default: 
      return state 
  }  
}