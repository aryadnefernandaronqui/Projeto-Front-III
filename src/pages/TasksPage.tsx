
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerts from '../components/Alerts';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import TasksCard from '../components/TasksCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getTasksAsyncThunk, selectAllTasks, } from '../store/modules/userLoggedSlice';



const TasksPage: React.FC = () => {

   const navigate = useNavigate()
   const loggedUser = useAppSelector((state) => state.userLogged.user)
   const loggedUserTasks = useAppSelector((state => selectAllTasks(state.userLogged.tasks)))
   const dispatch = useAppDispatch()

  useEffect(() => {
    if(!loggedUser.token) navigate('/signin')
    if(loggedUser.token){
      dispatch(getTasksAsyncThunk({archived:true}))
    }
  },[loggedUser, navigate, dispatch])


  return (
    <Grid container height="100vh" >
      <Grid item xs={12}>
        <ResponsiveAppBar  />
      </Grid>
      <Grid container gap={2} margin={4} justifyContent='center' >
        
       {loggedUserTasks.map((task) =>  
        <Grid key={task.id} item xs={12} sm={6} md={4} lg={3} >
        <TasksCard task={task}/>
        </Grid> 
      )}
      </Grid>
      <Alerts/>
    </Grid>
  );
};

export default TasksPage;



