import { IRoomObjectManager } from './IRoomObjectManager';
import { IRoomObject } from './object/IRoomObject';

export interface IRoomInstanceContainer
{
    createRoomObjectAndInitalize(roomId: string, objectId: number, type: string, category: number): IRoomObject;
    createRoomObjectManager(category: number): IRoomObjectManager;
}