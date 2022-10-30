export interface IRoomManagerListener
{
    onRoomEngineInitalized(flag: boolean): void;
    objectInitialized(roomId: string, objectId: number, category: number): void;
    initalizeTemporaryObjectsByType(type: string, _arg_2: boolean): void;
}