import React from 'react';

import MuiAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';

export const AppBar: React.FC = () => (
  <MuiAppBar position="static">
    <Toolbar>
      <IconButton edge="start" color="inherit">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6">ASK</Typography>
    </Toolbar>
  </MuiAppBar>
);
