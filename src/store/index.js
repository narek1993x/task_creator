import { combineReducers } from 'redux'
import tasks from './tasks/reducer'
import auth from './auth/reducer'

export default combineReducers({
  tasks,
  auth
})