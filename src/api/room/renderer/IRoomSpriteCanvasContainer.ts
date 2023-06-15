import { IRoomObject } from '@/api'

export interface IRoomSpriteCanvasContainer {
  objects: Map<number, IRoomObject>;
  roomObjectVariableAccurateZ: string;

  getRoomObject(instanceId: number): IRoomObject;
}
