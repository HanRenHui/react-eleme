import { req_search_result } from './../../api/search'
import { 
  Offset,
  SearchRest,
  ClearList
} from '../../interface/Select'
import * as types from './../action-types'


const set_search_list = (payload: any): SearchRest => ({
  type: types.SET_REST_LIST, 
  payload
})

export const clear_search_list = (): ClearList => ({
  type: types.CLEAR_LIST
})



export const req_search_list = (offset: number, keyword: string, latitude: number, longitude: number) => {
  return async (dispatch: any) => {
    let rs: any = await req_search_result(offset, encodeURI(keyword), latitude, longitude)
    if (offset === 0) dispatch(clear_search_list())
    dispatch(set_search_list({
      list: rs.inside[0].restaurant_with_foods,
      isNull: rs.inside[0].isNull || false
    }))
  }
}

export const set_offset = (offset: number): Offset => ({
  type: types.SET_SORT, 
  payload: offset
})