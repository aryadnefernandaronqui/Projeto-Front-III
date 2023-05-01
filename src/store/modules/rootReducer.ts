
import userReducer from './userSlice'
import userLoggedReducer from './userLoggedSlice'
import { combineReducers } from '@reduxjs/toolkit'


const rootReducer = combineReducers ({
	
	user: userReducer,
	userLogged: userLoggedReducer
}) 

export default rootReducer