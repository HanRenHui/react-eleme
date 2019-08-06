import * as types from '../store/action-types'
export interface ShowLoading {
  type: typeof types.SHOW_LOADING
}
export interface HideLoading {
  type: typeof types.HIDE_LOADING
}
export interface SelectAddress {
  type: typeof types.SELECT_ADDRESS
  payload: string
}

export interface CityList {
  // type: typeof
  type: typeof types.SET_CITY_LIST
  payload: any
}
export interface CurrentCity {
  type: typeof types.SET_CURRENT_CITY
  payload: string
}

export interface SwiperData {
  type: typeof types.SET_SWIPER_DATA
  payload: []
}
export interface RestData {
  type: typeof types.REQ_RESTURANT
  payload: any
}
export interface FilterData {
  type: typeof types.REQ_FILTER_DATA
  payload: any
}
export interface ChooseType {
  type: typeof types.SET_TYPE_SELECT
  payload: {
    part: number,
    item: number,
    flag: boolean
  }
}
export interface clearSlect {
  type: typeof types.CLEAR_ALL_SELECT
}
export interface ClearRests {
  type: typeof types.CLEAR_ALL_RESTS
}

export interface Location {
  type: typeof types.SET_LOCATION
  payload: any

}
export interface Address {
  type: typeof types.SET_ADDRESS
  payload: any
}

export interface LntLat {
  type: typeof types.SET_LAT_LNT
  payload: {
    lat: number,
    lng: number
  }
}
export interface DeliverMode {
  type: typeof types.SET_DELIVER
  payload: String
}
export interface ActivityMode {
  type: typeof types.SET_ACTIVITY
  payload: String
}
export interface ClearAllSelect {
  type: typeof types.CLEAR_ALL_SELECT
}
export interface CurrentSortType {
  type: typeof types.SET_CURRENT_SORT_TYPE
  payload: String 
}

export interface CurrentOffset {
  type: typeof types.SET_CURRENT_OFFSET
  payload: number
}

export type Action = Location | Address | ShowLoading | HideLoading
  | SelectAddress | CityList | CurrentCity | SwiperData | RestData
  | FilterData | ChooseType | clearSlect | ClearRests | LntLat | DeliverMode
  | ActivityMode | ClearAllSelect | CurrentSortType | CurrentOffset
