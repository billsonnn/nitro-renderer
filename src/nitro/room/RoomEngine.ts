import { RenderTexture, Resource, Texture } from '@pixi/core';
import { Container, DisplayObject } from '@pixi/display';
import { Matrix, Point, Rectangle } from '@pixi/math';
import { IConnection, IDisposable, IFurnitureStackingHeightMap, IGetImageListener, IImageResult, ILegacyWallGeometry, IMessageComposer, INitroCommunicationManager, INitroEvent, IObjectData, IPetColorResult, IPetCustomPart, IRoomContentListener, IRoomContentLoader, IRoomCreator, IRoomEngine, IRoomEngineServices, IRoomGeometry, IRoomInstance, IRoomManager, IRoomManagerListener, IRoomObject, IRoomObjectController, IRoomObjectLogicFactory, IRoomObjectVisualizationFactory, IRoomRenderer, IRoomRendererFactory, IRoomRenderingCanvas, IRoomSessionManager, ISelectedRoomObjectData, ISessionDataManager, ITileObjectMap, IUpdateReceiver, IVector3D, LegacyDataType, MouseEventType, NitroConfiguration, NitroLogger, ObjectDataFactory, RoomControllerLevel, RoomObjectCategory, RoomObjectUserType, RoomObjectVariable, ToolbarIconEnum, Vector3d } from '../../api';
import { NitroManager } from '../../core';
import { BadgeImageReadyEvent, NitroToolbarAnimateIconEvent, RoomBackgroundColorEvent, RoomDragEvent, RoomEngineEvent, RoomEngineObjectEvent, RoomObjectEvent, RoomObjectFurnitureActionEvent, RoomObjectMouseEvent, RoomSessionEvent, RoomToObjectOwnAvatarMoveEvent } from '../../events';
import { GetTicker, GetTickerTime, NitroSprite, TextureUtils } from '../../pixi-proxy';
import { NumberBank, RoomEnterEffect, RoomGeometry, RoomInstance, RoomObjectUpdateMessage, RoomRendererFactory } from '../../room';
import { PetFigureData } from '../avatar';
import { RenderRoomMessageComposer, RenderRoomThumbnailMessageComposer } from '../communication';
import { FurniId } from '../utils';
import { ImageResult } from './ImageResult';
import { ObjectAvatarCarryObjectUpdateMessage, ObjectAvatarChatUpdateMessage, ObjectAvatarDanceUpdateMessage, ObjectAvatarEffectUpdateMessage, ObjectAvatarExperienceUpdateMessage, ObjectAvatarExpressionUpdateMessage, ObjectAvatarFigureUpdateMessage, ObjectAvatarFlatControlUpdateMessage, ObjectAvatarGestureUpdateMessage, ObjectAvatarGuideStatusUpdateMessage, ObjectAvatarMutedUpdateMessage, ObjectAvatarOwnMessage, ObjectAvatarPetGestureUpdateMessage, ObjectAvatarPlayerValueUpdateMessage, ObjectAvatarPlayingGameUpdateMessage, ObjectAvatarPostureUpdateMessage, ObjectAvatarSignUpdateMessage, ObjectAvatarSleepUpdateMessage, ObjectAvatarTypingUpdateMessage, ObjectAvatarUpdateMessage, ObjectAvatarUseObjectUpdateMessage, ObjectDataUpdateMessage, ObjectGroupBadgeUpdateMessage, ObjectHeightUpdateMessage, ObjectItemDataUpdateMessage, ObjectModelDataUpdateMessage, ObjectMoveUpdateMessage, ObjectRoomColorUpdateMessage, ObjectRoomFloorHoleUpdateMessage, ObjectRoomMaskUpdateMessage, ObjectRoomPlanePropertyUpdateMessage, ObjectRoomPlaneVisibilityUpdateMessage, ObjectRoomUpdateMessage, ObjectStateUpdateMessage } from './messages';
import { RoomLogic, RoomMapData, RoomObjectVisualizationFactory } from './object';
import { RoomContentLoader } from './RoomContentLoader';
import { RoomMessageHandler } from './RoomMessageHandler';
import { RoomObjectEventHandler } from './RoomObjectEventHandler';
import { RoomObjectLogicFactory } from './RoomObjectLogicFactory';
import { RoomVariableEnum } from './RoomVariableEnum';
import { RoomCamera, RoomData, RoomFurnitureData, RoomInstanceData, RoomObjectBadgeImageAssetListener, SpriteDataCollector } from './utils';

export class RoomEngine extends NitroManager implements IRoomEngine, IRoomCreator, IRoomEngineServices, IRoomManagerListener, IRoomContentListener, IUpdateReceiver, IDisposable
{
    public static ROOM_OBJECT_ID: number = -1;
    public static ROOM_OBJECT_TYPE: string = 'room';

    public static CURSOR_OBJECT_ID: number = -2;
    public static CURSOR_OBJECT_TYPE: string = 'tile_cursor';

    public static ARROW_OBJECT_ID: number = -3;
    public static ARROW_OBJECT_TYPE: string = 'selection_arrow';

    public static OVERLAY: string = 'overlay';
    public static OBJECT_ICON_SPRITE: string = 'object_icon_sprite';

    private static DRAG_THRESHOLD: number = 15;
    private static TEMPORARY_ROOM: string = 'temporary_room';

    private _communication: INitroCommunicationManager;
    private _roomRendererFactory: IRoomRendererFactory;
    private _roomManager: IRoomManager;
    private _visualizationFactory: IRoomObjectVisualizationFactory;
    private _sessionDataManager: ISessionDataManager;
    private _roomSessionManager: IRoomSessionManager;
    private _roomObjectEventHandler: RoomObjectEventHandler;
    private _roomMessageHandler: RoomMessageHandler;
    private _roomContentLoader: IRoomContentLoader;
    private _ready: boolean;
    private _roomContentLoaderReady: boolean;
    private _imageObjectIdBank: NumberBank;
    private _imageCallbacks: Map<string, IGetImageListener[]>;
    private _thumbnailObjectIdBank: NumberBank;
    private _thumbnailCallbacks: Map<string, IGetImageListener[]>;
    private _activeRoomId: number;
    private _activeRoomActiveCanvas: number;
    private _activeRoomActiveCanvasMouseX: number;
    private _activeRoomActiveCanvasMouseY: number;
    private _activeRoomIsDragged: boolean;
    private _activeRoomWasDragged: boolean;
    private _activeRoomDragStartX: number;
    private _activeRoomDragStartY: number;
    private _activeRoomDragX: number;
    private _activeRoomDragY: number;
    private _roomDraggingAlwaysCenters: boolean;
    private _roomAllowsDragging: boolean;
    private _roomDatas: Map<number, RoomData>;
    private _roomInstanceDatas: Map<number, RoomInstanceData>;
    private _skipFurnitureCreationForNextFrame: boolean;
    private _mouseCursorUpdate: boolean;
    private _badgeListenerObjects: Map<string, RoomObjectBadgeImageAssetListener[]>;
    private _logicFactory: IRoomObjectLogicFactory;

    constructor(communication: INitroCommunicationManager)
    {
        super();

        this._communication = communication;
        this._sessionDataManager = null;
        this._roomSessionManager = null;
        this._roomManager = null;
        this._roomObjectEventHandler = new RoomObjectEventHandler(this);
        this._roomMessageHandler = new RoomMessageHandler(this);
        this._roomContentLoader = new RoomContentLoader();
        this._ready = false;
        this._roomContentLoaderReady = false;

        this._activeRoomId = -1;
        this._activeRoomActiveCanvas = -1;
        this._roomInstanceDatas = new Map();
        this._roomDatas = new Map();

        this._roomRendererFactory = new RoomRendererFactory();
        this._visualizationFactory = new RoomObjectVisualizationFactory();
        this._logicFactory = new RoomObjectLogicFactory();

        this._activeRoomActiveCanvasMouseX = 0;
        this._activeRoomActiveCanvasMouseY = 0;
        this._activeRoomIsDragged = false;
        this._activeRoomWasDragged = false;
        this._activeRoomDragStartX = 0;
        this._activeRoomDragStartY = 0;
        this._activeRoomDragX = 0;
        this._activeRoomDragY = 0;
        this._skipFurnitureCreationForNextFrame = false;
        this._mouseCursorUpdate = false;
        this._imageObjectIdBank = null;
        this._imageCallbacks = new Map();
        this._thumbnailCallbacks = new Map();
        this._roomDraggingAlwaysCenters = false;
        this._roomAllowsDragging = true;
        this._badgeListenerObjects = new Map();

        this.runVisibilityUpdate = this.runVisibilityUpdate.bind(this);
        this.processRoomObjectEvent = this.processRoomObjectEvent.bind(this);
        this.onRoomSessionEvent = this.onRoomSessionEvent.bind(this);
        this.onRoomContentLoaderReadyEvent = this.onRoomContentLoaderReadyEvent.bind(this);
        this.onBadgeImageReadyEvent = this.onBadgeImageReadyEvent.bind(this);
    }

    public onInit(): void
    {
        if(this._ready) return;

        this._imageObjectIdBank = new NumberBank(1000);
        this._thumbnailObjectIdBank = new NumberBank(1000);

        this._logicFactory.registerEventFunction(this.processRoomObjectEvent);

        if(this._roomManager)
        {
            this._roomManager.setContentLoader(this._roomContentLoader);
            this._roomManager.addUpdateCategory(RoomObjectCategory.FLOOR);
            this._roomManager.addUpdateCategory(RoomObjectCategory.WALL);
            this._roomManager.addUpdateCategory(RoomObjectCategory.UNIT);
            this._roomManager.addUpdateCategory(RoomObjectCategory.CURSOR);
            this._roomManager.addUpdateCategory(RoomObjectCategory.ROOM);
        }

        this._roomMessageHandler.setConnection(this._communication.connection);

        this._roomContentLoader.initialize(this.events);
        this._roomContentLoader.setSessionDataManager(this._sessionDataManager);
        this._roomContentLoader.setIconListener(this);

        if(this._roomSessionManager)
        {
            this._roomSessionManager.events.addEventListener(RoomSessionEvent.STARTED, this.onRoomSessionEvent);
            this._roomSessionManager.events.addEventListener(RoomSessionEvent.ENDED, this.onRoomSessionEvent);
        }

        this.events.addEventListener(RoomContentLoader.LOADER_READY, this.onRoomContentLoaderReadyEvent);

        GetTicker().add(this.update, this);

        document.addEventListener('visibilitychange', this.runVisibilityUpdate);
    }

    public onDispose(): void
    {
        if(!this._ready) return;

        for(const [key, value] of this._roomInstanceDatas)
        {
            this.removeRoomInstance(key);
        }

        document.removeEventListener('visibilitychange', this.runVisibilityUpdate);

        GetTicker().remove(this.update, this);

        if(this._roomObjectEventHandler) this._roomObjectEventHandler.dispose();

        if(this._roomMessageHandler) this._roomMessageHandler.dispose();

        if(this._roomContentLoader) this._roomContentLoader.dispose();

        this.events.removeEventListener(RoomContentLoader.LOADER_READY, this.onRoomContentLoaderReadyEvent);

        if(this._roomSessionManager)
        {
            this._roomSessionManager.events.removeEventListener(RoomSessionEvent.STARTED, this.onRoomSessionEvent);
            this._roomSessionManager.events.removeEventListener(RoomSessionEvent.ENDED, this.onRoomSessionEvent);
        }

        super.onDispose();
    }

    private onRoomSessionEvent(event: RoomSessionEvent): void
    {
        if(!(event instanceof RoomSessionEvent)) return;

        switch(event.type)
        {
            case RoomSessionEvent.STARTED:
                if(this._roomMessageHandler) this._roomMessageHandler.setRoomId(event.session.roomId);
                return;
            case RoomSessionEvent.ENDED:
                if(this._roomMessageHandler)
                {
                    this._roomMessageHandler.clearRoomId();
                    this.removeRoomInstance(event.session.roomId);
                }
                return;
        }
    }

    private onRoomContentLoaderReadyEvent(event: INitroEvent): void
    {
        this._roomContentLoaderReady = true;

        this._roomManager.init();
    }

    public setActiveRoomId(roomId: number): void
    {
        this._activeRoomId = roomId;
    }

    public destroyRoom(roomId: number): void
    {
        this.removeRoomInstance(roomId);
    }

    public getRoomInstance(roomId: number): IRoomInstance
    {
        return (this._roomManager && this._roomManager.getRoomInstance(this.getRoomId(roomId))) || null;
    }

    public removeRoomInstance(roomId: number): void
    {
        const instance = this.getRoomInstance(roomId);

        if(instance)
        {
            this._roomManager && this._roomManager.removeRoomInstance(this.getRoomId(roomId));
        }

        const existing = this._roomInstanceDatas.get(roomId);

        if(existing)
        {
            this._roomInstanceDatas.delete(existing.roomId);

            existing.dispose();
        }

        this.events.dispatchEvent(new RoomEngineEvent(RoomEngineEvent.DISPOSED, roomId));
    }

    public createRoomInstance(roomId: number, roomMap: RoomMapData): void
    {
        let floorType = '111';
        let wallType = '201';
        let landscapeType = '1';

        if(!this._ready)
        {
            let data = this._roomDatas.get(roomId);

            if(data)
            {
                this._roomDatas.delete(roomId);

                floorType = data.floorType;
                wallType = data.wallType;
                landscapeType = data.landscapeType;
            }

            data = new RoomData(roomId, roomMap);

            data.floorType = floorType;
            data.wallType = wallType;
            data.landscapeType = landscapeType;

            this._roomDatas.set(roomId, data);

            NitroLogger.warn('Room Engine not initilized yet, can not create room. Room data stored for later initialization.');

            return;
        }

        if(!roomMap)
        {
            NitroLogger.warn('Room property messages');

            return;
        }

        const data = this._roomDatas.get(roomId);

        if(data)
        {
            this._roomDatas.delete(roomId);

            if(data.floorType) floorType = data.floorType;

            if(data.wallType) wallType = data.wallType;

            if(data.landscapeType) landscapeType = data.landscapeType;
        }

        const instance = this.setupRoomInstance(roomId, roomMap, floorType, wallType, landscapeType, this.getRoomInstanceModelName(roomId));

        if(!instance) return;

        if(roomMap.restrictsDragging)
        {
            this._roomAllowsDragging = false;
        }
        else
        {
            this._roomAllowsDragging = true;
        }

        this.events.dispatchEvent(new RoomEngineEvent(RoomEngineEvent.INITIALIZED, roomId));
    }

    private setupRoomInstance(roomId: number, roomMap: RoomMapData, floorType: string, wallType: string, landscapeType: string, worldType: string): IRoomInstance
    {
        if(!this._ready || !this._roomManager) return;

        const instance = this._roomManager.createRoomInstance(this.getRoomId(roomId));

        if(!instance) return null;

        const category = RoomObjectCategory.ROOM;

        const roomObject = instance.createRoomObjectAndInitalize(RoomEngine.ROOM_OBJECT_ID, RoomEngine.ROOM_OBJECT_TYPE, category) as IRoomObjectController;

        instance.model.setValue(RoomVariableEnum.ROOM_IS_PUBLIC, 0);
        instance.model.setValue(RoomVariableEnum.ROOM_Z_SCALE, 1);

        if(roomMap)
        {
            instance.model.setValue(RoomVariableEnum.RESTRICTS_DRAGGING, roomMap.restrictsDragging);
            instance.model.setValue(RoomVariableEnum.RESTRICTS_SCALING, roomMap.restrictsScaling);
            instance.model.setValue(RoomVariableEnum.RESTRICTED_SCALE, roomMap.restrictedScale);

            const dimensions = roomMap.dimensions;

            if(dimensions)
            {
                const minX = roomMap.dimensions.minX;
                const maxX = roomMap.dimensions.maxX;
                const minY = roomMap.dimensions.minY;
                const maxY = roomMap.dimensions.maxY;

                instance.model.setValue(RoomVariableEnum.ROOM_MIN_X, minX);
                instance.model.setValue(RoomVariableEnum.ROOM_MAX_X, maxX);
                instance.model.setValue(RoomVariableEnum.ROOM_MIN_Y, minY);
                instance.model.setValue(RoomVariableEnum.ROOM_MAX_Y, maxY);

                const seed = Math.trunc((minX * 423) + (maxX * 671) + (minY * 913) + (maxY * 7509));

                if(roomObject && roomObject.model) roomObject.model.setValue(RoomObjectVariable.ROOM_RANDOM_SEED, seed);
            }
        }

        const logic = (roomObject && roomObject.logic as RoomLogic) || null;

        if(logic)
        {
            logic.initialize(roomMap);

            if(floorType)
            {
                logic.processUpdateMessage(new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_FLOOR_UPDATE, floorType));
                instance.model.setValue(RoomObjectVariable.ROOM_FLOOR_TYPE, floorType);
            }

            if(wallType)
            {
                logic.processUpdateMessage(new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_WALL_UPDATE, wallType));
                instance.model.setValue(RoomObjectVariable.ROOM_WALL_TYPE, wallType);
            }

            if(landscapeType)
            {
                logic.processUpdateMessage(new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_LANDSCAPE_UPDATE, landscapeType));
                instance.model.setValue(RoomObjectVariable.ROOM_LANDSCAPE_TYPE, landscapeType);
            }
        }

        if(roomMap && roomMap.doors.length)
        {
            let doorIndex = 0;

            while(doorIndex < roomMap.doors.length)
            {
                const door = roomMap.doors[doorIndex];

                if(door)
                {
                    const doorX = door.x;
                    const doorY = door.y;
                    const doorZ = door.z;
                    const doorDir = door.dir;
                    const maskType = ObjectRoomMaskUpdateMessage.DOOR;
                    const maskId = 'door_' + doorIndex;
                    const maskLocation = new Vector3d(doorX, doorY, doorZ);

                    logic.processUpdateMessage(new ObjectRoomMaskUpdateMessage(ObjectRoomMaskUpdateMessage.ADD_MASK, maskId, maskType, maskLocation, ObjectRoomMaskUpdateMessage.HOLE));

                    if((doorDir === 90) || (doorDir === 180))
                    {
                        if(doorDir === 90)
                        {
                            instance.model.setValue(RoomObjectVariable.ROOM_DOOR_X, (doorX - 0.5));
                            instance.model.setValue(RoomObjectVariable.ROOM_DOOR_Y, doorY);
                        }

                        if(doorDir === 180)
                        {
                            instance.model.setValue(RoomObjectVariable.ROOM_DOOR_X, doorX);
                            instance.model.setValue(RoomObjectVariable.ROOM_DOOR_Y, (doorY - 0.5));
                        }

                        instance.model.setValue(RoomObjectVariable.ROOM_DOOR_Z, doorZ);
                        instance.model.setValue(RoomObjectVariable.ROOM_DOOR_DIR, doorDir);
                    }
                }

                doorIndex++;
            }
        }

        instance.createRoomObjectAndInitalize(RoomEngine.CURSOR_OBJECT_ID, RoomEngine.CURSOR_OBJECT_TYPE, RoomObjectCategory.CURSOR);
        if(NitroConfiguration.getValue('enable.avatar.arrow', false)) instance.createRoomObjectAndInitalize(RoomEngine.ARROW_OBJECT_ID, RoomEngine.ARROW_OBJECT_TYPE, RoomObjectCategory.CURSOR);

        return instance;
    }

    public getRoomInstanceDisplay(roomId: number, id: number, width: number, height: number, scale: number): DisplayObject
    {
        const instance = this.getRoomInstance(roomId);

        if(!instance) return null;

        let renderer = instance.renderer as IRoomRenderer;

        if(!renderer)
        {
            renderer = this._roomRendererFactory.createRenderer();

            if(!renderer) return null;
        }

        renderer.roomObjectVariableAccurateZ = RoomObjectVariable.OBJECT_ACCURATE_Z_VALUE;

        instance.setRenderer(renderer);

        const canvas = renderer.createCanvas(id, width, height, scale);

        if(!canvas) return null;

        const restrictedScaling = instance.model.getValue<boolean>(RoomVariableEnum.RESTRICTS_SCALING);

        if(restrictedScaling)
        {
            let restrictedScale = instance.model.getValue<number>(RoomVariableEnum.RESTRICTED_SCALE);

            if(!restrictedScale) restrictedScale = 1;

            canvas.setScale(restrictedScale);

            canvas.restrictsScaling = true;
        }
        else
        {
            canvas.restrictsScaling = false;
        }

        canvas.setMouseListener(this._roomObjectEventHandler);

        if(canvas.geometry)
        {
            canvas.geometry.z_scale = instance.model.getValue(RoomVariableEnum.ROOM_Z_SCALE);

            const doorX = instance.model.getValue<number>(RoomObjectVariable.ROOM_DOOR_X);
            const doorY = instance.model.getValue<number>(RoomObjectVariable.ROOM_DOOR_Y);
            const doorZ = instance.model.getValue<number>(RoomObjectVariable.ROOM_DOOR_Z);
            const doorDirection = instance.model.getValue<number>(RoomObjectVariable.ROOM_DOOR_DIR);
            const vector = new Vector3d(doorX, doorY, doorZ);

            let direction: IVector3D = null;

            if(doorDirection === 90) direction = new Vector3d(-2000, 0, 0);

            if(doorDirection === 180) direction = new Vector3d(0, -2000, 0);

            canvas.geometry.setDisplacement(vector, direction);

            const displayObject = (canvas.master as Container);

            if(displayObject)
            {
                const overlay = new NitroSprite(Texture.EMPTY);

                overlay.name = RoomEngine.OVERLAY;
                overlay.interactive = false;

                displayObject.addChild(overlay);
            }
        }

        return canvas.master;
    }

    public setRoomInstanceRenderingCanvasMask(roomId: number, canvasId: number, flag: boolean): void
    {
        const roomCanvas = this.getRoomInstanceRenderingCanvas(roomId, canvasId);

        if(roomCanvas) roomCanvas.setMask(flag);
    }

    public setRoomInstanceRenderingCanvasScale(roomId: number, canvasId: number, scale: number, point: Point = null, offsetPoint: Point = null, override: boolean = false, asDelta: boolean = false): void
    {
        const roomCanvas = this.getRoomInstanceRenderingCanvas(roomId, canvasId);

        if(roomCanvas)
        {
            if(roomCanvas.restrictsScaling && !override) return;

            roomCanvas.setScale(scale, point, offsetPoint, override, asDelta);

            this.events.dispatchEvent(new RoomEngineEvent(RoomEngineEvent.ROOM_ZOOMED, roomId));
        }
    }

    public getRoomInstanceRenderingCanvas(roomId: number, canvasId: number = -1): IRoomRenderingCanvas
    {
        const instance = this.getRoomInstance(roomId);

        if(!instance) return null;

        const renderer = instance.renderer as IRoomRenderer;

        if(!renderer) return null;

        if(canvasId === -1) canvasId = this._activeRoomActiveCanvas;

        const canvas = renderer.getCanvas(canvasId);

        if(!canvas) return null;

        return canvas;
    }

    public getActiveRoomInstanceRenderingCanvas(): IRoomRenderingCanvas
    {
        return this.getRoomInstanceRenderingCanvas(this._activeRoomId, this._activeRoomActiveCanvas);
    }

    public getRoomInstanceRenderingCanvasOffset(roomId: number, canvasId: number = -1): Point
    {
        if(canvasId === -1) canvasId = this._activeRoomActiveCanvas;

        const renderingCanvas = this.getRoomInstanceRenderingCanvas(roomId, canvasId);

        if(!renderingCanvas) return null;

        return new Point(renderingCanvas.screenOffsetX, renderingCanvas.screenOffsetY);
    }

    public setRoomInstanceRenderingCanvasOffset(roomId: number, canvasId: number, point: Point): boolean
    {
        const renderingCanvas = this.getRoomInstanceRenderingCanvas(roomId, canvasId);

        if(!renderingCanvas || !point) return false;

        const x = ~~(point.x);
        const y = ~~(point.y);

        if((renderingCanvas.screenOffsetX === x) && (renderingCanvas.screenOffsetY === y)) return;

        this.events.dispatchEvent(new RoomDragEvent(roomId, -(renderingCanvas.screenOffsetX - x), -(renderingCanvas.screenOffsetY - y)));

        renderingCanvas.screenOffsetX = x;
        renderingCanvas.screenOffsetY = y;

        return true;
    }

    public getRoomInstanceRenderingCanvasScale(roomId: number = -1000, canvasId: number = -1): number
    {
        if(roomId === -1000) roomId = this._activeRoomId;

        if(canvasId === -1) canvasId = this._activeRoomActiveCanvas;

        const canvas = this.getRoomInstanceRenderingCanvas(roomId, canvasId);

        if(!canvas) return 1;

        return canvas.scale;
    }

    public initializeRoomInstanceRenderingCanvas(roomId: number, canvasId: number, width: number, height: number): void
    {
        const canvas = this.getRoomInstanceRenderingCanvas(roomId, canvasId);

        if(!canvas) return;

        canvas.initialize(width, height);
    }

    public getRoomInstanceGeometry(roomId: number, canvasId: number = -1): IRoomGeometry
    {
        const instance = this.getRoomInstance(roomId);

        if(!instance) return null;

        const renderer = instance.renderer as IRoomRenderer;

        if(!renderer) return null;

        if(canvasId === -1) canvasId = this._activeRoomActiveCanvas;

        const canvas = renderer.getCanvas(canvasId);

        if(!canvas) return null;

        return canvas.geometry;
    }

    public getRoomInstanceVariable<T>(roomId: number, key: string): T
    {
        const instance = this.getRoomInstance(roomId);

        if(!instance) return null;

        return ((instance.model && instance.model.getValue(key)) || null);
    }

    public updateRoomInstancePlaneVisibility(roomId: number, wallVisible: boolean, floorVisible: boolean = true): boolean
    {
        const object = this.getRoomOwnObject(roomId);

        if(!object) return false;

        object.processUpdateMessage(new ObjectRoomPlaneVisibilityUpdateMessage(ObjectRoomPlaneVisibilityUpdateMessage.WALL_VISIBILITY, wallVisible));
        object.processUpdateMessage(new ObjectRoomPlaneVisibilityUpdateMessage(ObjectRoomPlaneVisibilityUpdateMessage.FLOOR_VISIBILITY, floorVisible));

        return true;
    }

    public updateRoomInstancePlaneThickness(roomId: number, wallThickness: number, floorThickness: number): boolean
    {
        const object = this.getRoomOwnObject(roomId);

        if(!object) return false;

        object.processUpdateMessage(new ObjectRoomPlanePropertyUpdateMessage(ObjectRoomPlanePropertyUpdateMessage.WALL_THICKNESS, wallThickness));
        object.processUpdateMessage(new ObjectRoomPlanePropertyUpdateMessage(ObjectRoomPlanePropertyUpdateMessage.FLOOR_THICKNESS, floorThickness));

        return true;
    }

    public updateRoomInstancePlaneType(roomId: number, floorType: string = null, wallType: string = null, landscapeType: string = null, _arg_5: boolean = false): boolean
    {
        const roomObject = this.getRoomOwnObject(roomId);
        const roomInstance = this.getRoomInstance(roomId);

        if(!roomObject)
        {
            let roomData = this._roomDatas.get(roomId);

            if(!roomData)
            {
                roomData = new RoomData(roomId, null);

                this._roomDatas.set(roomId, roomData);
            }

            if(floorType) roomData.floorType = floorType;

            if(wallType) roomData.wallType = wallType;

            if(landscapeType) roomData.landscapeType = landscapeType;

            return true;
        }

        if(floorType)
        {
            if(roomInstance && !_arg_5) roomInstance.model.setValue(RoomObjectVariable.ROOM_FLOOR_TYPE, floorType);

            roomObject.processUpdateMessage(new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_FLOOR_UPDATE, floorType));
        }

        if(wallType)
        {
            if(roomInstance && !_arg_5) roomInstance.model.setValue(RoomObjectVariable.ROOM_WALL_TYPE, wallType);

            roomObject.processUpdateMessage(new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_WALL_UPDATE, wallType));
        }

        if(landscapeType)
        {
            if(roomInstance && !_arg_5) roomInstance.model.setValue(RoomObjectVariable.ROOM_LANDSCAPE_TYPE, landscapeType);

            roomObject.processUpdateMessage(new ObjectRoomUpdateMessage(ObjectRoomUpdateMessage.ROOM_LANDSCAPE_UPDATE, landscapeType));
        }

        return true;
    }

    public updateObjectRoomColor(roomId: number, color: number, light: number, backgroundOnly: boolean): boolean
    {
        const roomObject = this.getRoomOwnObject(roomId);

        if(!roomObject || !roomObject.logic) return false;

        const event = new ObjectRoomColorUpdateMessage(ObjectRoomColorUpdateMessage.BACKGROUND_COLOR, color, light, backgroundOnly);

        roomObject.logic.processUpdateMessage(event);

        this.events.dispatchEvent(new RoomBackgroundColorEvent(roomId, color, light, backgroundOnly));

        return true;
    }

    public addRoomInstanceFloorHole(roomId: number, objectId: number): void
    {
        if(objectId < 0) return;

        const roomOwnObject = this.getRoomOwnObject(roomId);
        const roomObject = this.getRoomObjectFloor(roomId, objectId);

        if(roomOwnObject && roomOwnObject.logic && roomObject && roomObject.model)
        {
            const location = roomObject.getLocation();
            const sizeX = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_X);
            const sizeY = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_Y);

            roomOwnObject.processUpdateMessage(new ObjectRoomFloorHoleUpdateMessage(ObjectRoomFloorHoleUpdateMessage.ADD, objectId, location.x, location.y, sizeX, sizeY));
        }
    }

    public removeRoomInstanceFloorHole(roomId: number, objectId: number): void
    {
        if(objectId < 0) return;

        const roomOwnObject = this.getRoomOwnObject(roomId);

        if(roomOwnObject)
        {
            roomOwnObject.processUpdateMessage(new ObjectRoomFloorHoleUpdateMessage(ObjectRoomFloorHoleUpdateMessage.REMOVE, objectId));
        }
    }

    public setRoomEngineGameMode(roomId: number, isPlaying: boolean): void
    {
        const roomInstance = this.getRoomInstance(roomId);

        if(!roomInstance) return;

        const mode = isPlaying ? 1 : 0;

        roomInstance.model.setValue(RoomVariableEnum.IS_PLAYING_GAME, mode);

        if(mode === 0)
        {
            this.events.dispatchEvent(new RoomEngineEvent(RoomEngineEvent.NORMAL_MODE, roomId));
        }
        else
        {
            this.events.dispatchEvent(new RoomEngineEvent(RoomEngineEvent.GAME_MODE, roomId));
        }
    }

    public isRoomIdPlayingGame(roomId: number): boolean
    {
        const roomInstance = this.getRoomInstance(roomId);

        if(!roomInstance) return false;

        return (roomInstance.model.getValue<number>(RoomVariableEnum.IS_PLAYING_GAME) > 0);
    }

    public isPlayingGame(): boolean
    {
        return this.isRoomIdPlayingGame(this._activeRoomId);
    }

    public disableUpdate(flag: boolean): void
    {
        if(flag)
        {
            GetTicker().remove(this.update, this);
        }
        else
        {
            GetTicker().remove(this.update, this);
            GetTicker().add(this.update, this);
        }
    }

    public runUpdate(): void
    {
        this.update(1);
    }

    public runVisibilityUpdate(): void
    {
        if(!document.hidden) this.update(1, true);
    }

    public update(time: number, update: boolean = false): void
    {
        if(!this._roomManager) return;

        time = GetTickerTime();

        RoomEnterEffect.turnVisualizationOn();

        this.processPendingFurniture();

        this._roomManager.update(time, update);

        this.updateRoomCameras(time);

        if(this._mouseCursorUpdate) this.setPointer();

        RoomEnterEffect.turnVisualizationOff();
    }

    private setPointer(): void
    {
        this._mouseCursorUpdate = false;

        const instanceData = this.getRoomInstanceData(this._activeRoomId);

        if(instanceData && instanceData.hasButtonMouseCursorOwners())
        {
            document.body.style.cursor = 'pointer';
        }
        else
        {
            document.body.style.cursor = 'auto';
        }
    }

    private processPendingFurniture(): void
    {
        if(this._skipFurnitureCreationForNextFrame)
        {
            this._skipFurnitureCreationForNextFrame = false;

            return;
        }

        const startTime = new Date().valueOf();
        const furniturePerTick = 5;
        const hasTickLimit = true;

        for(const instanceData of this._roomInstanceDatas.values())
        {
            if(!instanceData) continue;

            let pendingData: RoomFurnitureData = null;
            let totalFurnitureAdded = 0;
            let furnitureAdded = false;

            while((pendingData = instanceData.getNextPendingFurnitureFloor()))
            {
                furnitureAdded = this.processPendingFurnitureFloor(instanceData.roomId, pendingData.id, pendingData);

                if(hasTickLimit)
                {
                    if(!(++totalFurnitureAdded % furniturePerTick))
                    {
                        const time = new Date().valueOf();

                        if((time - startTime) >= 40)
                        {
                            this._skipFurnitureCreationForNextFrame = true;

                            break;
                        }
                    }
                }
            }

            while(!this._skipFurnitureCreationForNextFrame && (pendingData = instanceData.getNextPendingFurnitureWall()))
            {
                furnitureAdded = this.processPendingFurnitureWall(instanceData.roomId, pendingData.id, pendingData);

                if(hasTickLimit)
                {
                    if(!(++totalFurnitureAdded % furniturePerTick))
                    {
                        const time = new Date().valueOf();

                        if((time - startTime) >= 40)
                        {
                            this._skipFurnitureCreationForNextFrame = true;

                            break;
                        }
                    }
                }
            }

            if(furnitureAdded && this._roomManager)
            {
                const roomInstance = this._roomManager.getRoomInstance(this.getRoomId(instanceData.roomId)) as RoomInstance;

                if(!roomInstance.hasUninitializedObjects()) this.objectsInitialized(instanceData.roomId.toString());
            }

            if(this._skipFurnitureCreationForNextFrame) return;
        }
    }

    public onRoomEngineInitalized(flag: boolean): void
    {
        if(!flag) return;

        this._ready = true;

        this.events.dispatchEvent(new RoomEngineEvent(RoomEngineEvent.ENGINE_INITIALIZED, 0));

        for(const roomData of this._roomDatas.values())
        {
            if(!roomData) continue;

            this.createRoomInstance(roomData.roomId, roomData.data);
        }
    }

    private processPendingFurnitureFloor(roomId: number, id: number, data: RoomFurnitureData): boolean
    {
        if(!data)
        {
            const instanceData = this.getRoomInstanceData(roomId);

            if(instanceData) data = instanceData.getPendingFurnitureFloor(id);

            if(!data) return false;
        }

        let type = data.type;
        let didLoad = false;

        if(!type)
        {
            type = this.getFurnitureFloorName(data.typeId);
            didLoad = true;

        }

        const object = this.createRoomObjectFloor(roomId, id, type);

        if(!object) return false;

        const model = object.model;

        if(model)
        {
            model.setValue(RoomObjectVariable.FURNITURE_COLOR, this.getFurnitureFloorColorIndex(data.typeId));
            model.setValue(RoomObjectVariable.FURNITURE_TYPE_ID, data.typeId);
            model.setValue(RoomObjectVariable.FURNITURE_AD_URL, this.getRoomObjectAdUrl(data.type));
            model.setValue(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT, (data.realRoomObject ? 1 : 0));
            model.setValue(RoomObjectVariable.FURNITURE_EXPIRY_TIME, data.expiryTime);
            model.setValue(RoomObjectVariable.FURNITURE_EXPIRTY_TIMESTAMP, GetTickerTime());
            model.setValue(RoomObjectVariable.FURNITURE_USAGE_POLICY, data.usagePolicy);
            model.setValue(RoomObjectVariable.FURNITURE_OWNER_ID, data.ownerId);
            model.setValue(RoomObjectVariable.FURNITURE_OWNER_NAME, data.ownerName);
        }

        if(!this.updateRoomObjectFloor(roomId, id, data.location, data.direction, data.state, data.data, data.extra)) return false;

        if(data.sizeZ >= 0)
        {
            if(!this.updateRoomObjectFloorHeight(roomId, id, data.sizeZ)) return false;
        }

        if(this.events) this.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, roomId, id, RoomObjectCategory.FLOOR));

        const selectedRoomObjectData = this.getPlacedRoomObjectData(roomId);

        if(selectedRoomObjectData && (selectedRoomObjectData.id === id) && (selectedRoomObjectData.category === RoomObjectCategory.FLOOR))
        {
            this.selectRoomObject(roomId, id, RoomObjectCategory.FLOOR);
        }

        if(object.isReady && data.synchronized) this.addObjectToTileMap(roomId, object);

        return true;
    }

    private processPendingFurnitureWall(roomId: number, id: number, data: RoomFurnitureData): boolean
    {
        if(!data)
        {
            const instanceData = this.getRoomInstanceData(roomId);

            if(instanceData) data = instanceData.getPendingFurnitureWall(id);

            if(!data) return false;
        }

        let extra = '';

        if(data.data) extra = data.data.getLegacyString();

        let type = this.getFurnitureWallName(data.typeId, extra);

        if(!type) type = '';

        const object = this.createRoomObjectWall(roomId, id, type);

        if(!object) return false;

        const model = object.model;

        if(model)
        {
            model.setValue(RoomObjectVariable.FURNITURE_COLOR, this.getFurnitureWallColorIndex(data.typeId));
            model.setValue(RoomObjectVariable.FURNITURE_TYPE_ID, data.typeId);
            model.setValue(RoomObjectVariable.FURNITURE_AD_URL, this.getRoomObjectAdUrl(data.type));
            model.setValue(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT, (data.realRoomObject ? 1 : 0));
            model.setValue(RoomObjectVariable.OBJECT_ACCURATE_Z_VALUE, 1);
            model.setValue(RoomObjectVariable.FURNITURE_EXPIRY_TIME, data.expiryTime);
            model.setValue(RoomObjectVariable.FURNITURE_EXPIRTY_TIMESTAMP, GetTickerTime());
            model.setValue(RoomObjectVariable.FURNITURE_USAGE_POLICY, data.usagePolicy);
            model.setValue(RoomObjectVariable.FURNITURE_OWNER_ID, data.ownerId);
            model.setValue(RoomObjectVariable.FURNITURE_OWNER_NAME, data.ownerName);
        }

        if(!this.updateRoomObjectWall(roomId, id, data.location, data.direction, data.state, extra)) return false;

        if(this.events) this.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, roomId, id, RoomObjectCategory.WALL));

        const selectedRoomObjectData = this.getPlacedRoomObjectData(roomId);

        if(selectedRoomObjectData && (Math.abs(selectedRoomObjectData.id) === id) && (selectedRoomObjectData.category === RoomObjectCategory.WALL))
        {
            this.selectRoomObject(roomId, id, RoomObjectCategory.WALL);
        }

        return true;
    }

    public setRoomSessionOwnUser(roomId: number, objectId: number): void
    {
        if(!this._roomSessionManager) return;

        const session = this._roomSessionManager.getSession(roomId);

        if(session)
        {
            session.setOwnRoomIndex(objectId);
        }

        const camera = this.getRoomCamera(roomId);

        if(camera)
        {
            camera.targetId = objectId;
            camera.targetCategory = RoomObjectCategory.UNIT;

            camera.activateFollowing(this.cameraFollowDuration);
        }
    }

    private get cameraFollowDuration(): number
    {
        return 1000;
        //return (getBoolean("room.camera.follow_user")) ? 1000 : 0;
    }

    private updateRoomCameras(time: number): void
    {
        for(const instanceData of this._roomInstanceDatas.values())
        {
            if(!instanceData) continue;

            const camera = instanceData.roomCamera;

            if(!camera) continue;

            let location: IVector3D = null;

            const object = this.getRoomObject(instanceData.roomId, camera.targetId, camera.targetCategory);

            if(object) location = object.getLocation();

            if(!location) continue;

            if((instanceData.roomId !== this._activeRoomId) || !this._activeRoomIsDragged)
            {
                this.updateRoomCamera(instanceData.roomId, 1, location, time);
            }
        }

        if(this._activeRoomWasDragged)
        {
            const renderingCanvas = this.getRoomInstanceRenderingCanvas(this._activeRoomId, 1);

            if(renderingCanvas) this.setRoomInstanceRenderingCanvasOffset(this._activeRoomId, 1, new Point((renderingCanvas.screenOffsetX + this._activeRoomDragX), (renderingCanvas.screenOffsetY + this._activeRoomDragY)));

            this._activeRoomDragX = 0;
            this._activeRoomDragY = 0;
        }
    }

    private updateRoomCamera(roomId: number, canvasId: number, objectLocation: IVector3D, time: number): void
    {
        const renderingCanvas = this.getRoomInstanceRenderingCanvas(roomId, canvasId);
        const instanceData = this.getRoomInstanceData(roomId);

        if(!renderingCanvas || !instanceData || (renderingCanvas.scale !== 1)) return;

        const roomGeometry = (renderingCanvas.geometry as RoomGeometry);
        const roomCamera = instanceData.roomCamera;
        const roomInstance = this.getRoomInstance(roomId);

        if(!roomGeometry || !roomCamera || !roomInstance) return;

        const canvasRectangle = this.getRoomCanvasRectangle(roomId, canvasId);

        if(!canvasRectangle) return;

        let _local_10 = (Math.floor(objectLocation.z) + 1);
        const width = Math.round(canvasRectangle.width);
        const height = Math.round(canvasRectangle.height);
        const bounds = this.getCanvasBoundingRectangle(canvasId);

        if(bounds && ((bounds.right < 0) || (bounds.bottom < 0) || (bounds.left >= width) || (bounds.top >= height)))
        {
            roomCamera.reset();
        }

        if((roomCamera.screenWd !== width) || (roomCamera.screenHt !== height) || (roomCamera.scale !== roomGeometry.scale) || (roomCamera.geometryUpdateId !== roomGeometry.updateId) || !Vector3d.isEqual(objectLocation, roomCamera.targetObjectLoc) || roomCamera.isMoving)
        {
            roomCamera.targetObjectLoc = objectLocation;

            const _local_15 = new Vector3d();

            _local_15.assign(objectLocation);

            _local_15.x = Math.round(_local_15.x);
            _local_15.y = Math.round(_local_15.y);

            const _local_16 = (roomInstance.model.getValue<number>(RoomVariableEnum.ROOM_MIN_X) - 0.5);
            const _local_17 = (roomInstance.model.getValue<number>(RoomVariableEnum.ROOM_MIN_Y) - 0.5);
            const _local_18 = (roomInstance.model.getValue<number>(RoomVariableEnum.ROOM_MAX_X) + 0.5);
            const _local_19 = (roomInstance.model.getValue<number>(RoomVariableEnum.ROOM_MAX_Y) + 0.5);
            const _local_20 = Math.round(((_local_16 + _local_18) / 2));
            const _local_21 = Math.round(((_local_17 + _local_19) / 2));
            const _local_22 = 2;
            let _local_23 = new Point((_local_15.x - _local_20), (_local_15.y - _local_21));
            const _local_24 = (roomGeometry.scale / Math.sqrt(2));
            const _local_25 = (_local_24 / 2);
            const _local_26 = new Matrix();
            _local_26.rotate(((-(roomGeometry.direction.x + 90) / 180) * Math.PI));
            _local_23 = _local_26.apply(_local_23);
            _local_23.y = (_local_23.y * (_local_25 / _local_24));
            const _local_27 = (((canvasRectangle.width / 2) / _local_24) - 1);
            const _local_28 = (((canvasRectangle.height / 2) / _local_25) - 1);

            let _local_29 = 0;
            let _local_30 = 0;
            let _local_31 = 0;
            let _local_32 = 0;
            let _local_33 = roomGeometry.getScreenPoint(new Vector3d(_local_20, _local_21, _local_22));

            if(!_local_33) return;

            _local_33.x = (_local_33.x + Math.round((canvasRectangle.width / 2)));
            _local_33.y = (_local_33.y + Math.round((canvasRectangle.height / 2)));

            if(bounds)
            {
                bounds.x += -(renderingCanvas.screenOffsetX);
                bounds.y += -(renderingCanvas.screenOffsetY);

                if(((bounds.width > 1) && (bounds.height > 1)))
                {
                    _local_29 = (((bounds.left - _local_33.x) - (roomGeometry.scale * 0.25)) / _local_24);
                    _local_31 = (((bounds.right - _local_33.x) + (roomGeometry.scale * 0.25)) / _local_24);
                    _local_30 = (((bounds.top - _local_33.y) - (roomGeometry.scale * 0.5)) / _local_25);
                    _local_32 = (((bounds.bottom - _local_33.y) + (roomGeometry.scale * 0.5)) / _local_25);
                }
                else
                {
                    roomGeometry.adjustLocation(new Vector3d(-30, -30), 25);

                    return;
                }
            }
            else
            {
                roomGeometry.adjustLocation(new Vector3d(0, 0), 25);

                return;
            }

            let _local_34 = false;
            let _local_35 = false;
            let _local_36 = false;
            let _local_37 = false;
            const _local_38 = Math.round(((_local_31 - _local_29) * _local_24));

            if(_local_38 < canvasRectangle.width)
            {
                _local_10 = 2;
                _local_23.x = ((_local_31 + _local_29) / 2);
                _local_36 = true;
            }
            else
            {
                if(_local_23.x > (_local_31 - _local_27))
                {
                    _local_23.x = (_local_31 - _local_27);
                    _local_34 = true;
                }
                if(_local_23.x < (_local_29 + _local_27))
                {
                    _local_23.x = (_local_29 + _local_27);
                    _local_34 = true;
                }
            }
            const _local_39 = Math.round(((_local_32 - _local_30) * _local_25));
            if(_local_39 < canvasRectangle.height)
            {
                _local_10 = 2;
                _local_23.y = ((_local_32 + _local_30) / 2);
                _local_37 = true;
            }
            else
            {
                if(_local_23.y > (_local_32 - _local_28))
                {
                    _local_23.y = (_local_32 - _local_28);
                    _local_35 = true;
                }
                if(_local_23.y < (_local_30 + _local_28))
                {
                    _local_23.y = (_local_30 + _local_28);
                    _local_35 = true;
                }
                if(_local_35)
                {
                    _local_23.y = (_local_23.y / (_local_25 / _local_24));
                }
            }
            _local_26.invert();
            _local_23 = _local_26.apply(_local_23);
            _local_23.x = (_local_23.x + _local_20);
            _local_23.y = (_local_23.y + _local_21);
            let _local_40 = 0.35;
            let _local_41 = 0.2;
            let _local_42 = 0.2;
            const _local_43 = 10;
            const _local_44 = 10;
            if((_local_42 * width) > 100)
            {
                _local_42 = (100 / width);
            }
            if((_local_40 * height) > 150)
            {
                _local_40 = (150 / height);
            }
            if((_local_41 * height) > 150)
            {
                _local_41 = (150 / height);
            }
            if((((roomCamera.limitedLocationX) && (roomCamera.screenWd == width)) && (roomCamera.screenHt == height)))
            {
                _local_42 = 0;
            }
            if((((roomCamera.limitedLocationY) && (roomCamera.screenWd == width)) && (roomCamera.screenHt == height)))
            {
                _local_40 = 0;
                _local_41 = 0;
            }

            canvasRectangle.width = (canvasRectangle.width * (1 - (_local_42 * 2)));
            canvasRectangle.height = (canvasRectangle.height * (1 - (_local_40 + _local_41)));

            if(canvasRectangle.width < _local_43)
            {
                canvasRectangle.width = _local_43;
            }

            if(canvasRectangle.height < _local_44)
            {
                canvasRectangle.height = _local_44;
            }

            if((_local_40 + _local_41) > 0)
            {
                canvasRectangle.x += (-(canvasRectangle.width) / 2);
                canvasRectangle.y += (-(canvasRectangle.height) * (_local_41 / (_local_40 + _local_41)));
            }
            else
            {
                canvasRectangle.x += (-(canvasRectangle.width) / 2);
                canvasRectangle.y += (-(canvasRectangle.height) / 2);
            }

            _local_33 = roomGeometry.getScreenPoint(_local_15);

            if(!_local_33) return;

            if(_local_33)
            {
                _local_33.x = (_local_33.x + renderingCanvas.screenOffsetX);
                _local_33.y = (_local_33.y + renderingCanvas.screenOffsetY);
                _local_15.z = _local_10;
                _local_15.x = (Math.round((_local_23.x * 2)) / 2);
                _local_15.y = (Math.round((_local_23.y * 2)) / 2);
                if(!roomCamera.location)
                {
                    roomGeometry.location = _local_15;
                    if(this.useOffsetScrolling)
                    {
                        roomCamera.initializeLocation(new Vector3d(0, 0, 0));
                    }
                    else
                    {
                        roomCamera.initializeLocation(_local_15);
                    }
                }
                const _local_45 = roomGeometry.getScreenPoint(_local_15);
                const _local_46 = new Vector3d(0, 0, 0);
                if(_local_45)
                {
                    _local_46.x = _local_45.x;
                    _local_46.y = _local_45.y;
                }
                if(((((((((_local_33.x < canvasRectangle.left) || (_local_33.x > canvasRectangle.right)) && (!(roomCamera.centeredLocX))) || (((_local_33.y < canvasRectangle.top) || (_local_33.y > canvasRectangle.bottom)) && (!(roomCamera.centeredLocY)))) || (((_local_36) && (!(roomCamera.centeredLocX))) && (!(roomCamera.screenWd == width)))) || (((_local_37) && (!(roomCamera.centeredLocY))) && (!(roomCamera.screenHt == height)))) || ((!(roomCamera.roomWd == bounds.width)) || (!(roomCamera.roomHt == bounds.height)))) || ((!(roomCamera.screenWd == width)) || (!(roomCamera.screenHt == height)))))
                {
                    roomCamera.limitedLocationX = _local_34;
                    roomCamera.limitedLocationY = _local_35;
                    if(this.useOffsetScrolling)
                    {
                        roomCamera.target = _local_46;
                    }
                    else
                    {
                        roomCamera.target = _local_15;
                    }
                }
                else
                {
                    if(!_local_34) roomCamera.limitedLocationX = false;

                    if(!_local_35) roomCamera.limitedLocationY = false;
                }
            }

            roomCamera.centeredLocX = _local_36;
            roomCamera.centeredLocY = _local_37;
            roomCamera.screenWd = width;
            roomCamera.screenHt = height;
            roomCamera.scale = roomGeometry.scale;
            roomCamera.geometryUpdateId = roomGeometry.updateId;
            roomCamera.roomWd = bounds.width;
            roomCamera.roomHt = bounds.height;

            if(!this._sessionDataManager.isCameraFollowDisabled)
            {
                if(this.useOffsetScrolling)
                {
                    roomCamera.update(time, 8);
                }
                else
                {
                    roomCamera.update(time, 0.5);
                }
            }

            if(this.useOffsetScrolling)
            {
                this.setRoomInstanceRenderingCanvasOffset(this.activeRoomId, 1, new Point(-(roomCamera.location.x), -(roomCamera.location.y)));
            }
            else
            {
                roomGeometry.adjustLocation(roomCamera.location, 25);
            }
        }
        else
        {
            roomCamera.limitedLocationX = false;
            roomCamera.limitedLocationY = false;
            roomCamera.centeredLocX = false;
            roomCamera.centeredLocY = false;
        }
    }

    private getRoomCanvasRectangle(roomId: number, canvasId: number): Rectangle
    {
        const canvas = this.getRoomInstanceRenderingCanvas(roomId, canvasId);

        if(!canvas) return null;

        return new Rectangle(0, 0, canvas.width, canvas.height);
    }

    public getRoomObjectBoundingRectangle(roomId: number, objectId: number, category: number, canvasId: number): Rectangle
    {
        const geometry = this.getRoomInstanceGeometry(roomId, canvasId);

        if(!geometry) return null;

        const roomObject = this.getRoomObject(roomId, objectId, category);

        if(!roomObject) return null;

        const visualization = roomObject.visualization;

        if(!visualization) return null;

        const rectangle = visualization.getBoundingRectangle();
        const canvas = this.getRoomInstanceRenderingCanvas(roomId, canvasId);
        const scale = ((canvas) ? canvas.scale : 1);
        const screenPoint = geometry.getScreenPoint(roomObject.getLocation());

        if(!screenPoint) return null;

        screenPoint.x = Math.round(screenPoint.x);
        screenPoint.y = Math.round(screenPoint.y);

        rectangle.x = (rectangle.x * scale);
        rectangle.y = (rectangle.y * scale);
        rectangle.width = (rectangle.width * scale);
        rectangle.height = (rectangle.height * scale);

        screenPoint.x = (screenPoint.x * scale);
        screenPoint.y = (screenPoint.y * scale);

        rectangle.x += screenPoint.x;
        rectangle.y += screenPoint.y;

        if(!canvas) return null;

        rectangle.x += (Math.round(canvas.width / 2) + canvas.screenOffsetX);
        rectangle.y += (Math.round(canvas.height / 2) + canvas.screenOffsetY);

        return rectangle;
    }

    public getCanvasBoundingRectangle(canvasId: number): Rectangle
    {
        return this.getRoomObjectBoundingRectangle(this._activeRoomId, RoomEngine.ROOM_OBJECT_ID, RoomObjectCategory.ROOM, canvasId);
    }

    public getFurnitureFloorName(typeId: number): string
    {
        if(!this._roomContentLoader) return null;

        return this._roomContentLoader.getFurnitureFloorNameForTypeId(typeId);
    }

    public getFurnitureWallName(typeId: number, extra: string = null): string
    {
        if(!this._roomContentLoader) return null;

        return this._roomContentLoader.getFurnitureWallNameForTypeId(typeId, extra);
    }

    public getFurnitureFloorColorIndex(typeId: number): number
    {
        if(!this._roomContentLoader) return null;

        return this._roomContentLoader.getFurnitureFloorColorIndex(typeId);
    }

    public getFurnitureWallColorIndex(typeId: number): number
    {
        if(!this._roomContentLoader) return null;

        return this._roomContentLoader.getFurnitureWallColorIndex(typeId);
    }

    private getRoomInstanceData(roomId: number): RoomInstanceData
    {
        const existing = this._roomInstanceDatas.get(roomId);

        if(existing) return existing;

        const data = new RoomInstanceData(roomId);

        this._roomInstanceDatas.set(data.roomId, data);

        return data;
    }

    public getRoomInstanceModelName(roomId: number): string
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return null;

        return instanceData.modelName;
    }

    public setRoomInstanceModelName(roomId: number, name: string): void
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return;

        instanceData.setModelName(name);
    }

    public getRoomTileObjectMap(k: number): ITileObjectMap
    {
        const roomInstance = this.getRoomInstanceData(k);

        if(!roomInstance) return null;

        return roomInstance.tileObjectMap;
    }

    private getCurrentRoomCamera(): RoomCamera
    {
        return this.getRoomCamera(this._activeRoomId);
    }

    private getRoomCamera(roomId: number): RoomCamera
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return null;

        return instanceData.roomCamera;
    }

    public getSelectedRoomObjectData(roomId: number): ISelectedRoomObjectData
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return null;

        return instanceData.selectedObject;
    }

    public setSelectedRoomObjectData(roomId: number, data: ISelectedRoomObjectData): void
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return null;

        instanceData.setSelectedObject(data);

        if(data) instanceData.setPlacedObject(null);
    }

    public getPlacedRoomObjectData(roomId: number): ISelectedRoomObjectData
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return null;

        return instanceData.placedObject;
    }

    public setPlacedRoomObjectData(roomId: number, data: ISelectedRoomObjectData): void
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return null;

        instanceData.setPlacedObject(data);
    }

    public cancelRoomObjectPlacement(): void
    {
        if(!this._roomObjectEventHandler) return;

        this._roomObjectEventHandler.cancelRoomObjectPlacement(this._activeRoomId);
    }

    public getFurnitureStackingHeightMap(roomId: number): IFurnitureStackingHeightMap
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return null;

        return instanceData.furnitureStackingHeightMap;
    }

    public setFurnitureStackingHeightMap(roomId: number, heightMap: IFurnitureStackingHeightMap): void
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return null;

        instanceData.setFurnitureStackingHeightMap(heightMap);
    }

    public getLegacyWallGeometry(roomId: number): ILegacyWallGeometry
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return null;

        return instanceData.legacyGeometry;
    }

    private createRoomObjectAndInitialize(roomId: number, objectId: number, type: string, category: number): IRoomObjectController
    {
        const instance = this.getRoomInstance(roomId);

        if(!instance) return null;

        return instance.createRoomObjectAndInitalize(objectId, type, category) as IRoomObjectController;
    }

    public getTotalObjectsForManager(roomId: number, category: number): number
    {
        const instance = this.getRoomInstance(roomId);

        if(!instance) return 0;

        return instance.getTotalObjectsForManager(category);
    }

    public getRoomObject(roomId: number, objectId: number, category: number): IRoomObjectController
    {
        if(!this._ready) return null;

        let roomIdString = this.getRoomId(roomId);

        if(roomId === 0) roomIdString = RoomEngine.TEMPORARY_ROOM;

        return this.getObject(roomIdString, objectId, category);
    }

    public getObject(roomId: string, objectId: number, category: number): IRoomObjectController
    {
        let roomInstance: IRoomInstance = null;

        if(this._roomManager) roomInstance = this._roomManager.getRoomInstance(roomId);

        if(!roomInstance) return null;

        let roomObject = (roomInstance.getRoomObject(objectId, category) as IRoomObjectController);

        if(!roomObject)
        {
            switch(category)
            {
                case RoomObjectCategory.FLOOR:
                    this.processPendingFurnitureFloor(this.getRoomIdFromString(roomId), objectId, null);

                    roomObject = (roomInstance.getRoomObject(objectId, category) as IRoomObjectController);
                    break;
                case RoomObjectCategory.WALL:
                    this.processPendingFurnitureWall(this.getRoomIdFromString(roomId), objectId, null);

                    roomObject = (roomInstance.getRoomObject(objectId, category) as IRoomObjectController);
                    break;
            }
        }

        return roomObject;
    }

    public getRoomObjectByIndex(roomId: number, index: number, category: number): IRoomObjectController
    {
        const instance = this.getRoomInstance(roomId);

        if(!instance) return null;

        return instance.getRoomObjectByIndex(index, category) as IRoomObjectController;
    }

    public getRoomObjectCategoryForType(type: string): number
    {
        if(!type || !this._roomContentLoader) return RoomObjectCategory.MINIMUM;

        return this._roomContentLoader.getCategoryForType(type);
    }

    public getRoomObjectCursor(roomId: number): IRoomObjectController
    {
        return this.getObject(this.getRoomId(roomId), RoomEngine.CURSOR_OBJECT_ID, RoomObjectCategory.CURSOR);
    }

    public getRoomObjectSelectionArrow(roomId: number): IRoomObjectController
    {
        return this.getObject(this.getRoomId(roomId), RoomEngine.ARROW_OBJECT_ID, RoomObjectCategory.CURSOR);
    }

    public getRoomOwnObject(roomId: number): IRoomObjectController
    {
        return this.getObject(this.getRoomId(roomId), RoomEngine.ROOM_OBJECT_ID, RoomObjectCategory.ROOM);
    }

    public getRoomObjectUser(roomId: number, objectId: number): IRoomObjectController
    {
        return this.getObject(this.getRoomId(roomId), objectId, RoomObjectCategory.UNIT);
    }

    public removeRoomObjectUser(roomId: number, objectId: number): void
    {
        return this.removeRoomObject(roomId, objectId, RoomObjectCategory.UNIT);
    }

    public createRoomObjectUser(roomId: number, objectId: number, type: string): IRoomObjectController
    {
        return this.createRoomObjectAndInitialize(roomId, objectId, type, RoomObjectCategory.UNIT);
    }

    public getRoomObjectFloor(roomId: number, objectId: number): IRoomObjectController
    {
        return this.getObject(this.getRoomId(roomId), objectId, RoomObjectCategory.FLOOR);
    }

    public createRoomObjectFloor(roomId: number, id: number, type: string): IRoomObjectController
    {
        return this.createRoomObjectAndInitialize(roomId, id, type, RoomObjectCategory.FLOOR);
    }

    public removeRoomObjectFloor(roomId: number, objectId: number, userId: number = -1, _arg_4: boolean = false): void
    {
        const roomInstanceData = this.getRoomInstanceData(roomId);

        if(roomInstanceData) roomInstanceData.removePendingFunitureFloor(objectId);

        if(this._sessionDataManager && (userId === this._sessionDataManager.userId) && !FurniId.isBuilderClubId(objectId))
        {
            const roomObject = this.getRoomObject(roomId, objectId, RoomObjectCategory.FLOOR);

            if(roomObject)
            {
                const screenLocation = this.getRoomObjectScreenLocation(roomId, objectId, RoomObjectCategory.FLOOR, this._activeRoomActiveCanvas);

                if(screenLocation)
                {
                    const disabledPickingAnimation = (roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_DISABLE_PICKING_ANIMATION) === 1);

                    if(!disabledPickingAnimation)
                    {
                        const typeId = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_TYPE_ID);
                        const extras = roomObject.model.getValue<string>(RoomObjectVariable.FURNITURE_EXTRAS);
                        const dataKey = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_DATA_FORMAT);
                        const objectData = ObjectDataFactory.getData(dataKey);
                        const icon = this.getFurnitureFloorIcon(typeId, null, extras, objectData).data;

                        if(icon)
                        {
                            const image = TextureUtils.generateImage(icon);

                            if(this.events)
                            {
                                const event = new NitroToolbarAnimateIconEvent(image, screenLocation.x, screenLocation.y);

                                event.iconName = ToolbarIconEnum.INVENTORY;

                                this.events.dispatchEvent(event);
                            }
                        }
                    }
                }
            }
        }

        this.removeRoomObject(roomId, objectId, RoomObjectCategory.FLOOR);
        this.setMouseDefault(roomId, RoomObjectCategory.FLOOR, objectId);

        if(_arg_4) this.refreshTileObjectMap(roomId, 'RoomEngine.disposeObjectFurniture()');
    }

    public getRoomObjectWall(roomId: number, objectId: number): IRoomObjectController
    {
        return this.getObject(this.getRoomId(roomId), objectId, RoomObjectCategory.WALL);
    }

    public removeRoomObjectWall(roomId: number, objectId: number, userId: number = -1): void
    {
        if(this._sessionDataManager && (userId === this._sessionDataManager.userId) && !FurniId.isBuilderClubId(objectId))
        {
            const roomObject = this.getRoomObject(roomId, objectId, RoomObjectCategory.WALL);

            if(roomObject && (roomObject.type.indexOf('post_it') === -1) && (roomObject.type.indexOf('external_image_wallitem') === -1))
            {
                const screenLocation = this.getRoomObjectScreenLocation(roomId, objectId, RoomObjectCategory.WALL, this._activeRoomActiveCanvas);

                if(screenLocation)
                {
                    const typeId = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_TYPE_ID);
                    const objectData = roomObject.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA);
                    const icon = this.getFurnitureWallIcon(typeId, null, objectData).data;

                    if(icon)
                    {
                        const image = TextureUtils.generateImage(icon);

                        if(this.events)
                        {
                            const event = new NitroToolbarAnimateIconEvent(image, screenLocation.x, screenLocation.y);

                            event.iconName = ToolbarIconEnum.INVENTORY;

                            this.events.dispatchEvent(event);
                        }
                    }
                }
            }
        }

        this.removeRoomObject(roomId, objectId, RoomObjectCategory.WALL);
        this.updateRoomObjectMask(roomId, objectId, false);
        this.setMouseDefault(roomId, RoomObjectCategory.WALL, objectId);
    }

    public createRoomObjectWall(roomId: number, id: number, type: string): IRoomObjectController
    {
        return this.createRoomObjectAndInitialize(roomId, id, type, RoomObjectCategory.WALL);
    }

    private removeRoomObject(roomId: number, objectId: number, category: number): void
    {
        const instance = this.getRoomInstance(roomId);

        if(!instance) return null;

        instance.removeRoomObject(objectId, category);

        if(this.events) this.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.REMOVED, roomId, objectId, category));
    }

    public addFurnitureFloor(roomId: number, id: number, typeId: number, location: IVector3D, direction: IVector3D, state: number, objectData: IObjectData, extra: number = NaN, expires: number = -1, usagePolicy: number = 0, ownerId: number = 0, ownerName: string = '', synchronized: boolean = true, realRoomObject: boolean = true, sizeZ: number = -1): boolean
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return false;

        const furnitureData = new RoomFurnitureData(id, typeId, null, location, direction, state, objectData, extra, expires, usagePolicy, ownerId, ownerName, synchronized, realRoomObject, sizeZ);

        instanceData.addPendingFurnitureFloor(furnitureData);

        return true;
    }

    public addFurnitureFloorByTypeName(roomId: number, id: number, typeName: string, location: IVector3D, direction: IVector3D, state: number, objectData: IObjectData, extra: number = NaN, expires: number = -1, usagePolicy: number = 0, ownerId: number = 0, ownerName: string = '', synchronized: boolean = true, realRoomObject: boolean = true, sizeZ: number = -1): boolean
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return false;

        const furnitureData = new RoomFurnitureData(id, 0, typeName, location, direction, state, objectData, extra, expires, usagePolicy, ownerId, ownerName, synchronized, realRoomObject, sizeZ);

        instanceData.addPendingFurnitureFloor(furnitureData);

        return true;
    }

    public addFurnitureWall(roomId: number, id: number, typeId: number, location: IVector3D, direction: IVector3D, state: number, extra: string, expires: number = -1, usagePolicy: number = 0, ownerId: number = 0, ownerName: string = '', realRoomObject: boolean = true): boolean
    {
        const instanceData = this.getRoomInstanceData(roomId);

        if(!instanceData) return false;

        const objectData = new LegacyDataType();

        objectData.setString(extra);

        const furnitureData = new RoomFurnitureData(id, typeId, null, location, direction, state, objectData, NaN, expires, usagePolicy, ownerId, ownerName, true, realRoomObject);

        instanceData.addPendingFurnitureWall(furnitureData);

        return true;
    }

    public updateRoomObjectFloor(roomId: number, objectId: number, location: IVector3D, direction: IVector3D, state: number, data: IObjectData, extra: number = null): boolean
    {
        const object = this.getRoomObjectFloor(roomId, objectId);

        if(!object) return false;

        object.processUpdateMessage(new RoomObjectUpdateMessage(location, direction));
        object.processUpdateMessage(new ObjectDataUpdateMessage(state, data, extra));

        return true;
    }

    public updateRoomObjectWall(roomId: number, objectId: number, location: IVector3D, direction: IVector3D, state: number, extra: string = null): boolean
    {
        const object = this.getRoomObjectWall(roomId, objectId);

        if(!object || !object.logic) return false;

        const updateMessage = new RoomObjectUpdateMessage(location, direction);
        const data = new LegacyDataType();
        const dataUpdateMessage = new ObjectDataUpdateMessage(state, data);

        data.setString(extra);

        object.logic.processUpdateMessage(updateMessage);
        object.logic.processUpdateMessage(dataUpdateMessage);

        this.updateRoomObjectMask(roomId, objectId);

        return true;
    }

    public updateRoomObjectWallItemData(roomId: number, objectId: number, data: string): boolean
    {
        const object = this.getRoomObjectWall(roomId, objectId);

        if(!object || !object.logic) return false;

        object.logic.processUpdateMessage(new ObjectItemDataUpdateMessage(data));

        return true;
    }

    public updateRoomObjectFloorHeight(roomId: number, objectId: number, height: number): boolean
    {
        const object = this.getRoomObjectFloor(roomId, objectId);

        if(!object) return false;

        object.processUpdateMessage(new ObjectHeightUpdateMessage(null, null, height));

        return true;
    }

    public updateRoomObjectFloorExpiration(roomId: number, objectId: number, expires: number): boolean
    {
        const object = this.getRoomObjectFloor(roomId, objectId);

        if(!object) return false;

        object.model.setValue(RoomObjectVariable.FURNITURE_EXPIRY_TIME, expires);
        object.model.setValue(RoomObjectVariable.FURNITURE_EXPIRTY_TIMESTAMP, GetTickerTime());

        return true;
    }

    public updateRoomObjectWallExpiration(roomId: number, objectId: number, expires: number): boolean
    {
        const object = this.getRoomObjectWall(roomId, objectId);

        if(!object) return false;

        object.model.setValue(RoomObjectVariable.FURNITURE_EXPIRY_TIME, expires);
        object.model.setValue(RoomObjectVariable.FURNITURE_EXPIRTY_TIMESTAMP, GetTickerTime());

        return true;
    }

    public updateRoomObjectMask(roomId: number, objectId: number, _arg_3: boolean = true): void
    {
        const maskName = RoomObjectCategory.WALL + '_' + objectId;
        const roomObject = this.getRoomObjectWall(roomId, objectId);

        let maskUpdate: ObjectRoomMaskUpdateMessage = null;

        if(roomObject && roomObject.model)
        {
            if(roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_USES_PLANE_MASK) > 0)
            {
                const maskType = roomObject.model.getValue<string>(RoomObjectVariable.FURNITURE_PLANE_MASK_TYPE);
                const location = roomObject.getLocation();

                if(_arg_3) maskUpdate = new ObjectRoomMaskUpdateMessage(ObjectRoomMaskUpdateMessage.ADD_MASK, maskName, maskType, location);
                else maskUpdate = new ObjectRoomMaskUpdateMessage(ObjectRoomMaskUpdateMessage.REMOVE_MASK, maskName);
            }
        }
        else
        {
            maskUpdate = new ObjectRoomMaskUpdateMessage(ObjectRoomMaskUpdateMessage.REMOVE_MASK, maskName);
        }

        const roomOwnObject = this.getRoomOwnObject(roomId);

        if(roomOwnObject && roomOwnObject.logic && maskUpdate) roomOwnObject.logic.processUpdateMessage(maskUpdate);
    }

    public rollRoomObjectFloor(roomId: number, objectId: number, location: IVector3D, targetLocation: IVector3D): void
    {
        const object = this.getRoomObjectFloor(roomId, objectId);

        if(!object) return;

        object.processUpdateMessage(new ObjectMoveUpdateMessage(location, targetLocation, null, !!targetLocation));
    }

    public updateRoomObjectWallLocation(roomId: number, objectId: number, location: IVector3D): boolean
    {
        const roomObject = this.getRoomObjectWall(roomId, objectId);

        if(!roomObject) return false;

        if(roomObject.logic) roomObject.logic.processUpdateMessage(new ObjectMoveUpdateMessage(location, null, null));

        this.updateRoomObjectMask(roomId, objectId);

        return true;
    }

    public addRoomObjectUser(roomId: number, objectId: number, location: IVector3D, direction: IVector3D, headDirection: number, type: number, figure: string): boolean
    {
        const existing = this.getRoomObjectUser(roomId, objectId);

        if(existing) return false;

        let objectType = RoomObjectUserType.getTypeString(type);

        if(objectType === RoomObjectUserType.PET) objectType = this.getPetType(figure);

        const object = this.createRoomObjectUser(roomId, objectId, objectType);

        if(!object) return false;

        //object.model.setValue(RoomObjectVariable.FIGURE_HIGHLIGHT_ENABLE, 1);

        object.processUpdateMessage(new ObjectAvatarUpdateMessage(this.fixedUserLocation(roomId, location), null, direction, headDirection, false, 0));

        if(figure) object.processUpdateMessage(new ObjectAvatarFigureUpdateMessage(figure));

        if(this.events) this.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.ADDED, roomId, objectId, RoomObjectCategory.UNIT));

        return true;
    }

    public updateRoomObjectUserLocation(roomId: number, objectId: number, location: IVector3D, targetLocation: IVector3D, canStandUp: boolean = false, baseY: number = 0, direction: IVector3D = null, headDirection: number = NaN): boolean
    {
        const object = this.getRoomObjectUser(roomId, objectId);

        if(!object) return false;

        if(!location) location = object.getLocation();

        if(!direction) direction = object.getDirection();

        if(isNaN(headDirection)) headDirection = object.model.getValue<number>(RoomObjectVariable.HEAD_DIRECTION);

        object.processUpdateMessage(new ObjectAvatarUpdateMessage(this.fixedUserLocation(roomId, location), this.fixedUserLocation(roomId, targetLocation), direction, headDirection, canStandUp, baseY));

        const roomSession = ((this._roomSessionManager && this._roomSessionManager.getSession(roomId)) || null);

        if(roomSession && (roomSession.ownRoomIndex === objectId))
        {
            this._logicFactory.events.dispatchEvent(new RoomToObjectOwnAvatarMoveEvent(RoomToObjectOwnAvatarMoveEvent.ROAME_MOVE_TO, targetLocation));
        }

        return true;
    }

    private fixedUserLocation(roomId: number, location: IVector3D): IVector3D
    {
        if(!location) return null;

        const heightMap = this.getFurnitureStackingHeightMap(roomId);
        const wallGeometry = this.getLegacyWallGeometry(roomId);

        if(!heightMap || !wallGeometry) return location;

        let _local_5 = location.z;
        const _local_6 = heightMap.getTileHeight(location.x, location.y);
        const _local_7 = wallGeometry.getHeight(location.x, location.y);

        if((Math.abs((_local_5 - _local_6)) < 0.1) && (Math.abs((_local_6 - _local_7)) < 0.1))
        {
            _local_5 = wallGeometry.getFloorAltitude(location.x, location.y);
        }

        return new Vector3d(location.x, location.y, _local_5);
    }

    public updateRoomObjectUserAction(roomId: number, objectId: number, action: string, value: number, parameter: string = null): boolean
    {
        const object = this.getRoomObjectUser(roomId, objectId);

        if(!object) return false;

        let message: ObjectStateUpdateMessage = null;

        switch(action)
        {
            case RoomObjectVariable.FIGURE_TALK:
                message = new ObjectAvatarChatUpdateMessage(value);
                break;
            case RoomObjectVariable.FIGURE_SLEEP:
                message = new ObjectAvatarSleepUpdateMessage(value === 1);
                break;
            case RoomObjectVariable.FIGURE_IS_TYPING:
                message = new ObjectAvatarTypingUpdateMessage(value === 1);
                break;
            case RoomObjectVariable.FIGURE_IS_MUTED:
                message = new ObjectAvatarMutedUpdateMessage(value === 1);
                break;
            case RoomObjectVariable.FIGURE_CARRY_OBJECT:
                message = new ObjectAvatarCarryObjectUpdateMessage(value, parameter);
                break;
            case RoomObjectVariable.FIGURE_USE_OBJECT:
                message = new ObjectAvatarUseObjectUpdateMessage(value);
                break;
            case RoomObjectVariable.FIGURE_DANCE:
                message = new ObjectAvatarDanceUpdateMessage(value);
                break;
            case RoomObjectVariable.FIGURE_GAINED_EXPERIENCE:
                message = new ObjectAvatarExperienceUpdateMessage(value);
                break;
            case RoomObjectVariable.FIGURE_NUMBER_VALUE:
                message = new ObjectAvatarPlayerValueUpdateMessage(value);
                break;
            case RoomObjectVariable.FIGURE_SIGN:
                message = new ObjectAvatarSignUpdateMessage(value);
                break;
            case RoomObjectVariable.FIGURE_EXPRESSION:
                message = new ObjectAvatarExpressionUpdateMessage(value);
                break;
            case RoomObjectVariable.FIGURE_IS_PLAYING_GAME:
                message = new ObjectAvatarPlayingGameUpdateMessage(value === 1);
                break;
            case RoomObjectVariable.FIGURE_GUIDE_STATUS:
                message = new ObjectAvatarGuideStatusUpdateMessage(value);
                break;
        }

        if(!message) return false;

        object.processUpdateMessage(message);

        return true;
    }

    public updateRoomObjectUserFigure(roomId: number, objectId: number, figure: string, gender: string = null, subType: string = null, isRiding: boolean = false): boolean
    {
        const object = this.getRoomObjectUser(roomId, objectId);

        if(!object) return false;

        object.processUpdateMessage(new ObjectAvatarFigureUpdateMessage(figure, gender, subType, isRiding));

        return true;
    }

    public updateRoomObjectUserFlatControl(roomId: number, objectId: number, level: string): boolean
    {
        const object = this.getRoomObjectUser(roomId, objectId);

        if(!object) return false;

        object.processUpdateMessage(new ObjectAvatarFlatControlUpdateMessage(parseInt(level)));

        return true;
    }

    public updateRoomObjectUserEffect(roomId: number, objectId: number, effectId: number, delay: number = 0): boolean
    {
        const object = this.getRoomObjectUser(roomId, objectId);

        if(!object) return false;

        object.processUpdateMessage(new ObjectAvatarEffectUpdateMessage(effectId, delay));

        return true;
    }

    public updateRoomObjectUserGesture(roomId: number, objectId: number, gestureId: number): boolean
    {
        const object = this.getRoomObjectUser(roomId, objectId);

        if(!object) return false;

        object.processUpdateMessage(new ObjectAvatarGestureUpdateMessage(gestureId));

        return true;
    }

    public updateRoomObjectUserPetGesture(roomId: number, objectId: number, gesture: string): boolean
    {
        const object = this.getRoomObjectUser(roomId, objectId);

        if(!object) return false;

        object.processUpdateMessage(new ObjectAvatarPetGestureUpdateMessage(gesture));

        return true;
    }

    public updateRoomObjectUserPosture(roomId: number, objectId: number, type: string, parameter: string = null): boolean
    {
        const object = this.getRoomObjectUser(roomId, objectId);

        if(!object) return false;

        object.processUpdateMessage(new ObjectAvatarPostureUpdateMessage(type, parameter));

        return true;
    }

    public updateRoomObjectUserOwn(roomId: number, objectId: number): void
    {
        const object = this.getRoomObjectUser(roomId, objectId);

        if(!object) return;

        object.processUpdateMessage(new ObjectAvatarOwnMessage());
    }

    public useRoomObject(objectId: number, category: number): boolean
    {
        const roomObject = this.getRoomObject(this._activeRoomId, objectId, category);

        if(roomObject)
        {
            const eventHandler = roomObject.logic;

            if(eventHandler)
            {
                eventHandler.useObject();

                return true;
            }
        }

        return false;
    }

    public objectInitialized(roomId: string, objectId: number, category: number): void
    {
        const id = this.getRoomIdFromString(roomId);

        if(category === RoomObjectCategory.WALL)
        {
            this.updateRoomObjectMask(id, objectId);
        }

        const object = this.getRoomObject(id, objectId, category);

        if(object && object.model && object.logic)
        {
            const dataFormat = object.model.getValue<number>(RoomObjectVariable.FURNITURE_DATA_FORMAT);

            if(!isNaN(dataFormat))
            {
                const data = ObjectDataFactory.getData(dataFormat);

                data.initializeFromRoomObjectModel(object.model);

                object.processUpdateMessage(new ObjectDataUpdateMessage(object.getState(0), data));
            }

            this.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.CONTENT_UPDATED, id, objectId, category));
        }

        if(roomId !== RoomEngine.TEMPORARY_ROOM) this.addObjectToTileMap(id, object);
    }

    public changeObjectModelData(roomId: number, objectId: number, category: number, numberKey: string, numberValue: number): boolean
    {
        const roomObject = this.getObject(this.getRoomId(roomId), objectId, category);

        if(!roomObject || !roomObject.logic) return false;

        const message = new ObjectModelDataUpdateMessage(numberKey, numberValue);

        roomObject.processUpdateMessage(message);

        return true;
    }

    public changeObjectState(roomId: number, objectId: number, category: number): void
    {
        const roomObject = this.getObject(this.getRoomId(roomId), objectId, category);

        if(!roomObject || !roomObject.model) return;

        let stateIndex = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_AUTOMATIC_STATE_INDEX);

        if(isNaN(stateIndex)) stateIndex = 1;
        else stateIndex = (stateIndex + 1);

        roomObject.model.setValue(RoomObjectVariable.FURNITURE_AUTOMATIC_STATE_INDEX, stateIndex);

        const objectDataKey = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_DATA_FORMAT);
        const objectData = ObjectDataFactory.getData(objectDataKey);

        objectData.initializeFromRoomObjectModel(roomObject.model);

        if(roomObject.logic) roomObject.logic.processUpdateMessage(new ObjectDataUpdateMessage(stateIndex, objectData));
    }

    public loadRoomObjectBadgeImage(roomId: number, objectId: number, objectCategory: number, badgeId: string, groupBadge: boolean = true): void
    {
        if(!this._sessionDataManager) return;

        let roomObject: IRoomObjectController = null;

        if(roomId === 0)
        {
            const room = this._roomManager.getRoomInstance(RoomEngine.TEMPORARY_ROOM);

            if(room) roomObject = (room.getRoomObject(objectId, objectCategory) as IRoomObjectController);
        }
        else
        {
            roomObject = this.getRoomObjectFloor(roomId, objectId);
        }

        if(!roomObject || !roomObject.logic) return;

        let badgeName = (groupBadge) ? this._sessionDataManager.loadGroupBadgeImage(badgeId) : this._sessionDataManager.loadBadgeImage(badgeId);

        if(!badgeName)
        {
            badgeName = 'loading_icon';

            if(!this._badgeListenerObjects) this._badgeListenerObjects = new Map();

            if(!this._badgeListenerObjects.size)
            {
                this._sessionDataManager.events.addEventListener(BadgeImageReadyEvent.IMAGE_READY, this.onBadgeImageReadyEvent);
            }

            let listeners = this._badgeListenerObjects.get(badgeId);

            if(!listeners) listeners = [];

            listeners.push(new RoomObjectBadgeImageAssetListener(roomObject, groupBadge));

            this._badgeListenerObjects.set(badgeId, listeners);
        }
        else
        {
            this.putBadgeInObjectAssets(roomObject, badgeId, groupBadge);
        }

        roomObject.logic.processUpdateMessage(new ObjectGroupBadgeUpdateMessage(badgeId, badgeName));
    }

    private onBadgeImageReadyEvent(k: BadgeImageReadyEvent): void
    {
        if(!this._sessionDataManager) return;

        const listeners = this._badgeListenerObjects && this._badgeListenerObjects.get(k.badgeId);

        if(!listeners) return;

        for(const listener of listeners)
        {
            if(!listener) continue;

            this.putBadgeInObjectAssets(listener.object, k.badgeId, listener.groupBadge);

            const badgeName = (listener.groupBadge) ? this._sessionDataManager.loadGroupBadgeImage(k.badgeId) : this._sessionDataManager.loadBadgeImage(k.badgeId);

            if(listener.object && listener.object.logic) listener.object.logic.processUpdateMessage(new ObjectGroupBadgeUpdateMessage(k.badgeId, badgeName));
        }

        this._badgeListenerObjects.delete(k.badgeId);

        if(!this._badgeListenerObjects.size)
        {
            this._sessionDataManager.events.removeEventListener(BadgeImageReadyEvent.IMAGE_READY, this.onBadgeImageReadyEvent);
        }
    }

    private putBadgeInObjectAssets(object: IRoomObjectController, badgeId: string, groupBadge: boolean = false): void
    {
        if(!this._roomContentLoader || !this._sessionDataManager) return;

        const badgeName = (groupBadge) ? this._sessionDataManager.loadGroupBadgeImage(badgeId) : this._sessionDataManager.loadBadgeImage(badgeId);
        const badgeImage = (groupBadge) ? this._sessionDataManager.getGroupBadgeImage(badgeId) : this._sessionDataManager.getBadgeImage(badgeId);

        if(badgeImage) this._roomContentLoader.addAssetToCollection(object.type, badgeName, badgeImage, false);
    }

    public dispatchMouseEvent(canvasId: number, x: number, y: number, type: string, altKey: boolean, ctrlKey: boolean, shiftKey: boolean, buttonDown: boolean): void
    {
        const canvas = this.getRoomInstanceRenderingCanvas(this._activeRoomId, canvasId);

        if(!canvas) return;

        const overlay = this.getRenderingCanvasOverlay(canvas);
        const sprite = this.getOverlayIconSprite(overlay, RoomEngine.OBJECT_ICON_SPRITE);

        if(sprite)
        {
            const rectangle = sprite.getLocalBounds();

            sprite.x = (x - (rectangle.width / 2));
            sprite.y = (y - (rectangle.height / 2));
        }

        if(!this.handleRoomDragging(canvas, x, y, type, altKey, ctrlKey, shiftKey))
        {
            if(!canvas.handleMouseEvent(x, y, type, altKey, ctrlKey, shiftKey, buttonDown))
            {
                let eventType: string = null;

                if(type === MouseEventType.MOUSE_CLICK)
                {
                    if(this.events)
                    {
                        this.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.DESELECTED, this._activeRoomId, -1, RoomObjectCategory.MINIMUM));
                    }

                    eventType = RoomObjectMouseEvent.CLICK;
                }
                else
                {
                    if(type === MouseEventType.MOUSE_MOVE) eventType = RoomObjectMouseEvent.MOUSE_MOVE;

                    else if(type === MouseEventType.MOUSE_DOWN) eventType = RoomObjectMouseEvent.MOUSE_DOWN;

                    else if(type === MouseEventType.MOUSE_DOWN_LONG) eventType = RoomObjectMouseEvent.MOUSE_DOWN_LONG;

                    else if(type === MouseEventType.MOUSE_UP) eventType = RoomObjectMouseEvent.MOUSE_UP;
                }

                this._roomObjectEventHandler.handleRoomObjectEvent(new RoomObjectMouseEvent(eventType, this.getRoomObject(this._activeRoomId, RoomEngine.ROOM_OBJECT_ID, RoomObjectCategory.ROOM), null, altKey), this._activeRoomId);
            }
        }

        this._activeRoomActiveCanvas = canvasId;
        this._activeRoomActiveCanvasMouseX = x;
        this._activeRoomActiveCanvasMouseY = y;
    }

    private handleRoomDragging(canvas: IRoomRenderingCanvas, x: number, y: number, type: string, altKey: boolean, ctrlKey: boolean, shiftKey: boolean): boolean
    {
        let offsetX = (x - this._activeRoomActiveCanvasMouseX);
        let offsetY = (y - this._activeRoomActiveCanvasMouseY);

        if(type === MouseEventType.MOUSE_DOWN)
        {
            if(!altKey && !ctrlKey && !shiftKey && !this.isDecorating)
            {
                if(this._roomAllowsDragging)
                {
                    this._activeRoomIsDragged = true;
                    this._activeRoomWasDragged = false;
                    this._activeRoomDragStartX = this._activeRoomActiveCanvasMouseX;
                    this._activeRoomDragStartY = this._activeRoomActiveCanvasMouseY;
                }
            }
        }

        else if(type === MouseEventType.MOUSE_UP)
        {
            if(this._activeRoomIsDragged)
            {
                this._activeRoomIsDragged = false;

                if(this._activeRoomWasDragged)
                {
                    const instanceData = this.getRoomInstanceData(this._activeRoomId);

                    if(instanceData)
                    {
                        const camera = instanceData.roomCamera;

                        if(camera)
                        {
                            if(this.useOffsetScrolling)
                            {
                                if(!camera.isMoving)
                                {
                                    camera.centeredLocX = false;
                                    camera.centeredLocY = false;
                                }

                                camera.resetLocation(new Vector3d(-(canvas.screenOffsetX), -(canvas.screenOffsetY)));
                            }

                            if(this._roomDraggingAlwaysCenters) camera.reset();
                        }
                    }
                }
            }
        }

        else if(type === MouseEventType.MOUSE_MOVE)
        {
            if(this._activeRoomIsDragged)
            {
                if(!this._activeRoomWasDragged)
                {
                    offsetX = (x - this._activeRoomDragStartX);
                    offsetY = (y - this._activeRoomDragStartY);

                    if(((((offsetX <= -(RoomEngine.DRAG_THRESHOLD)) || (offsetX >= RoomEngine.DRAG_THRESHOLD)) || (offsetY <= -(RoomEngine.DRAG_THRESHOLD))) || (offsetY >= RoomEngine.DRAG_THRESHOLD)))
                    {
                        this._activeRoomWasDragged = true;
                    }

                    offsetX = 0;
                    offsetY = 0;
                }

                if(((!(offsetX == 0)) || (!(offsetY == 0))))
                {
                    this._activeRoomDragX += offsetX;
                    this._activeRoomDragY += offsetY;

                    this._activeRoomWasDragged = true;
                }
            }
        }

        else if((type === MouseEventType.MOUSE_CLICK) || (type === MouseEventType.DOUBLE_CLICK))
        {
            this._activeRoomIsDragged = false;

            if(this._activeRoomWasDragged)
            {
                this._activeRoomWasDragged = false;

                return true;
            }
        }

        return false;
    }

    public updateMousePointer(type: string, objectId: number, objectType: string): void
    {
        const category = this.getRoomObjectCategoryForType(objectType);

        switch(type)
        {
            case RoomObjectFurnitureActionEvent.MOUSE_BUTTON:
                this.setMouseButton(this._activeRoomId, category, objectId);
                return;
            default:
                this.setMouseDefault(this._activeRoomId, category, objectId);
                return;
        }
    }

    private setMouseButton(roomId: number, category: number, objectId: number): void
    {
        if(!this._roomSessionManager) return;

        const session = this._roomSessionManager.getSession(roomId);

        if(!session) return;

        if(((category !== RoomObjectCategory.FLOOR) && (category !== RoomObjectCategory.WALL)) || ((session.controllerLevel >= RoomControllerLevel.GUEST)))
        {
            const instanceData = this.getRoomInstanceData(roomId);

            if(instanceData)
            {
                if(instanceData.addButtonMouseCursorOwner((category + '_' + objectId))) this._mouseCursorUpdate = true;
            }
        }
    }

    private setMouseDefault(roomId: number, category: number, objectId: number): void
    {
        if(!this._roomSessionManager) return;

        const instanceData = this.getRoomInstanceData(roomId);

        if(instanceData)
        {
            if(instanceData.removeButtonMouseCursorOwner((category + '_' + objectId))) this._mouseCursorUpdate = true;
        }
    }

    public processRoomObjectOperation(objectId: number, category: number, operation: string): boolean
    {
        if(!this._roomObjectEventHandler) return false;

        this._roomObjectEventHandler.modifyRoomObject(this._activeRoomId, objectId, category, operation);
    }

    public modifyRoomObjectDataWithMap(objectId: number, category: number, operation: string, data: Map<string, string>): boolean
    {
        if(!this._roomObjectEventHandler) return false;

        if(category !== RoomObjectCategory.FLOOR) return;

        this._roomObjectEventHandler.modifyRoomObjectDataWithMap(this._activeRoomId, objectId, category, operation, data);
    }

    public modifyRoomObjectData(objectId: number, category: number, colorHex: string, data: string): boolean
    {
        if(!this._roomObjectEventHandler) return false;

        if(category !== RoomObjectCategory.WALL) return;

        this._roomObjectEventHandler.modifyWallItemData(this._activeRoomId, objectId, colorHex, data);
    }

    private processRoomObjectEvent(event: RoomObjectEvent): void
    {
        if(!this._roomObjectEventHandler) return;

        const roomIdString = this.getRoomObjectRoomId(event.object);

        if(!roomIdString) return;

        const roomId = this.getRoomIdFromString(roomIdString);

        this._roomObjectEventHandler.handleRoomObjectEvent(event, roomId);
    }

    public processRoomObjectPlacement(placementSource: string, id: number, category: number, typeId: number, extra: string = null, stuffData: IObjectData = null, state: number = -1, frameNumber: number = -1, posture: string = null): boolean
    {
        const roomInstance = this.getRoomInstance(this._activeRoomId);

        if(!roomInstance || (roomInstance.model.getValue<number>(RoomVariableEnum.ROOM_IS_PUBLIC) !== 0)) return false;

        if(!this._roomObjectEventHandler) return false;

        return this._roomObjectEventHandler.processRoomObjectPlacement(placementSource, this._activeRoomId, id, category, typeId, extra, stuffData, state, frameNumber, posture);
    }

    public getRoomObjectScreenLocation(roomId: number, objectId: number, objectType: number, canvasId: number = -1): Point
    {
        if(canvasId == -1) canvasId = this._activeRoomActiveCanvas;

        const geometry = this.getRoomInstanceGeometry(roomId, canvasId);

        if(!geometry) return null;

        const roomObject = this.getRoomObject(roomId, objectId, objectType);

        if(!roomObject) return null;

        const screenPoint = geometry.getScreenPoint(roomObject.getLocation());

        if(!screenPoint) return null;

        const renderingCanvas = this.getRoomInstanceRenderingCanvas(roomId, canvasId);

        if(!renderingCanvas) return null;

        screenPoint.x = (screenPoint.x * renderingCanvas.scale);
        screenPoint.y = (screenPoint.y * renderingCanvas.scale);

        screenPoint.x += ((renderingCanvas.width / 2) + renderingCanvas.screenOffsetX);
        screenPoint.y += ((renderingCanvas.height / 2) + renderingCanvas.screenOffsetY);

        screenPoint.x = Math.round(screenPoint.x);
        screenPoint.y = Math.round(screenPoint.y);

        return screenPoint;
    }

    public selectRoomObject(roomId: number, objectId: number, objectCategory: number): void
    {
        if(!this._roomObjectEventHandler) return;

        this._roomObjectEventHandler.setSelectedObject(roomId, objectId, objectCategory);
    }

    public setSelectedAvatar(roomId: number, objectId: number): void
    {
        if(this._roomObjectEventHandler) return;

        this._roomObjectEventHandler.setSelectedAvatar(roomId, objectId, true);
    }

    public cancelRoomObjectInsert(): void
    {
        if(!this._roomObjectEventHandler) return;

        this._roomObjectEventHandler.cancelRoomObjectInsert(this._activeRoomId);
    }

    private addOverlayIconSprite(k: NitroSprite, _arg_2: string, _arg_3: Texture<Resource>, scale: number = 1): NitroSprite
    {
        if(!k || !_arg_3) return;

        let sprite = this.getOverlayIconSprite(k, _arg_2);

        if(sprite) return null;

        sprite = new NitroSprite(_arg_3);

        sprite.name = _arg_2;

        sprite.scale.set(scale);

        k.addChild(sprite);

        return sprite;
    }

    public onRoomContentLoaded(id: number, assetName: string, success: boolean): void
    {
        if(!this._roomContentLoader || (id === -1)) return;

        this._thumbnailObjectIdBank.freeNumber((id - 1));

        const listeners = this._thumbnailCallbacks.get(assetName);

        if(listeners)
        {
            this._thumbnailCallbacks.delete(assetName);

            const image = this._roomContentLoader.getImage(assetName);

            if(image)
            {
                for(const listener of listeners)
                {
                    if(!listener) continue;

                    listener.imageReady(id, null, image);
                }
            }
        }
    }

    public setObjectMoverIconSprite(objectId: number, category: number, _arg_3: boolean, instanceData: string = null, stuffData: IObjectData = null, state: number = -1, frameNumber: number = -1, posture: string = null): void
    {
        let type: string = null;
        let colorIndex = 0;
        let imageResult: IImageResult = null;
        const scale = 1;

        if(_arg_3)
        {
            imageResult = this.getRoomObjectImage(this._activeRoomId, objectId, category, new Vector3d(), 1, null);
        }
        else
        {
            if(this._roomContentLoader)
            {
                if(category === RoomObjectCategory.FLOOR)
                {
                    type = this._roomContentLoader.getFurnitureFloorNameForTypeId(objectId);
                    colorIndex = this._roomContentLoader.getFurnitureFloorColorIndex(objectId);
                }

                else if(category === RoomObjectCategory.WALL)
                {
                    type = this._roomContentLoader.getFurnitureWallNameForTypeId(objectId, instanceData);
                    colorIndex = this._roomContentLoader.getFurnitureWallColorIndex(objectId);
                }

                if(category === RoomObjectCategory.UNIT)
                {
                    type = RoomObjectUserType.getTypeString(objectId);

                    if(type === 'pet')
                    {
                        type = this.getPetType(instanceData);

                        const petFigureData = new PetFigureData(instanceData);

                        imageResult = this.getRoomObjectPetImage(petFigureData.typeId, petFigureData.paletteId, petFigureData.color, new Vector3d(180), 64, null, true, 0, petFigureData.customParts, posture);
                    }
                    else
                    {
                        imageResult = this.getGenericRoomObjectImage(type, instanceData, new Vector3d(180), 64, null, 0, null, stuffData, state, frameNumber, posture);
                    }
                }
                else
                {
                    imageResult = this.getGenericRoomObjectImage(type, colorIndex.toString(), new Vector3d(), 1, null, 0, instanceData, stuffData, state, frameNumber, posture);
                }
            }
        }

        if(!imageResult || !imageResult.data) return;

        const canvas = this.getActiveRoomInstanceRenderingCanvas();

        if(!canvas) return;

        const overlay = this.getRenderingCanvasOverlay(canvas);

        this.removeOverlayIconSprite(overlay, RoomEngine.OBJECT_ICON_SPRITE);

        const _local_15 = this.addOverlayIconSprite(overlay, RoomEngine.OBJECT_ICON_SPRITE, imageResult.data, scale);

        if(_local_15)
        {
            _local_15.x = (this._activeRoomActiveCanvasMouseX - (imageResult.data.width / 2));
            _local_15.y = (this._activeRoomActiveCanvasMouseY - (imageResult.data.height / 2));
        }
    }

    public getRoomObjectImage(roomId: number, objectId: number, category: number, direction: IVector3D, scale: number, listener: IGetImageListener, bgColor: number = 0): IImageResult
    {
        if(!this._roomManager) return null;

        let id = -1;
        let type: string = null;
        let data: IObjectData = null;
        let color = '';
        let extras: string = null;

        const roomIdString = this.getRoomId(roomId);
        const roomInstance = this._roomManager.getRoomInstance(roomIdString);

        if(roomInstance)
        {
            const roomObject = roomInstance.getRoomObject(objectId, category);

            if(roomObject && roomObject.model)
            {
                id = roomObject.id;
                type = roomObject.type;

                switch(category)
                {
                    case RoomObjectCategory.FLOOR:
                    case RoomObjectCategory.WALL: {
                        color = (roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_COLOR).toString());
                        extras = roomObject.model.getValue<string>(RoomObjectVariable.FURNITURE_EXTRAS);

                        const dataFormat = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_DATA_FORMAT);

                        if(dataFormat !== LegacyDataType.FORMAT_KEY)
                        {
                            data = ObjectDataFactory.getData(dataFormat);

                            data.initializeFromRoomObjectModel(roomObject.model);
                        }

                        break;
                    }
                    case RoomObjectCategory.UNIT:
                        color = roomObject.model.getValue<string>(RoomObjectVariable.FIGURE);
                        break;
                }
            }
        }

        return this.getGenericRoomObjectImage(type, color, direction, scale, listener, bgColor, extras, data, -1, -1, null, id);
    }

    public getFurnitureFloorIconUrl(typeId: number): string
    {
        let type: string = null;
        let color = '';

        if(this._roomContentLoader)
        {
            type = this._roomContentLoader.getFurnitureFloorNameForTypeId(typeId);
            color = (this._roomContentLoader.getFurnitureFloorColorIndex(typeId).toString());

            return this._roomContentLoader.getAssetIconUrl(type, color);
        }

        return null;
    }

    public getFurnitureFloorIcon(typeId: number, listener: IGetImageListener, extras: string = null, objectData: IObjectData = null): IImageResult
    {
        return this.getFurnitureFloorImage(typeId, new Vector3d(), 1, listener, 0, extras, -1, -1, objectData);
    }

    public getFurnitureWallIconUrl(typeId: number, extra: string = null): string
    {
        let type: string = null;
        let color = '';

        if(this._roomContentLoader)
        {
            type = this._roomContentLoader.getFurnitureWallNameForTypeId(typeId, extra);
            color = (this._roomContentLoader.getFurnitureWallColorIndex(typeId).toString());

            return this._roomContentLoader.getAssetIconUrl(type, color);
        }

        return null;
    }

    public getFurnitureWallIcon(typeId: number, listener: IGetImageListener, extras: string = null): IImageResult
    {
        return this.getFurnitureWallImage(typeId, new Vector3d(), 1, listener, 0, extras);
    }

    public getFurnitureFloorImage(typeId: number, direction: IVector3D, scale: number, listener: IGetImageListener, bgColor: number = 0, extras: string = null, state: number = -1, frameCount: number = -1, objectData: IObjectData = null): IImageResult
    {
        let type: string = null;
        let color = '';

        if(this._roomContentLoader)
        {
            type = this._roomContentLoader.getFurnitureFloorNameForTypeId(typeId);
            color = (this._roomContentLoader.getFurnitureFloorColorIndex(typeId).toString());
        }

        if((scale === 1) && listener)
        {
            return this.getGenericRoomObjectThumbnail(type, color, listener, extras, objectData);
        }

        return this.getGenericRoomObjectImage(type, color, direction, scale, listener, bgColor, extras, objectData, state, frameCount);
    }

    public getFurnitureWallImage(typeId: number, direction: IVector3D, scale: number, listener: IGetImageListener, bgColor: number = 0, extras: string = null, state: number = -1, frameCount: number = -1): IImageResult
    {
        let type: string = null;
        let color = '';

        if(this._roomContentLoader)
        {
            type = this._roomContentLoader.getFurnitureWallNameForTypeId(typeId);
            color = this._roomContentLoader.getFurnitureWallColorIndex(typeId).toString();
        }

        if((scale === 1) && listener)
        {
            return this.getGenericRoomObjectThumbnail(type, color, listener, extras, null);
        }

        return this.getGenericRoomObjectImage(type, color, direction, scale, listener, bgColor, extras, null, state, frameCount);
    }

    public getRoomObjectPetImage(typeId: number, paletteId: number, color: number, direction: IVector3D, scale: number, listener: IGetImageListener, headOnly: boolean = false, bgColor: number = 0, customParts: IPetCustomPart[] = null, posture: string = null): IImageResult
    {
        let type: string = null;
        let value = ((((typeId + ' ') + paletteId) + ' ') + color.toString(16));

        if(headOnly) value = (value + (' ' + 'head'));

        if(customParts)
        {
            value = (value + (' ' + customParts.length));

            for(const _local_13 of customParts)
            {
                value = (value + (((((' ' + _local_13.layerId) + ' ') + _local_13.partId) + ' ') + _local_13.paletteId));
            }
        }

        if(this._roomContentLoader) type = this._roomContentLoader.getPetNameForType(typeId);

        return this.getGenericRoomObjectImage(type, value, direction, scale, listener, bgColor, null, null, -1, -1, posture);
    }

    public getGenericRoomObjectImage(type: string, value: string, direction: IVector3D, scale: number, listener: IGetImageListener, bgColor: number = 0, extras: string = null, objectData: IObjectData = null, state: number = -1, frameCount: number = -1, posture: string = null, originalId: number = -1): IImageResult
    {
        if(!this._roomManager) return null;

        const imageResult = new ImageResult();

        imageResult.id = -1;

        if(!this._ready || !type) return imageResult;

        let roomInstance = this._roomManager.getRoomInstance(RoomEngine.TEMPORARY_ROOM);

        if(!roomInstance)
        {
            roomInstance = this._roomManager.createRoomInstance(RoomEngine.TEMPORARY_ROOM);

            if(!roomInstance) return imageResult;
        }

        let objectId = this._imageObjectIdBank.reserveNumber();
        const objectCategory = this.getRoomObjectCategoryForType(type);

        if(objectId < 0) return imageResult;

        objectId++;

        const roomObject = (roomInstance.createRoomObjectAndInitalize(objectId, type, objectCategory) as IRoomObjectController);

        if(!roomObject || !roomObject.model || !roomObject.logic) return imageResult;

        const model = roomObject.model;

        switch(objectCategory)
        {
            case RoomObjectCategory.FLOOR:
            case RoomObjectCategory.WALL:
                model.setValue(RoomObjectVariable.FURNITURE_COLOR, parseInt(value));
                model.setValue(RoomObjectVariable.FURNITURE_EXTRAS, extras);
                break;
            case RoomObjectCategory.UNIT:
                if((type === RoomObjectUserType.USER) || (type === RoomObjectUserType.BOT) || (type === RoomObjectUserType.RENTABLE_BOT) || (type === RoomObjectUserType.PET))
                {
                    model.setValue(RoomObjectVariable.FIGURE, value);
                }
                else
                {
                    const figureData = new PetFigureData(value);

                    model.setValue(RoomObjectVariable.PET_PALETTE_INDEX, figureData.paletteId);
                    model.setValue(RoomObjectVariable.PET_COLOR, figureData.color);

                    if(figureData.headOnly) model.setValue(RoomObjectVariable.PET_HEAD_ONLY, 1);

                    if(figureData.hasCustomParts)
                    {
                        model.setValue(RoomObjectVariable.PET_CUSTOM_LAYER_IDS, figureData.customLayerIds);
                        model.setValue(RoomObjectVariable.PET_CUSTOM_PARTS_IDS, figureData.customPartIds);
                        model.setValue(RoomObjectVariable.PET_CUSTOM_PALETTE_IDS, figureData.customPaletteIds);
                    }

                    if(posture) model.setValue(RoomObjectVariable.FIGURE_POSTURE, posture);
                }
                break;
            case RoomObjectCategory.ROOM:
                break;
        }

        roomObject.setDirection(direction);

        const visualization = roomObject.visualization;

        if(!visualization)
        {
            roomInstance.removeRoomObject(objectId, objectCategory);

            return imageResult;
        }

        if((state > -1) || objectData)
        {
            if(objectData && (objectData.getLegacyString() !== ''))
            {
                roomObject.logic.processUpdateMessage(new ObjectDataUpdateMessage(parseInt(objectData.getLegacyString()), objectData));
            }
            else
            {
                roomObject.logic.processUpdateMessage(new ObjectDataUpdateMessage(state, objectData));
            }
        }

        const geometry = new RoomGeometry(scale, new Vector3d(-135, 30, 0), new Vector3d(11, 11, 5));

        visualization.update(geometry, 0, true, false);

        if(frameCount > 0)
        {
            let i = 0;

            while(i < frameCount)
            {
                visualization.update(geometry, 0, true, false);

                i++;
            }
        }

        const texture = visualization.getImage(bgColor, originalId);

        imageResult.data = texture;
        imageResult.id = objectId;

        if(!this.isRoomContentTypeLoaded(type) && listener)
        {
            let imageListeners = this._imageCallbacks.get(objectId.toString());

            if(!imageListeners)
            {
                imageListeners = [];

                this._imageCallbacks.set(objectId.toString(), imageListeners);
            }

            imageListeners.push(listener);

            model.setValue(RoomObjectVariable.IMAGE_QUERY_SCALE, scale);
        }
        else
        {
            roomInstance.removeRoomObject(objectId, objectCategory);

            this._imageObjectIdBank.freeNumber((objectId - 1));

            imageResult.id = 0;
        }

        geometry.dispose();

        return imageResult;
    }

    public getGenericRoomObjectThumbnail(type: string, param: string, listener: IGetImageListener, extraData: string = null, stuffData: IObjectData = null): IImageResult
    {
        if(!this._roomManager) return null;

        const imageResult = new ImageResult();

        imageResult.id = -1;

        if(!this._ready || !type) return imageResult;

        let roomInstance = this._roomManager.getRoomInstance(RoomEngine.TEMPORARY_ROOM);

        if(!roomInstance)
        {
            roomInstance = this._roomManager.createRoomInstance(RoomEngine.TEMPORARY_ROOM);

            if(!roomInstance) return imageResult;
        }

        let objectId = this._thumbnailObjectIdBank.reserveNumber();
        const objectCategory = this.getRoomObjectCategoryForType(type);

        if(objectId < 0) return imageResult;

        objectId++;

        imageResult.id = objectId;
        imageResult.data = null;
        imageResult.image = null;

        const assetName = [type, param].join('_');

        const asset = this._roomContentLoader.getImage(assetName);

        if(!asset && listener)
        {
            let contentListeners = this._thumbnailCallbacks.get(assetName);

            if(!contentListeners)
            {
                contentListeners = [];

                this._thumbnailCallbacks.set(assetName, contentListeners);

                this._roomContentLoader.downloadImage(objectId, type, param, null);
            }

            contentListeners.push(listener);
        }
        else
        {
            if(asset)
            {
                imageResult.image = asset;
            }

            this._thumbnailObjectIdBank.freeNumber((objectId - 1));

            imageResult.id = 0;
        }

        return imageResult;
    }

    public initalizeTemporaryObjectsByType(type: string, _arg_2: boolean): void
    {
        const roomInstance = this._roomManager.getRoomInstance(RoomEngine.TEMPORARY_ROOM);

        if(!roomInstance || !this._roomContentLoader) return;

        const objectCategory = this._roomContentLoader.getCategoryForType(type);
        const objectManager = roomInstance.getManager(objectCategory);

        let geometry: RoomGeometry = null;
        let scale = 0;

        if(objectManager && objectManager.objects.length)
        {
            for(const roomObject of objectManager.objects.getValues())
            {
                if(roomObject && roomObject.model && (roomObject.type === type))
                {
                    const objectId = roomObject.id;
                    const visualization = roomObject.visualization;

                    let texture: RenderTexture = null;

                    if(visualization)
                    {
                        const imageScale = roomObject.model.getValue<number>(RoomObjectVariable.IMAGE_QUERY_SCALE);

                        if(geometry && (scale !== imageScale))
                        {
                            geometry.dispose();

                            geometry = null;
                        }

                        if(!geometry)
                        {
                            scale = imageScale;

                            geometry = new RoomGeometry(imageScale, new Vector3d(-135, 30, 0), new Vector3d(11, 11, 5));
                        }

                        visualization.update(geometry, 0, true, false);

                        texture = visualization.image;
                    }

                    roomInstance.removeRoomObject(objectId, objectCategory);

                    this._imageObjectIdBank.freeNumber((objectId - 1));

                    const imageListeners = this._imageCallbacks.get(objectId.toString());

                    if(imageListeners)
                    {
                        this._imageCallbacks.delete(objectId.toString());

                        for(const imageListener of imageListeners)
                        {
                            if(!imageListener) continue;

                            if(texture) imageListener.imageReady(objectId, texture);
                            else imageListener.imageFailed(objectId);
                        }
                    }
                }
            }
        }

        if(geometry) geometry.dispose();
    }

    public setObjectMoverIconSpriteVisible(k: boolean): void
    {
        const canvas = this.getActiveRoomInstanceRenderingCanvas();

        if(!canvas) return;

        const overlay = this.getRenderingCanvasOverlay(canvas);
        const sprite = this.getOverlayIconSprite(overlay, RoomEngine.OBJECT_ICON_SPRITE);

        if(sprite)
        {
            sprite.visible = k;
        }
    }

    public removeObjectMoverIconSprite(): void
    {
        const canvas = this.getActiveRoomInstanceRenderingCanvas();

        if(!canvas) return;

        const sprite = this.getRenderingCanvasOverlay(canvas);

        this.removeOverlayIconSprite(sprite, RoomEngine.OBJECT_ICON_SPRITE);
    }

    private getRenderingCanvasOverlay(k: IRoomRenderingCanvas): NitroSprite
    {
        if(!k) return null;

        const displayObject = (k.master as Container);

        if(!displayObject) return null;

        return ((displayObject.getChildByName(RoomEngine.OVERLAY) as NitroSprite) || null);
    }

    private removeOverlayIconSprite(k: NitroSprite, _arg_2: string): boolean
    {
        if(!k) return false;

        let index = (k.children.length - 1);

        while(index >= 0)
        {
            const child = (k.getChildAt(index) as NitroSprite);

            if(child)
            {
                if(child.name === _arg_2)
                {
                    k.removeChildAt(index);

                    if(child.children.length)
                    {
                        const firstChild = (child.getChildAt(0) as NitroSprite);

                        firstChild.parent.removeChild(firstChild);

                        firstChild.destroy();
                    }

                    return true;
                }
            }

            index--;
        }

        return false;
    }

    private getOverlayIconSprite(k: NitroSprite, _arg_2: string): NitroSprite
    {
        if(!k) return null;

        let index = (k.children.length - 1);

        while(index >= 0)
        {
            const child = (k.getChildAt(index) as NitroSprite);

            if(child)
            {
                if(child.name === _arg_2) return child;
            }

            index--;
        }

        return null;
    }

    public getRoomObjects(roomId: number, category: number): IRoomObject[]
    {
        if(this._ready)
        {
            const _local_3 = this.getRoomId(roomId);
            const _local_4 = this._roomManager.getRoomInstance(_local_3);


            if(_local_4) return _local_4.getRoomObjectsForCategory(category);
        }

        return [];
    }

    protected addObjectToTileMap(k: number, _arg_2: IRoomObject): void
    {
        const tileObjectMap = this.getRoomInstanceData(k).tileObjectMap;

        if(tileObjectMap) tileObjectMap.addRoomObject(_arg_2);
    }

    public refreshTileObjectMap(k: number, _arg_2: string): void
    {
        const tileObjectMap = this.getRoomInstanceData(k).tileObjectMap;

        if(tileObjectMap) tileObjectMap.populate(this.getRoomObjects(k, RoomObjectCategory.FLOOR));
    }

    public getRenderRoomMessage(k: Rectangle, _arg_2: number, _arg_3: boolean = false, _arg_4: boolean = true, _arg_5: boolean = false, canvasId: number = -1): IMessageComposer<unknown[]>
    {
        let canvas: IRoomRenderingCanvas = null;

        if(canvasId > -1)
        {
            canvas = this.getRoomInstanceRenderingCanvas(this._activeRoomId, canvasId);
        }
        else
        {
            canvas = this.getActiveRoomInstanceRenderingCanvas();
        }

        if(!canvas) return null;

        if(_arg_5)
        {
            canvas.skipSpriteVisibilityChecking();
        }

        let _local_8 = -1;

        if(((!(_arg_4)) && (!(this._roomSessionManager.getSession(this._activeRoomId) == null))))
        {
            _local_8 = this._roomSessionManager.getSession(this._activeRoomId).ownRoomIndex;
        }

        const _local_9 = new SpriteDataCollector();
        const _local_10 = _local_9.getFurniData(k, canvas, this, _local_8);
        const _local_11 = _local_9.getRoomRenderingModifiers(this);
        const _local_12 = _local_9.getRoomPlanes(k, canvas, this, _arg_2);

        if(_arg_5) canvas.resumeSpriteVisibilityChecking();

        if(_arg_3)
        {
            //return new RenderRoomThumbnailMessageComposer(_local_12, _local_10, _local_11, this._activeRoomId, this._sessionDataManager._Str_8500);
        }

        NitroLogger.log(_local_10, _local_11, _local_12);

        //return new RenderRoomMessageComposer(_local_12, _local_10, _local_11, this._activeRoomId, this._sessionDataManager._Str_8500);

        return null;
    }

    public createTextureFromRoom(roomId: number, canvasId: number = -1, bounds: Rectangle = null): RenderTexture
    {
        let canvas: IRoomRenderingCanvas = null;

        if(canvasId > -1)
        {
            canvas = this.getRoomInstanceRenderingCanvas(this._activeRoomId, canvasId);
        }
        else
        {
            canvas = this.getActiveRoomInstanceRenderingCanvas();
        }

        let texture: RenderTexture = null;

        if(bounds)
        {
            texture = TextureUtils.generateTexture(canvas.master, bounds);
        }
        else
        {
            texture = canvas.getDisplayAsTexture();
        }

        return texture;
    }

    public saveTextureAsScreenshot(texture: RenderTexture, saveAsThumbnail: boolean = false): void
    {
        let composer: RenderRoomMessageComposer = null;

        if(saveAsThumbnail) composer = new RenderRoomThumbnailMessageComposer();
        else composer = new RenderRoomMessageComposer();

        composer.assignBitmap(texture);

        this._communication.connection.send(composer);
    }

    public saveBase64AsScreenshot(base64: string, saveAsThumbnail: boolean = false): void
    {
        let composer: RenderRoomMessageComposer = null;

        if(saveAsThumbnail) composer = new RenderRoomThumbnailMessageComposer();
        else composer = new RenderRoomMessageComposer();

        composer.assignBase64(base64);

        this._communication.connection.send(composer);
    }

    public objectsInitialized(k: string): void
    {
        const roomId = this.getRoomIdFromString(k);

        this.events.dispatchEvent(new RoomEngineEvent(RoomEngineEvent.OBJECTS_INITIALIZED, roomId));
    }

    public getRoomId(id: number): string
    {
        return (id.toString());
    }

    private getRoomIdFromString(roomId: string): number
    {
        if(!roomId) return -1;

        const split = roomId.split('_');

        if(split.length <= 0) return -1;

        return (parseInt(split[0]) || 0);
    }

    private getRoomObjectRoomId(object: IRoomObject): string
    {
        if(!object || !object.model) return null;

        return (object.model.getValue<string>(RoomObjectVariable.OBJECT_ROOM_ID));
    }

    private getRoomObjectAdUrl(type: string): string
    {
        return this._roomContentLoader.getRoomObjectAdUrl(type);
    }

    public getPetTypeId(figure: string): number
    {
        let type = -1;

        if(figure)
        {
            const parts = figure.split(' ');

            if(parts.length > 1) type = parseInt(parts[0]);
        }

        return type;
    }

    private getPetType(type: string): string
    {
        if(!type) return null;

        const parts = type.split(' ');

        if(parts.length > 1)
        {
            const typeId = parseInt(parts[0]);

            if(this._roomContentLoader) return this._roomContentLoader.getPetNameForType(typeId);

            return 'pet';
        }

        return null;
    }

    public isRoomContentTypeLoaded(name: string): boolean
    {
        if(!this._roomContentLoader) return false;

        return (this._roomContentLoader.getCollection(name) !== null);
    }

    public getPetColorResult(petIndex: number, paletteIndex: number): IPetColorResult
    {
        if(!this._roomContentLoader) return null;

        return this._roomContentLoader.getPetColorResult(petIndex, paletteIndex);
    }

    public getPetColorResultsForTag(petIndex: number, tagName: string): IPetColorResult[]
    {
        if(!this._roomContentLoader) return null;

        return this._roomContentLoader.getPetColorResultsForTag(petIndex, tagName);
    }

    public deleteRoomObject(objectId: number, objectCategory: number): boolean
    {
        if(!this._roomObjectEventHandler || (objectCategory !== RoomObjectCategory.WALL)) return false;

        return this._roomObjectEventHandler.deleteWallItem(this._activeRoomId, objectId);
    }

    public get connection(): IConnection
    {
        return this._communication.connection;
    }

    public get sessionDataManager(): ISessionDataManager
    {
        return this._sessionDataManager;
    }

    public set sessionDataManager(manager: ISessionDataManager)
    {
        this._sessionDataManager = manager;
    }

    public get roomSessionManager(): IRoomSessionManager
    {
        return this._roomSessionManager;
    }

    public set roomSessionManager(manager: IRoomSessionManager)
    {
        this._roomSessionManager = manager;
    }

    public get roomManager(): IRoomManager
    {
        return this._roomManager;
    }

    public set roomManager(manager: IRoomManager)
    {
        this._roomManager = manager;
    }

    public get objectEventHandler(): RoomObjectEventHandler
    {
        return this._roomObjectEventHandler;
    }

    public get roomRendererFactory(): IRoomRendererFactory
    {
        return this._roomRendererFactory;
    }

    public get visualizationFactory(): IRoomObjectVisualizationFactory
    {
        return this._visualizationFactory;
    }

    public get logicFactory(): IRoomObjectLogicFactory
    {
        return this._logicFactory;
    }

    public get activeRoomId(): number
    {
        return this._activeRoomId;
    }

    public get ready(): boolean
    {
        return this._ready;
    }

    public get roomContentLoader(): IRoomContentLoader
    {
        return this._roomContentLoader;
    }

    public get isDecorating(): boolean
    {
        if(!this._roomSessionManager) return false;

        const session = this._roomSessionManager.getSession(this._activeRoomId);

        return (session && session.isDecorating) || false;
    }

    private get useOffsetScrolling(): boolean
    {
        return true;
    }

    public get selectedAvatarId(): number
    {
        if(!this._roomObjectEventHandler) return -1;

        return this._roomObjectEventHandler.selectedAvatarId;
    }

    public getRoomObjectCount(roomId: number, categoryId: number): number
    {
        if(this._roomManager == null) return 0;

        return this._roomManager.getRoomInstance(roomId.toString()).getRoomObjectsForCategory(categoryId).length;
    }
}
