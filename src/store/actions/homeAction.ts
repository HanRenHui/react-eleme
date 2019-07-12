import * as types from './../action-types'

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

export type Action = Location | Address | ShowLoading | HideLoading
