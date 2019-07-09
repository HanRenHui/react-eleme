import { combineReducers } from 'redux-immutable'
import HomeReducers from './home'
export default combineReducers({
  home: HomeReducers
})