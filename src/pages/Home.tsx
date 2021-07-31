import React, {useState, useEffect} from 'react';

import toast from 'react-hot-toast';
import {useHistory} from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import {joinRoom, newRoom} from '../data/api';
import {useSocket} from '../hooks/socket';

const protocol = process.env.PROTOCOL;

const Room: React.FC = () => {
  const socket = useSocket();
  const [room, setRoom] = useState('');
  const [loading, setLoading] = useState<false | string>(false);
  const [join, setJoin] = useState(false);

  const history = useHistory();

  const handleJoinRoom = async () => {
    setLoading('join');
    const response = await joinRoom(socket, {room, protocol});
    if (response.status === 'ok') {
      history.push(`/${response.id}`);
    } else {
      console.warn(response);
      toast.error(`Error: ${response.code}`);
    }
  };
  
  useEffect(() => {
  if (join) {
    handleJoinRoom();
    }
  }, [join]);

  const handleNewRoom = async () => {
    setLoading('new');
    const response = await newRoom(socket);
    if (response.status === 'ok') {
      toast.success(`Created room with ID ${response.id}`);
      setRoom(response.id);
      setJoin(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',

          padding: theme => theme.spacing(2),
          minHeight: theme => theme.spacing(48),

          '& > *:not(:last-child)': {
            marginBottom: theme => theme.spacing(2),
          },
        }}
      >
        <Typography variant="h6" sx={{flexGrow: 1}}>
          Ask
        </Typography>

        <TextField
          variant="filled"
          label="Room ID"
          size="small"
          value={room}
          onChange={e => {
            setRoom(e.target.value);
          }}
         />
        <TextField variant="filled" label="Name" size="small" disabled />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'stretch',
            flexGrow: 1,
            '& > *:not(:last-child)': {
              marginBottom: theme => theme.spacing(1),
            },
          }}
        >
          <Button variant="contained" color="primary" disableElevation disabled={Boolean(loading)} onClick={handleJoinRoom}>
            Join Room
          </Button>
          <Button variant="outlined" color="primary" disableElevation disabled={Boolean(loading)} onClick={handleNewRoom}>
            New Room
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Room;
