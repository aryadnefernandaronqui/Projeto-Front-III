import LoginIcon from '@mui/icons-material/Login';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import React from 'react';


import Form from '../components/Form';

const SignIn: React.FC = () => {
  
  return (
    <Grid container height="100vh">
      <Grid item xs={false} sm={4} md={7} sx={{ backgroundColor: '#4F5D75' }} />
      <Grid item xs={12} sm={8} md={5}>
        <Box marginY={8} marginX={4} display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: pink[400] }}>
            <LoginIcon />
          </Avatar>
          <Typography variant="h4" marginTop={3}>
            Sign In
          </Typography>
          <Form textButton="Sign In" mode="signin" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignIn;
