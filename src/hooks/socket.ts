import { createContext, useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export const SocketContext = createContext<Socket>(null as unknown as Socket);

export const useSocket = () => {
  const socket = useContext(SocketContext);

  if (socket === null) {
    throw new Error('Missing socket in SocketContext.Provider');
  }

  return socket;
};

type EventEmitter<T> = (data?: T) => void;

export const useEvent = <T, U>({
  event,
  initialData,
}: {
  event: string;
  initialData?: U;
}): [T | undefined, EventEmitter<U>] => {
  const socket = useContext(SocketContext);
  const [data, setData] = useState<T>();

  const emit: EventEmitter<U> = (data?: U) => {
    return socket.emit(event, data);
  };

  useEffect(() => {
    const listener = (newData: T) => setData(newData);

    socket.on(event, listener);

    if (initialData) {
      emit(initialData);
    }

    return () => {
      socket.off('event', listener);
    };
  }, []);

  return [data, emit];
};
