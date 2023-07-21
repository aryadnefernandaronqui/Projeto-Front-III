import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { deleteTaskAsyncThunk, updateTaskAsyncThunk } from '../store/modules/userLoggedSlice';
import Task from '../types/task';
import Dialogs from './Dialogs';

interface TasksCardProps {
  task: Task
}



const TasksCard: React.FC<TasksCardProps> = ({task}) => {

  const dispatch = useAppDispatch()
  const [openDialog, setOpenDialog] = useState(false)

  const handleDelete = () => {
    dispatch(deleteTaskAsyncThunk(task.id));
  };

  const handleEdit = (task: Task) => {
    setOpenDialog(true)
  }

  const toggleFavorite = () => {
    dispatch(updateTaskAsyncThunk({...task, favorite: !task.favorite}))
  } 
  const toggleArchived = () => {
    dispatch(updateTaskAsyncThunk({...task, archived: !task.archived}))
  } 
    
return (
 <>
  <Card variant="outlined">
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {task.title}
      </Typography>
      <Typography variant="body2">{task.description}</Typography>
    </CardContent>
    <Box display="flex" flexDirection="row" justifyContent="space-around">
      <CardActions>
       <IconButton size="large" color="secondary" aria-label="logout" sx={{ mr: 2 }} onClick={toggleFavorite}>
       {task.favorite ? (<FavoriteIcon/>) :(<FavoriteBorderIcon/> )}
        </IconButton> 
        <IconButton size="large" color="secondary" aria-label="logout" sx={{ mr: 2 }} onClick={() => handleEdit(task)}>
          <EditNoteIcon />
        </IconButton>
        <IconButton size="large" color="secondary" aria-label="logout" sx={{ mr: 2 }} onClick={toggleArchived}>
       {task.archived ? (<ArchiveIcon/>) :(<UnarchiveIcon/> )}
        </IconButton> 
        <IconButton size="large" color="secondary" aria-label="logout" sx={{ mr: 2 }} onClick={handleDelete}>
          <DeleteOutlineIcon />
        </IconButton>
      </CardActions>
    </Box>
  </Card>
  {openDialog &&
      <Dialogs actionClose={() => setOpenDialog(false)} openDialog={openDialog} task={task} />
      }
 </>
);
}
export default TasksCard


