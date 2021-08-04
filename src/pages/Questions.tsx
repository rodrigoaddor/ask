import React, { useState, useMemo } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Area from '../components/Area';
import { useReady } from '../hooks/api';

const Questions: React.FC = () => {
  const { setReady, ready } = useReady();
  const [question, setQuestion] = useState('');

  const handleSubmitQuestion = () => {
    setReady(true, question);
  };

  const hasQuestion = useMemo(() => question.length > 0, [question.length > 0]);

  return (
    <Area
      title='Questions'
      loading={ready}
      content={
        <Box display='flex' flexDirection='column'>
          <TextField
            variant='filled'
            label='Question'
            focused={hasQuestion || undefined}
            value={question}
            onChange={({ target: { value } }) => {
              setQuestion(value);
            }}
            onKeyPress={({ key }) => {
              if (key === 'Enter') handleSubmitQuestion();
            }}
          />
          <Button
            variant={hasQuestion ? 'contained' : 'outlined'}
            color='primary'
            disableElevation
            disabled={!hasQuestion}
            onClick={handleSubmitQuestion}
            sx={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          >
            Send Question
          </Button>
        </Box>
      }
    />
  );
};

export default Questions;
