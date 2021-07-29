import React from 'react';
import { useEffect } from 'react';
import { Prompt, useRouteMatch } from 'react-router';

const KeepInApp: React.FC = () => {
  const isPlaying = !useRouteMatch('/');

  useEffect(() => {
    console.log('isPlaying', isPlaying);
  }, [isPlaying]);

  return <Prompt when={isPlaying} message="Are you sure you want to exit the game?" />;
};

export default KeepInApp;
