import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import * as React from 'react';


interface TasksCardProps {
  task: string,
  description: string,
  favorite: boolean
}


const TasksCard: React.FC<TasksCardProps> = ({task, description, favorite}) => (
  <Card variant="outlined">
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Task
      </Typography>

      <Typography variant="body2">Description</Typography>
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

export default TasksCard;

