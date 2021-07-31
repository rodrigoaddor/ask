import {emitBuilder} from '../utils/emit';

const protocol = process.env.PROTOCOL;

type OkResponse<T extends Record<string, any> = Record<string, unknown>> = {status: 'ok'} & T;
type ErrorResponse = {status: 'error'; code: string};
type Response<T> = OkResponse<T> | ErrorResponse;

type IdResponse = Response<{id: string}>;
type NewRoomParameters = {protocol: string};
type JoinRoomParameters = {room: string} & NewRoomParameters;
export const getCurrentRoom = emitBuilder<IdResponse>('room');
export const newRoom = emitBuilder<IdResponse, NewRoomParameters>('new', {protocol});
export const joinRoom = emitBuilder<IdResponse, JoinRoomParameters>('join');
export const leaveRoom = emitBuilder<OkResponse>('leave');

export type GameStage = 'connecting' | 'waiting' | 'question' | 'answer' | 'result';

export interface Status {
  players: number;
  stage: GameStage;
  ready: number;
  questions?: string[];
  answers?: [string, string[]];
}
