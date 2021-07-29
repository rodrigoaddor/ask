import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Waiting from '../Waiting';
import Questions from '../Questions';

import { useRoom } from '../../hooks/room';
import Answers from '../Answers';
import Results from '../Results';

const Room: React.FC = () => {
  const { room: id } = useParams<{ room: string }>();
  const { stage, players, ready, questions, answers, debug } = useRoom(id);

  useEffect(() => {
    console.log(stage);
  }, [stage]);

  const content = useMemo(() => {
    switch (stage) {
      case 'connecting':
      case 'waiting':
        return <Waiting stage={stage} players={players} ready={ready} />;
      case 'question':
        return <Questions />;
      case 'answer':
        return <Answers questions={questions ?? []} />;
      case 'result':
        if (answers?.length) {
          return <Results answers={answers} />;
        }
      default:
        return null;
    }
  }, [stage, players, ready]);

  return content;
};

export default Room;
