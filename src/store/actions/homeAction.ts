import * as types from './../action-types'
import { fromJS } from 'immutable'
import {
  req_citylist,
  req_swiper_data,
  req_resturant,
  req_filter_data
} from '../../api/home'

interface Location {
  type: typeof types.SET_LOCATION,
  payload: any

}
interface Address {
  type: typeof types.SET_ADDRESS,
  payload: any

}
interface ShowLoading {
  type: typeof types.SHOW_LOADING
}
interface HideLoading {
  type: typeof types.HIDE_LOADING
}
interface SelectAddress {
  type: typeof types.SELECT_ADDRESS,
  payload: string
}

interface CityList {
  // type: typeof
  type: typeof types.SET_CITY_LIST,
  payload: any
}
interface CurrentCity {
  type: typeof types.SET_CURRENT_CITY,
  payload: string
}

interface SwiperData {
  type: typeof types.SET_SWIPER_DATA,
  payload: []
}
interface RestData {
  type: typeof types.REQ_RESTURANT,
  payload: any
}
interface FilterData {
  type: typeof types.REQ_FILTER_DATA,
  payload: any
}
interface ChooseType {
  type: typeof types.SET_TYPE_SELECT,
  payload: {
    part: number, 
    item: number, 
    flag: boolean
  }
}
interface clearSlect {
  type: typeof types.CLEAR_ALL_SELECT
}

export const set_location = (location: any): Location => ({
  type: types.SET_LOCATION,
  payload: location
})
export const set_address = (address: any): Address => ({
  type: types.SET_ADDRESS,
  payload: address
})

export const show_loading = (): ShowLoading => ({
  type: types.SHOW_LOADING
})
export const hide_loading = (): HideLoading => ({
  type: types.HIDE_LOADING
})
export const select_address = (selectAddress: string): SelectAddress => ({
  type: types.SELECT_ADDRESS,
  payload: selectAddress
})


const set_city_list = (payload: any): CityList => ({
  type: types.SET_CITY_LIST,
  payload
})


async function reqCityAndSetCache() {
  let rs: any = await req_citylist()
  let cityList = rs.cityList
  localStorage.setItem('city', JSON.stringify({
    expires: Date.now() + 60 * 1000 * 60 * 24,
    data: cityList
  }))
  return cityList
}


export const req_city_list = () => {
  return async (dispatch: any) => {
    let city = localStorage.getItem('city')
    let cityList
    if (!city) {
      cityList = await reqCityAndSetCache()
    } else {
      const { expires, data } = JSON.parse(city)
      if (Date.now() > expires) {
        // 缓存过期, 重新请求
        cityList = await reqCityAndSetCache()
      } else {
        // 优先取localstorage
        cityList = data
      }
    }
    dispatch(set_city_list({
      cityList: fromJS(cityList)
    }))
  }
}

export const set_current_city = (city: string): CurrentCity => ({
  type: types.SET_CURRENT_CITY,
  payload: city
})


const set_swiper_data = (payload: []): SwiperData => ({
  type: types.SET_SWIPER_DATA,
  payload: payload
})

export const get_swiper_data = () => {
  return async (dispatch: any) => {
    let rs: any = await req_swiper_data()
    dispatch(set_swiper_data(rs.swiperData))
  }
}

const set_rest_data = (data: any): RestData => ({
  type: types.REQ_RESTURANT,
  payload: data
})

export const get_resturant = (latitude: number, longitude: number, offset: number, limit: number) => {
  return async (dispatch: any) => {
    let rs = await req_resturant(latitude, longitude, offset, limit)
    console.log(rs)
    // console.l
    dispatch(set_rest_data(rs))
  }
}
const set_filter_data = (data: any): FilterData => ({
  type: types.REQ_FILTER_DATA,
  payload: data
})
export const get_filter_data = () => {
  return async (dispatch: any) => {
    let rs = await req_filter_data()
    dispatch(set_filter_data(rs))
  }
}

export const set_choose_type = (part: number, item: number, flag: boolean): ChooseType => ({
  type: types.SET_TYPE_SELECT,
  payload: {
    part,
    item,
    flag
  }
})
export const clear_all_select = (): clearSlect => ({
  type: types.CLEAR_ALL_SELECT
})

export type Action = Location | Address | ShowLoading | HideLoading
  | SelectAddress | CityList | CurrentCity | SwiperData | RestData
  | FilterData | ChooseType | clearSlect
