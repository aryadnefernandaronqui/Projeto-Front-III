import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Task from '../types/task';
import { useMemo } from 'react';

interface TasksCardProps {
  task: Task
}


const TasksCard: React.FC<TasksCardProps> = ({task}) => {
    
return (
  <Card variant="outlined">
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {task.task}
      </Typography>
      <Typography variant="body2">{task.description}</Typography>
    </CardContent>
    <Box display="flex" flexDirection="row" justifyContent="space-around">
      <CardActions>
      <IconButton size="large" color="secondary" aria-label="logout" sx={{ mr: 2 }}>
          <FavoriteIcon/>
        </IconButton>
        <IconButton size="large" color="secondary" aria-label="logout" sx={{ mr: 2 }}>
          <EditNoteIcon />
        </IconButton>
        <IconButton size="large" color="secondary" aria-label="logout" sx={{ mr: 2 }}>
          <DeleteOutlineIcon />
        </IconButton>
      </CardActions>
    </Box>
  </Card>
);
}
export default TasksCard