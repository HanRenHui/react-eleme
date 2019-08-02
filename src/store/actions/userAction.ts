import * as types from '../action-types'
import { 
  add_address, 
  get_address, 
  remove_address,  
  upda_address
} from './../../api/user'
import {
  UserInfo, 
  UpdateAddress, 
  LogOut, 
  EditName,
} from './../interface/user'
import { Address } from './../interface/settlement'


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
export const set_address = (payload: any): UpdateAddress => ({
  type: types.UPDATE_ADDRESS,
  payload
})
export const incre_address = (userId: string, address: any) => {
  return async (dispatch: any) => {
    let rs: any = await add_address(userId, address)
    if (rs.err_code === 0) {
      let doc: any = await get_address(userId) 
      // 修改成功 重新获取新的地址
      dispatch(set_address(doc))
    }
  }
}
export const req_address = (userId: string) => {
  return async (dispatch: any) => {
    let doc: any = await get_address(userId) 
    dispatch(set_address(doc))
  }
}
export const del_address = (userId: string, addressId: string) => {
  return async (dispatch: any) => {
    let rs: any = await remove_address(userId, addressId)
    if (rs.err_code === 0) {
      let doc: any = await get_address(userId) 
      // 删除成功重新获取新的地址
      dispatch(set_address(doc))
    }
  }
}
export const update_address = (userId: string, addressId: string, newAddress: any) => {
  return async (dispatch: any) => {
    let rs: any = await upda_address(userId, addressId, newAddress)
    if (rs.err_code === 0) {
      let doc: any = await get_address(userId) 
      // 删除成功重新获取新的地址
      dispatch(set_address(doc))
    }
  }
}

export const set_select_address = (address: any): Address => ({
  payload: address, 
  type: types.SET_ADD
})

