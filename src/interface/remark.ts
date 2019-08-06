import * as types from '../store/action-types'
export interface SetrRemarkMulData {
  type: typeof types.SET_REMARK_MUL_DATA
  payload: number,
}
export interface SetrRemarkSingleData {
  type: typeof types.SET_REMARK_SINGLE_DATA
  payload: number,

}
export interface Text {
  type: typeof types.SET_MARK_TEXT
  payload: string
}
export interface RemarkInfo {
  type: typeof types.GET_REMARK_INFO
}
export type Action = SetrRemarkMulData | SetrRemarkSingleData | Text | RemarkInfo