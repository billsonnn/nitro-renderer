import { RenderTexture } from '@pixi/core'
import { DisplayObject } from '@pixi/display'
import { Point, Rectangle } from '@pixi/math'
import {
  IGetImageListener,
  IImageResult,
  INitroManager,
  IObjectData,
  IPetColorResult,
  IPetCustomPart,
  IRoomContentLoader,
  IRoomGeometry,
  IRoomManager,
  IRoomMapData,
  IRoomObject,
  IRoomObjectController,
  IRoomObjectEventManager,
  IRoomObjectLogicFactory,
  IRoomObjectVisualizationFactory,
  IRoomRendererFactory,
  IRoomRenderingCanvas,
  IRoomSessionManager,
  ISessionDataManager,
  IVector3D
} from '@/api'

export interface IRoomEngine extends INitroManager {
  sessionDataManager: ISessionDataManager;
  roomSessionManager: IRoomSessionManager;
  roomManager: IRoomManager;
  objectEventHandler: IRoomObjectEventManager;
  roomRendererFactory: IRoomRendererFactory;
  visualizationFactory: IRoomObjectVisualizationFactory;
  logicFactory: IRoomObjectLogicFactory;
  roomContentLoader: IRoomContentLoader;
  activeRoomId: number;
  ready: boolean;
  disposed: boolean;
  selectedAvatarId: number;
  isDecorating: boolean;

  setActiveRoomId(roomId: number): void;

  onRoomEngineInitalized(flag: boolean): void;

  disableUpdate(flag: boolean): void;

  runUpdate(): void;

  createRoomInstance(roomId: number, roomMap: IRoomMapData): void;

  getRoomInstanceDisplay(roomId: number, id: number, width: number, height: number, scale: number): DisplayObject;

  setRoomInstanceRenderingCanvasScale(roomId: number, canvasId: number, scale: number, point?: Point, offsetPoint?: Point, override?: boolean, asDelta?: boolean): void;

  setRoomInstanceRenderingCanvasMask(roomId: number, canvasId: number, flag: boolean): void;

  getRoomInstanceRenderingCanvas(roomId: number, canvasId?: number): IRoomRenderingCanvas;

  getRoomInstanceRenderingCanvasOffset(roomId: number, canvasId?: number): Point;

  setRoomInstanceRenderingCanvasOffset(roomId: number, canvasId: number, point: Point): boolean;

  getRoomInstanceRenderingCanvasScale(roomId?: number, canvasId?: number): number;

  initializeRoomInstanceRenderingCanvas(roomId: number, canvasId: number, width: number, height: number): void;

  updateRoomInstancePlaneVisibility(roomId: number, wallVisible: boolean, floorVisible?: boolean): boolean;

  updateRoomInstancePlaneThickness(roomId: number, wallThickness: number, floorThickness: number): boolean;

  updateRoomInstancePlaneType(roomId: number, floorType?: string, wallType?: string, landscapeType?: string, _arg_5?: boolean): boolean;

  updateObjectRoomColor(k: number, _arg_2: number, _arg_3: number, _arg_4: boolean): boolean;

  getRoomInstanceGeometry(roomId: number, canvasId?: number): IRoomGeometry;

  getRoomInstanceVariable<T>(roomId: number, key: string): T;

  getTotalObjectsForManager(roomId: number, category: number): number;

  getRoomObject(roomId: number, objectId: number, category: number): IRoomObjectController;

  getRoomObjectByIndex(roomId: number, index: number, category: number): IRoomObjectController;

  removeRoomObjectFloor(roomId: number, objectId: number, userId?: number, _arg_4?: boolean): void;

  removeRoomObjectWall(roomId: number, objectId: number, userId?: number): void;

  removeRoomObjectUser(roomId: number, objectId: number): void;

  getRoomObjects(roomId: number, category: number): IRoomObject[];

  getRoomObjectCount(roomId: number, categoryId: number): number;

  getRoomObjectBoundingRectangle(roomId: number, objectId: number, category: number, canvasId: number): Rectangle;

  getRoomObjectScreenLocation(roomId: number, objectId: number, objectType: number, canvasId?: number): Point;

  getGenericRoomObjectImage(type: string, value: string, direction: IVector3D, scale: number, listener: IGetImageListener, bgColor?: number, extras?: string, objectData?: IObjectData, state?: number, frameCount?: number, posture?: string, originalId?: number): IImageResult;

  getFurnitureFloorIconUrl(typeId: number): string;

  getFurnitureFloorIcon(typeId: number, listener: IGetImageListener, extras?: string, objectData?: IObjectData): IImageResult;

  getFurnitureWallIconUrl(typeId: number, extra?: string): string;

  getFurnitureWallIcon(typeId: number, listener: IGetImageListener, extras?: string): IImageResult;

  updateRoomObjectWallLocation(roomId: number, objectId: number, location: IVector3D): boolean;

  addRoomObjectUser(roomId: number, objectId: number, location: IVector3D, direction: IVector3D, headDirection: number, type: number, figure: string): boolean;

  updateRoomObjectUserLocation(roomId: number, objectId: number, location: IVector3D, targetLocation: IVector3D, canStandUp?: boolean, baseY?: number, direction?: IVector3D, headDirection?: number): boolean;

  addFurnitureFloor(roomId: number, id: number, typeId: number, location: IVector3D, direction: IVector3D, state: number, objectData: IObjectData, extra?: number, expires?: number, usagePolicy?: number, ownerId?: number, ownerName?: string, synchronized?: boolean, realRoomObject?: boolean, sizeZ?: number): boolean;

  addFurnitureFloorByTypeName(roomId: number, id: number, typeName: string, location: IVector3D, direction: IVector3D, state: number, objectData: IObjectData, extra?: number, expires?: number, usagePolicy?: number, ownerId?: number, ownerName?: string, synchronized?: boolean, realRoomObject?: boolean, sizeZ?: number): boolean;

  addFurnitureWall(roomId: number, id: number, typeId: number, location: IVector3D, direction: IVector3D, state: number, extra: string, expires?: number, usagePolicy?: number, ownerId?: number, ownerName?: string, realRoomObject?: boolean): boolean;

  initalizeTemporaryObjectsByType(type: string, _arg_2: boolean): void;

  updateRoomObjectFloor(roomId: number, objectId: number, location: IVector3D, direction: IVector3D, state: number, data: IObjectData, extra?: number): boolean;

  updateRoomObjectWall(roomId: number, objectId: number, location: IVector3D, direction: IVector3D, state: number, extra?: string): boolean;

  updateRoomObjectUserAction(roomId: number, objectId: number, action: string, value: number, parameter?: string): boolean;

  updateRoomObjectUserFigure(roomId: number, objectId: number, figure: string, gender?: string, subType?: string, isRiding?: boolean): boolean;

  updateRoomObjectUserEffect(roomId: number, objectId: number, effectId: number, delay?: number): boolean;

  updateRoomObjectUserGesture(roomId: number, objectId: number, gestureId: number): boolean;

  updateRoomObjectUserPosture(roomId: number, objectId: number, type: string, parameter?: string): boolean;

  getFurnitureFloorImage(typeId: number, direction: IVector3D, scale: number, listener: IGetImageListener, bgColor?: number, extras?: string, state?: number, frameCount?: number, objectData?: IObjectData): IImageResult;

  getFurnitureWallImage(typeId: number, direction: IVector3D, scale: number, listener: IGetImageListener, bgColor?: number, extras?: string, state?: number, frameCount?: number): IImageResult;

  getRoomObjectImage(roomId: number, objectId: number, category: number, direction: IVector3D, scale: number, listener: IGetImageListener, bgColor?: number): IImageResult;

  getRoomObjectPetImage(typeId: number, paletteId: number, color: number, direction: IVector3D, scale: number, listener: IGetImageListener, headOnly?: boolean, bgColor?: number, customParts?: IPetCustomPart[], posture?: string): IImageResult;

  getFurnitureFloorName(typeId: number): string;

  getFurnitureWallName(typeId: number, extra?: string): string;

  selectRoomObject(roomId: number, objectId: number, objectCategory: number): void;

  setSelectedAvatar(roomId: number, objectId: number): void;

  cancelRoomObjectInsert(): void;

  getPetColorResult(petIndex: number, paletteIndex: number): IPetColorResult;

  getPetColorResultsForTag(petIndex: number, tagName: string): IPetColorResult[];

  cancelRoomObjectPlacement(): void;

  useRoomObject(objectId: number, category: number): boolean;

  objectInitialized(roomId: string, objectId: number, category: number): void;

  changeObjectModelData(roomId: number, objectId: number, category: number, numberKey: string, numberValue: number): boolean;

  changeObjectState(roomId: number, objectId: number, category: number): void;

  processRoomObjectOperation(objectId: number, category: number, operation: string): boolean;

  modifyRoomObjectDataWithMap(objectId: number, category: number, operation: string, data: Map<string, string>): boolean

  modifyRoomObjectData(objectId: number, category: number, colorHex: string, data: string): boolean

  processRoomObjectPlacement(placementSource: string, id: number, category: number, typeId: number, legacyString?: string, stuffData?: IObjectData, state?: number, frameNumber?: number, posture?: string): boolean;

  dispatchMouseEvent(canvasId: number, x: number, y: number, type: string, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, buttonDown: boolean): void;

  createTextureFromRoom(roomId: number, canvasId?: number, bounds?: Rectangle): RenderTexture;

  saveTextureAsScreenshot(texture: RenderTexture, saveAsThumbnail?: boolean): void;

  saveBase64AsScreenshot(base64: string, saveAsThumbnail?: boolean): void;

  deleteRoomObject(objectId: number, objectCategory: number): boolean;
}
