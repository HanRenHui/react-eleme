
/**
 * 
 * @param idx 食品id
 * @param state store里的state
 * @param flag flag 为0 代表加 为1 代表减
 */

export default function toggleCount(idx: string, state: any, flag: number) {
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
      if (food.get('item_id') === idx) {
        // 设置左侧导航的数据
        let category_id = newState.getIn(['menu', num, 'foods', index, "category_id"])
        let count = state.getIn(['menu', num, 'foods', index, 'count'])
        if (count === undefined) count = 0
        if (!flag) {
          newState = newState.setIn(['menu', num, 'foods', index, 'count'], count + 1)
          if (num === 0) return 
          let catecCount = newState.getIn(['leftMark', category_id]) || 0
          newState = newState.setIn(['leftMark', category_id], catecCount+1)
          
        } else {
          if (count === 0) return newState
          newState = newState.setIn(['menu', num, 'foods', index, 'count'], count - 1)
          if (num === 0) return 

          let catecCount = newState.getIn(['leftMark', category_id]) 

          newState = newState.setIn(['leftMark', category_id], catecCount - 1)
        }
      }
    })
  })

  return newState || state
}