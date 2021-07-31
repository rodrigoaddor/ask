import { useEffect, useState } from 'react';
import { useSocket } from './socket';

export const useReady = (): {
  ready: boolean;
  setReady: (isReady: boolean, data?: any) => void;
  toggleReady: () => void;
} => {
  const socket = useSocket();

  const [internalReady, setInternalReady] = useState(false);
  const [internalData, setInternalData] = useState<any>();

  const setReady = (isReady: boolean, data?: any) => {
    setInternalReady(isReady);
    setInternalData(data);
  };

  const toggleReady = () => {
    setReady(!internalReady);
  };

  useEffect(() => {
    socket.emit('ready', { ready: internalReady, data: internalData });
  }, [internalReady]);

  return { ready: internalReady, setReady, toggleReady };
};
