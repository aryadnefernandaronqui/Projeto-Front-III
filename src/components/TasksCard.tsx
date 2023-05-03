import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Dialog, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Task from '../types/task';
import { useAppDispatch } from '../store/hooks';
import { deleteTask, updateTask } from '../store/modules/userLoggedSlice';
import Dialogs from './Dialogs';
import { useState } from 'react';

interface TasksCardProps {
  task: Task
}



const TasksCard: React.FC<TasksCardProps> = ({task}) => {
  
  const [openDialog, setOpenDialog] = useState(false)
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleEdit = (object: {task: string, description: string} ) => {
    dispatch(updateTask({...task, ...object}))
  }

  const toggleFavorite = () => {
    dispatch(updateTask({...task,favorite: !task.favorite}))
  } 
    
return (
 <>
  <Card variant="outlined">
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {task.task}
      </Typography>
      <Typography variant="body2">{task.description}</Typography>
    </CardContent>
    <Box display="flex" flexDirection="row" justifyContent="space-around">
      <CardActions>
       <IconButton size="large" color="secondary" aria-label="logout" sx={{ mr: 2 }} onClick={toggleFavorite}>
       {task.favorite ? (<FavoriteIcon/>) :(<FavoriteBorderIcon/> )}
        </IconButton> 
        <IconButton size="large" color="secondary" aria-label="logout" sx={{ mr: 2 }} onClick={() => setOpenDialog(true)}>
          <EditNoteIcon />
        </IconButton>
        <IconButton size="large" color="secondary" aria-label="logout" sx={{ mr: 2 }} onClick={handleDelete}>
          <DeleteOutlineIcon />
        </IconButton>
      </CardActions>
    </Box>
  </Card>
  <Dialogs actionButton={handleEdit} actionClose={() => setOpenDialog(false)} openDialog={openDialog} task={task} />
 </>
);
}
export default TasksCard