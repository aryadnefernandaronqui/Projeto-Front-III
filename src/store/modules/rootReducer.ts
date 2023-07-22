
import { combineReducers } from '@reduxjs/toolkit'
import alertReducer from './alertSlice'
import userLoggedReducer from './userLoggedSlice'


const rootReducer = combineReducers ({
	userLogged: userLoggedReducer,
	alert: alertReducer
}) 

export default rootReducer