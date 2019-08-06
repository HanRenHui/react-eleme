import * as types from './../action-types'
import { fromJS } from 'immutable'
import {
  req_citylist,
  req_swiper_data,
  req_resturant,
  req_filter_data,
  req_location
} from '../../api/home'

import {
  Location,
  Address,
  ShowLoading,
  HideLoading,
  SelectAddress,
  CityList,
  CurrentCity,
  SwiperData,
  RestData,
  FilterData,
  clearSlect,
  ClearRests,
  LntLat,
  DeliverMode,
  ActivityMode,
  CurrentSortType,
  CurrentOffset,
} from '../../interface/Home'


export const set_current_city = (city: string): CurrentCity => ({
  type: types.SET_CURRENT_CITY,
  payload: city
})
export const setLatLnt = (lat: number, lng: number): LntLat => ({
  type: types.SET_LAT_LNT,
  payload: {
    lat,
    lng
  }
})

export const set_location = (location: any): Location => ({
  type: types.SET_LOCATION,
  payload: location
})
export const set_address = (address: any): Address => ({
  type: types.SET_ADDRESS,
  payload: address
})
export const set_current_offset = (payload: number): CurrentOffset => ({
  type: types.SET_CURRENT_OFFSET,
  payload
})


export const show_loading = (): ShowLoading => ({
  type: types.SHOW_LOADING
})
export const hide_loading = (): HideLoading => ({
  type: types.HIDE_LOADING
})
export const select_address = (address: string, name: string): SelectAddress => ({
  type: types.SELECT_ADDRESS,
  payload: address + name
})


const set_city_list = (payload: any): CityList => ({
  type: types.SET_CITY_LIST,
  payload
})


export const get_location = () => {
  return async (dispatch: any) => {
    let ip = (window as any).IP
    let rs: any = await req_location(ip)

    if (rs.status === 0) {
      let { lat, lng } = rs.result.location
      // 设置经纬度
      dispatch(setLatLnt(lat, lng))
      // 设置位置
      dispatch(set_address(rs.result))
    }
  }
}


async function reqCityAndSetCache() {
  let rs: any = await req_citylist()
  let cityList = rs
  cityList = cityList.sort((a: any, b: any) => a.idx.localeCompare(b.idx))
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


const set_swiper_data = (payload: []): SwiperData => ({
  type: types.SET_SWIPER_DATA,
  payload
})

export const get_swiper_data = () => {
  return async (dispatch: any) => {
    let rs: any = await req_swiper_data()
    dispatch(set_swiper_data(rs))
  }
}

const set_rest_data = (data: any): RestData => ({
  type: types.REQ_RESTURANT,
  payload: data
})

export const get_resturant =
  (
    latitude: number,
    longitude: number,
    offset: number,
    limit: number,
    currentSorType: string,
    support_ids: any,
    activity_types: string,
    category: string
  ) => {
    return async (dispatch: any, getState: any) => {
      support_ids = getState().get('home').get('support_ids')
      // 先清空原有数据
      if (offset === 0) dispatch(clear_all_rests())
      let rs = await req_resturant(latitude, longitude, offset, limit, currentSorType, support_ids, activity_types, category)
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


export const clear_all_select = (): clearSlect => ({
  type: types.CLEAR_ALL_SELECT
})
export const clear_all_rests = (): ClearRests => ({
  type: types.CLEAR_ALL_RESTS
})

export const set_support_ids = (payload: String): DeliverMode => ({
  type: types.SET_DELIVER,
  payload
})

export const set_activity_mode = (code: String): ActivityMode => ({
  type: types.SET_ACTIVITY,
  payload: code
})

export const set_current_sort_type = (type: String): CurrentSortType => ({
  type: types.SET_CURRENT_SORT_TYPE,
  payload: type
})

