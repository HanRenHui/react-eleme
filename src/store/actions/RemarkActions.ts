import * as types from './../action-types'
import {
  SetrRemarkMulData,
  SetrRemarkSingleData,
  Text,
  RemarkInfo
} from '../../interface/remark'
export const setRemarkMulData = (payload: number): SetrRemarkMulData => ({
  type: types.SET_REMARK_MUL_DATA,
  payload
})
export const setRemarkSingleData = (payload: number): SetrRemarkSingleData => ({
  type: types.SET_REMARK_SINGLE_DATA,
  payload
})
export const setRemarkText = (payload: string): Text => ({
  type: types.SET_MARK_TEXT,
  payload
})
export const get_RemarkInfo = (): RemarkInfo => ({
  type: types.GET_REMARK_INFO
})