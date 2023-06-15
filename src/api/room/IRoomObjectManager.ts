import { IAdvancedMap, IRoomObjectController } from '@/api'

export interface IRoomObjectManager {
  objects: IAdvancedMap<number, IRoomObjectController>;
  totalObjects: number;

  dispose(): void;

  getObject(id: number): IRoomObjectController;

  getObjectByIndex(index: number): IRoomObjectController;

  createObject(id: number, stateCount: number, type: string): IRoomObjectController;

  removeObject(id: number): void;

  removeAllObjects(): void;
}
