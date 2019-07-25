import * as types from './../action-types'
import { fromJS } from 'immutable'
import { Action } from './../interface/rating'
const defaultState = fromJS({
  comments: [],
  rating: {},
  tags: [],
  has_next: null,
})
export default function reducer(state = defaultState, action: Action) {
  switch (action.type) {
    case types.GET_RATING:

      const { comments, rating, tags, has_next } = action.payload.data
      const { offset } = action.payload
      if (offset === 0) {
        return state
          .set('comments', fromJS(comments))
          .set('rating', fromJS(rating))
          .set('tags', fromJS(tags))
          .set('has_next', fromJS(has_next))
      } else {
        return state
          .set('comments', state.get('comments').concat(fromJS(comments)))
          .set('has_next', has_next)
      }

    case types.CLEAR_COMMENTS:
      return state.set('comments', fromJS([]))
    default:
      return state
  }
}
