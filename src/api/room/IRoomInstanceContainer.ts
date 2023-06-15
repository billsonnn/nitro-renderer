import { IRoomObject, IRoomObjectManager } from '@/api'

export interface IRoomInstanceContainer {
  createRoomObjectAndInitalize(roomId: string, objectId: number, type: string, category: number): IRoomObject;

  createRoomObjectManager(category: number): IRoomObjectManager;
}
