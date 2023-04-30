
import userReducer from './userSlice'
import taskReducer from './taskSlice'
import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers ({
	
	user: userReducer,
	task: taskReducer

}) 

export default rootReducer