import React, { useMemo } from 'react';

import ReactLoading from 'react-loading';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { GameStage } from '../data/api';
import { useReady } from '../hooks/api';

interface WaitingProps {
  stage: GameStage;
  players: number;
  ready: number;
}

const Waiting: React.FC<WaitingProps> = ({ stage, players, ready: readyPlayers }) => {
  const { ready, toggleReady } = useReady();

  const message = useMemo(() => {
    switch (stage) {
      case 'waiting':
        return `Waiting...\n${readyPlayers}/${players} players ready.`;
      default:
        return '';
    }
  }, [stage, players, readyPlayers]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: '1fr 0.5fr 1fr',
        justifyItems: 'center',
        height: '100%',
      }}
    >
      <Box />
      <Box sx={{ alignSelf: 'center' }}>
        <ReactLoading type='bars' />
      </Box>
      <Box whiteSpace='break-spaces' textAlign='center'>
        {message}
        <Box height='2rem' />
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
