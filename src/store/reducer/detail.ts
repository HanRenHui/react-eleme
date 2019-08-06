import { fromJS, List } from 'immutable'
import { Action } from '../../interface/detail'
import * as types from './../action-types'
import toggleCount from './../../util/toggleCount'
let defaultState = fromJS({
  bought_list: {},
  menu: [],
  recommend: [],
  redpack: [],
  rst: {},
  // 标记左侧导航
  leftMark: {},
})

function reducer(state = defaultState, action: any): Action {
  switch (action.type) {
    case types.SET_DETAIL:
      const {
        bought_list,
        menu,
        recommend,
        redpack,
        rst
      } = action.payload
      return state
        .set('bought_list', fromJS(bought_list))
        .set('menu', fromJS(menu))
        .set('recommend', fromJS(recommend[0].items))
        .set('redpack', fromJS(redpack))
        .set('rst', fromJS(rst))
    case types.ADD_SELECT:
      const { idx } = action.payload
      return toggleCount(idx, state, 0)
    case types.REMOVE_SELECT:
      const { idx: id } = action.payload
      return toggleCount(id, state, 1)
    case types.CLEAR_SELECT:
      let newState = state
      state.get('recommend').forEach((item: any, index: number) => {
        newState = newState.setIn(['recommend', index, 'count'], 0)
      })
      state.get('menu').forEach((item: any, num: number) => {
        item.get('foods').forEach((food: any, index: number) => {
          newState = newState.setIn(['menu', num, 'foods', index, 'count'], 0)
        })
      })
      return newState.set('leftMark', fromJS({}))
    default:
      return state
  }

}
export default reducer

