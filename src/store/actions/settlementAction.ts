import * as types from './../action-types'
import { 
  BuyCar,
  Flag
} from './../interface/settlement'

export const set_buy_car = (buycar: any): BuyCar => ({
  type: types.SET_BUY_CAR,
  payload: buycar
})

export const set_flag = (flag: boolean): Flag => ({
  type: types.SET_FLAG,
  payload: flag
})

