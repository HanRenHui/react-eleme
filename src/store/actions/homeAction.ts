import * as types from './../action-types'
import { fromJS } from 'immutable'
import { req_citylist } from './../../api/location'
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

export type Action = Location | Address | ShowLoading | HideLoading
| SelectAddress | CityList | CurrentCity
