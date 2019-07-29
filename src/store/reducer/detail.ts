import { fromJS, List } from 'immutable'
import { Action } from './../interface/detail'
import * as types from './../action-types'
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
    // }
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


/**
 * 
 * @param idx 食品id
 * @param state store里的state
 * @param flag flag 为0 代表加 为1 代表减
 */

function toggleCount(idx: string, state: any, flag: number) {
  let newState = state

  state.get('recommend').forEach((item: any, index: number) => {
    if (item.get('item_id') === idx) {
      let count = state.getIn(['recommend', index, 'count'])
      if (count === undefined) count = 0
      if (!flag) {
        newState = newState.setIn(['recommend', index, 'count'], count + 1)
      } else {
        if (count === 0) return newState
        newState = newState.setIn(['recommend', index, 'count'], count - 1)
      }
    }
  })
  state.get('menu').forEach((item: any, num: number) => {
    item.get('foods').forEach((food: any, index: number) => {
      if (food.get('item_id') == idx) {
        // 设置左侧导航的数据
        let category_id = newState.getIn(['menu', num, 'foods', index, 'category_id'])
        let count = state.getIn(['menu', num, 'foods', index, 'count'])
        if (count === undefined) count = 0
        if (!flag) {
          newState = newState.setIn(['menu', num, 'foods', index, 'count'], count + 1)
          if (num == 0) return 
          let catecCount = newState.getIn(['leftMark', category_id]) || 0
          newState = newState.setIn(['leftMark', category_id], catecCount+1)
          
        } else {
          if (count === 0) return newState
          newState = newState.setIn(['menu', num, 'foods', index, 'count'], count - 1)
          if (num == 0) return 

          let catecCount = newState.getIn(['leftMark', category_id]) 

          newState = newState.setIn(['leftMark', category_id], catecCount - 1)
        }
      }
    })
  })

  return newState || state
}