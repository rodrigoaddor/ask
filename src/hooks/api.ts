import { useCallback, useEffect, useState } from 'react';
import { useSocket } from './socket';

export const useReady = (): {
  ready: boolean;
  setReady: (isReady: boolean, data?: any) => void;
  toggleReady: () => void;
} => {
  const socket = useSocket();

  const [ready, _setReady] = useState(false);
  const [data, setData] = useState<any>();

  const setReady = (isReady: boolean, data?: any) => {
    _setReady(isReady);
    setData(data);
  };

  const toggleReady = () => {
    setReady(!ready);
  };

  useEffect(() => {
    socket.emit('ready', { ready, data });
  }, [ready]);

  return { ready, setReady, toggleReady };
};
