
import {createEntityAdapter, createSlice, EntityState, PayloadAction,} from '@reduxjs/toolkit'
import {v4} from 'uuid'
import Task from '../../types/task'
import User from '../../types/user'


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
  tasks: taskAdapter.getInitialState(),
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
    logout:() => {
      return initialState
      },
    setRemember:(state,  action: PayloadAction<boolean>) => {
    state.remember = action.payload
      },
    addTask: (state, action: PayloadAction<Pick<Task,'task' | 'description'>>) => {
    const newTask = createTask(action.payload.task, action.payload.description)
    taskAdapter.addOne(state.tasks, newTask)
      },  

    setAllTask:(state, action: PayloadAction<Task[]>) => {
    taskAdapter.setAll(state.tasks, action.payload)
      },
    updateTask: (state, action: PayloadAction<Partial<Task>>) => {
    taskAdapter.updateOne(state.tasks, {
      id: action.payload.id!,
      changes: {
        ...action.payload
      } 
    })
  }, 
  deleteTask: (state, action: PayloadAction<string>) => {
    const taskId = action.payload;
    taskAdapter.removeOne(state.tasks, taskId)
  },
  },
})

export const { login,logout, setRemember, addTask, deleteTask, setAllTask, updateTask} = userLoggedSlice.actions
export const { selectAll: selectAllTasks, selectById: selectByTaskId } = taskAdapter.getSelectors((entityStateTaks: EntityState<Task>) => entityStateTaks);
export default userLoggedSlice.reducer
