import { IRoomObject } from '../object';

export interface IRoomSpriteCanvasContainer
{
    getRoomObject(instanceId: number): IRoomObject;
    objects: Map<number, IRoomObject>;
    roomObjectVariableAccurateZ: string;
}
