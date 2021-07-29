import toast from 'react-hot-toast';

type Emit = (ev: string, ...args: any) => void;
type WithEmit = { emit: Emit };

export const emitBuilder =
  <Response extends Record<string, any>, Data extends Record<string, any> | null = null>(
    event: string,
    defaultData?: Data
  ) =>
  (withEmit: WithEmit, data?: Data) =>
    Promise.race<Response>([
      new Promise<Response>((res) => {
        withEmit.emit(event, data ?? defaultData ?? {}, (response: Response) => {
          if (response.status === 'error') {
            toast.error(`API Error: ${response.code}`);
          }
          res(response);
        });
      }),
      new Promise<never>((_, rej) => {
        setTimeout(() => rej(`Request timed out for event '${event}'`), 1000);
      }),
    ]);
