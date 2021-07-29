import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';

import { SocketContext } from './hooks/socket';
import { io, Socket } from 'socket.io-client';
import { nanoid } from 'nanoid';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import toast, { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Room from './pages/Room';

import { theme } from './theme';
import KeepInApp from './components/KeepInApp';

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const uuid = localStorage.getItem('uuid') ?? nanoid();

    setSocket(io(process.env.REACT_APP_BASE_URL, { transports: ['websocket'], query: { uuid } }));
  }, []);

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster toastOptions={{ duration: 5000 }} />
      {!!socket && (
        <SocketContext.Provider value={socket}>
          <Router getUserConfirmation={() => false}>
            <Box className={classes.root}>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/:room">
                  <Room />
                </Route>
              </Switch>
            </Box>
          </Router>
        </SocketContext.Provider>
      )}
    </ThemeProvider>
  );
};

render(<App />, document.getElementById('root'));
