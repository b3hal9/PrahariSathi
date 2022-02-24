import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import postReducer from './postReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  post_data: postReducer,
})

export default rootReducer
