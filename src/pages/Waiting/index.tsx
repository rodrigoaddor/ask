import React, { useState, useMemo, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import ReactLoading from 'react-loading';

import { useStyles } from './style';
import { GameStage } from '../../data/api';
import { useReady } from '../../hooks/api';

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

  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box />
      <ReactLoading type="bars" />
      <Box whiteSpace="break-spaces" textAlign="center">
        {message}
        <Box height="2rem" />
        <Button color="primary" variant={ready ? 'outlined' : 'contained'} onClick={() => toggleReady()}>
          {ready ? 'Not Ready' : 'Ready'}
        </Button>
      </Box>
    </Box>
  );
};

export default Waiting;
