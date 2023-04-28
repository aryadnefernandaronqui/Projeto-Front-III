import BathtubIcon from '@mui/icons-material/Bathtub';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';

import background from '../assets/images/login.jpeg';
import Form from '../components/Form';

const SignUp: React.FC = () => {
  return (
    <Grid container height="100vh">
      <Grid item xs={false} sm={4} md={7} sx={{ background, backgroundColor: 'blue' }} />
      <Grid item xs={12} sm={8} md={5}>
        <Box marginY={8} marginX={4} display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: pink[400] }}>
            <BathtubIcon />
          </Avatar>
          <Typography variant="h4" marginTop={3}>
            Sign Up
          </Typography>

          <Form textButton="Sign Up" mode="signup" />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
