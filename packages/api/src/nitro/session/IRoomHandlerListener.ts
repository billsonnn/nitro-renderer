import { IRoomSession } from './IRoomSession';

export interface IRoomHandlerListener
{
    getSession(id: number): IRoomSession;
    sessionUpdate(id: number, type: string): void;
    sessionReinitialize(fromRoomId: number, toRoomId: number): void;
}
