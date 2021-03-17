import { Point } from 'pixi.js';
import { RoomObjectEvent } from '../../../../../room/events/RoomObjectEvent';
import { RoomObjectMouseEvent } from '../../../../../room/events/RoomObjectMouseEvent';
import { RoomSpriteMouseEvent } from '../../../../../room/events/RoomSpriteMouseEvent';
import { RoomObjectUpdateMessage } from '../../../../../room/messages/RoomObjectUpdateMessage';
import { IRoomObjectModel } from '../../../../../room/object/IRoomObjectModel';
import { RoomObjectLogicBase } from '../../../../../room/object/logic/RoomObjectLogicBase';
import { ColorConverter } from '../../../../../room/utils/ColorConverter';
import { IRoomGeometry } from '../../../../../room/utils/IRoomGeometry';
import { Vector3d } from '../../../../../room/utils/Vector3d';
import { MouseEventType } from '../../../../ui/MouseEventType';
import { RoomObjectTileMouseEvent } from '../../../events/RoomObjectTileMouseEvent';
import { RoomObjectWallMouseEvent } from '../../../events/RoomObjectWallMouseEvent';
import { ObjectRoomColorUpdateMessage } from '../../../messages/ObjectRoomColorUpdateMessage';
import { ObjectRoomFloorHoleUpdateMessage } from '../../../messages/ObjectRoomFloorHoleUpdateMessage';
import { ObjectRoomMapUpdateMessage } from '../../../messages/ObjectRoomMapUpdateMessage';
import { ObjectRoomMaskUpdateMessage } from '../../../messages/ObjectRoomMaskUpdateMessage';
import { ObjectRoomPlanePropertyUpdateMessage } from '../../../messages/ObjectRoomPlanePropertyUpdateMessage';
import { ObjectRoomPlaneVisibilityUpdateMessage } from '../../../messages/ObjectRoomPlaneVisibilityUpdateMessage';
import { ObjectRoomUpdateMessage } from '../../../messages/ObjectRoomUpdateMessage';
import { RoomMapData } from '../../RoomMapData';
import { RoomObjectVariable } from '../../RoomObjectVariable';
import { RoomPlaneBitmapMaskData } from '../../RoomPlaneBitmapMaskData';
import { RoomPlaneBitmapMaskParser } from '../../RoomPlaneBitmapMaskParser';
import { RoomPlaneData } from '../../RoomPlaneData';
import { RoomPlaneParser } from '../../RoomPlaneParser';

export class RoomLogic extends RoomObjectLogicBase
{
    private _planeParser: RoomPlaneParser;
    private _planeBitmapMaskParser: RoomPlaneBitmapMaskParser;
    private _color: number;
    private _Str_3576: number;
    private _Str_14932: number;
    private _Str_17003: number;
    private _Str_11287: number;
    private _Str_16460: number;
    private _Str_9785: number;
    private _Str_17191: number;
    private _lastHoleUpdate: number;
    private _needsMapUpdate: boolean;

    constructor()
    {
        super();

        this._planeParser           = new RoomPlaneParser();
        this._planeBitmapMaskParser = new RoomPlaneBitmapMaskParser();
        this._color                 = 0xFFFFFF;
        this._Str_3576              = 0xFF;
        this._Str_14932             = 0xFFFFFF;
        this._Str_17003             = 0xFF;
        this._Str_11287             = 0xFFFFFF;
        this._Str_16460             = 0xFF;
        this._Str_9785              = 0;
        this._Str_17191             = 1500;
        this._lastHoleUpdate        = 0;
        this._needsMapUpdate        = false;
    }

    public getEventTypes(): string[]
    {
        const types = [ RoomObjectMouseEvent.MOUSE_MOVE, RoomObjectMouseEvent.CLICK ];

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
    }

    public update(time: number): void
    {
        super.update(time);

        this._Str_24703(time);

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

            this._lastHoleUpdate    = 0;
            this._needsMapUpdate    = false;
        }

    }

    private _Str_24703(k: number): void
    {
        if(!this.object || !this._Str_9785) return;

        let color       = this._color;
        let newColor    = this._Str_3576;

        if((k - this._Str_9785) >= this._Str_17191)
        {
            color       = this._Str_11287;
            newColor    = this._Str_16460;

            this._Str_9785 = 0;
        }
        else
        {
            let _local_7 = ((this._Str_14932 >> 16) & 0xFF);
            let _local_8 = ((this._Str_14932 >> 8) & 0xFF);
            let _local_9 = (this._Str_14932 & 0xFF);

            const _local_10 = ((this._Str_11287 >> 16) & 0xFF);
            const _local_11 = ((this._Str_11287 >> 8) & 0xFF);
            const _local_12 = (this._Str_11287 & 0xFF);
            const _local_13 = ((k - this._Str_9785) / this._Str_17191);

            _local_7 = (_local_7 + ((_local_10 - _local_7) * _local_13));
            _local_8 = (_local_8 + ((_local_11 - _local_8) * _local_13));
            _local_9 = (_local_9 + ((_local_12 - _local_9) * _local_13));

            color       = (((_local_7 << 16) + (_local_8 << 8)) + _local_9);
            newColor    = (this._Str_17003 + ((this._Str_16460 - this._Str_17003) * _local_13));

            this._color     = color;
            this._Str_3576  = newColor;
        }

        let _local_5 = ColorConverter._Str_22130(color);

        _local_5    = ((_local_5 & 0xFFFF00) + newColor);
        color       = ColorConverter._Str_13949(_local_5);

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
        let maskType: string    = null;
        let update              = false;

        switch(message.type)
        {
            case ObjectRoomMaskUpdateMessage.ADD_MASK:
                maskType = RoomPlaneBitmapMaskData.WINDOW;

                if(message.maskCategory === ObjectRoomMaskUpdateMessage.HOLE) maskType = RoomPlaneBitmapMaskData.HOLE;

                this._planeBitmapMaskParser.addMask(message.maskId, message.maskType, message.maskLocation, maskType);

                update = true;
                break;
            case ObjectRoomMaskUpdateMessage._Str_10260:
                update = this._planeBitmapMaskParser._Str_23574(message.maskId);
                break;

        }

        if(update) _arg_2.setValue(RoomObjectVariable.ROOM_PLANE_MASK_XML, this._planeBitmapMaskParser._Str_5598());
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

        this._Str_14932 = this._color;
        this._Str_17003 = this._Str_3576;
        this._Str_11287 = message.color;
        this._Str_16460 = message.light;
        this._Str_9785  = this.time;
        this._Str_17191 = 1500;

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

        let _local_7: Point = null;

        const _local_8  = this._planeParser.getPlaneLocation(planeId);
        const _local_9  = this._planeParser.getPlaneLeftSide(planeId);
        const _local_10 = this._planeParser.getPlaneRightSide(planeId);
        const _local_11 = this._planeParser.getPlaneNormalDirection(planeId);
        const _local_12 = this._planeParser.getPlaneType(planeId);

        if(((((_local_8 == null) || (_local_9 == null)) || (_local_10 == null)) || (_local_11 == null))) return;

        const _local_13 = _local_9.length;
        const _local_14 = _local_10.length;

        if(((_local_13 == 0) || (_local_14 == 0))) return;

        const _local_15 = event.screenX;
        const _local_16 = event.screenY;
        const _local_17 = new Point(_local_15, _local_16);

        _local_7 = geometry.getPlanePosition(_local_17, _local_8, _local_9, _local_10);

        if(!_local_7)
        {
            this.object.model.setValue(RoomObjectVariable.ROOM_SELECTED_PLANE, 0);

            return;
        }

        const _local_18 = Vector3d.product(_local_9, (_local_7.x / _local_13));

        _local_18.add(Vector3d.product(_local_10, (_local_7.y / _local_14)));
        _local_18.add(_local_8);

        const _local_19 = _local_18.x;
        const _local_20 = _local_18.y;
        const _local_21 = _local_18.z;

        if(((((_local_7.x >= 0) && (_local_7.x < _local_13)) && (_local_7.y >= 0)) && (_local_7.y < _local_14)))
        {
            this.object.model.setValue(RoomObjectVariable.ROOM_SELECTED_X, _local_19);
            this.object.model.setValue(RoomObjectVariable.ROOM_SELECTED_Y, _local_20);
            this.object.model.setValue(RoomObjectVariable.ROOM_SELECTED_Z, _local_21);
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

                if(_local_12 === RoomPlaneData.PLANE_FLOOR)
                {
                    newEvent = new RoomObjectTileMouseEvent(eventType, this.object, event._Str_3463, _local_19, _local_20, _local_21, event.altKey, event.ctrlKey, event.shiftKey, event.buttonDown);
                }

                else if((_local_12 === RoomPlaneData.PLANE_WALL) || (_local_12 === RoomPlaneData.PLANE_LANDSCAPE))
                {
                    let direction = 90;

                    if(_local_11)
                    {
                        direction = (_local_11.x + 90);

                        if(direction > 360) direction -= 360;
                    }

                    const _local_27 = ((_local_9.length * _local_7.x) / _local_13);
                    const _local_28 = ((_local_10.length * _local_7.y) / _local_14);

                    newEvent = new RoomObjectWallMouseEvent(eventType, this.object, event._Str_3463, _local_8, _local_9, _local_10, _local_27, _local_28, direction, event.altKey, event.ctrlKey, event.shiftKey, event.buttonDown);
                }

                if(this.eventDispatcher) this.eventDispatcher.dispatchEvent(newEvent);

                return;
            }
        }
    }
}
