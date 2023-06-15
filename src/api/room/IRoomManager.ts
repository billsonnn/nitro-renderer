import { IEventDispatcher, INitroManager, IRoomContentLoader, IRoomInstance, IRoomObject } from '@/api'

export interface IRoomManager extends INitroManager {
  rooms: Map<string, IRoomInstance>;
  events: IEventDispatcher;

  getRoomInstance(roomId: string): IRoomInstance;

  createRoomInstance(roomId: string): IRoomInstance;

  removeRoomInstance(roomId: string): boolean;

  addUpdateCategory(category: number): void;

  removeUpdateCategory(category: number): void;

  createRoomObjectAndInitalize(roomId: string, objectId: number, type: string, category: number): IRoomObject;

  setContentLoader(loader: IRoomContentLoader): void;

  update(time: number, update?: boolean): void;
}
