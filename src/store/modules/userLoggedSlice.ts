
import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
import { apitodo } from '../../services/api'
import Task from '../../types/task'
import User from '../../types/user'
import { showAlert } from './alertSlice'


interface UserLogged {
  user: User
  remember: boolean
  tasks: EntityState<Task>
}
type TCreateUser = {
  name: string;
  email: string;
  password: string;
  repassword: string
}
type TLogin = {
  email: string;
  password: string;
}

type TCreateTask = { 
  userId: string;
  title: string, 
  description: string
}

type TUpdateAndGetTask = {
  title?: string, 
  description?: string,
  favorite?: boolean,
  archived?: boolean
}


export const taskAdapter = createEntityAdapter<Task>({
  selectId:(task) => task.id
})

const initialState: UserLogged = {
  user: {} as User,
  remember: false,
  tasks: taskAdapter.getInitialState(),
}
export const createUserAsyncThunk = createAsyncThunk('userLogged/createUser', async ({
  name, email, password, repassword,
}: TCreateUser) => {
  const response = await apitodo.post(
    '/login',
    {
      name,
      email,
      password,
      repassword,
    },
  );
  return response.data;
});

export const loginAsyncThunk = createAsyncThunk('userLogged/userLogin', async (data: TLogin, {dispatch}) => {
  try{
    const response = await apitodo.post('/auth', data);
  return response.data;
  } catch(error){
    dispatch(showAlert({
      msg: 'Account doesnt exist.',
      type: 'error',
    }));
    throw error;
  }

});

export const getTasksAsyncThunk = createAsyncThunk('tasks/updateUser', async({
  title, description}: TUpdateAndGetTask) => {
    const query: string[] = []
    if(title){
      query.push(`title=${title}`)
    }
    if(description){
      query.push(`description=${description}`)
    }
  const response = await apitodo.get(`/tasks?${query.concat('&')}`)

  return response.data
})

export const createTaskAsyncThunk = createAsyncThunk('tasks/createTask', async({
  userId, title, description}: TCreateTask) => {
    const response = await apitodo.post('/tasks',
    {
      userId, 
      title, 
      description
    },
    )
    return response.data;
})

export const updateTaskAsyncThunk = createAsyncThunk('tasks/updateTask', async({title, description}: Required<TUpdateAndGetTask>) => {
    const response = await apitodo.put('/tasks',
    { 
      title,
      description
    },
    )
    return response.data;
})

export const deleteTaskAsyncThunk = createAsyncThunk('tasks/deleteTask', async(id:string) => {
    const response = await apitodo.delete('/tasks/' + id)
    return response.data;
})


const userLoggedSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    logout:() => initialState,
    remember: (state, action) => {
      state.remember = action.payload
    }  
    },
  extraReducers(builder) {
   builder.addCase(loginAsyncThunk.fulfilled, (state, action) => {
    state.user.email = action.payload.email
    state.user.password = action.payload.password;
    state.user.token = action.payload.token;
   })
   builder.addCase(createUserAsyncThunk.fulfilled, (state, action) => {
    state.user.userName = action.payload.name;
    state.user.email = action.payload.email;
    state.user.password = action.payload.password;
   })
   builder.addCase(createTaskAsyncThunk.fulfilled, (state, action) => {
    taskAdapter.addOne(state.tasks, action.payload.data);
   })
   builder.addCase(updateTaskAsyncThunk.fulfilled, (state, action) => {
    taskAdapter.updateOne(state.tasks, action.payload.data);
   })
   builder.addCase(deleteTaskAsyncThunk.fulfilled, (state, action) => {
    taskAdapter.removeOne(state.tasks, action.payload.data)
   }) 
   builder.addCase(getTasksAsyncThunk.fulfilled, (state, action) => {
    taskAdapter.setAll(state.tasks, action.payload.data)
   })
    },
  })

export const { logout, remember} = userLoggedSlice.actions
export const { selectAll: selectAllTasks, selectById: selectByTaskId } = taskAdapter.getSelectors((entityStateTaks: EntityState<Task>) => entityStateTaks);
export default userLoggedSlice.reducer
