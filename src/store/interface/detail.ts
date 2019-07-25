import * as types from './../action-types'
export interface Detail {
  payload: any,
  type: typeof types.SET_DETAIL
}
export interface AddSelect {
  payload: {
    idx: number, 
    part: number, 
    sec: number
  },
  type: typeof types.ADD_SELECT
}
export interface DecreSelect {
  payload: {
    idx: number, 
    part: number, 
    sec: number
  },
  type: typeof types.REMOVE_SELECT
}
export interface ClearSelect {
  type: typeof types.CLEAR_SELECT
}

export type Action = Detail | AddSelect | DecreSelect | ClearSelect