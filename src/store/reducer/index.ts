import { combineReducers } from 'redux-immutable'
import UserReducer from './user'
import HomeReducer from './home'
import SearchReducer from './search'
import DetailReducer from './detail'
import RatingReducer from './rating'
export default combineReducers({
  user: UserReducer,
  home: HomeReducer,
  search: SearchReducer,
  detail: DetailReducer,
  rating: RatingReducer 
})