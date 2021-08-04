import React, { useState, useEffect, useMemo, useCallback } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Area from '../components/Area';
import { useReady } from '../hooks/api';

interface AnswersProps {
  questions: string[];
}

const Answers: React.FC<AnswersProps> = ({ questions }) => {
  const { setReady, ready } = useReady();
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    if (answers.length === 0) {
      setAnswers(new Array(questions.length).fill(''));
      setCurrentQuestion(0);
    }
  }, [questions, answers]);

  const createAnswerHandler =
    (index: number) =>
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      const newAnswers = [...answers];
      newAnswers[index] = value;
      setAnswers(newAnswers);
    };

  const handleSubmit = () => {
    setReady(true, answers);
  };

  const canSubmit = useMemo(() => answers.every((answer) => answer.length), [answers]);

  const handlePreviousQuestion = useCallback(() => {
    setCurrentQuestion((prevState) => (prevState > 0 ? prevState - 1 : 0));
  }, [currentQuestion]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevState) => prevState + 1);
    } else if (canSubmit) {
      handleSubmit();
    }
  }, [currentQuestion, questions.length, canSubmit]);

  return (
    <Area
      title={`Question ${currentQuestion + 1} of ${questions.length}`}
      loading={ready}
      content={
        <Box
          display='grid'
          gridTemplateRows='1fr 2fr 1fr'
          justifyContent='stretch'
          alignItems='center'
          alignSelf='stretch'
          flex='1'
          mx='auto'
          sx={{ width: '100%', maxWidth: '20rem', px: '2rem' }}
        >
          <Typography variant='h5' align='center'>
            {questions[currentQuestion]}
          </Typography>
          <TextField
            variant='outlined'
            label='Answer'
            value={answers[currentQuestion] ?? ''}
            onChange={createAnswerHandler(currentQuestion)}
            onKeyPress={({ key }) => {
              if (key === 'Enter' && answers[currentQuestion].length > 0) handleNextQuestion();
            }}
          />
        </Box>
      }
      actions={
        <Box sx={{ width: '100%', maxWidth: '20rem', px: '2rem' }}>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            disabled={currentQuestion >= questions.length - 1 && !canSubmit}
            onClick={handleNextQuestion}
            sx={{ width: '100%', marginBottom: '.5rem' }}
          >
            {currentQuestion !== questions.length - 1 ? 'Next Question' : 'Submit Answers'}
          </Button>
          <Button
            variant='outlined'
            color='primary'
            disableElevation
            disabled={currentQuestion <= 0}
            onClick={handlePreviousQuestion}
            sx={{ width: '100%' }}
          >
            Previous Question
          </Button>
        </Box>
      }
    />
  );
};

export default Answers;
