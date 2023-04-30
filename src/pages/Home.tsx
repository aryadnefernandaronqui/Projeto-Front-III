import {Grid, Typography } from '@mui/material';
import React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';





const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Grid container height="100vh">
      <Grid item height="100vh" display='flex' direction='column' xs={12} sm={8} md={5} spacing='5' color='#EF8354' alignItems='center' justifyContent='center' textAlign='center' >
      <Typography  variant="h4" >Hi!</Typography>
      <Typography mt={4} variant="h6">This is To Do Page!</Typography>
      <Typography mt={2} variant="h6">Here you can add your tasks and keep your life up to date.</Typography>
    </Grid>
    <Grid item height="100vh" display='flex' xs={12} sm={4} md={7}  sx={{bgcolor:'#EF8354'}} justifyContent='center' alignItems='center'>
    <ButtonGroup variant="contained" aria-label="outlined primary button group" color='inherit'>
      <Button size='large' onClick={() => navigate('signin')}>Sign In</Button>
      <Button size='large' onClick={() => navigate('signup')}>Sign Up</Button>
     
    </ButtonGroup>
    </Grid>
    </Grid>
  );
};

export default Home;

