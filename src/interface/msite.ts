import * as types from './../store/action-types'
export interface CurrentCate {
  payload: string, 
  type: typeof types.SET_CURRENT_CATE
}
export interface ClearCate {
  type: typeof types.CLEAR_CURRENT_CATE
}
export type Action = CurrentCate | ClearCate