import * as types from './../action-types'
export interface UpdateAddress {
  type: typeof types.UPDATE_ADDRESS
  payload: any
}
export interface UserInfo {
  type: typeof types.SET_USER_INFO
  payload: any
}
export interface LogOut {
  type: typeof types.LOG_OUT
}
export interface EditName {
  type: typeof types.EDIT_NAME
  payload: string
}

export type Action = UserInfo | LogOut | EditName | UpdateAddress
