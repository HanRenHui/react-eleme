import {
  req_rest_detail
} from './../../api/search'
import * as types from './../action-types'
import {
  Detail,
  AddSelect, 
  DecreSelect,
  ClearSelect
} from './../interface/detail'
const set_detail = (rs: any): Detail => ({
  payload: rs,
  type: types.SET_DETAIL
})


export const get_detail = (id: number) => {
  return async (dispatch: any) => {
    let rs = await req_rest_detail(id)
    dispatch(set_detail(rs))
  }
} 

export const incre_select = (idx: number, part: number, sec: number): AddSelect => ({
  type: types.ADD_SELECT,
  payload: {
    idx, 
    part, 
    sec
  }
})
export const decre_select = (idx: number, part: number, sec: number): DecreSelect => ({
  type: types.REMOVE_SELECT,
  payload: {
    idx, 
    part, 
    sec
  }
})
export const clear_select = (): ClearSelect => ({
  type: types.CLEAR_SELECT
})
