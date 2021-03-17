import { IRoomObject } from '../object/IRoomObject';

export interface IRoomSpriteCanvasContainer
{
    getRoomObject(instanceId: number): IRoomObject;
    objects: Map<number, IRoomObject>;
    roomObjectVariableAccurateZ: string;
}