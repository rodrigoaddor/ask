import { useEffect } from 'react';

import { joinRoom, Status } from '../data/api';
import { useEvent, useSocket } from './socket';

const protocol = process.env.PROTOCOL;

export const useRoom = (room: string) => {
  const socket = useSocket();

  const [status] = useEvent<Status, Record<string, unknown>>({ event: 'status', initialData: {} });

  const { stage, players, ready, questions, answers } = status ?? { stage: 'connecting', players: 0, ready: 0 };

  useEffect(() => {
    joinRoom(socket, { room, protocol });

    setTimeout(() => {
      socket.emit('status');
    }, 5000);
  }, []);

  useEffect(() => {
    console.log(status);
  }, [status]);

  return { stage, players, ready, questions, answers, debug: status };
};
