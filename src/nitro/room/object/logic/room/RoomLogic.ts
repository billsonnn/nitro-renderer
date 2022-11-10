import { Point } from '@pixi/math';
import { IRoomGeometry, IRoomObjectModel, MouseEventType, NitroConfiguration, RoomObjectVariable, Vector3d } from '../../../../../api';
import { RoomObjectEvent, RoomObjectMouseEvent, RoomObjectTileMouseEvent, RoomObjectWallMouseEvent, RoomSpriteMouseEvent } from '../../../../../events';
import { ColorConverter, RoomObjectLogicBase, RoomObjectUpdateMessage } from '../../../../../room';
import { ObjectRoomColorUpdateMessage, ObjectRoomFloorHoleUpdateMessage, ObjectRoomMapUpdateMessage, ObjectRoomMaskUpdateMessage, ObjectRoomPlanePropertyUpdateMessage, ObjectRoomPlaneVisibilityUpdateMessage, ObjectRoomUpdateMessage } from '../../../messages';
import { RoomMapData } from '../../RoomMapData';
import { RoomPlaneBitmapMaskData } from '../../RoomPlaneBitmapMaskData';
import { RoomPlaneBitmapMaskParser } from '../../RoomPlaneBitmapMaskParser';
import { RoomPlaneData } from '../../RoomPlaneData';
import { RoomPlaneParser } from '../../RoomPlaneParser';

export class RoomLogic extends RoomObjectLogicBase
{
    private _planeParser: RoomPlaneParser;
    private _planeBitmapMaskParser: RoomPlaneBitmapMaskParser;
    private _color: number;
    private _light: number;
    private _originalColor: number;
    private _originalLight: number;
    private _targetColor: number;
    private _targetLight: number;
    private _colorChangedTime: number;
    private _colorTransitionLength: number;
    private _lastHoleUpdate: number;
    private _needsMapUpdate: boolean;
    private _skipColorTransition: boolean;

    constructor()
    {
        super();

        this._planeParser = new RoomPlaneParser();
        this._planeBitmapMaskParser = new RoomPlaneBitmapMaskParser();
        this._color = 0xFFFFFF;
        this._light = 0xFF;
        this._originalColor = 0xFFFFFF;
        this._originalLight = 0xFF;
        this._targetColor = 0xFFFFFF;
        this._targetLight = 0xFF;
        this._colorChangedTime = 0;
        this._colorTransitionLength = 1500;
        this._lastHoleUpdate = 0;
        this._needsMapUpdate = false;
        this._skipColorTransition = false;
    }

    public getEventTypes(): string[]
    {
        const types = [RoomObjectMouseEvent.MOUSE_MOVE, RoomObjectMouseEvent.CLICK];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public dispose(): void
    {
        super.dispose();

        if(this._planeParser)
        {
            this._planeParser.dispose();

            this._planeParser = null;
        }

        if(this._planeBitmapMaskParser)
        {
            this._planeBitmapMaskParser.dispose();

            this._planeBitmapMaskParser = null;
        }
    }

    public initialize(roomMap: RoomMapData): void
    {
        if(!roomMap || !this.object) return;

        if(!(roomMap instanceof RoomMapData)) return;

        if(!this._planeParser.initializeFromMapData(roomMap)) return;

        this.object.model.setValue(RoomObjectVariable.ROOM_MAP_DATA, roomMap);
        this.object.model.setValue(RoomObjectVariable.ROOM_BACKGROUND_COLOR, 0xFFFFFF);
        this.object.model.setValue(RoomObjectVariable.ROOM_FLOOR_VISIBILITY, 1);
        this.object.model.setValue(RoomObjectVariable.ROOM_WALL_VISIBILITY, 1);
        this.object.model.setValue(RoomObjectVariable.ROOM_LANDSCAPE_VISIBILITY, 1);

        this._skipColorTransition = (NitroConfiguration.getValue<boolean>('room.color.skip.transition') === true);
    }

    public update(time: number): void
    {
        super.update(time);

        this.updateBackgroundColor(time);

        if(this._needsMapUpdate)
        {
            if(this._lastHoleUpdate && (time - this._lastHoleUpdate) < 5) return;

            const model = this.object && this.object.model;

            if(model)
            {
                const mapData = this._planeParser.getMapData();

                model.setValue(RoomObjectVariable.ROOM_MAP_DATA, mapData);
                model.setValue(RoomObjectVariable.ROOM_FLOOR_HOLE_UPDATE_TIME, time);

                this._planeParser.initializeFromMapData(mapData);
            }

            this._lastHoleUpdate = 0;
            this._needsMapUpdate = false;
        }

    }

    private updateBackgroundColor(k: number): void
    {
        if(!this.object || !this._colorChangedTime) return;

        let color = this._color;
        let newColor = this._light;

        if((k - this._colorChangedTime) >= this._colorTransitionLength)
        {
            color = this._targetColor;
            newColor = this._targetLight;

            this._colorChangedTime = 0;
        }
        else
        {
            let _local_7 = ((this._originalColor >> 16) & 0xFF);
            let _local_8 = ((this._originalColor >> 8) & 0xFF);
            let _local_9 = (this._originalColor & 0xFF);

            const _local_10 = ((this._targetColor >> 16) & 0xFF);
            const _local_11 = ((this._targetColor >> 8) & 0xFF);
            const _local_12 = (this._targetColor & 0xFF);
            const _local_13 = ((k - this._colorChangedTime) / this._colorTransitionLength);

            _local_7 = (_local_7 + ((_local_10 - _local_7) * _local_13));
            _local_8 = (_local_8 + ((_local_11 - _local_8) * _local_13));
            _local_9 = (_local_9 + ((_local_12 - _local_9) * _local_13));

            color = (((_local_7 << 16) + (_local_8 << 8)) + _local_9);
            newColor = (this._originalLight + ((this._targetLight - this._originalLight) * _local_13));

            this._color = color;
            this._light = newColor;
        }

        let _local_5 = ColorConverter.rgbToHSL(color);

        _local_5 = ((_local_5 & 0xFFFF00) + newColor);
        color = ColorConverter.hslToRGB(_local_5);

        if(this.object.model) this.object.model.setValue(RoomObjectVariable.ROOM_BACKGROUND_COLOR, color);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        if(!message || !this.object) return;

        const model = this.object.model;

        if(!model) return;

        if(message instanceof ObjectRoomUpdateMessage)
        {
            this.onObjectRoomUpdateMessage(message, model);

            return;
        }

        if(message instanceof ObjectRoomMaskUpdateMessage)
        {
            this.onObjectRoomMaskUpdateMessage(message, model);

            return;
        }

        if(message instanceof ObjectRoomPlaneVisibilityUpdateMessage)
        {
            this.onObjectRoomPlaneVisibilityUpdateMessage(message, model);

            return;
        }

        if(message instanceof ObjectRoomPlanePropertyUpdateMessage)
        {
            this.onObjectRoomPlanePropertyUpdateMessage(message, model);

            return;
        }

        if(message instanceof ObjectRoomFloorHoleUpdateMessage)
        {
            this.onObjectRoomFloorHoleUpdateMessage(message, model);

            return;
        }

        if(message instanceof ObjectRoomColorUpdateMessage)
        {
            this.onObjectRoomColorUpdateMessage(message, model);

            return;
        }

        if(message instanceof ObjectRoomMapUpdateMessage)
        {
            this.onObjectRoomMapUpdateMessage(message);
        }
    }

    private onObjectRoomUpdateMessage(message: ObjectRoomUpdateMessage, model: IRoomObjectModel): void
    {
        switch(message.type)
        {
            case ObjectRoomUpdateMessage.ROOM_FLOOR_UPDATE:
                model.setValue(RoomObjectVariable.ROOM_FLOOR_TYPE, message.value);
                return;
            case ObjectRoomUpdateMessage.ROOM_WALL_UPDATE:
                model.setValue(RoomObjectVariable.ROOM_WALL_TYPE, message.value);
                return;
            case ObjectRoomUpdateMessage.ROOM_LANDSCAPE_UPDATE:
                model.setValue(RoomObjectVariable.ROOM_LANDSCAPE_TYPE, message.value);
                return;
        }
    }

    private onObjectRoomMaskUpdateMessage(message: ObjectRoomMaskUpdateMessage, _arg_2: IRoomObjectModel): void
    {
        let maskType: string = null;
        let update = false;

        switch(message.type)
        {
            case ObjectRoomMaskUpdateMessage.ADD_MASK:
                maskType = RoomPlaneBitmapMaskData.WINDOW;

                if(message.maskCategory === ObjectRoomMaskUpdateMessage.HOLE) maskType = RoomPlaneBitmapMaskData.HOLE;

                this._planeBitmapMaskParser.addMask(message.maskId, message.maskType, message.maskLocation, maskType);

                update = true;
                break;
            case ObjectRoomMaskUpdateMessage.REMOVE_MASK:
                update = this._planeBitmapMaskParser.removeMask(message.maskId);
                break;

        }

        if(update) _arg_2.setValue(RoomObjectVariable.ROOM_PLANE_MASK_XML, this._planeBitmapMaskParser.getXML());
    }

    private onObjectRoomPlaneVisibilityUpdateMessage(message: ObjectRoomPlaneVisibilityUpdateMessage, model: IRoomObjectModel): void
    {
        let visible = 0;

        if(message.visible) visible = 1;

        switch(message.type)
        {
            case ObjectRoomPlaneVisibilityUpdateMessage.FLOOR_VISIBILITY:
                model.setValue(RoomObjectVariable.ROOM_FLOOR_VISIBILITY, visible);
                return;
            case ObjectRoomPlaneVisibilityUpdateMessage.WALL_VISIBILITY:
                model.setValue(RoomObjectVariable.ROOM_WALL_VISIBILITY, visible);
                model.setValue(RoomObjectVariable.ROOM_LANDSCAPE_VISIBILITY, visible);
                return;
        }
    }

    private onObjectRoomPlanePropertyUpdateMessage(message: ObjectRoomPlanePropertyUpdateMessage, model: IRoomObjectModel): void
    {
        switch(message.type)
        {
            case ObjectRoomPlanePropertyUpdateMessage.FLOOR_THICKNESS:
                model.setValue(RoomObjectVariable.ROOM_FLOOR_THICKNESS, message.value);
                return;
            case ObjectRoomPlanePropertyUpdateMessage.WALL_THICKNESS:
                model.setValue(RoomObjectVariable.ROOM_WALL_THICKNESS, message.value);
                return;
        }
    }

    private onObjectRoomFloorHoleUpdateMessage(message: ObjectRoomFloorHoleUpdateMessage, model: IRoomObjectModel): void
    {
        switch(message.type)
        {
            case ObjectRoomFloorHoleUpdateMessage.ADD:
                this._planeParser.addFloorHole(message.id, message.x, message.y, message.width, message.height);
                this._needsMapUpdate = true;
                return;
            case ObjectRoomFloorHoleUpdateMessage.REMOVE:
                this._planeParser.removeFloorHole(message.id);
                this._needsMapUpdate = true;
                return;
        }

        this._lastHoleUpdate = this.time;
    }

    private onObjectRoomColorUpdateMessage(message: ObjectRoomColorUpdateMessage, model: IRoomObjectModel): void
    {
        if(!message || !model) return;

        this._originalColor = this._color;
        this._originalLight = this._light;
        this._targetColor = message.color;
        this._targetLight = message.light;
        this._colorChangedTime = this.time;

        if(this._skipColorTransition)
            this._colorTransitionLength = 0;
        else
            this._colorTransitionLength = 1500;

        model.setValue(RoomObjectVariable.ROOM_COLORIZE_BG_ONLY, message.backgroundOnly);
    }

    private onObjectRoomMapUpdateMessage(message: ObjectRoomMapUpdateMessage): void
    {
        if(!message || !message.mapData) return;

        this.object.model.setValue(RoomObjectVariable.ROOM_MAP_DATA, message.mapData);
        this.object.model.setValue(RoomObjectVariable.ROOM_FLOOR_HOLE_UPDATE_TIME, this.time);

        this._planeParser.initializeFromMapData(message.mapData);
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry || !this.object || !this.object.model) return;

        const tag = event.spriteTag;

        let planeId = 0;

        if(tag && (tag.indexOf('@') >= 0))
        {
            planeId = parseInt(tag.substr(tag.indexOf('@') + 1));
        }

        if((planeId < 1) || (planeId > this._planeParser.planeCount))
        {
            if(event.type === MouseEventType.ROLL_OUT)
            {
                this.object.model.setValue(RoomObjectVariable.ROOM_SELECTED_PLANE, 0);
            }

            return;
        }

        planeId--;

        let planePosition: Point = null;

        const planeLocation = this._planeParser.getPlaneLocation(planeId);
        const planeLeftSide = this._planeParser.getPlaneLeftSide(planeId);
        const planeRightSide = this._planeParser.getPlaneRightSide(planeId);
        const planeNormalDirection = this._planeParser.getPlaneNormalDirection(planeId);
        const planeType = this._planeParser.getPlaneType(planeId);

        if(((((planeLocation == null) || (planeLeftSide == null)) || (planeRightSide == null)) || (planeNormalDirection == null))) return;

        const leftSideLength = planeLeftSide.length;
        const rightSideLength = planeRightSide.length;

        if(((leftSideLength == 0) || (rightSideLength == 0))) return;

        const screenX = event.screenX;
        const screenY = event.screenY;
        const screenPoint = new Point(screenX, screenY);

        planePosition = geometry.getPlanePosition(screenPoint, planeLocation, planeLeftSide, planeRightSide);

        if(!planePosition)
        {
            this.object.model.setValue(RoomObjectVariable.ROOM_SELECTED_PLANE, 0);

            return;
        }

        const _local_18 = Vector3d.product(planeLeftSide, (planePosition.x / leftSideLength));

        _local_18.add(Vector3d.product(planeRightSide, (planePosition.y / rightSideLength)));
        _local_18.add(planeLocation);

        const tileX = _local_18.x;
        const tileY = _local_18.y;
        const tileZ = _local_18.z;

        if(((((planePosition.x >= 0) && (planePosition.x < leftSideLength)) && (planePosition.y >= 0)) && (planePosition.y < rightSideLength)))
        {
            this.object.model.setValue(RoomObjectVariable.ROOM_SELECTED_X, tileX);
            this.object.model.setValue(RoomObjectVariable.ROOM_SELECTED_Y, tileY);
            this.object.model.setValue(RoomObjectVariable.ROOM_SELECTED_Z, tileZ);
            this.object.model.setValue(RoomObjectVariable.ROOM_SELECTED_PLANE, (planeId + 1));
        }
        else
        {
            this.object.model.setValue(RoomObjectVariable.ROOM_SELECTED_PLANE, 0);

            return;
        }

        let eventType: string = null;

        if((event.type === MouseEventType.MOUSE_MOVE) || (event.type === MouseEventType.ROLL_OVER)) eventType = RoomObjectMouseEvent.MOUSE_MOVE;
        else if((event.type === MouseEventType.MOUSE_CLICK)) eventType = RoomObjectMouseEvent.CLICK;

        switch(event.type)
        {
            case MouseEventType.MOUSE_MOVE:
            case MouseEventType.ROLL_OVER:
            case MouseEventType.MOUSE_CLICK: {
                let newEvent: RoomObjectEvent = null;

                if(planeType === RoomPlaneData.PLANE_FLOOR)
                {
                    newEvent = new RoomObjectTileMouseEvent(eventType, this.object, event.eventId, tileX, tileY, tileZ, event.altKey, event.ctrlKey, event.shiftKey, event.buttonDown);
                }

                else if((planeType === RoomPlaneData.PLANE_WALL) || (planeType === RoomPlaneData.PLANE_LANDSCAPE))
                {
                    let direction = 90;

                    if(planeNormalDirection)
                    {
                        direction = (planeNormalDirection.x + 90);

                        if(direction > 360) direction -= 360;
                    }

                    const _local_27 = ((planeLeftSide.length * planePosition.x) / leftSideLength);
                    const _local_28 = ((planeRightSide.length * planePosition.y) / rightSideLength);

                    newEvent = new RoomObjectWallMouseEvent(eventType, this.object, event.eventId, planeLocation, planeLeftSide, planeRightSide, _local_27, _local_28, direction, event.altKey, event.ctrlKey, event.shiftKey, event.buttonDown);
                }

                if(this.eventDispatcher) this.eventDispatcher.dispatchEvent(newEvent);

                return;
            }
        }
    }
}
