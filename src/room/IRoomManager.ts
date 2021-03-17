import { INitroManager } from '../core/common/INitroManager';
import { IEventDispatcher } from '../core/events/IEventDispatcher';
import { RoomContentLoader } from '../nitro/room/RoomContentLoader';
import { IRoomInstance } from './IRoomInstance';
import { IRoomObject } from './object/IRoomObject';

export interface IRoomManager extends INitroManager
{
    getRoomInstance(roomId: string): IRoomInstance;
    createRoomInstance(roomId: string): IRoomInstance;
    removeRoomInstance(roomId: string): boolean;
    addUpdateCategory(category: number): void;
    removeUpdateCategory(category: number): void;
    createRoomObjectAndInitalize(roomId: string, objectId: number, type: string, category: number): IRoomObject;
    setContentLoader(loader: RoomContentLoader): void;
    update(time: number, update?: boolean): void;
    rooms: Map<string, IRoomInstance>;
    events: IEventDispatcher;
}