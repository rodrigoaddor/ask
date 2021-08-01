import React, { useEffect } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useReady } from '../hooks/api';

interface ResultsProps {
  answers: [string, string[]];
}

const Results: React.FC<ResultsProps> = ({ answers: [question, answers] }) => {
  const { ready, setReady, toggleReady } = useReady();

  useEffect(() => {
    setReady(false);
  }, [question]);

  return (
    <Box>
      <Typography variant='h4'>{question}</Typography>
      <Box display='flex' flexWrap='wrap'>
        {answers.map((answer, index) => (
          <TextField
            variant='outlined'
            key={index}
            value={answer}
            InputProps={{ readOnly: true }}
            style={{ pointerEvents: 'none' }}
          />
        ))}
      </Box>
      <Button disabled={ready} onClick={toggleReady}>
        Next
      </Button>
    </Box>
  );
};

export default Results;
