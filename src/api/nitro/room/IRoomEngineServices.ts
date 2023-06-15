import {
  IConnection,
  IEventDispatcher,
  IFurnitureStackingHeightMap,
  ILegacyWallGeometry,
  IObjectData,
  IRoomInstance,
  IRoomObjectController,
  IRoomRenderingCanvas,
  IRoomSessionManager,
  ISelectedRoomObjectData,
  ISessionDataManager,
  ITileObjectMap,
  IVector3D
} from '@/api'

export interface IRoomEngineServices {
  connection: IConnection;
  sessionDataManager: ISessionDataManager;
  roomSessionManager: IRoomSessionManager;
  activeRoomId: number;
  events: IEventDispatcher;
  isDecorating: boolean;

  getRoomInstance(roomId: number): IRoomInstance;

  getActiveRoomInstanceRenderingCanvas(): IRoomRenderingCanvas;

  addRoomInstanceFloorHole(roomId: number, objectId: number): void;

  removeRoomInstanceFloorHole(roomId: number, objectId: number): void;

  getSelectedRoomObjectData(roomId: number): ISelectedRoomObjectData;

  setSelectedRoomObjectData(roomId: number, data: ISelectedRoomObjectData): void;

  getPlacedRoomObjectData(roomId: number): ISelectedRoomObjectData;

  setPlacedRoomObjectData(roomId: number, data: ISelectedRoomObjectData): void;

  getLegacyWallGeometry(roomId: number): ILegacyWallGeometry;

  getFurnitureStackingHeightMap(roomId: number): IFurnitureStackingHeightMap;

  getRoomObject(roomId: number, objectId: number, category: number): IRoomObjectController;

  getRoomObjectByIndex(roomId: number, index: number, category: number): IRoomObjectController;

  getRoomObjectCategoryForType(type: string): number;

  getRoomObjectCursor(roomId: number): IRoomObjectController;

  getRoomObjectSelectionArrow(roomId: number): IRoomObjectController;

  addRoomObjectUser(roomId: number, objectId: number, location: IVector3D, direction: IVector3D, headDirection: number, type: number, figure: string): boolean;

  addFurnitureFloor(roomId: number, id: number, typeId: number, location: IVector3D, direction: IVector3D, state: number, objectData: IObjectData, extra?: number, expires?: number, usagePolicy?: number, ownerId?: number, ownerName?: string, synchronized?: boolean, realRoomObject?: boolean, sizeZ?: number): boolean;

  addFurnitureFloorByTypeName(roomId: number, id: number, typeName: string, location: IVector3D, direction: IVector3D, state: number, objectData: IObjectData, extra?: number, expires?: number, usagePolicy?: number, ownerId?: number, ownerName?: string, synchronized?: boolean, realRoomObject?: boolean, sizeZ?: number): boolean;

  addFurnitureWall(roomId: number, id: number, typeId: number, location: IVector3D, direction: IVector3D, state: number, extra: string, expires?: number, usagePolicy?: number, ownerId?: number, ownerName?: string, realRoomObject?: boolean): boolean;

  removeRoomObjectFloor(roomId: number, objectId: number, userId?: number, _arg_4?: boolean): void;

  removeRoomObjectWall(roomId: number, objectId: number, userId?: number): void;

  removeRoomObjectUser(roomId: number, objectId: number): void;

  loadRoomObjectBadgeImage(roomId: number, objectId: number, objectCategory: number, badgeId: string, groupBadge?: boolean): void;

  updateRoomObjectMask(roomId: number, objectId: number, _arg_?: boolean): void;

  setObjectMoverIconSprite(objectId: number, category: number, _arg_3: boolean, instanceData?: string, stuffData?: IObjectData, state?: number, frameNumber?: number, posture?: string): void;

  setObjectMoverIconSpriteVisible(k: boolean): void;

  updateMousePointer(type: string, objectId: number, objectType: string): void;

  removeObjectMoverIconSprite(): void;

  getRoomTileObjectMap(k: number): ITileObjectMap;

  isPlayingGame(): boolean;
}
