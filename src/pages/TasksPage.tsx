import { Grid } from '@mui/material';
import React from 'react';
import TasksCard from '../components/TasksCard';

import ResponsiveAppBar from '../components/ResponsiveAppBar';
import Task from '../types/task';

const MockTasks: Array<Task> = [
  {
    id: '1',
    description: "tarefa 2",
    detail: "hahahahahaha",
    favorite: true
  },
  {
    id: '2',
    description: "tarefa 3",
    detail: "hahahahahaha",
    favorite: false
  },
  {
    id: '3',
    description: "tarefa 4",
    detail: "hahahahahaha",
    favorite: true
  },
  {
    id: '4',
    description: "tarefa 5",
    detail: "hahahahahaha",
    favorite: false
  }

]

const TasksPage: React.FC = () => {



  return (
    <Grid container height="100vh">
      <Grid item xs={12}>
        <ResponsiveAppBar />
      </Grid>
      <Grid container gap={2} margin={4} >
        {MockTasks.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} >
            <TasksCard task={'aaa'} description={'aaa'} favorite={false}/>
            </Grid>
        ))}
     
        
        
       
      </Grid>
    </Grid>
  );
};

export default TasksPage;
