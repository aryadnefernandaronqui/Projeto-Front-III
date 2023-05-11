
import userReducer from './userSlice'
import userLoggedReducer from './userLoggedSlice'
import alertReducer from './alertSlice'
import { combineReducers } from '@reduxjs/toolkit'


const rootReducer = combineReducers ({
	
	user: userReducer,
	userLogged: userLoggedReducer,
	alert: alertReducer
}) 

export default rootReducer