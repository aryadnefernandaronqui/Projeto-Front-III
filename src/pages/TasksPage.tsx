
import { Grid } from '@mui/material';
import React, {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alerts from '../components/Alerts';


import ResponsiveAppBar from '../components/ResponsiveAppBar';
import TasksCard from '../components/TasksCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectAllTasks } from '../store/modules/userLoggedSlice';
import { editUser} from '../store/modules/userSlice';


const TasksPage: React.FC = () => {

   const navigate = useNavigate()
   const loggedUser = useAppSelector((state) => state.userLogged.user)
   const loggedUserTasks = useAppSelector((state => selectAllTasks(state.userLogged.tasks)))
   const dispatch = useAppDispatch()

  useEffect(() => {
    if(!loggedUser) navigate('/signin')
  },[loggedUser, navigate])

  useEffect(()=>{

    if(loggedUser?.email){
      dispatch(editUser({
        id: loggedUser!.email,
        changes: {
          tasks: loggedUserTasks,
        }
      }))
    }

   },[loggedUser, loggedUserTasks, dispatch])

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



