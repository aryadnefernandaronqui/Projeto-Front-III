import { Grid } from '@mui/material';
import React from 'react';

import Cards from '../components/Cards';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const Home: React.FC = () => {
  return (
    <Grid container height="100vh">
      <Grid item xs={12}>
        <ResponsiveAppBar />
      </Grid>
      <Grid container>
        <Grid item md={4} sm={3} xs={2}>
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
