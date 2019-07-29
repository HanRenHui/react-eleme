import { fromJS } from 'immutable'
import { Action } from './../interface/remark'
import * as types from './../action-types'
const defaultState = fromJS({
  singleData: [
    {select: false, title: '不放辣'},
    {select: false, title: '少放辣'},
    {select: false, title: '多放辣'},
  ],
  mutiData: [
    {select: false, title: '不要香菜'},
    {select: false, title: '不要洋葱'},
    {select: false, title: '多点醋'},
    {select: false, title: '多点葱'}
  ],
  markText: '',
  remarkInfo: ''
})
export default function reducer(state=defaultState, action: Action) {
  switch(action.type) {
    case types.SET_REMARK_MUL_DATA: 
      let isSelect = state.getIn(['mutiData', action.payload, 'select'])
      return state.setIn(['mutiData', action.payload, 'select'], !isSelect)
    case types.SET_REMARK_SINGLE_DATA: 
      let newState = state 
      let Select = state.getIn(['singleData', action.payload, 'select'])
      state.get('singleData').forEach((data: any, index: number) => {
        newState = newState.setIn(['singleData', index, 'select'], false)
      })

      return newState.setIn(['singleData', action.payload, 'select'], !Select)
    case types.SET_MARK_TEXT: 
      return state.set('markText',action.payload)
    case types.GET_REMARK_INFO:
        let remarkArr: string[] = []

        state.get('singleData').forEach((e: any) => {
          if (e.get('select')) remarkArr.push(e.get('title'))
        })
        state.get('mutiData').forEach((e: any) => {
          if (e.get('select')) remarkArr.push(e.get('title'))
        })
        remarkArr.push(state.get('markText'))
        return state.set('remarkInfo', remarkArr.join(','))
    default:  
      return state 
  }
}