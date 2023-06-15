import { IEventDispatcher, IRoomSession } from '@/api'

export interface IRoomHandlerListener {
  events: IEventDispatcher;

  getSession(id: number): IRoomSession;

  sessionUpdate(id: number, type: string): void;

  sessionReinitialize(fromRoomId: number, toRoomId: number): void;
}
