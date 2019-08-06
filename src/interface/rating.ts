import * as types from '../store/action-types'

export interface Rating {
  payload: {
    data: {
      comments: any[],
      rating: any,
      tags: [{
        count: number,
        name: string,
        unsatisfied: boolean,
        code: number
      }],
      has_next: boolean
    },
    offset: number

  },
  type: typeof types.GET_RATING
}
export interface ClearCom {
  type: typeof types.CLEAR_COMMENTS
}
export type Action = Rating | ClearCom