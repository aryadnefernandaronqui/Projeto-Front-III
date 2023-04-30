
import userReducer from './userSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers ({
	
	user: userReducer

}) 

export default rootReducer