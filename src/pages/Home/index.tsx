import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import makeStyles from '@material-ui/core/styles/makeStyles';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useSocket } from '../../hooks/socket';

import toast from 'react-hot-toast';
import { joinRoom, newRoom } from '../../data/api';

const protocol = process.env.PROTOCOL;

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: theme.spacing(2),
    minHeight: theme.spacing(48),

    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },

  title: {
    flexGrow: 1,
  },

  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    flexGrow: 1,
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(1),
    },
  },
}));

const Room: React.FC = () => {
  const socket = useSocket();
  const [room, setRoom] = useState('');
  const [loading, setLoading] = useState<false | string>(false);
  const [join, setJoin] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (join) {
      handleJoinRoom();
    }
  }, [join]);

  const handleJoinRoom = async () => {
    setLoading('join');
    const response = await joinRoom(socket, { room, protocol });
    if (response.status === 'ok') {
      history.push(`/${response.id}`);
    } else {
      console.warn(response);
      toast.error(`Error: ${response.code}`);
    }
  };

  const handleNewRoom = async () => {
    setLoading('new');
    const response = await newRoom(socket);
    if (response.status === 'ok') {
      toast.success(`Created room with ID ${response.id}`);
      setRoom(response.id);
      setJoin(true);
    }
  };

  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Paper className={classes.card} variant="outlined">
        <Typography variant="h6" className={classes.title}>
          Ask
        </Typography>

        <TextField
          variant="filled"
          label="Room ID"
          size="small"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        ></TextField>
        <TextField variant="filled" label="Name" size="small" disabled></TextField>

        <Box className={classes.actions}>
          <Button variant="contained" color="primary" disableElevation disabled={!!loading} onClick={handleJoinRoom}>
            Join Room
          </Button>
          <Button variant="outlined" color="primary" disableElevation disabled={!!loading} onClick={handleNewRoom}>
            New Room
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Room;
