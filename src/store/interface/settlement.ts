import * as types from './../action-types'
export interface BuyCar {
  type: typeof types.SET_BUY_CAR
  payload: any []
}
export interface Address {
  type: typeof types.SET_ADD
  payload: any
}
export interface Flag {
  type: typeof types.SET_FLAG
  payload: boolean 
}
export type Action = BuyCar | Address | Flag