import { AlertTitleClassKey } from '@mui/material'
import {createEntityAdapter, createSlice, EntityState, PayloadAction,} from '@reduxjs/toolkit'
import {v4} from 'uuid'
import { RootState } from '..'
import Task from '../../types/task'
import User, { UserTasksAdapter } from '../../types/user'


interface UserLogged {
  user?: User
  remember: boolean
  tasks: EntityState<Task>
}



const taskAdapter = createEntityAdapter<Task>({
  selectId:(task) => task.id
})

const initialState: UserLogged = {
  user: undefined,
  remember: false,
  tasks: taskAdapter.getInitialState()
}


function createTask(title:string, description:string):Task {
  return{
    id: v4(),
    task: title,
    description,
    favorite: false

  }
}

const userLoggedSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    login:(state, action: PayloadAction<User>) => {
          state.user = action.payload
        },
    addTask: (state, action: PayloadAction<Pick<Task,'task' | 'description'>>) => {
       const newTask = createTask(action.payload.task, action.payload.description)
       taskAdapter.addOne(state.tasks, newTask)
      },    
    logout:() => {
      return initialState
  },
    setRemember:(state,  action: PayloadAction<boolean>) => {
    state.remember = action.payload
},
  },
})

export const { login,logout, setRemember, addTask} = userLoggedSlice.actions
export const { selectAll: selectAllTasks, selectById: selectByTaskId } = taskAdapter.getSelectors((entityStateTaks: EntityState<Task>) => entityStateTaks);
export default userLoggedSlice.reducer
