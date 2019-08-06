import * as types from './../action-types'
import { 
  req_rating 
} from './../../../src/api/rating'
import {
  Rating,
  ClearCom
} from '../../interface/rating'

const set_ratign = (payload: any): Rating => ({
  type: types.GET_RATING,
  payload
})

const clear_commensts = (): ClearCom => ({
  type: types.CLEAR_COMMENTS
})

export const get_rating = (code: number, offset: number, limit: number) => {
  return async (dispatch: any) => {
    if (offset === 0) {
      dispatch(clear_commensts())
    }
    let rs = await req_rating(code, offset, limit) 
    dispatch(set_ratign({
      offset, 
      data: rs
    }))    
  }
}