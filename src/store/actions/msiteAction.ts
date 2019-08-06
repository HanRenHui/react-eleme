import * as types from './../action-types'
import {
  CurrentCate,
  ClearCate
} from './../../interface/msite'
import {
  req_resturant 
} from './../../api/home'
import {
  RestData,
  ClearRests,
  CurrentOffset
} from './../../interface/Home'
export const set_current_category = (payload: string): CurrentCate => ({
  type: types.SET_CURRENT_CATE,
  payload
})

export const clear_current_cagtegory = (): ClearCate => ({
  type: types.CLEAR_CURRENT_CATE
})

const set_rest_data = (data: any): RestData => ({
  type: types.REQ_RESTURANT,
  payload: data
})
export const clear_all_rests = (): ClearRests => ({
  type: types.CLEAR_ALL_RESTS
})

export const set_current_offset = (payload: number): CurrentOffset => ({
  type: types.SET_CURRENT_OFFSET,
  payload
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
      console.log(rs)
      dispatch(set_rest_data(rs))
    }
  }