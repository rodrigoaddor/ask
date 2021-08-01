import React, { useState } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { useReady } from '../hooks/api';

const Questions: React.FC = () => {
  const { setReady } = useReady();
  const [question, setQuestion] = useState('');

  const handleSubmitQuestion = () => {
    setReady(true, question);
  };

  return (
    <Box display='flex' flexDirection='column'>
      <TextField
        variant='filled'
        label='Question'
        value={question}
        onChange={({ target: { value } }) => {
          setQuestion(value);
        }}
        onKeyPress={({ key }) => {
          if (key === 'enter') handleSubmitQuestion();
        }}
      />
      <Button onClick={handleSubmitQuestion}>Submit</Button>
    </Box>
  );
};

export default Questions;
