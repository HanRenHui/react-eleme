import * as types from './../action-types'
export interface Offset {
  type: typeof types.SET_SORT, 
  payload: number
}
export interface SearchRest {
  type: typeof types.SET_REST_LIST, 
  payload: any
}
export interface ClearList {
  type: typeof types.CLEAR_LIST
}
export type Action = Offset | SearchRest | ClearList