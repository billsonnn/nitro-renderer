import { IDisposable, IRoomObjectModel, IRoomObjectMouseHandler, IRoomObjectVisualization, IVector3D } from '@/api'

export interface IRoomObject extends IDisposable {
  id: number;
  instanceId: number;
  type: string;
  model: IRoomObjectModel;
  visualization: IRoomObjectVisualization;
  mouseHandler: IRoomObjectMouseHandler;
  location: IVector3D;
  direction: IVector3D;
  updateCounter: number;
  isReady: boolean;

  getLocation(): IVector3D;

  getDirection(): IVector3D;

  getState(index?: number): number;
}
