import { combineReducers } from 'redux-immutable'
import UserReducer from './user'
import HomeReducer from './home'
import SearchReducer from './search'

export default combineReducers({
  user: UserReducer,
  home: HomeReducer,
  search: SearchReducer
})