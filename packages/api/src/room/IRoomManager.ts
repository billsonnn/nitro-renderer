import { IRoomInstance } from './IRoomInstance';
import { IRoomManagerListener } from './IRoomManagerListener';
import { IRoomObject } from './object';

export interface IRoomManager
{
    init(listener: IRoomManagerListener): Promise<void>;
    getRoomInstance(roomId: string): IRoomInstance;
    createRoomInstance(roomId: string): IRoomInstance;
    removeRoomInstance(roomId: string): boolean;
    addUpdateCategory(category: number): void;
    removeUpdateCategory(category: number): void;
    createRoomObjectAndInitalize(roomId: string, objectId: number, type: string, category: number): IRoomObject;
    update(time: number, update?: boolean): void;
    rooms: Map<string, IRoomInstance>;
}
