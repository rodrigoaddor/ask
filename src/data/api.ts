import { useEvent } from '../hooks/socket';
import { emitBuilder } from '../utils/emit';

const protocol = process.env.PROTOCOL;

type OkResponse<T extends Record<string, any> = {}> = { status: 'ok' } & T;
type ErrorResponse = { status: 'error'; code: string };
type Response<T> = OkResponse<T> | ErrorResponse;

type IdResponse = Response<{ id: string }>;
type NewRoomParams = { protocol: string };
type JoinRoomParams = { room: string } & NewRoomParams;
export const getCurrentRoom = emitBuilder<IdResponse>('room');
export const newRoom = emitBuilder<IdResponse, NewRoomParams>('new', { protocol });
export const joinRoom = emitBuilder<IdResponse, JoinRoomParams>('join');
export const leaveRoom = emitBuilder<OkResponse>('leave');

export type GameStage = 'connecting' | 'waiting' | 'question' | 'answer' | 'result';

export interface Status {
  players: number;
  stage: GameStage;
  ready: number;
  questions?: string[];
  answers?: [string, string[]];
}
