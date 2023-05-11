import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    open: false, 
    success: false, 
    description: '',
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers:{
        showAlert: (state, action) => action.payload,
        clearState: (state, action) => initialState
    }
    

})
export const {showAlert, clearState} = alertSlice.actions
export default alertSlice.reducer