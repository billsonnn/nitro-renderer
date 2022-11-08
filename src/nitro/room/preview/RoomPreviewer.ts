import { RenderTexture, Texture } from '@pixi/core';
import { Container, DisplayObject } from '@pixi/display';
import { Point, Rectangle } from '@pixi/math';
import { Sprite } from '@pixi/sprite';
import { IGetImageListener, IImageResult, IObjectData, IRoomEngine, IRoomObjectController, IRoomRenderingCanvas, IVector3D, LegacyDataType, RoomObjectCategory, RoomObjectUserType, RoomObjectVariable, Vector3d } from '../../../api';
import { RoomEngineEvent, RoomEngineObjectEvent } from '../../../events';
import { GetTickerTime, NitroSprite } from '../../../pixi-proxy';
import { RoomId } from '../../../room';
import { FloorHeightMapMessageParser, RoomEntryTileMessageParser } from '../../communication';
import { ObjectRoomMapUpdateMessage } from '../messages';
import { RoomPlaneParser } from '../object/RoomPlaneParser';
import { RoomEngine } from '../RoomEngine';
import { LegacyWallGeometry } from '../utils/LegacyWallGeometry';

export class RoomPreviewer
{
    public static SCALE_NORMAL: number = 64;
    public static SCALE_SMALL: number = 32;
    public static PREVIEW_COUNTER: number = 0;
    public static PREVIEW_CANVAS_ID: number = 1;
    public static PREVIEW_OBJECT_ID: number = 1;
    public static PREVIEW_OBJECT_LOCATION_X: number = 2;
    public static PREVIEW_OBJECT_LOCATION_Y: number = 2;

    private static ALLOWED_IMAGE_CUT: number = 0.25;
    private static AUTOMATIC_STATE_CHANGE_INTERVAL: number = 2500;
    private static ZOOM_ENABLED: boolean = true;

    private _roomEngine: IRoomEngine;
    private _planeParser: RoomPlaneParser;
    private _previewRoomId: number = 1;
    private _currentPreviewObjectType: number = 0;
    private _currentPreviewObjectCategory: number = 0;
    private _currentPreviewObjectData: string = '';
    private _currentPreviewRectangle: Rectangle = null;
    private _currentPreviewCanvasWidth: number = 0;
    private _currentPreviewCanvasHeight: number = 0;
    private _currentPreviewScale: number = 64;
    private _currentPreviewNeedsZoomOut: boolean;
    private _automaticStateChange: boolean;
    private _previousAutomaticStateChangeTime: number;
    private _addViewOffset: Point;
    private _backgroundColor: number = 305148561;
    private _backgroundSprite: Sprite = null;
    private _disableUpdate: boolean = false;

    constructor(roomEngine: IRoomEngine, roomId: number = 1)
    {
        this._roomEngine = roomEngine;
        this._planeParser = new RoomPlaneParser();
        this._previewRoomId = RoomId.makeRoomPreviewerId(roomId);
        this._addViewOffset = new Point(0, 0);

        this.onRoomObjectAdded = this.onRoomObjectAdded.bind(this);
        this.onRoomInitializedonRoomInitialized = this.onRoomInitializedonRoomInitialized.bind(this);

        if(this.isRoomEngineReady && this._roomEngine.events)
        {
            this._roomEngine.events.addEventListener(RoomEngineObjectEvent.ADDED, this.onRoomObjectAdded);
            this._roomEngine.events.addEventListener(RoomEngineObjectEvent.CONTENT_UPDATED, this.onRoomObjectAdded);
            this._roomEngine.events.addEventListener(RoomEngineEvent.INITIALIZED, this.onRoomInitializedonRoomInitialized);
        }

        this.createRoomForPreview();
    }

    public dispose(): void
    {
        this.reset(true);

        if(this.isRoomEngineReady && this._roomEngine.events)
        {
            this._roomEngine.events.removeEventListener(RoomEngineObjectEvent.ADDED, this.onRoomObjectAdded);
            this._roomEngine.events.removeEventListener(RoomEngineObjectEvent.CONTENT_UPDATED, this.onRoomObjectAdded);
            this._roomEngine.events.removeEventListener(RoomEngineEvent.INITIALIZED, this.onRoomInitializedonRoomInitialized);
        }

        if(this._backgroundSprite)
        {
            this._backgroundSprite.destroy();

            this._backgroundSprite = null;
        }

        if(this._planeParser)
        {
            this._planeParser.dispose();

            this._planeParser = null;
        }
    }

    private createRoomForPreview(): void
    {
        if(this.isRoomEngineReady)
        {
            const size = 7;

            const planeParser = new RoomPlaneParser();

            planeParser.initializeTileMap((size + 2), (size + 2));

            let y = 1;

            while(y < (1 + size))
            {
                let x = 1;

                while(x < (1 + size))
                {
                    planeParser.setTileHeight(x, y, 0);

                    x++;
                }

                y++;
            }

            planeParser.initializeFromTileData();

            this._roomEngine.createRoomInstance(this._previewRoomId, planeParser.getMapData());

            planeParser.dispose();
        }
    }

    public reset(k: boolean): void
    {
        if(this.isRoomEngineReady)
        {
            this._roomEngine.removeRoomObjectFloor(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID);
            this._roomEngine.removeRoomObjectWall(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID);
            this._roomEngine.removeRoomObjectUser(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID);

            if(!k) this.updatePreviewRoomView();
        }

        this._currentPreviewObjectCategory = RoomObjectCategory.MINIMUM;
    }

    public updatePreviewModel(model: string, wallHeight: number, scale: boolean = true): void
    {
        const parser = new FloorHeightMapMessageParser();

        parser.flush();
        parser.parseModel(model, wallHeight, scale);

        //@ts-ignore
        const wallGeometry = (this._roomEngine as IRoomCreator).getLegacyWallGeometry(this._previewRoomId);

        if(!wallGeometry) return;

        this._planeParser.reset();

        const width = parser.width;
        const height = parser.height;

        this._planeParser.initializeTileMap(width, height);

        const entryTile: RoomEntryTileMessageParser = null;

        let doorX = -1;
        let doorY = -1;
        let doorZ = 0;
        let doorDirection = 0;

        let y = 0;

        while(y < height)
        {
            let x = 0;

            while(x < width)
            {
                const tileHeight = parser.getHeight(x, y);

                if(((((y > 0) && (y < (height - 1))) || ((x > 0) && (x < (width - 1)))) && (!(tileHeight == RoomPlaneParser.TILE_BLOCKED))) && ((entryTile == null) || ((x == entryTile.x) && (y == entryTile.y))))
                {
                    if(((parser.getHeight(x, (y - 1)) == RoomPlaneParser.TILE_BLOCKED) && (parser.getHeight((x - 1), y) == RoomPlaneParser.TILE_BLOCKED)) && (parser.getHeight(x, (y + 1)) == RoomPlaneParser.TILE_BLOCKED))
                    {
                        doorX = (x + 0.5);
                        doorY = y;
                        doorZ = tileHeight;
                        doorDirection = 90;
                    }

                    if(((parser.getHeight(x, (y - 1)) == RoomPlaneParser.TILE_BLOCKED) && (parser.getHeight((x - 1), y) == RoomPlaneParser.TILE_BLOCKED)) && (parser.getHeight((x + 1), y) == RoomPlaneParser.TILE_BLOCKED))
                    {
                        doorX = x;
                        doorY = (y + 0.5);
                        doorZ = tileHeight;
                        doorDirection = 180;
                    }
                }

                this._planeParser.setTileHeight(x, y, tileHeight);

                x++;
            }

            y++;
        }

        this._planeParser.setTileHeight(Math.floor(doorX), Math.floor(doorY), doorZ);
        this._planeParser.initializeFromTileData(parser.wallHeight);
        this._planeParser.setTileHeight(Math.floor(doorX), Math.floor(doorY), (doorZ + this._planeParser.wallHeight));

        wallGeometry.scale = LegacyWallGeometry.DEFAULT_SCALE;
        wallGeometry.initialize(width, height, this._planeParser.floorHeight);

        let heightIterator = (parser.height - 1);

        while(heightIterator >= 0)
        {
            let widthIterator = (parser.width - 1);

            while(widthIterator >= 0)
            {
                wallGeometry.setHeight(widthIterator, heightIterator, this._planeParser.getTileHeight(widthIterator, heightIterator));
                widthIterator--;
            }

            heightIterator--;
        }

        const roomMap = this._planeParser.getMapData();

        roomMap.doors.push({
            x: doorX,
            y: doorY,
            z: doorZ,
            dir: doorDirection
        });

        const roomObject = this.getRoomPreviewOwnRoomObject();

        if(roomObject) roomObject.processUpdateMessage(new ObjectRoomMapUpdateMessage(roomMap));
    }

    public addFurnitureIntoRoom(classId: number, direction: IVector3D, objectData: IObjectData = null, extra: string = null): number
    {
        if(!objectData) objectData = new LegacyDataType();

        if(this.isRoomEngineReady)
        {
            this.reset(false);

            this._currentPreviewObjectType = classId;
            this._currentPreviewObjectCategory = RoomObjectCategory.FLOOR;
            this._currentPreviewObjectData = '';

            if(this._roomEngine.addFurnitureFloor(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, classId, new Vector3d(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y, 0), direction, 0, objectData, NaN, -1, 0, -1, '', true, false))
            {
                this._previousAutomaticStateChangeTime = GetTickerTime();
                this._automaticStateChange = true;

                const roomObject = this._roomEngine.getRoomObject(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory);

                if(roomObject && extra) roomObject.model.setValue(RoomObjectVariable.FURNITURE_EXTRAS, extra);

                this.updatePreviewRoomView();

                return RoomPreviewer.PREVIEW_OBJECT_ID;
            }
        }

        return -1;
    }

    public addWallItemIntoRoom(classId: number, direction: IVector3D, objectData: string): number
    {
        if(this.isRoomEngineReady)
        {
            if((this._currentPreviewObjectCategory === RoomObjectCategory.WALL) && (this._currentPreviewObjectType === classId) && (this._currentPreviewObjectData === objectData)) return RoomPreviewer.PREVIEW_OBJECT_ID;

            this.reset(false);

            this._currentPreviewObjectType = classId;
            this._currentPreviewObjectCategory = RoomObjectCategory.WALL;
            this._currentPreviewObjectData = objectData;

            if(this._roomEngine.addFurnitureWall(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, classId, new Vector3d(0.5, 2.3, 1.8), direction, 0, objectData, 0, 0, -1, '', false))
            {
                this._previousAutomaticStateChangeTime = GetTickerTime();
                this._automaticStateChange = true;

                this.updatePreviewRoomView();

                return RoomPreviewer.PREVIEW_OBJECT_ID;
            }
        }

        return -1;
    }

    public addAvatarIntoRoom(figure: string, effect: number): number
    {
        if(this.isRoomEngineReady)
        {
            this.reset(false);

            this._currentPreviewObjectType = 1;
            this._currentPreviewObjectCategory = RoomObjectCategory.UNIT;
            this._currentPreviewObjectData = figure;

            if(this._roomEngine.addRoomObjectUser(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, new Vector3d(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y, 0), new Vector3d(90, 0, 0), 135, RoomObjectUserType.getTypeNumber(RoomObjectUserType.USER), figure))
            {
                this._previousAutomaticStateChangeTime = GetTickerTime();
                this._automaticStateChange = true;

                this.updateUserGesture(1);
                this.updateUserEffect(effect);
                this.updateUserPosture('std');
            }

            this.updatePreviewRoomView();

            return RoomPreviewer.PREVIEW_OBJECT_ID;
        }

        return -1;
    }

    public addPetIntoRoom(figure: string): number
    {
        if(this.isRoomEngineReady)
        {
            this.reset(false);

            this._currentPreviewObjectType = 1;
            this._currentPreviewObjectCategory = RoomObjectCategory.UNIT;
            this._currentPreviewObjectData = figure;

            if(this._roomEngine.addRoomObjectUser(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, new Vector3d(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y, 0), new Vector3d(90, 0, 0), 90, RoomObjectUserType.getTypeNumber(RoomObjectUserType.PET), figure))
            {
                this._previousAutomaticStateChangeTime = GetTickerTime();
                this._automaticStateChange = false;

                this.updateUserGesture(1);
                this.updateUserPosture('std');
            }

            this.updatePreviewRoomView();

            return RoomPreviewer.PREVIEW_OBJECT_ID;
        }

        return -1;
    }

    public updateUserPosture(type: string, parameter: string = ''): void
    {
        if(this.isRoomEngineReady) this._roomEngine.updateRoomObjectUserPosture(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, type, parameter);
    }

    public updateUserGesture(gestureId: number): void
    {
        if(this.isRoomEngineReady) this._roomEngine.updateRoomObjectUserGesture(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, gestureId);
    }

    public updateUserEffect(effectId: number): void
    {
        if(this.isRoomEngineReady) this._roomEngine.updateRoomObjectUserEffect(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, effectId);
    }

    public updateObjectUserFigure(figure: string, gender: string = null, subType: string = null, isRiding: boolean = false): boolean
    {
        if(this.isRoomEngineReady) return this._roomEngine.updateRoomObjectUserFigure(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, figure, gender, subType, isRiding);

        return false;
    }

    public updateObjectUserAction(action: string, value: number, parameter: string = null): void
    {
        if(this.isRoomEngineReady) this._roomEngine.updateRoomObjectUserAction(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, action, value, parameter);
    }

    public updateObjectStuffData(stuffData: IObjectData): void
    {
        if(this.isRoomEngineReady) this._roomEngine.updateRoomObjectFloor(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, null, null, stuffData.state, stuffData);
    }

    public changeRoomObjectState(): void
    {
        if(this.isRoomEngineReady)
        {
            this._automaticStateChange = false;

            if(this._currentPreviewObjectCategory !== RoomObjectCategory.UNIT) this._roomEngine.changeObjectState(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory);
        }
    }

    public changeRoomObjectDirection(): void
    {
        if(this.isRoomEngineReady)
        {
            const roomObject = this._roomEngine.getRoomObject(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory);

            if(!roomObject) return;

            const direction = this._roomEngine.objectEventHandler.getValidRoomObjectDirection(roomObject, true);

            switch(this._currentPreviewObjectCategory)
            {
                case RoomObjectCategory.FLOOR: {
                    const floorLocation = new Vector3d(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y);
                    const floorDirection = new Vector3d(direction, direction, direction);

                    this._roomEngine.updateRoomObjectFloor(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, floorLocation, floorDirection, null, null);
                    return;
                }
                case RoomObjectCategory.WALL:
                    //this._roomEngine.updateRoomObjectWall(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, null, direction, null, null);
                    return;
            }
        }
    }

    private checkAutomaticRoomObjectStateChange(): void
    {
        if(this._automaticStateChange)
        {
            const time = GetTickerTime();

            if(time > (this._previousAutomaticStateChangeTime + RoomPreviewer.AUTOMATIC_STATE_CHANGE_INTERVAL))
            {
                this._previousAutomaticStateChangeTime = time;

                if(this.isRoomEngineReady) this._roomEngine.changeObjectState(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory);
            }
        }
    }

    public getRoomCanvas(width: number, height: number): DisplayObject
    {
        if(this.isRoomEngineReady)
        {
            const displayObject = (this._roomEngine.getRoomInstanceDisplay(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, width, height, this._currentPreviewScale) as Container);

            if(displayObject && (this._backgroundColor !== null))
            {
                let backgroundSprite = this._backgroundSprite;

                if(!backgroundSprite)
                {
                    backgroundSprite = new NitroSprite(Texture.WHITE);

                    displayObject.addChildAt(backgroundSprite, 0);
                }

                backgroundSprite.width = width;
                backgroundSprite.height = height;
                backgroundSprite.tint = this._backgroundColor;
            }

            this._roomEngine.setRoomInstanceRenderingCanvasMask(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, true);

            const geometry = this._roomEngine.getRoomInstanceGeometry(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

            if(geometry) geometry.adjustLocation(new Vector3d(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y, 0), 30);

            this._currentPreviewCanvasWidth = width;
            this._currentPreviewCanvasHeight = height;

            return displayObject;
        }

        return null;
    }

    public modifyRoomCanvas(width: number, height: number): void
    {
        if(this.isRoomEngineReady)
        {
            this._currentPreviewCanvasWidth = width;
            this._currentPreviewCanvasHeight = height;

            if(this._backgroundSprite)
            {
                this._backgroundSprite.width = width;
                this._backgroundSprite.height = height;
            }

            this._roomEngine.initializeRoomInstanceRenderingCanvas(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, width, height);
        }
    }

    public set addViewOffset(point: Point)
    {
        this._addViewOffset = point;
    }

    public get addViewOffset(): Point
    {
        return this._addViewOffset;
    }

    public updatePreviewObjectBoundingRectangle(point: Point): void
    {
        const objectBounds = this._roomEngine.getRoomObjectBoundingRectangle(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory, RoomPreviewer.PREVIEW_CANVAS_ID);

        if(objectBounds && point)
        {
            objectBounds.x += -(this._currentPreviewCanvasWidth >> 1);
            objectBounds.y += -(this._currentPreviewCanvasHeight >> 1);

            objectBounds.x += -(point.x);
            objectBounds.y += -(point.y);

            if(!this._currentPreviewRectangle)
            {
                this._currentPreviewRectangle = objectBounds;
            }
            else
            {
                const bounds = this._currentPreviewRectangle.clone().enlarge(objectBounds);

                if(((((bounds.width - this._currentPreviewRectangle.width) > ((this._currentPreviewCanvasWidth - this._currentPreviewRectangle.width) >> 1)) || ((bounds.height - this._currentPreviewRectangle.height) > ((this._currentPreviewCanvasHeight - this._currentPreviewRectangle.height) >> 1))) || (this._currentPreviewRectangle.width < 1)) || (this._currentPreviewRectangle.height < 1)) this._currentPreviewRectangle = bounds;
            }
        }
    }

    private validatePreviewSize(point: Point): Point
    {
        if(((this._currentPreviewRectangle.width < 1) || (this._currentPreviewRectangle.height < 1)))
        {
            return point;
        }

        if(this.isRoomEngineReady)
        {
            const geometry = this._roomEngine.getRoomInstanceGeometry(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

            if((this._currentPreviewRectangle.width > (this._currentPreviewCanvasWidth * (1 + RoomPreviewer.ALLOWED_IMAGE_CUT))) || (this._currentPreviewRectangle.height > (this._currentPreviewCanvasHeight * (1 + RoomPreviewer.ALLOWED_IMAGE_CUT))))
            {
                if(RoomPreviewer.ZOOM_ENABLED)
                {
                    if(this._roomEngine.getRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID) !== 0.5)
                    {
                        this._roomEngine.setRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, 0.5, null, null);

                        this._currentPreviewScale = RoomPreviewer.SCALE_SMALL;
                        this._currentPreviewNeedsZoomOut = true;

                        point.x = (point.x >> 1);
                        point.y = (point.y >> 1);

                        this._currentPreviewRectangle.x = (this._currentPreviewRectangle.x >> 2);
                        this._currentPreviewRectangle.y = (this._currentPreviewRectangle.y >> 2);
                        this._currentPreviewRectangle.width = (this._currentPreviewRectangle.width >> 2);
                        this._currentPreviewRectangle.height = (this._currentPreviewRectangle.height >> 2);
                    }
                }
                else
                {
                    if(geometry.isZoomedIn())
                    {
                        geometry.performZoomOut();

                        this._currentPreviewScale = RoomPreviewer.SCALE_SMALL;
                        this._currentPreviewNeedsZoomOut = true;
                    }
                }
            }

            else if(!this._currentPreviewNeedsZoomOut)
            {
                if(RoomPreviewer.ZOOM_ENABLED)
                {
                    if(this._roomEngine.getRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID) !== 1)
                    {
                        this._roomEngine.setRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, 1, null, null);

                        this._currentPreviewScale = RoomPreviewer.SCALE_NORMAL;
                    }
                }
                else
                {
                    if(!geometry.isZoomedIn())
                    {
                        geometry.performZoomIn();

                        this._currentPreviewScale = RoomPreviewer.SCALE_NORMAL;
                    }
                }
            }
        }

        return point;
    }

    public zoomIn(): void
    {
        if(this.isRoomEngineReady)
        {
            if(RoomPreviewer.ZOOM_ENABLED)
            {
                this._roomEngine.setRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, 1);
            }
            else
            {
                const geometry = this._roomEngine.getRoomInstanceGeometry(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

                geometry.performZoomIn();
            }
        }

        this._currentPreviewScale = RoomPreviewer.SCALE_NORMAL;
    }

    public zoomOut(): void
    {
        if(this.isRoomEngineReady)
        {
            if(RoomPreviewer.ZOOM_ENABLED)
            {
                this._roomEngine.setRoomInstanceRenderingCanvasScale(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, 0.5);
            }
            else
            {
                const geometry = this._roomEngine.getRoomInstanceGeometry(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

                geometry.performZoomOut();
            }
        }

        this._currentPreviewScale = RoomPreviewer.SCALE_SMALL;
    }

    public updateAvatarDirection(direction: number, headDirection: number): void
    {
        if(this.isRoomEngineReady)
        {
            this._roomEngine.updateRoomObjectUserLocation(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, new Vector3d(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y, 0), new Vector3d(RoomPreviewer.PREVIEW_OBJECT_LOCATION_X, RoomPreviewer.PREVIEW_OBJECT_LOCATION_Y, 0), false, 0, new Vector3d((direction * 45), 0, 0), (headDirection * 45));
        }
    }

    public updateObjectRoom(floorType: string = null, wallType: string = null, landscapeType: string = null, _arg_4: boolean = false): boolean
    {
        if(this.isRoomEngineReady) return this._roomEngine.updateRoomInstancePlaneType(this._previewRoomId, floorType, wallType, landscapeType, _arg_4);

        return false;
    }

    public updateRoomWallsAndFloorVisibility(wallsVisible: boolean, floorsVisible: boolean = true): void
    {
        if(this.isRoomEngineReady) this._roomEngine.updateRoomInstancePlaneVisibility(this._previewRoomId, wallsVisible, floorsVisible);
    }

    private getCanvasOffset(point: Point): Point
    {
        if(((this._currentPreviewRectangle.width < 1) || (this._currentPreviewRectangle.height < 1))) return point;

        let x = (-(this._currentPreviewRectangle.left + this._currentPreviewRectangle.right) >> 1);
        let y = (-(this._currentPreviewRectangle.top + this._currentPreviewRectangle.bottom) >> 1);
        const height = ((this._currentPreviewCanvasHeight - this._currentPreviewRectangle.height) >> 1);

        if(height > 10)
        {
            y = (y + Math.min(15, (height - 10)));
        }
        else
        {
            if(this._currentPreviewObjectCategory !== RoomObjectCategory.UNIT)
            {
                y = (y + (5 - Math.max(0, (height / 2))));
            }
            else
            {
                y = (y - (5 - Math.min(0, (height / 2))));
            }
        }

        y = (y + this._addViewOffset.y);
        x = (x + this._addViewOffset.x);

        const offsetX = (x - point.x);
        const offsetY = (y - point.y);

        if((offsetX !== 0) || (offsetY !== 0))
        {
            const _local_7 = Math.sqrt(((offsetX * offsetX) + (offsetY * offsetY)));

            if(_local_7 > 10)
            {
                x = (point.x + ((offsetX * 10) / _local_7));
                y = (point.y + ((offsetY * 10) / _local_7));
            }

            return new Point(x, y);
        }

        return null;
    }

    public updatePreviewRoomView(k: boolean = false): void
    {
        if(this._disableUpdate && !k) return;

        this.checkAutomaticRoomObjectStateChange();

        if(this.isRoomEngineReady)
        {
            let offset = this._roomEngine.getRoomInstanceRenderingCanvasOffset(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

            if(offset)
            {
                this.updatePreviewObjectBoundingRectangle(offset);

                if(this._currentPreviewRectangle)
                {
                    const scale = this._currentPreviewScale;

                    offset = this.validatePreviewSize(offset);

                    const canvasOffset = this.getCanvasOffset(offset);

                    if(canvasOffset)
                    {
                        this._roomEngine.setRoomInstanceRenderingCanvasOffset(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID, canvasOffset);
                    }

                    if(this._currentPreviewScale !== scale) this._currentPreviewRectangle = null;
                }
            }
        }
    }

    public set disableUpdate(flag: boolean)
    {
        this._disableUpdate = flag;
    }

    public set disableRoomEngineUpdate(flag: boolean)
    {
        if(this.isRoomEngineReady) this._roomEngine.disableUpdate(flag);
    }

    private onRoomInitializedonRoomInitialized(event: RoomEngineEvent): void
    {
        if(!event) return;

        switch(event.type)
        {
            case RoomEngineEvent.INITIALIZED:
                if((event.roomId === this._previewRoomId) && this.isRoomEngineReady)
                {
                    this._roomEngine.updateRoomInstancePlaneType(this._previewRoomId, '110', '99999');
                }
                return;
        }
    }

    private onRoomObjectAdded(event: RoomEngineObjectEvent): void
    {
        if((event.roomId === this._previewRoomId) && (event.objectId === RoomPreviewer.PREVIEW_OBJECT_ID) && (event.category === this._currentPreviewObjectCategory))
        {
            this._currentPreviewRectangle = null;
            this._currentPreviewNeedsZoomOut = false;

            const roomObject = this._roomEngine.getRoomObject(event.roomId, event.objectId, event.category);

            if(roomObject && roomObject.model && (event.category === RoomObjectCategory.WALL))
            {
                const sizeZ = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_Z);
                const centerZ = roomObject.model.getValue<number>(RoomObjectVariable.FURNITURE_CENTER_Z);

                if((sizeZ !== null) || (centerZ !== null))
                {
                    this._roomEngine.updateRoomObjectWallLocation(event.roomId, event.objectId, new Vector3d(0.5, 2.3, (((3.6 - sizeZ) / 2) + centerZ)));
                }
            }
        }
    }

    public updateRoomEngine(): void
    {
        if(this.isRoomEngineReady) this._roomEngine.runUpdate();
    }

    public getRenderingCanvas(): IRoomRenderingCanvas
    {
        const renderingCanvas = this._roomEngine.getRoomInstanceRenderingCanvas(this._previewRoomId, RoomPreviewer.PREVIEW_CANVAS_ID);

        if(!renderingCanvas) return null;

        return renderingCanvas;
    }

    public getGenericRoomObjectImage(type: string, value: string, direction: IVector3D, scale: number, listener: IGetImageListener, bgColor: number = 0, extras: string = null, objectData: IObjectData = null, state: number = -1, frame: number = -1, posture: string = null): IImageResult
    {
        if(this.isRoomEngineReady)
        {
            return this._roomEngine.getGenericRoomObjectImage(type, value, direction, scale, listener, bgColor, extras, objectData, state, frame, posture);
        }

        return null;
    }

    public getRoomObjectImage(direction: IVector3D, scale: number, listener: IGetImageListener, bgColor: number = 0): IImageResult
    {
        if(this.isRoomEngineReady)
        {
            return this._roomEngine.getRoomObjectImage(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory, direction, scale, listener, bgColor);
        }

        return null;
    }

    public getRoomObjectCurrentImage(): RenderTexture
    {
        if(this.isRoomEngineReady)
        {
            const roomObject = this._roomEngine.getRoomObject(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory);

            if(roomObject && roomObject.visualization) return roomObject.visualization.getImage(0xFFFFFF, -1);
        }

        return null;
    }

    public getRoomPreviewObject(): IRoomObjectController
    {
        if(this.isRoomEngineReady)
        {
            const roomObject = this._roomEngine.getRoomObject(this._previewRoomId, RoomPreviewer.PREVIEW_OBJECT_ID, this._currentPreviewObjectCategory);

            if(roomObject) return roomObject;
        }

        return null;
    }

    public getRoomPreviewOwnRoomObject(): IRoomObjectController
    {
        if(this.isRoomEngineReady)
        {
            const roomObject = this._roomEngine.getRoomObject(this._previewRoomId, RoomEngine.ROOM_OBJECT_ID, RoomObjectCategory.ROOM);

            if(roomObject) return roomObject;
        }

        return null;
    }

    public get isRoomEngineReady(): boolean
    {
        return (this._roomEngine && this._roomEngine.ready);
    }

    public get roomId(): number
    {
        return this._previewRoomId;
    }

    public get backgroundColor(): number
    {
        return this._backgroundColor;
    }

    public set backgroundColor(color: number)
    {
        this._backgroundColor = color;
    }

    public get width(): number
    {
        return this._currentPreviewCanvasWidth;
    }

    public get height(): number
    {
        return this._currentPreviewCanvasHeight;
    }
}
