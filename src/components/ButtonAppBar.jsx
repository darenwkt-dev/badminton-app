import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Avatar} from '@mui/material';
import logo1 from '../images/logo1.jpeg';

import SwipeableTemporaryDrawer from "./SwipeableTemporaryDrawer";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Avatar
            src={logo1}
            sx={{mr:2}}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sports Master
          </Typography>
          <SwipeableTemporaryDrawer/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
