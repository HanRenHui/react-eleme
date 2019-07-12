import { combineReducers } from 'redux-immutable'
import UserReducer from './user'
import HomeReducer from './home'
export default combineReducers({
  user: UserReducer,
  home: HomeReducer
})