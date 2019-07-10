import * as types from './../action-types'

interface UserInfo {
  type: typeof types.SET_USER_INFO,
  payload: any
}

export const set_user_info = (user: any): UserInfo => ({
  type: types.SET_USER_INFO,
  payload: user
})


export type Action = UserInfo
