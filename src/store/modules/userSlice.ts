import {createEntityAdapter, createSlice,} from '@reduxjs/toolkit'
import { RootState } from '..';
import User from '../../types/user'


const userAdapter = createEntityAdapter<User>({
    selectId:user => user.email
})



const userSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState(),
  reducers: {
    addUser: userAdapter.addOne
    
  },
})

export const { addUser } = userSlice.actions
export const { selectAll: selectAllUsers, selectById: selectByEmail } = userAdapter.getSelectors((state: RootState) => state.user);
export default userSlice.reducer
