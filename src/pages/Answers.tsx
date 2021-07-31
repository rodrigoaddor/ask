import React, {useState, useEffect, useMemo} from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {useReady} from '../hooks/api';

interface AnswersProps {
  questions: string[];
}

const Answers: React.FC<AnswersProps> = ({questions}) => {
  const {setReady} = useReady();
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    if (answers.length === 0) {
      setAnswers(new Array(questions.length).fill(''));
    }
  }, [questions]);

  const createAnswerHandler
    = (index: number) =>
      ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
      };

  const handleSubmit = () => {
    setReady(true, answers);
  };

  const canSubmit = useMemo(() => answers.every(answer => answer.length), [answers]);

  return (
    <Box display="flex" flexDirection="column" gap="2rem">
      {questions.map((question, index) => (
        <TextField
          key={index}
          variant="outlined"
          label={question}
          value={answers[index]}
          onChange={createAnswerHandler(index)}
        />
      ))}
      <Button variant="contained" disabled={!canSubmit} onClick={handleSubmit}>
        Salvar
      </Button>
    </Box>
  );
};

export default Answers;
