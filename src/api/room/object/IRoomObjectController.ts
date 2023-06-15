import {
  IRoomObject,
  IRoomObjectEventHandler,
  IRoomObjectGraphicVisualization,
  IRoomObjectUpdateMessage,
  IVector3D
} from '@/api'

export interface IRoomObjectController extends IRoomObject {
  isReady: boolean;
  logic: IRoomObjectEventHandler;

  setLocation(vector: IVector3D): void;

  setDirection(vector: IVector3D): void;

  setState(state: number, index?: number): boolean;

  setVisualization(visualization: IRoomObjectGraphicVisualization): void;

  setLogic(logic: IRoomObjectEventHandler): void;

  processUpdateMessage(message: IRoomObjectUpdateMessage): void;

  tearDown(): void;
}
