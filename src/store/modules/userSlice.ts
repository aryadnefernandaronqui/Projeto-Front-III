import {createEntityAdapter, createSlice,} from '@reduxjs/toolkit'
import User from '../../types/user'


const userAdapter = createEntityAdapter<User>({
    selectId:(user) => user.email
})

export const userSlice = createSlice({
  name: 'users',
  initialState: userAdapter.getInitialState(),
  reducers: {
    addUser: userAdapter.addOne
  },
})

export const { addUser } = userSlice.actions


export default userSlice.reducer
