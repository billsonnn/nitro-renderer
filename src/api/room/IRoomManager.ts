import { IEventDispatcher, INitroManager } from '../common';
import { IRoomContentLoader } from '../nitro';
import { IRoomInstance } from './IRoomInstance';
import { IRoomObject } from './object';

export interface IRoomManager extends INitroManager
{
    getRoomInstance(roomId: string): IRoomInstance;
    createRoomInstance(roomId: string): IRoomInstance;
    removeRoomInstance(roomId: string): boolean;
    addUpdateCategory(category: number): void;
    removeUpdateCategory(category: number): void;
    createRoomObjectAndInitalize(roomId: string, objectId: number, type: string, category: number): IRoomObject;
    setContentLoader(loader: IRoomContentLoader): void;
    update(time: number, update?: boolean): void;
    rooms: Map<string, IRoomInstance>;
    events: IEventDispatcher;
}
