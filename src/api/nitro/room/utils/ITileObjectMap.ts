import { IRoomObject } from '../../../room';

export interface ITileObjectMap
{
    clear(): void;
    populate(k: IRoomObject[]): void;
    dispose(): void;
    getObjectIntTile(k: number, _arg_2: number): IRoomObject;
    setObjectInTile(k: number, _arg_2: number, _arg_3: IRoomObject): void;
    addRoomObject(k: IRoomObject): void;
}
