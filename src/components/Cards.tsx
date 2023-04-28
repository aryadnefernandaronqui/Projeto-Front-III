import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';

const card = (
  <Card>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Tarefa
      </Typography>

      <Typography variant="body2">descrição</Typography>
    </CardContent>
    <Box display="flex" flexDirection="row" justifyContent="space-around">
      <CardActions>
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

export default function Cards() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
