import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';

import { Toaster } from 'react-hot-toast';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import { nanoid } from 'nanoid';
import { io, Socket } from 'socket.io-client';

import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { SocketContext } from './hooks/socket';
import Home from './pages/Home';
import Room from './pages/Room';
import { theme } from './theme';

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const uuid = localStorage.getItem('uuid') ?? nanoid();

    setSocket(io(process.env.REACT_APP_BASE_URL, { transports: ['websocket'], query: { uuid } }));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster toastOptions={{ duration: 5000 }} />
      {Boolean(socket) && (
        <SocketContext.Provider value={socket}>
          <Router>
            <Box
              sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
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

render(<App />, document.querySelector('#root'));
