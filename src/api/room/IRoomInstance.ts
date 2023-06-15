import {
  IDisposable,
  IRoomInstanceContainer,
  IRoomObject,
  IRoomObjectManager,
  IRoomObjectModel,
  IRoomRendererBase
} from '@/api'

export interface IRoomInstance extends IDisposable {
  id: string;
  container: IRoomInstanceContainer;
  renderer: IRoomRendererBase;
  managers: Map<number, IRoomObjectManager>;
  model: IRoomObjectModel;

  setRenderer(renderer: IRoomRendererBase): void;

  getManager(category: number): IRoomObjectManager;

  getTotalObjectsForManager(category: number): number;

  getRoomObject(id: number, category: number): IRoomObject;

  getRoomObjectsForCategory(category: number): IRoomObject[];

  getRoomObjectByIndex(index: number, category: number): IRoomObject;

  createRoomObject(id: number, stateCount: number, type: string, category: number): IRoomObject;

  createRoomObjectAndInitalize(objectId: number, type: string, category: number): IRoomObject;

  removeRoomObject(id: number, category: number): void;

  removeAllManagers(): void;

  addUpdateCategory(category: number): void;

  removeUpdateCategory(category: number): void;

  update(time: number, update?: boolean): void;
}
