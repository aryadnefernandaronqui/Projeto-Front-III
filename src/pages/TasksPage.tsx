import { Grid} from '@mui/material';
import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import TasksCard from '../components/TasksCard';
import { useAppSelector } from '../store/hooks';
import Task from '../types/task';



const TasksPage: React.FC = () => {
   const tasksRedux = useAppSelector(state => state.task)


  return (
    <Grid container height="100vh">
      <Grid item xs={12}>
        <ResponsiveAppBar  />
      </Grid>
      <Grid container gap={2} margin={4} >
      <Grid item xs={12} sm={6} md={4} lg={3} >
            <TasksCard tasks={[]}/>
            </Grid>
      </Grid>
    </Grid>
  );
};

export default TasksPage;
