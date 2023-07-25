
import { createAsyncThunk, createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit'
import { RootState } from '..'
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
  description: string,
  date: Date
}

type TUpdateAndGetTask = {
  id?: string,
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
    '/users',
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
    const response = await apitodo.post('users/login', data);
  return response.data;
  } catch(error){
    dispatch(showAlert({
      msg: 'Account doesnt exist.',
      type: 'error',
    }));
    throw error;
  }

});

export const getTasksAsyncThunk = createAsyncThunk('tasks/getTasks', async({
  title, description}: TUpdateAndGetTask, {getState}) => {
    const query: string[] = []

    const user = (getState() as RootState).userLogged.user

    if(title){
      query.push(`title=${title}`)
    }
    if(description){
      query.push(`description=${description}`)
    }
    let url = '/tasks/' + user.email

    if(query.length > 0){
      url = `/tasks/${user.email}?${query.concat('&')}`
    } 
  const response = await apitodo.get(url, {headers:{AuthToken:user.token}})

  return response.data
})

export const createTaskAsyncThunk = createAsyncThunk('tasks/createTask', async({
  userId, title, description, date}: TCreateTask, {dispatch,getState}) => {

    try{
      const user = (getState() as RootState).userLogged.user
    const response = await apitodo.post('/tasks',
    {
      userEmail: userId, 
      title, 
      description,
      date
    },
    {headers:{AuthToken:user.token}}
    )
    dispatch(showAlert({
      open: true, 
      success: true, 
      description: `Well Done! A task was created successfully!`,
    }))
    return response.data;
    }catch(err: any){
 
      dispatch(showAlert({
        open: true, 
        success: false, 
        description: err?.response.data.message || err.message,
      }))
    
      throw err
     }
})

export const updateTaskAsyncThunk = createAsyncThunk('tasks/updateTask', async({id, title, description, favorite, archived}: 
  Required<TUpdateAndGetTask>, {dispatch, getState}, ) => {

 try{
  const user = (getState() as RootState).userLogged.user
  
  await apitodo.put('/tasks/' + id,
  { 
    id,
    title,
    description,
    favorite, 
    archived
  },
  {headers:{AuthToken:user.token}}
  )
  dispatch(showAlert({
    open: true, 
    success: true, 
    description: `Well Done! A task was edited successfully!`,
  }))
  
  return {id, title, description, favorite, archived};
 }catch(err: any){
 
  dispatch(showAlert({
    open: true, 
    success: false, 
    description: err?.response.data.message || err.message,
  }))

  throw err
 }
})

export const deleteTaskAsyncThunk = createAsyncThunk('tasks/deleteTask', async(id:string,{dispatch}) => {
  
  try{
    
 await apitodo.delete('/tasks/' + id)
  dispatch(showAlert({
    open: true, 
    success: true, 
    description: `Your task was deleted!`,
  }))

    return id;
  }catch(err: any){
 
    dispatch(showAlert({
      open: true, 
      success: false, 
      description: err?.response.data.message || err.message,
    }))
  
    throw err
   }
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
    taskAdapter.addOne(state.tasks, action.payload);
   })
   builder.addCase(updateTaskAsyncThunk.fulfilled, (state, action) => {
    taskAdapter.updateOne(state.tasks,{id:action.payload.id, changes:{...action.payload}});
   })
   builder.addCase(deleteTaskAsyncThunk.fulfilled, (state, action) => {
    taskAdapter.removeOne(state.tasks, action.payload)
   }) 
   builder.addCase(getTasksAsyncThunk.fulfilled, (state, action) => {
    taskAdapter.setAll(state.tasks, action.payload)
   })
    },
  })

export const { logout, remember} = userLoggedSlice.actions
export const { selectAll: selectAllTasks, selectById: selectByTaskId } = taskAdapter.getSelectors((entityStateTaks: EntityState<Task>) => entityStateTaks);
export default userLoggedSlice.reducer
