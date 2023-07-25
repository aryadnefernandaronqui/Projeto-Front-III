import { createSlice } from '@reduxjs/toolkit';

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
        closeAlert: () => {console.log('alertSlice')
        return initialState}
    }
    

})
export const {showAlert, closeAlert} = alertSlice.actions
export default alertSlice.reducer