import React from 'react';

import ReactLoading from 'react-loading';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { GameStage } from '../data/api';
import { useReady } from '../hooks/api';

interface WaitingProps {
  stage: GameStage;
  players: number;
  ready: number;
}

const Waiting: React.FC<WaitingProps> = ({ players, ready: readyPlayers }) => {
  const { ready, toggleReady } = useReady();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: '2fr 1fr 2fr',
        justifyItems: 'center',
        height: '100vh',
      }}
    >
      <Box sx={{ alignSelf: 'end', whiteSpace: 'break-spaces', textAlign: 'center' }}>
        <Typography variant='h4'>{`${readyPlayers} / ${players}`}</Typography>
        <Typography variant='h6'>players are ready.</Typography>
      </Box>
      <Box sx={{ alignSelf: 'center' }}>
        <ReactLoading type='bars' />
      </Box>
      <Box sx={{ alignSelf: 'start' }}>
        <Button
          color='primary'
          variant={ready ? 'outlined' : 'contained'}
          onClick={() => {
            toggleReady();
          }}
        >
          {ready ? 'Not Ready' : 'Ready'}
        </Button>
      </Box>
    </Box>
  );
};

export default Waiting;
