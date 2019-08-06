import { combineReducers } from 'redux-immutable'
import UserReducer from './user'
import HomeReducer from './home'
import SearchReducer from './search'
import DetailReducer from './detail'
import RatingReducer from './rating'
import SettlementReducer from './settlement'
import RemarkReducer from './remark'
import MsiteReducer from './msite'
export default combineReducers({
  user: UserReducer,
  home: HomeReducer,
  search: SearchReducer,
  detail: DetailReducer,
  rating: RatingReducer ,
  settlement: SettlementReducer,
  remark: RemarkReducer, 
  msite: MsiteReducer
})