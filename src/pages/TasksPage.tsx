import { Grid} from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import ResponsiveAppBar from '../components/ResponsiveAppBar';
import TasksCard from '../components/TasksCard';
import { useAppSelector } from '../store/hooks';
import { selectAllTasks } from '../store/modules/userLoggedSlice';
import { selectAllUsers } from '../store/modules/userSlice';
import Task from '../types/task';



const TasksPage: React.FC = () => {

    const navigate = useNavigate()
   const loggedUser = useAppSelector((state) => state.userLogged.user)
   let loggedUserTasks = useAppSelector((state => selectAllTasks(state.userLogged.tasks)))
   const allUsers = useAppSelector(state => selectAllUsers)
   



  useEffect(() => {
    if(!loggedUser) navigate('/signin')
  },[loggedUser])

  return (
    <Grid container height="100vh" >
      <Grid item xs={12}>
        <ResponsiveAppBar  />
      </Grid>
      <Grid container gap={2} margin={4} justifyContent='center' >
      {/* {loggedUserTasks = allUsers.find(item) => { item.email === loggedUser!.email} */}
      {loggedUserTasks.map((task) =>  <Grid item xs={12} sm={6} md={4} lg={3} >
      <TasksCard task={task}/>
      </Grid> )}
      
      </Grid>
    </Grid>
  );
};

export default TasksPage;



