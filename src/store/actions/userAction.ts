import * as types from '../action-types'

interface UserInfo {
  type: typeof types.SET_USER_INFO,
  payload: any
}
interface LogOut {
  type: typeof types.LOG_OUT
}
interface EditName {
  type: typeof types.EDIT_NAME,
  payload: string
}

export const set_user_info = (user: any): UserInfo => ({
  type: types.SET_USER_INFO,
  payload: user
})
export const set_user_null = (): LogOut => ({
  type: types.LOG_OUT
})

export const log_out = () => {
  return async (dispatch: any) => {
    dispatch(set_user_null())
    localStorage.removeItem('user')
  }
}

export const edit_name_action = (payload: string): EditName => ({
  type: types.EDIT_NAME,
  payload
})

export type Action = UserInfo | LogOut | EditName
