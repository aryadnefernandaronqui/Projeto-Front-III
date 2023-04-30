import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { blueGrey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes/routes';
import Dialogs from './Dialogs';




export default function ResponsiveAppBar() {

    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false)

  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: blueGrey[600] }}>
        <Toolbar>
          <IconButton size="large" edge="start" color="secondary" aria-label="add" sx={{ mr: 2 }} onClick={() => {<Dialogs/>}}>
            <LibraryAddIcon/>
          </IconButton>
          
          <Typography variant="h6" component="div" align="center" sx={{ flexGrow: 1, color: '#90c6ea' }}>
            This is your To Do page
          </Typography>
          {/* {routes.map(page => (
          
          ))} */}
          <IconButton size="large" edge="end" color="secondary" aria-label="logout" sx={{ mr: 2 }} onClick={() => navigate('/')}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
