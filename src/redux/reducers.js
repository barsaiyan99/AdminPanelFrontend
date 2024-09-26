import { combineReducers } from 'redux'
import authReducer from "../redux/slices/authSlice"
const rootReducer = combineReducers({
    auth: authReducer,
  })
  export default rootReducer