import React, { useState, useEffect, useMemo } from 'react';

import toast from 'react-hot-toast';
import { useHistory } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Area from '../components/Area';
import { joinRoom, newRoom } from '../data/api';
import { useSocket } from '../hooks/socket';

const protocol = process.env.PROTOCOL;

const Room: React.FC = () => {
  const socket = useSocket();
  const [room, setRoom] = useState('');
  const [loading, setLoading] = useState<false | string>(false);
  const [join, setJoin] = useState(false);

  const history = useHistory();

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

  const hasRoom = useMemo(() => room.length > 0, [room.length > 0]);

  return (
    <Area
      title='Ask'
      content={
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
            flex: '1 1 0',
            width: '100%',
            maxWidth: '20rem',
            px: '2rem',
          }}
        >
          <TextField
            variant='filled'
            label='Room ID'
            size='small'
            value={room}
            focused={hasRoom || undefined}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <Button
            variant={hasRoom ? 'contained' : 'outlined'}
            color='primary'
            disableElevation
            disabled={!!loading || !hasRoom}
            onClick={handleNewRoom}
            sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          >
            Join Room
          </Button>
        </Box>
      }
      actions={
        <Button variant='outlined' color='primary' disableElevation disabled={!!loading} onClick={handleNewRoom}>
          New Room
        </Button>
      }
    />

    /* <Area>
        <Typography variant="h6">
            Ask
          </Typography>
        <AreaHeader title='Ask' />

        <AreaContent>
          <TextField
            variant='filled'
            label='Room ID'
            size='small'
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
        </AreaContent>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'stretch',
            flexGrow: 1,
            '& > *:not(:last-child)': {
              marginBottom: (theme) => theme.spacing(1),
            },
          }}
        >

        <AreaActions>
          <Button variant='contained' color='primary' disableElevation disabled={!!loading} onClick={handleJoinRoom}>
            Join Room
          </Button>
          <Button variant='outlined' color='primary' disableElevation disabled={!!loading} onClick={handleNewRoom}>
            New Room
          </Button>
        </AreaActions>
      </Area> */
  );
};

export default Room;
