import { IFurnitureStackingHeightMap, ILegacyWallGeometry, IObjectData, IRoomCanvasMouseListener, IRoomEngineServices, IRoomGeometry, IRoomObject, IRoomObjectController, IRoomObjectEventManager, ISelectedRoomObjectData, IVector3D, MouseEventType, NitroConfiguration, NitroLogger, RoomObjectCategory, RoomObjectOperationType, RoomObjectPlacementSource, RoomObjectType, RoomObjectUserType, RoomObjectVariable, Vector3d } from '../../api';
import { Disposable } from '../../core';
import { RoomEngineDimmerStateEvent, RoomEngineObjectEvent, RoomEngineObjectPlacedEvent, RoomEngineObjectPlacedOnUserEvent, RoomEngineObjectPlaySoundEvent, RoomEngineRoomAdEvent, RoomEngineSamplePlaybackEvent, RoomEngineTriggerWidgetEvent, RoomEngineUseProductEvent, RoomObjectBadgeAssetEvent, RoomObjectDataRequestEvent, RoomObjectDimmerStateUpdateEvent, RoomObjectEvent, RoomObjectFloorHoleEvent, RoomObjectFurnitureActionEvent, RoomObjectHSLColorEnabledEvent, RoomObjectHSLColorEnableEvent, RoomObjectMouseEvent, RoomObjectMoveEvent, RoomObjectPlaySoundIdEvent, RoomObjectRoomAdEvent, RoomObjectSamplePlaybackEvent, RoomObjectSoundMachineEvent, RoomObjectStateChangedEvent, RoomObjectTileMouseEvent, RoomObjectWallMouseEvent, RoomObjectWidgetRequestEvent, RoomSpriteMouseEvent } from '../../events';
import { RoomEnterEffect, RoomId, RoomObjectUpdateMessage } from '../../room';
import { BotPlaceComposer, FurnitureColorWheelComposer, FurnitureDiceActivateComposer, FurnitureDiceDeactivateComposer, FurnitureFloorUpdateComposer, FurnitureGroupInfoComposer, FurnitureMultiStateComposer, FurnitureOneWayDoorComposer, FurniturePickupComposer, FurniturePlaceComposer, FurniturePostItPlaceComposer, FurnitureRandomStateComposer, FurnitureWallMultiStateComposer, FurnitureWallUpdateComposer, GetItemDataComposer, GetResolutionAchievementsMessageComposer, PetMoveComposer, PetPlaceComposer, RemoveWallItemComposer, RoomUnitLookComposer, RoomUnitWalkComposer, SetItemDataMessageComposer, SetObjectDataMessageComposer } from '../communication';
import { Nitro } from '../Nitro';
import { ObjectAvatarSelectedMessage, ObjectDataUpdateMessage, ObjectSelectedMessage, ObjectTileCursorUpdateMessage, ObjectVisibilityUpdateMessage } from './messages';
import { SelectedRoomObjectData } from './utils';

export class RoomObjectEventHandler extends Disposable implements IRoomCanvasMouseListener, IRoomObjectEventManager
{
    private _roomEngine: IRoomEngineServices;

    private _eventIds: Map<number, Map<string, string>>;

    private _selectedAvatarId: number;
    private _selectedObjectId: number;
    private _selectedObjectCategory: number;
    private _whereYouClickIsWhereYouGo: boolean;
    private _objectPlacementSource: string;

    constructor(roomEngine: IRoomEngineServices)
    {
        super();

        this._roomEngine = roomEngine;

        this._eventIds = new Map();

        this._selectedAvatarId = -1;
        this._selectedObjectId = -1;
        this._selectedObjectCategory = -2;
        this._whereYouClickIsWhereYouGo = true;
        this._objectPlacementSource = null;

        this.onRoomEngineObjectEvent = this.onRoomEngineObjectEvent.bind(this);

        this._roomEngine.events.addEventListener(RoomEngineObjectEvent.ADDED, this.onRoomEngineObjectEvent);
    }

    public dispose(): void
    {
        if(this._eventIds)
        {
            this._eventIds = null;
        }

        this._roomEngine.events.removeEventListener(RoomEngineObjectEvent.ADDED, this.onRoomEngineObjectEvent);

        this._roomEngine = null;
    }

    private onRoomEngineObjectEvent(event: RoomEngineObjectEvent): void
    {
        let selectedData = this.getSelectedRoomObjectData(event.roomId);

        if(!selectedData) return;

        if((selectedData.operation === RoomObjectOperationType.OBJECT_PLACE) && (selectedData.id === event.objectId))
        {
            const roomObject = this._roomEngine.getRoomObject(event.roomId, selectedData.id, selectedData.category);

            if(roomObject && roomObject.model)
            {
                if(selectedData.category === RoomObjectCategory.FLOOR)
                {
                    const allowedDirections = roomObject.model.getValue<number[]>(RoomObjectVariable.FURNITURE_ALLOWED_DIRECTIONS);

                    if(allowedDirections && allowedDirections.length)
                    {
                        const direction = new Vector3d(allowedDirections[0]);

                        roomObject.setDirection(direction);

                        this.updateSelectedObjectData(event.roomId, selectedData.id, selectedData.category, selectedData.loc, direction, selectedData.operation, selectedData.typeId, selectedData.instanceData, selectedData.stuffData, selectedData.state, selectedData.animFrame, selectedData.posture);

                        selectedData = this.getSelectedRoomObjectData(event.roomId);

                        if(!selectedData) return;
                    }
                }
            }

            this.setFurnitureAlphaMultiplier(roomObject, 0.5);
        }
    }

    public processRoomCanvasMouseEvent(event: RoomSpriteMouseEvent, object: IRoomObject, geometry: IRoomGeometry): void
    {
        if(!event || !object) return;

        if(RoomEnterEffect.isRunning()) return;

        const type = object.type;

        let category = this._roomEngine.getRoomObjectCategoryForType(type);

        if((category !== RoomObjectCategory.ROOM) && (!this._roomEngine.isPlayingGame() || category !== RoomObjectCategory.UNIT)) category = RoomObjectCategory.MINIMUM;

        const _local_7 = this.getMouseEventId(category, event.type);

        if(_local_7 === event.eventId)
        {
            if((event.type === MouseEventType.MOUSE_CLICK) || (event.type === MouseEventType.DOUBLE_CLICK) || (event.type === MouseEventType.MOUSE_DOWN) || (event.type === MouseEventType.MOUSE_UP) || (event.type === MouseEventType.MOUSE_MOVE)) return;
        }
        else
        {
            if(event.eventId)
            {
                this.setMouseEventId(category, event.type, event.eventId);
            }
        }

        if(object.mouseHandler) object.mouseHandler.mouseEvent(event, geometry);
    }

    public processRoomObjectPlacement(placementSource: string, roomId: number, id: number, category: number, typeId: number, extra: string = null, stuffData: IObjectData = null, state: number = -1, frameNumber: number = -1, posture: string = null): boolean
    {
        this._objectPlacementSource = placementSource;

        const location = new Vector3d(-100, -100);
        const direction = new Vector3d(0);

        this.setSelectedRoomObjectData(roomId, id, category, location, direction, RoomObjectOperationType.OBJECT_PLACE, typeId, extra, stuffData, state, frameNumber, posture);

        if(this._roomEngine)
        {
            this._roomEngine.setObjectMoverIconSprite(typeId, category, false, extra, stuffData, state, frameNumber, posture);
            this._roomEngine.setObjectMoverIconSpriteVisible(false);
        }

        return true;
    }

    public cancelRoomObjectInsert(k: number): boolean
    {
        this.resetSelectedObjectData(k);

        return true;
    }

    private getMouseEventId(k: number, _arg_2: string): string
    {
        const existing = this._eventIds.get(k);

        if(!existing) return null;

        return (existing.get(_arg_2) || null);
    }

    private setMouseEventId(k: number, _arg_2: string, _arg_3: string): void
    {
        let existing = this._eventIds.get(k);

        if(!existing)
        {
            existing = new Map();

            this._eventIds.set(k, existing);
        }

        existing.delete(_arg_2);
        existing.set(_arg_2, _arg_3);
    }


    public handleRoomObjectEvent(event: RoomObjectEvent, roomId: number): void
    {
        if(!event) return;

        if(event instanceof RoomObjectMouseEvent)
        {
            this.handleRoomObjectMouseEvent(event, roomId);

            return;
        }

        switch(event.type)
        {
            case RoomObjectStateChangedEvent.STATE_CHANGE:
            case RoomObjectStateChangedEvent.STATE_RANDOM:
                this.onRoomObjectStateChangedEvent((event as RoomObjectStateChangedEvent), roomId);
                return;
            case RoomObjectDimmerStateUpdateEvent.DIMMER_STATE:
                this.onRoomObjectDimmerStateUpdateEvent((event as RoomObjectDimmerStateUpdateEvent), roomId);
                return;
            case RoomObjectMoveEvent.POSITION_CHANGED:
            case RoomObjectMoveEvent.OBJECT_REMOVED:
                this.handleSelectedObjectRemove((event as RoomObjectMoveEvent), roomId);
                return;
            case RoomObjectWidgetRequestEvent.OPEN_WIDGET:
            case RoomObjectWidgetRequestEvent.CLOSE_WIDGET:
            case RoomObjectWidgetRequestEvent.OPEN_FURNI_CONTEXT_MENU:
            case RoomObjectWidgetRequestEvent.CLOSE_FURNI_CONTEXT_MENU:
            case RoomObjectWidgetRequestEvent.PLACEHOLDER:
            case RoomObjectWidgetRequestEvent.CREDITFURNI:
            case RoomObjectWidgetRequestEvent.STACK_HEIGHT:
            case RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE:
            case RoomObjectWidgetRequestEvent.STICKIE:
            case RoomObjectWidgetRequestEvent.PRESENT:
            case RoomObjectWidgetRequestEvent.TROPHY:
            case RoomObjectWidgetRequestEvent.TEASER:
            case RoomObjectWidgetRequestEvent.ECOTRONBOX:
            case RoomObjectWidgetRequestEvent.DIMMER:
            case RoomObjectWidgetRequestEvent.WIDGET_REMOVE_DIMMER:
            case RoomObjectWidgetRequestEvent.CLOTHING_CHANGE:
            case RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR:
            case RoomObjectWidgetRequestEvent.MANNEQUIN:
            case RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU:
            case RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU:
            case RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG:
            case RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG:
            case RoomObjectWidgetRequestEvent.BACKGROUND_COLOR:
            case RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG:
            case RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG:
            case RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG:
            case RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_OPEN:
            case RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_ENGRAVING:
            case RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_FAILED:
            case RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_CONFIRM:
            case RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_ENGRAVING:
            case RoomObjectWidgetRequestEvent.BADGE_DISPLAY_ENGRAVING:
            case RoomObjectWidgetRequestEvent.HIGH_SCORE_DISPLAY:
            case RoomObjectWidgetRequestEvent.HIDE_HIGH_SCORE_DISPLAY:
            case RoomObjectWidgetRequestEvent.INERNAL_LINK:
            case RoomObjectWidgetRequestEvent.ROOM_LINK:
            case RoomObjectWidgetRequestEvent.YOUTUBE:
                this.onRoomObjectWidgetRequestEvent((event as RoomObjectWidgetRequestEvent), roomId);
                return;
            case RoomObjectFurnitureActionEvent.DICE_ACTIVATE:
            case RoomObjectFurnitureActionEvent.DICE_OFF:
            case RoomObjectFurnitureActionEvent.USE_HABBOWHEEL:
            case RoomObjectFurnitureActionEvent.STICKIE:
            case RoomObjectFurnitureActionEvent.ENTER_ONEWAYDOOR:
                this.onRoomObjectFurnitureActionEvent((event as RoomObjectFurnitureActionEvent), roomId);
                return;
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_INIT:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_START:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_STOP:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_DISPOSE:
                this.handleObjectSoundMachineEvent(event, roomId);
                return;
            case RoomObjectFurnitureActionEvent.JUKEBOX_INIT:
            case RoomObjectFurnitureActionEvent.JUKEBOX_START:
            case RoomObjectFurnitureActionEvent.JUKEBOX_MACHINE_STOP:
            case RoomObjectFurnitureActionEvent.JUKEBOX_DISPOSE:
                this.handleObjectJukeboxEvent(event, roomId);
                return;
            case RoomObjectFloorHoleEvent.ADD_HOLE:
            case RoomObjectFloorHoleEvent.REMOVE_HOLE:
                this.onRoomObjectFloorHoleEvent((event as RoomObjectFloorHoleEvent), roomId);
                return;
            case RoomObjectRoomAdEvent.ROOM_AD_FURNI_CLICK:
            case RoomObjectRoomAdEvent.ROOM_AD_FURNI_DOUBLE_CLICK:
            case RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_SHOW:
            case RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_HIDE:
            case RoomObjectRoomAdEvent.ROOM_AD_LOAD_IMAGE:
                this.onRoomObjectRoomAdEvent((event as RoomObjectRoomAdEvent), roomId);
                return;
            case RoomObjectBadgeAssetEvent.LOAD_BADGE:
                this.onRoomObjectBadgeAssetEvent((event as RoomObjectBadgeAssetEvent), roomId);
                return;
            case RoomObjectFurnitureActionEvent.MOUSE_ARROW:
            case RoomObjectFurnitureActionEvent.MOUSE_BUTTON:
                this.handleMousePointer((event as RoomObjectFurnitureActionEvent), roomId);
                return;
            case RoomObjectPlaySoundIdEvent.PLAY_SOUND:
            case RoomObjectPlaySoundIdEvent.PLAY_SOUND_AT_PITCH:
                this.handleRoomObjectPlaySoundEvent((event as RoomObjectPlaySoundIdEvent), roomId);
                return;
            case RoomObjectSamplePlaybackEvent.ROOM_OBJECT_INITIALIZED:
            case RoomObjectSamplePlaybackEvent.ROOM_OBJECT_DISPOSED:
            case RoomObjectSamplePlaybackEvent.PLAY_SAMPLE:
            case RoomObjectSamplePlaybackEvent.CHANGE_PITCH:
                this.handleRoomObjectSamplePlaybackEvent((event as RoomObjectSamplePlaybackEvent), roomId);
                return;
            case RoomObjectHSLColorEnableEvent.ROOM_BACKGROUND_COLOR:
                this.onHSLColorEnableEvent((event as RoomObjectHSLColorEnableEvent), roomId);
                return;
            case RoomObjectDataRequestEvent.RODRE_CURRENT_USER_ID:
            case RoomObjectDataRequestEvent.RODRE_URL_PREFIX:
                this.onRoomObjectDataRequestEvent((event as RoomObjectDataRequestEvent), roomId);
                return;
            default:
                NitroLogger.warn('Unhandled Event', event.constructor.name, 'Object ID', event.object.id);
                return;
        }
    }

    private handleRoomObjectMouseEvent(event: RoomObjectMouseEvent, roomId: number): void
    {
        if(!event || !event.type) return;

        switch(event.type)
        {
            case RoomObjectMouseEvent.CLICK:
                this.handleRoomObjectMouseClickEvent(event, roomId);
                return;
            case RoomObjectMouseEvent.DOUBLE_CLICK:
                this.handleRoomObjectMouseDoubleClickEvent(event, roomId);
                return;
            case RoomObjectMouseEvent.MOUSE_MOVE:
                this.handleRoomObjectMouseMoveEvent(event, roomId);
                return;
            case RoomObjectMouseEvent.MOUSE_DOWN:
                this.handleRoomObjectMouseDownEvent(event, roomId);
                return;
            case RoomObjectMouseEvent.MOUSE_DOWN_LONG:
                this.handleRoomObjectMouseDownLongEvent(event, roomId);
                return;
            case RoomObjectMouseEvent.MOUSE_ENTER:
                this.handleRoomObjectMouseEnterEvent(event, roomId);
                return;
            case RoomObjectMouseEvent.MOUSE_LEAVE:
                this.handleRoomObjectMouseLeaveEvent(event, roomId);
                return;
        }
    }

    private handleRoomObjectMouseClickEvent(event: RoomObjectMouseEvent, roomId: number): void
    {
        if(!event) return;

        let operation = RoomObjectOperationType.OBJECT_UNDEFINED;

        const selectedData = this.getSelectedRoomObjectData(roomId);

        if(selectedData) operation = selectedData.operation;

        let didWalk = false;
        let didMove = false;

        if(this._whereYouClickIsWhereYouGo)
        {
            if(!operation || (operation === RoomObjectOperationType.OBJECT_UNDEFINED))
            {
                didWalk = this.handleMoveTargetFurni(roomId, event);
            }
        }

        const category = this._roomEngine.getRoomObjectCategoryForType(event.objectType);

        switch(operation)
        {
            case RoomObjectOperationType.OBJECT_MOVE:
                if(category === RoomObjectCategory.ROOM)
                {
                    if(selectedData)
                    {
                        this.modifyRoomObject(roomId, selectedData.id, selectedData.category, RoomObjectOperationType.OBJECT_MOVE_TO);
                    }
                }

                else if(category === RoomObjectCategory.UNIT)
                {
                    if(selectedData && (event.objectType === RoomObjectUserType.MONSTER_PLANT))
                    {
                        this.modifyRoomObject(roomId, selectedData.id, selectedData.category, RoomObjectOperationType.OBJECT_MOVE_TO);
                    }

                    if(event.eventId) this.setMouseEventId(RoomObjectCategory.ROOM, MouseEventType.MOUSE_CLICK, event.eventId);

                    this.placeObjectOnUser(roomId, event.objectId, category);
                }

                didMove = true;

                if(event.objectId !== -1) this.setSelectedObject(roomId, event.objectId, category);

                break;
            case RoomObjectOperationType.OBJECT_PLACE:
                if(category === RoomObjectCategory.ROOM)
                {
                    this.placeObject(roomId, (event instanceof RoomObjectTileMouseEvent), (event instanceof RoomObjectWallMouseEvent));
                }

                else if(category === RoomObjectCategory.UNIT)
                {
                    switch(event.objectType)
                    {
                        case RoomObjectUserType.MONSTER_PLANT:
                        case RoomObjectUserType.RENTABLE_BOT:
                            this.placeObject(roomId, (event instanceof RoomObjectTileMouseEvent), (event instanceof RoomObjectWallMouseEvent));
                            break;
                        default:
                            if(event.eventId)
                            {
                                this.setMouseEventId(RoomObjectCategory.ROOM, MouseEventType.MOUSE_CLICK, event.eventId);
                            }

                            this.placeObjectOnUser(roomId, event.objectId, category);
                            break;
                    }
                }
                break;
            case RoomObjectOperationType.OBJECT_UNDEFINED:
                if(category === RoomObjectCategory.ROOM)
                {
                    if(!didWalk && (event instanceof RoomObjectTileMouseEvent)) this.onRoomObjectTileMouseEvent(roomId, event);
                }
                else
                {
                    this.setSelectedObject(roomId, event.objectId, category);

                    didMove = false;

                    if(category === RoomObjectCategory.UNIT)
                    {
                        if(event.ctrlKey && !event.altKey && !event.shiftKey && (event.objectType === RoomObjectUserType.RENTABLE_BOT))
                        {
                            this.modifyRoomObject(roomId, event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP_BOT);
                        }

                        else if(event.ctrlKey && !event.altKey && !event.shiftKey && (event.objectType === RoomObjectUserType.MONSTER_PLANT))
                        {
                            this.modifyRoomObject(roomId, event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP_PET);
                        }

                        else if(!event.ctrlKey && !event.altKey && event.shiftKey && (event.objectType === RoomObjectUserType.MONSTER_PLANT))
                        {
                            this.modifyRoomObject(roomId, event.objectId, category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE);
                        }

                        if(!this._roomEngine.isPlayingGame())
                        {
                            didWalk = true;
                        }
                        else
                        {
                            didMove = true;
                        }
                    }

                    else if((category === RoomObjectCategory.FLOOR) || (category === RoomObjectCategory.WALL))
                    {
                        if(event.altKey || event.ctrlKey || event.shiftKey)
                        {
                            if(!event.ctrlKey && !event.altKey && event.shiftKey)
                            {
                                if(category === RoomObjectCategory.FLOOR)
                                {
                                    if(this._roomEngine.events)
                                    {
                                        this._roomEngine.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.REQUEST_ROTATE, roomId, event.objectId, category));
                                    }
                                }
                            }

                            else if(event.ctrlKey && !event.altKey && !event.shiftKey)
                            {
                                this.modifyRoomObject(roomId, event.objectId, category, RoomObjectOperationType.OBJECT_PICKUP);
                            }

                            if(!this._roomEngine.isPlayingGame())
                            {
                                didWalk = true;
                            }
                            else
                            {
                                didMove = true;
                            }
                        }
                    }

                    if(event.eventId)
                    {
                        if(didWalk)
                        {
                            this.setMouseEventId(RoomObjectCategory.ROOM, MouseEventType.MOUSE_CLICK, event.eventId);
                        }

                        if(didMove)
                        {
                            this.setMouseEventId(RoomObjectCategory.MINIMUM, MouseEventType.MOUSE_CLICK, event.eventId);
                        }
                    }
                }
                break;
        }

        if(category === RoomObjectCategory.ROOM)
        {
            const _local_15 = this.getMouseEventId(RoomObjectCategory.MINIMUM, MouseEventType.MOUSE_CLICK);
            const _local_16 = this.getMouseEventId(RoomObjectCategory.UNIT, MouseEventType.MOUSE_CLICK);

            if((_local_15 !== event.eventId) && (_local_16 !== event.eventId) && !didMove)
            {
                this.deselectObject(roomId);

                if(this._roomEngine.events) this._roomEngine.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.DESELECTED, roomId, -1, RoomObjectCategory.MINIMUM));

                this.setSelectedAvatar(roomId, 0, false);
            }
        }
    }

    private handleRoomObjectMouseDoubleClickEvent(event: RoomObjectMouseEvent, roomId: number): void
    {
        const id = event.objectId;
        const type = event.objectType;
        const category = this._roomEngine.getRoomObjectCategoryForType(type);

        if(this._roomEngine.events)
        {
            this._roomEngine.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.DOUBLE_CLICK, roomId, id, category));
        }
    }

    private handleRoomObjectMouseMoveEvent(event: RoomObjectMouseEvent, roomId: number): void
    {
        if(!event) return;

        let operation = RoomObjectOperationType.OBJECT_UNDEFINED;

        const selectedData = this.getSelectedRoomObjectData(roomId);

        if(selectedData) operation = selectedData.operation;

        const category = this._roomEngine.getRoomObjectCategoryForType(event.objectType);

        if(this._roomEngine)
        {
            const roomCursor = this._roomEngine.getRoomObjectCursor(roomId);

            if(roomCursor && roomCursor.logic)
            {
                let newEvent: ObjectTileCursorUpdateMessage = null;

                if(event instanceof RoomObjectTileMouseEvent)
                {
                    newEvent = this.handleMouseOverTile(event, roomId);
                }

                else if(event.object && (event.object.id !== -1))
                {
                    if(this._whereYouClickIsWhereYouGo)
                    {
                        newEvent = this.handleMouseOverObject(category, roomId, event);
                    }
                }

                else
                {
                    newEvent = new ObjectTileCursorUpdateMessage(null, 0, false, event.eventId);
                }

                roomCursor.processUpdateMessage(newEvent);
            }
        }

        switch(operation)
        {
            case RoomObjectOperationType.OBJECT_MOVE:
                if(category === RoomObjectCategory.ROOM) this.handleObjectMove(event, roomId);

                return;
            case RoomObjectOperationType.OBJECT_PLACE:
                if(category === RoomObjectCategory.ROOM) this.handleObjectPlace(event, roomId);

                return;
        }
    }

    private handleRoomObjectMouseDownEvent(event: RoomObjectMouseEvent, roomId: number): void
    {
        if(!event) return;

        let operation = RoomObjectOperationType.OBJECT_UNDEFINED;

        const selectedData = this.getSelectedRoomObjectData(roomId);

        if(selectedData) operation = selectedData.operation;

        const category = this._roomEngine.getRoomObjectCategoryForType(event.objectType);

        switch(operation)
        {
            case RoomObjectOperationType.OBJECT_UNDEFINED:
                if((category === RoomObjectCategory.FLOOR) || (category === RoomObjectCategory.WALL) || (event.objectType === RoomObjectUserType.MONSTER_PLANT))
                {
                    if((event.altKey && !event.ctrlKey && !event.shiftKey) || this.decorateModeMove(event))
                    {
                        if(this._roomEngine.events) this._roomEngine.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.REQUEST_MOVE, roomId, event.objectId, category));
                    }
                }
                return;
        }
    }

    private handleRoomObjectMouseDownLongEvent(event: RoomObjectMouseEvent, roomId: number): void
    {
        if(!event) return;

        let operation = RoomObjectOperationType.OBJECT_UNDEFINED;

        const selectedData = this.getSelectedRoomObjectData(roomId);

        if(selectedData) operation = selectedData.operation;

        const category = this._roomEngine.getRoomObjectCategoryForType(event.objectType);

        switch(operation)
        {
            case RoomObjectOperationType.OBJECT_UNDEFINED:
                if((category === RoomObjectCategory.FLOOR) || (category === RoomObjectCategory.WALL) || (event.objectType === RoomObjectUserType.MONSTER_PLANT))
                {
                    if((!event.ctrlKey && !event.shiftKey) || this.decorateModeMove(event))
                    {
                        if(this._roomEngine.events) this._roomEngine.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.REQUEST_MANIPULATION, roomId, event.objectId, category));
                    }
                }
                return;
        }
    }

    private handleRoomObjectMouseEnterEvent(event: RoomObjectMouseEvent, roomId: number): void
    {
        const id = event.objectId;
        const type = event.objectType;
        const category = this._roomEngine.getRoomObjectCategoryForType(type);

        if(this._roomEngine.events)
        {
            this._roomEngine.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.MOUSE_ENTER, roomId, id, category));
        }
    }

    private handleRoomObjectMouseLeaveEvent(event: RoomObjectMouseEvent, roomId: number): void
    {
        const id = event.objectId;
        const type = event.objectType;
        const category = this._roomEngine.getRoomObjectCategoryForType(type);

        if(category !== RoomObjectCategory.ROOM)
        {
            if(category === RoomObjectCategory.UNIT)
            {
                const cursor = this._roomEngine.getRoomObjectCursor(roomId);

                if(cursor) cursor.processUpdateMessage(new ObjectDataUpdateMessage(0, null));
            }
        }

        if(this._roomEngine.events)
        {
            this._roomEngine.events.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.MOUSE_LEAVE, roomId, id, category));
        }

        return;
    }

    private onRoomObjectStateChangedEvent(event: RoomObjectStateChangedEvent, roomId: number): void
    {
        if(!event) return;

        switch(event.type)
        {
            case RoomObjectStateChangedEvent.STATE_CHANGE:
                this.changeObjectState(roomId, event.object.id, event.object.type, event.state, false);
                return;
            case RoomObjectStateChangedEvent.STATE_RANDOM:
                this.changeObjectState(roomId, event.object.id, event.object.type, event.state, true);
                return;
        }
    }

    private onRoomObjectDimmerStateUpdateEvent(event: RoomObjectDimmerStateUpdateEvent, roomId: number): void
    {
        if(!event) return;

        switch(event.type)
        {
            case RoomObjectDimmerStateUpdateEvent.DIMMER_STATE:
                this._roomEngine.events.dispatchEvent(new RoomEngineDimmerStateEvent(roomId, event.state, event.presetId, event.effectId, event.color, event.brightness));
                return;
        }
    }

    private handleSelectedObjectRemove(event: RoomObjectMoveEvent, roomId: number): void
    {
        if(!event || !this._roomEngine) return;

        switch(event.type)
        {
            case RoomObjectMoveEvent.POSITION_CHANGED: {
                const objectId = event.objectId;
                const objectType = event.objectType;
                const objectCategory = this._roomEngine.getRoomObjectCategoryForType(objectType);
                const object = this._roomEngine.getRoomObject(roomId, objectId, objectCategory);
                const selectionArrow = this._roomEngine.getRoomObjectSelectionArrow(roomId);

                if(object && selectionArrow && selectionArrow.logic)
                {
                    const location = object.getLocation();

                    selectionArrow.logic.processUpdateMessage(new RoomObjectUpdateMessage(location, null));
                }
                return;
            }
            case RoomObjectMoveEvent.OBJECT_REMOVED:
                this.setSelectedAvatar(roomId, 0, false);
                return;
        }
    }

    private onRoomObjectWidgetRequestEvent(event: RoomObjectWidgetRequestEvent, roomId: number): void
    {
        if(!event || !this._roomEngine) return;

        const objectId = event.objectId;
        const objectType = event.objectType;
        const objectCategory = this._roomEngine.getRoomObjectCategoryForType(objectType);
        const eventDispatcher = this._roomEngine.events;

        if(!eventDispatcher) return;

        if(RoomId.isRoomPreviewerId(roomId)) return;

        switch(event.type)
        {
            case RoomObjectWidgetRequestEvent.OPEN_WIDGET:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.OPEN_WIDGET, roomId, objectId, objectCategory, ((event.object as IRoomObjectController).logic.widget)));
                return;
            case RoomObjectWidgetRequestEvent.CLOSE_WIDGET:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.CLOSE_WIDGET, roomId, objectId, objectCategory, ((event.object as IRoomObjectController).logic.widget)));
                return;
            case RoomObjectWidgetRequestEvent.OPEN_FURNI_CONTEXT_MENU:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.OPEN_FURNI_CONTEXT_MENU, roomId, objectId, objectCategory, ((event.object as IRoomObjectController).logic.contextMenu)));
                return;
            case RoomObjectWidgetRequestEvent.CLOSE_FURNI_CONTEXT_MENU:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.CLOSE_FURNI_CONTEXT_MENU, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.PLACEHOLDER:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_PLACEHOLDER, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.CREDITFURNI:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_CREDITFURNI, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.STACK_HEIGHT:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_STACK_HEIGHT, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_EXTERNAL_IMAGE, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.STICKIE:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_STICKIE, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.PRESENT:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_PRESENT, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.TROPHY:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_TROPHY, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.TEASER:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_TEASER, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.ECOTRONBOX:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_ECOTRONBOX, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.DIMMER:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_DIMMER, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.WIDGET_REMOVE_DIMMER:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REMOVE_DIMMER, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.CLOTHING_CHANGE:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_CLOTHING_CHANGE, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_PLAYLIST_EDITOR, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.MANNEQUIN:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_MANNEQUIN, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU:
                eventDispatcher.dispatchEvent(new RoomEngineUseProductEvent(RoomEngineUseProductEvent.USE_PRODUCT_FROM_ROOM, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU:
                this._roomEngine.connection.send(new FurnitureGroupInfoComposer(event.objectId, event.object.model.getValue<number>(RoomObjectVariable.FURNITURE_GUILD_CUSTOMIZED_GUILD_ID)));
                return;
            case RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.BACKGROUND_COLOR:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_BACKGROUND_COLOR, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_MYSTERYBOX_OPEN_DIALOG, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_EFFECTBOX_OPEN_DIALOG, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_MYSTERYTROPHY_OPEN_DIALOG, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_OPEN:
                this._roomEngine.connection.send(new GetResolutionAchievementsMessageComposer(event.objectId, 0));
                return;
            case RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_ENGRAVING:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_FAILED:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_ACHIEVEMENT_RESOLUTION_FAILED, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_CONFIRM:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_FRIEND_FURNITURE_CONFIRM, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_ENGRAVING:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_FRIEND_FURNITURE_ENGRAVING, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.BADGE_DISPLAY_ENGRAVING:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_BADGE_DISPLAY_ENGRAVING, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.HIGH_SCORE_DISPLAY:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_HIGH_SCORE_DISPLAY, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.HIDE_HIGH_SCORE_DISPLAY:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_HIDE_HIGH_SCORE_DISPLAY, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.INERNAL_LINK:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_INTERNAL_LINK, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.ROOM_LINK:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_ROOM_LINK, roomId, objectId, objectCategory));
                return;
            case RoomObjectWidgetRequestEvent.YOUTUBE:
                eventDispatcher.dispatchEvent(new RoomEngineTriggerWidgetEvent(RoomEngineTriggerWidgetEvent.REQUEST_YOUTUBE, roomId, objectId, objectCategory));
                return;
        }
    }

    private onRoomObjectFurnitureActionEvent(event: RoomObjectFurnitureActionEvent, roomId: number): void
    {
        if(!event) return;

        this.useObject(roomId, event.object.id, event.object.type, event.type);
    }

    private handleObjectSoundMachineEvent(event: RoomObjectEvent, roomId: number): void
    {
        if(!event) return;

        const objectCategory = this._roomEngine.getRoomObjectCategoryForType(event.objectType);
        const selectedData = this.getSelectedRoomObjectData(roomId);

        if(selectedData)
        {
            if((selectedData.category === objectCategory) && (selectedData.id === event.objectId))
            {
                if(selectedData.operation === RoomObjectOperationType.OBJECT_PLACE) return;
            }
        }

        switch(event.type)
        {
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_INIT:
                this._roomEngine.events.dispatchEvent(new RoomObjectSoundMachineEvent(RoomObjectSoundMachineEvent.SOUND_MACHINE_INIT, roomId, event.objectId, objectCategory));
                return;
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_START:
                this._roomEngine.events.dispatchEvent(new RoomObjectSoundMachineEvent(RoomObjectSoundMachineEvent.SOUND_MACHINE_SWITCHED_ON, roomId, event.objectId, objectCategory));
                return;
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_STOP:
                this._roomEngine.events.dispatchEvent(new RoomObjectSoundMachineEvent(RoomObjectSoundMachineEvent.SOUND_MACHINE_SWITCHED_OFF, roomId, event.objectId, objectCategory));
                return;
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_DISPOSE:
                this._roomEngine.events.dispatchEvent(new RoomObjectSoundMachineEvent(RoomObjectSoundMachineEvent.SOUND_MACHINE_DISPOSE, roomId, event.objectId, objectCategory));
                return;
        }
    }

    private handleObjectJukeboxEvent(event: RoomObjectEvent, roomId: number): void
    {
        if(!event) return;

        const objectCategory = this._roomEngine.getRoomObjectCategoryForType(event.objectType);
        const selectedData = this.getSelectedRoomObjectData(roomId);

        if(selectedData)
        {
            if((selectedData.category === objectCategory) && (selectedData.id === event.objectId))
            {
                if(selectedData.operation === RoomObjectOperationType.OBJECT_PLACE) return;
            }
        }

        switch(event.type)
        {
            case RoomObjectFurnitureActionEvent.JUKEBOX_INIT:
                this._roomEngine.events.dispatchEvent(new RoomObjectSoundMachineEvent(RoomObjectSoundMachineEvent.JUKEBOX_INIT, roomId, event.objectId, objectCategory));
                return;
            case RoomObjectFurnitureActionEvent.JUKEBOX_START:
                this._roomEngine.events.dispatchEvent(new RoomObjectSoundMachineEvent(RoomObjectSoundMachineEvent.JUKEBOX_SWITCHED_ON, roomId, event.objectId, objectCategory));
                return;
            case RoomObjectFurnitureActionEvent.JUKEBOX_MACHINE_STOP:
                this._roomEngine.events.dispatchEvent(new RoomObjectSoundMachineEvent(RoomObjectSoundMachineEvent.JUKEBOX_SWITCHED_OFF, roomId, event.objectId, objectCategory));
                return;
            case RoomObjectFurnitureActionEvent.JUKEBOX_DISPOSE:
                this._roomEngine.events.dispatchEvent(new RoomObjectSoundMachineEvent(RoomObjectSoundMachineEvent.JUKEBOX_DISPOSE, roomId, event.objectId, objectCategory));
                return;
        }
    }

    private onRoomObjectFloorHoleEvent(event: RoomObjectFloorHoleEvent, roomId: number): void
    {
        if(!event) return;

        switch(event.type)
        {
            case RoomObjectFloorHoleEvent.ADD_HOLE:
                this._roomEngine.addRoomInstanceFloorHole(roomId, event.objectId);
                return;
            case RoomObjectFloorHoleEvent.REMOVE_HOLE:
                this._roomEngine.removeRoomInstanceFloorHole(roomId, event.objectId);
                return;
        }
    }

    private onRoomObjectRoomAdEvent(event: RoomObjectRoomAdEvent, roomId: number): void
    {
        if(!event) return;

        let eventType: string = null;

        switch(event.type)
        {
            case RoomObjectRoomAdEvent.ROOM_AD_FURNI_CLICK:
                this._roomEngine.events.dispatchEvent(event);

                if(event.clickUrl && (event.clickUrl.length > 0))
                {
                    Nitro.instance.createLinkEvent(event.clickUrl);
                }

                eventType = RoomEngineRoomAdEvent.FURNI_CLICK;
                break;
            case RoomObjectRoomAdEvent.ROOM_AD_FURNI_DOUBLE_CLICK:
                if(event.clickUrl && (event.clickUrl.length > 0))
                {
                    const catalogPage = 'CATALOG_PAGE';

                    if(event.clickUrl.indexOf(catalogPage) === 0)
                    {
                        Nitro.instance.createLinkEvent(event.clickUrl.substr(catalogPage.length));
                    }
                }

                eventType = RoomEngineRoomAdEvent.FURNI_DOUBLE_CLICK;
                break;
            case RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_SHOW:
                eventType = RoomEngineRoomAdEvent.TOOLTIP_SHOW;
                break;
            case RoomObjectRoomAdEvent.ROOM_AD_TOOLTIP_HIDE:
                eventType = RoomEngineRoomAdEvent.TOOLTIP_HIDE;
                break;
        }

        if(eventType) this._roomEngine.events.dispatchEvent(new RoomEngineObjectEvent(eventType, roomId, event.objectId, this._roomEngine.getRoomObjectCategoryForType(event.objectType)));
    }

    private onRoomObjectBadgeAssetEvent(event: RoomObjectBadgeAssetEvent, roomId: number): void
    {
        if(!event || !this._roomEngine) return;

        switch(event.type)
        {
            case RoomObjectBadgeAssetEvent.LOAD_BADGE: {
                const objectId = event.objectId;
                const objectType = event.objectType;
                const objectCategory = this._roomEngine.getRoomObjectCategoryForType(objectType);

                this._roomEngine.loadRoomObjectBadgeImage(roomId, objectId, objectCategory, event.badgeId, event.groupBadge);
                return;
            }
        }
    }

    private handleMousePointer(event: RoomObjectFurnitureActionEvent, roomId: number): void
    {
        if(!event) return;

        this._roomEngine.updateMousePointer(event.type, event.objectId, event.objectType);
    }

    private handleRoomObjectPlaySoundEvent(event: RoomObjectPlaySoundIdEvent, roomId: number): void
    {
        const objectCategory = this._roomEngine.getRoomObjectCategoryForType(event.objectType);

        switch(event.type)
        {
            case RoomObjectPlaySoundIdEvent.PLAY_SOUND:
                this._roomEngine.events.dispatchEvent(new RoomEngineObjectPlaySoundEvent(RoomEngineObjectPlaySoundEvent.PLAY_SOUND, roomId, event.objectId, objectCategory, event.soundId, event.pitch));
                return;
            case RoomObjectPlaySoundIdEvent.PLAY_SOUND_AT_PITCH:
                this._roomEngine.events.dispatchEvent(new RoomEngineObjectPlaySoundEvent(RoomEngineObjectPlaySoundEvent.PLAY_SOUND_AT_PITCH, roomId, event.objectId, objectCategory, event.soundId, event.pitch));
                return;
        }
    }

    private handleRoomObjectSamplePlaybackEvent(event: RoomObjectSamplePlaybackEvent, roomId: number): void
    {
        if(!event) return;

        const objectCategory = this._roomEngine.getRoomObjectCategoryForType(event.objectType);

        switch(event.type)
        {
            case RoomObjectSamplePlaybackEvent.ROOM_OBJECT_INITIALIZED:
                this._roomEngine.events.dispatchEvent(new RoomEngineSamplePlaybackEvent(RoomEngineSamplePlaybackEvent.ROOM_OBJECT_INITIALIZED, roomId, event.objectId, objectCategory, event.sampleId, event.pitch));
                break;
            case RoomObjectSamplePlaybackEvent.ROOM_OBJECT_DISPOSED:
                this._roomEngine.events.dispatchEvent(new RoomEngineSamplePlaybackEvent(RoomEngineSamplePlaybackEvent.ROOM_OBJECT_DISPOSED, roomId, event.objectId, objectCategory, event.sampleId, event.pitch));
                break;
            case RoomObjectSamplePlaybackEvent.PLAY_SAMPLE:
                this._roomEngine.events.dispatchEvent(new RoomEngineSamplePlaybackEvent(RoomEngineSamplePlaybackEvent.PLAY_SAMPLE, roomId, event.objectId, objectCategory, event.sampleId, event.pitch));
                break;
            case RoomObjectSamplePlaybackEvent.CHANGE_PITCH:
                this._roomEngine.events.dispatchEvent(new RoomEngineSamplePlaybackEvent(RoomEngineSamplePlaybackEvent.CHANGE_PITCH, roomId, event.objectId, objectCategory, event.sampleId, event.pitch));
                break;
        }
    }

    private onHSLColorEnableEvent(event: RoomObjectHSLColorEnableEvent, roomId: number): void
    {
        if(!event || !this._roomEngine) return;

        switch(event.type)
        {
            case RoomObjectHSLColorEnableEvent.ROOM_BACKGROUND_COLOR:
                this._roomEngine.events.dispatchEvent(new RoomObjectHSLColorEnabledEvent(RoomObjectHSLColorEnabledEvent.ROOM_BACKGROUND_COLOR, roomId, event.enable, event.hue, event.saturation, event.lightness));
                return;
        }
    }

    private onRoomObjectDataRequestEvent(event: RoomObjectDataRequestEvent, roomId: number): void
    {
        if(!event || !this._roomEngine || !event.object) return;

        switch(event.type)
        {
            case RoomObjectDataRequestEvent.RODRE_CURRENT_USER_ID:
                event.object.model.setValue(RoomObjectVariable.SESSION_CURRENT_USER_ID, this._roomEngine.sessionDataManager.userId);
                return;
            case RoomObjectDataRequestEvent.RODRE_URL_PREFIX:
                event.object.model.setValue(RoomObjectVariable.SESSION_URL_PREFIX, NitroConfiguration.getValue('url.prefix'));
                return;
        }
    }

    private onRoomObjectTileMouseEvent(roomId: number, event: RoomObjectTileMouseEvent): void
    {
        if(!this._roomEngine || this._roomEngine.isDecorating || !this._roomEngine.roomSessionManager) return;

        const session = this._roomEngine.roomSessionManager.getSession(roomId);

        if(!session || session.isSpectator) return;

        this.sendWalkUpdate(event.tileXAsInt, event.tileYAsInt);
    }

    private handleObjectMove(event: RoomObjectMouseEvent, roomId: number): void
    {
        if(!event || !this._roomEngine) return;

        const eventDispatcher = this._roomEngine.events;

        if(!eventDispatcher) return;

        const selectedData = this.getSelectedRoomObjectData(roomId);

        if(!selectedData) return;

        const roomObject = this._roomEngine.getRoomObject(roomId, selectedData.id, selectedData.category);

        if(!roomObject) return;

        let _local_6 = true;

        if((selectedData.category === RoomObjectCategory.FLOOR) || (selectedData.category === RoomObjectCategory.UNIT))
        {
            const stackingHeightMap = this._roomEngine.getFurnitureStackingHeightMap(roomId);

            if(!(((event instanceof RoomObjectTileMouseEvent)) && (this.handleFurnitureMove(roomObject, selectedData, Math.trunc(event.tileX + 0.5), Math.trunc(event.tileY + 0.5), stackingHeightMap))))
            {
                this.handleFurnitureMove(roomObject, selectedData, selectedData.loc.x, selectedData.loc.y, stackingHeightMap);

                _local_6 = false;
            }
        }

        else if((selectedData.category === RoomObjectCategory.WALL))
        {
            _local_6 = false;

            if(event instanceof RoomObjectWallMouseEvent)
            {
                const _local_10 = event.wallLocation;
                const _local_11 = event.wallWidth;
                const _local_12 = event.wallHeight;
                const _local_13 = event.x;
                const _local_14 = event.y;
                const _local_15 = event.direction;

                if(this.handleWallItemMove(roomObject, selectedData, _local_10, _local_11, _local_12, _local_13, _local_14, _local_15))
                {
                    _local_6 = true;
                }
            }

            if(!_local_6)
            {
                roomObject.setLocation(selectedData.loc);
                roomObject.setDirection(selectedData.dir);
            }

            this._roomEngine.updateRoomObjectMask(roomId, selectedData.id, _local_6);
        }

        if(_local_6)
        {
            this.setFurnitureAlphaMultiplier(roomObject, 0.5);

            this._roomEngine.setObjectMoverIconSpriteVisible(false);
        }
        else
        {
            this.setFurnitureAlphaMultiplier(roomObject, 0);

            this._roomEngine.setObjectMoverIconSpriteVisible(true);
        }
    }

    private handleObjectPlace(event: RoomObjectMouseEvent, roomId: number): void
    {
        if(!event || !this._roomEngine) return;

        const eventDispatcher = this._roomEngine.events;

        if(!eventDispatcher) return;

        let selectedData = this.getSelectedRoomObjectData(roomId);

        if(!selectedData) return;

        let roomObject = this._roomEngine.getRoomObject(roomId, selectedData.id, selectedData.category);

        if(!roomObject)
        {
            if(event instanceof RoomObjectTileMouseEvent)
            {
                if(selectedData.category === RoomObjectCategory.FLOOR)
                {
                    this._roomEngine.addFurnitureFloor(roomId, selectedData.id, selectedData.typeId, selectedData.loc, selectedData.dir, 0, selectedData.stuffData, parseFloat(selectedData.instanceData), -1, 0, 0, '', false);
                }

                else if(selectedData.category === RoomObjectCategory.UNIT)
                {
                    this._roomEngine.addRoomObjectUser(roomId, selectedData.id, new Vector3d(), new Vector3d(180), 180, selectedData.typeId, selectedData.instanceData);

                    const roomObject = this._roomEngine.getRoomObject(roomId, selectedData.id, selectedData.category);

                    (roomObject && selectedData.posture && roomObject.model.setValue(RoomObjectVariable.FIGURE_POSTURE, selectedData.posture));
                }
            }

            else if(event instanceof RoomObjectWallMouseEvent)
            {
                if(selectedData.category === RoomObjectCategory.WALL)
                {
                    this._roomEngine.addFurnitureWall(roomId, selectedData.id, selectedData.typeId, selectedData.loc, selectedData.dir, 0, selectedData.instanceData, 0);
                }
            }

            roomObject = this._roomEngine.getRoomObject(roomId, selectedData.id, selectedData.category);

            if(roomObject)
            {
                if(selectedData.category === RoomObjectCategory.FLOOR)
                {
                    const allowedDirections = roomObject.model.getValue<number[]>(RoomObjectVariable.FURNITURE_ALLOWED_DIRECTIONS);

                    if(allowedDirections && allowedDirections.length)
                    {
                        const direction = new Vector3d(allowedDirections[0]);

                        roomObject.setDirection(direction);

                        this.updateSelectedObjectData(roomId, selectedData.id, selectedData.category, selectedData.loc, direction, selectedData.operation, selectedData.typeId, selectedData.instanceData, selectedData.stuffData, selectedData.state, selectedData.animFrame, selectedData.posture);

                        selectedData = this.getSelectedRoomObjectData(roomId);

                        if(!selectedData) return;
                    }
                }
            }

            this.setFurnitureAlphaMultiplier(roomObject, 0.5);
            this._roomEngine.setObjectMoverIconSpriteVisible(true);
        }

        if(roomObject)
        {
            let _local_12 = true;

            const stackingHeightMap = this._roomEngine.getFurnitureStackingHeightMap(roomId);

            if(selectedData.category === RoomObjectCategory.FLOOR)
            {
                if(!((event instanceof RoomObjectTileMouseEvent) && this.handleFurnitureMove(roomObject, selectedData, Math.trunc(event.tileX + 0.5), Math.trunc(event.tileY + 0.5), stackingHeightMap)))
                {
                    this._roomEngine.removeRoomObjectFloor(roomId, selectedData.id);

                    _local_12 = false;
                }
            }

            else if(selectedData.category === RoomObjectCategory.WALL)
            {
                _local_12 = false;

                if(event instanceof RoomObjectWallMouseEvent)
                {
                    const _local_14 = event.wallLocation;
                    const _local_15 = event.wallWidth;
                    const _local_16 = event.wallHeight;
                    const _local_17 = event.x;
                    const _local_18 = event.y;
                    const _local_19 = event.direction;

                    if(this.handleWallItemMove(roomObject, selectedData, _local_14, _local_15, _local_16, _local_17, _local_18, _local_19))
                    {
                        _local_12 = true;
                    }
                }

                if(!_local_12)
                {
                    this._roomEngine.removeRoomObjectWall(roomId, selectedData.id);
                }

                this._roomEngine.updateRoomObjectMask(roomId, selectedData.id, _local_12);
            }

            else if(selectedData.category === RoomObjectCategory.UNIT)
            {
                if(!((event instanceof RoomObjectTileMouseEvent) && this.handleUserPlace(roomObject, Math.trunc(event.tileX + 0.5), Math.trunc(event.tileY + 0.5), this._roomEngine.getLegacyWallGeometry(roomId))))
                {
                    this._roomEngine.removeRoomObjectUser(roomId, selectedData.id);

                    _local_12 = false;
                }
            }

            this._roomEngine.setObjectMoverIconSpriteVisible(!_local_12);
        }
    }

    private handleFurnitureMove(roomObject: IRoomObjectController, selectedObjectData: ISelectedRoomObjectData, x: number, y: number, stackingHeightMap: IFurnitureStackingHeightMap): boolean
    {
        if(!roomObject || !selectedObjectData) return false;

        const _local_6 = new Vector3d();
        _local_6.assign(roomObject.getDirection());

        roomObject.setDirection(selectedObjectData.dir);

        const _local_7 = new Vector3d(x, y, 0);
        const _local_8 = new Vector3d();

        _local_8.assign(roomObject.getDirection());

        let _local_9 = this.validateFurnitureLocation(roomObject, _local_7, selectedObjectData.loc, selectedObjectData.dir, stackingHeightMap);

        if(!_local_9)
        {
            _local_8.x = this.getValidRoomObjectDirection(roomObject, true);

            roomObject.setDirection(_local_8);

            _local_9 = this.validateFurnitureLocation(roomObject, _local_7, selectedObjectData.loc, selectedObjectData.dir, stackingHeightMap);
        }

        if(!_local_9)
        {
            roomObject.setDirection(_local_6);

            return false;
        }

        roomObject.setLocation(_local_9);

        if(_local_8) roomObject.setDirection(_local_8);

        return true;
    }

    private handleWallItemMove(k: IRoomObjectController, _arg_2: ISelectedRoomObjectData, _arg_3: IVector3D, _arg_4: IVector3D, _arg_5: IVector3D, _arg_6: number, _arg_7: number, _arg_8: number): boolean
    {
        if(!k || !_arg_2) return false;

        const _local_9 = new Vector3d(_arg_8);
        const _local_10 = this.validateWallItemLocation(k, _arg_3, _arg_4, _arg_5, _arg_6, _arg_7, _arg_2);

        if(!_local_10) return false;

        k.setLocation(_local_10);
        k.setDirection(_local_9);

        return true;
    }

    private validateFurnitureLocation(k: IRoomObject, _arg_2: IVector3D, _arg_3: IVector3D, _arg_4: IVector3D, _arg_5: IFurnitureStackingHeightMap): Vector3d
    {
        if(!k || !k.model || !_arg_2) return null;

        let _local_15: Vector3d = null;

        const _local_6 = k.getDirection();

        if(!_local_6) return null;

        if(!_arg_3 || !_arg_4) return null;

        if((_arg_2.x === _arg_3.x) && (_arg_2.y === _arg_3.y))
        {
            if(_local_6.x === _arg_4.x)
            {
                _local_15 = new Vector3d();

                _local_15.assign(_arg_3);

                return _local_15;
            }
        }

        let sizeX = k.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_X);
        let sizeY = k.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_Y);

        if(sizeX < 1) sizeX = 1;

        if(sizeY < 1) sizeY = 1;

        const _local_9 = _arg_3.x;
        const _local_10 = _arg_3.y;
        let _local_11 = sizeX;
        let _local_12 = sizeY;
        let _local_13 = 0;
        let _local_14 = (Math.trunc((Math.trunc(_local_6.x + 45) % 360) / 90));

        if((_local_14 === 1) || (_local_14 === 3))
        {
            _local_13 = sizeX;

            sizeX = sizeY;
            sizeY = _local_13;
        }

        _local_14 = Math.trunc((Math.trunc(_arg_4.x + 45) % 360) / 90);

        if((_local_14 === 1) || (_local_14 === 3))
        {
            _local_13 = _local_11;
            _local_11 = _local_12;
            _local_12 = _local_13;
        }

        if(_arg_5 && _arg_2)
        {
            const stackable = (k.model.getValue<number>(RoomObjectVariable.FURNITURE_ALWAYS_STACKABLE) === 1);

            if(_arg_5.validateLocation(_arg_2.x, _arg_2.y, sizeX, sizeY, _local_9, _local_10, _local_11, _local_12, stackable))
            {
                return new Vector3d(_arg_2.x, _arg_2.y, _arg_5.getTileHeight(_arg_2.x, _arg_2.y));
            }

            return null;
        }

        return null;
    }

    private validateWallItemLocation(k: IRoomObject, _arg_2: IVector3D, _arg_3: IVector3D, _arg_4: IVector3D, _arg_5: number, _arg_6: number, _arg_7: ISelectedRoomObjectData): Vector3d
    {
        if((((((k == null) || (k.model == null)) || (_arg_2 == null)) || (_arg_3 == null)) || (_arg_4 == null)) || (_arg_7 == null)) return null;

        const _local_8 = k.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_X);
        const _local_9 = k.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_Z);
        const _local_10 = k.model.getValue<number>(RoomObjectVariable.FURNITURE_CENTER_Z);

        if((((_arg_5 < (_local_8 / 2)) || (_arg_5 > (_arg_3.length - (_local_8 / 2)))) || (_arg_6 < _local_10)) || (_arg_6 > (_arg_4.length - (_local_9 - _local_10))))
        {
            if((_arg_5 < (_local_8 / 2)) && (_arg_5 <= (_arg_3.length - (_local_8 / 2))))
            {
                _arg_5 = (_local_8 / 2);
            }
            else
            {
                if((_arg_5 >= (_local_8 / 2)) && (_arg_5 > (_arg_3.length - (_local_8 / 2))))
                {
                    _arg_5 = (_arg_3.length - (_local_8 / 2));
                }
            }

            if((_arg_6 < _local_10) && (_arg_6 <= (_arg_4.length - (_local_9 - _local_10))))
            {
                _arg_6 = _local_10;
            }
            else
            {
                if((_arg_6 >= _local_10) && (_arg_6 > (_arg_4.length - (_local_9 - _local_10))))
                {
                    _arg_6 = (_arg_4.length - (_local_9 - _local_10));
                }
            }
        }

        if((((_arg_5 < (_local_8 / 2)) || (_arg_5 > (_arg_3.length - (_local_8 / 2)))) || (_arg_6 < _local_10)) || (_arg_6 > (_arg_4.length - (_local_9 - _local_10))))
        {
            return null;
        }

        let _local_11 = Vector3d.sum(Vector3d.product(_arg_3, (_arg_5 / _arg_3.length)), Vector3d.product(_arg_4, (_arg_6 / _arg_4.length)));

        _local_11 = Vector3d.sum(_arg_2, _local_11);

        return _local_11;
    }

    private changeObjectState(roomId: number, objectId: number, type: string, state: number, isRandom: boolean): void
    {
        const category = this._roomEngine.getRoomObjectCategoryForType(type);

        this.changeRoomObjectState(roomId, objectId, category, state, isRandom);
    }

    private useObject(roomId: number, objectId: number, type: string, action: string): void
    {
        if(!this._roomEngine || !this._roomEngine.connection) return;
        switch(action)
        {
            case RoomObjectFurnitureActionEvent.DICE_ACTIVATE:
                this._roomEngine.connection.send(new FurnitureDiceActivateComposer(objectId));
                return;
            case RoomObjectFurnitureActionEvent.DICE_OFF:
                this._roomEngine.connection.send(new FurnitureDiceDeactivateComposer(objectId));
                return;
            case RoomObjectFurnitureActionEvent.USE_HABBOWHEEL:
                this._roomEngine.connection.send(new FurnitureColorWheelComposer(objectId));
                return;
            case RoomObjectFurnitureActionEvent.STICKIE:
                this._roomEngine.connection.send(new GetItemDataComposer(objectId));
                return;
            case RoomObjectFurnitureActionEvent.ENTER_ONEWAYDOOR:
                this._roomEngine.connection.send(new FurnitureOneWayDoorComposer(objectId));
                return;
        }
    }

    private changeRoomObjectState(roomId: number, objectId: number, category: number, state: number, isRandom: boolean): boolean
    {
        if(!this._roomEngine || !this._roomEngine.connection) return true;

        if(category === RoomObjectCategory.FLOOR)
        {
            if(!isRandom)
            {
                this._roomEngine.connection.send(new FurnitureMultiStateComposer(objectId, state));
            }
            else
            {
                this._roomEngine.connection.send(new FurnitureRandomStateComposer(objectId, state));
            }
        }

        else if(category === RoomObjectCategory.WALL)
        {
            this._roomEngine.connection.send(new FurnitureWallMultiStateComposer(objectId, state));
        }

        return true;
    }

    private sendWalkUpdate(x: number, y: number): void
    {
        if(!this._roomEngine || !this._roomEngine.connection) return;

        this._roomEngine.connection.send(new RoomUnitWalkComposer(x, y));
    }

    private handleMouseOverObject(category: number, roomId: number, event: RoomObjectMouseEvent): ObjectTileCursorUpdateMessage
    {
        if(category !== RoomObjectCategory.FLOOR) return null;

        const roomObject = this._roomEngine.getRoomObject(roomId, event.objectId, RoomObjectCategory.FLOOR);

        if(!roomObject) return null;

        const location = this.getActiveSurfaceLocation(roomObject, event);

        if(!location) return null;

        const furnitureHeightMap = this._roomEngine.getFurnitureStackingHeightMap(roomId);

        if(!furnitureHeightMap) return null;

        const x = location.x;
        const y = location.y;
        const z = location.z;

        return new ObjectTileCursorUpdateMessage(new Vector3d(x, y, roomObject.getLocation().z), z, true, event.eventId);
    }

    private handleMoveTargetFurni(k: number, _arg_2: RoomObjectMouseEvent): boolean
    {
        if((_arg_2.objectType === RoomObjectUserType.USER) || (_arg_2.objectType === RoomObjectUserType.PET) || (_arg_2.objectType === RoomObjectUserType.BOT) || (_arg_2.objectType === RoomObjectUserType.RENTABLE_BOT) || (_arg_2.objectType === RoomObjectUserType.MONSTER_PLANT)) return;

        const _local_3 = this._roomEngine.getRoomObject(k, _arg_2.objectId, RoomObjectCategory.FLOOR);
        const _local_4 = this.getActiveSurfaceLocation(_local_3, _arg_2);

        if(_local_4)
        {
            this.sendWalkUpdate(_local_4.x, _local_4.y);

            return true;
        }

        return false;
    }

    private getActiveSurfaceLocation(k: IRoomObject, _arg_2: RoomObjectMouseEvent): Vector3d
    {
        if(!k || !_arg_2) return null;

        const furniData = this._roomEngine.sessionDataManager.getFloorItemDataByName(k.type);

        if(!furniData) return null;

        if(!furniData.canStandOn && !furniData.canSitOn && !furniData.canLayOn) return null;

        const model = k.model;

        if(!model) return null;

        const location = k.getLocation();
        const direction = k.getDirection();

        let sizeX = model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_X);
        let sizeY = model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_Y);
        const sizeZ = model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_Z);

        if((direction.x === 90) || (direction.x === 270)) [sizeX, sizeY] = [sizeY, sizeX];

        if(sizeX < 1) sizeX = 1;
        if(sizeY < 1) sizeY = 1;

        const renderingCanvas = this._roomEngine.getActiveRoomInstanceRenderingCanvas();

        if(!renderingCanvas) return null;

        const scale = renderingCanvas.geometry.scale;
        const _local_13 = furniData.canSitOn ? 0.5 : 0;
        const _local_14 = ((((scale / 2) + _arg_2.spriteOffsetX) + _arg_2.localX) / (scale / 4));
        const _local_15 = (((_arg_2.spriteOffsetY + _arg_2.localY) + (((sizeZ - _local_13) * scale) / 2)) / (scale / 4));
        const _local_16 = ((_local_14 + (2 * _local_15)) / 4);
        const _local_17 = ((_local_14 - (2 * _local_15)) / 4);
        const _local_18 = Math.floor((location.x + _local_16));
        const _local_19 = Math.floor(((location.y - _local_17) + 1));

        let _local_20 = false;

        if((_local_18 < location.x) || (_local_18 >= (location.x + sizeX))) _local_20 = true;
        else if((_local_19 < location.y) || (_local_19 >= (location.y + sizeY))) _local_20 = true;

        const _local_21 = furniData.canSitOn ? (sizeZ - 0.5) : sizeZ;

        if(!_local_20) return new Vector3d(_local_18, _local_19, _local_21);

        return null;
    }

    private handleMouseOverTile(k: RoomObjectTileMouseEvent, roomId: number): ObjectTileCursorUpdateMessage
    {
        if(this._whereYouClickIsWhereYouGo)
        {
            return new ObjectTileCursorUpdateMessage(new Vector3d(k.tileXAsInt, k.tileYAsInt, k.tileZAsInt), 0, true, k.eventId);
        }

        const roomObject = this._roomEngine.getRoomObjectCursor(roomId);

        if(roomObject && roomObject.visualization)
        {
            const _local_4 = k.tileXAsInt;
            const _local_5 = k.tileYAsInt;
            const _local_6 = k.tileZAsInt;
            const _local_7 = this._roomEngine.getRoomInstance(roomId);

            if(_local_7)
            {
                const _local_8 = this._roomEngine.getRoomTileObjectMap(roomId);

                if(_local_8)
                {
                    const _local_9 = _local_8.getObjectIntTile(_local_4, _local_5);
                    const _local_10 = this._roomEngine.getFurnitureStackingHeightMap(roomId);

                    if(_local_10)
                    {
                        if(_local_9 && _local_9.model && (_local_9.model.getValue<number>(RoomObjectVariable.FURNITURE_IS_VARIABLE_HEIGHT) > 0))
                        {
                            const _local_11 = _local_10.getTileHeight(_local_4, _local_5);
                            const _local_12 = this._roomEngine.getLegacyWallGeometry(roomId).getHeight(_local_4, _local_5);

                            return new ObjectTileCursorUpdateMessage(new Vector3d(_local_4, _local_5, _local_6), (_local_11 - _local_12), true, k.eventId);
                        }

                        return new ObjectTileCursorUpdateMessage(new Vector3d(_local_4, _local_5, _local_6), 0, true, k.eventId);
                    }
                }
            }
        }

        return null;
    }

    private placeObject(roomId: number, isTileEvent: boolean, isWallEvent: boolean): void
    {
        const selectedData = this.getSelectedRoomObjectData(roomId);

        if(!selectedData) return;

        let roomObject: IRoomObjectController = null;
        let objectId = selectedData.id;
        const category = selectedData.category;

        let x = 0;
        let y = 0;
        let z = 0;
        let direction = 0;
        let wallLocation = '';

        if(this._roomEngine && this._roomEngine.connection)
        {
            roomObject = this._roomEngine.getRoomObject(roomId, objectId, category);

            if(roomObject)
            {
                const location = roomObject.getLocation();

                direction = roomObject.getDirection().x;

                if((category === RoomObjectCategory.FLOOR) || (category === RoomObjectCategory.UNIT))
                {
                    x = location.x;
                    y = location.y;
                    z = location.z;
                }

                else if(category === RoomObjectCategory.WALL)
                {
                    x = location.x;
                    y = location.y;
                    z = location.z;

                    const wallGeometry = this._roomEngine.getLegacyWallGeometry(roomId);

                    if(wallGeometry) wallLocation = wallGeometry.getOldLocationString(location, direction);
                }

                direction = ((((direction / 45) % 8) + 8) % 8);

                if((objectId < 0) && (category === RoomObjectCategory.UNIT)) objectId = (objectId * -1);

                if(this._objectPlacementSource !== RoomObjectPlacementSource.CATALOG)
                {
                    if(category === RoomObjectCategory.UNIT)
                    {
                        if(selectedData.typeId === RoomObjectType.PET)
                        {
                            this._roomEngine.connection.send(new PetPlaceComposer(objectId, Math.trunc(x), Math.trunc(y)));
                        }

                        else if(selectedData.typeId === RoomObjectType.RENTABLE_BOT)
                        {
                            this._roomEngine.connection.send(new BotPlaceComposer(objectId, Math.trunc(x), Math.trunc(y)));
                        }
                    }

                    else if(roomObject.model.getValue<string>(RoomObjectVariable.FURNITURE_IS_STICKIE) !== undefined)
                    {
                        this._roomEngine.connection.send(new FurniturePostItPlaceComposer(objectId, wallLocation));
                    }

                    else
                    {
                        this._roomEngine.connection.send(new FurniturePlaceComposer(objectId, category, wallLocation, Math.trunc(x), Math.trunc(y), direction));
                    }
                }
            }
        }

        this._roomEngine.setPlacedRoomObjectData(roomId, new SelectedRoomObjectData(selectedData.id, selectedData.category, null, selectedData.dir, null));

        this.resetSelectedObjectData(roomId);

        if(this._roomEngine && this._roomEngine.events)
        {
            const placedInRoom = (roomObject && (roomObject.id === selectedData.id));

            this._roomEngine.events.dispatchEvent(new RoomEngineObjectPlacedEvent(RoomEngineObjectEvent.PLACED, roomId, objectId, category, wallLocation, x, y, z, direction, placedInRoom, isTileEvent, isWallEvent, selectedData.instanceData));
        }
    }

    public modifyRoomObject(roomId: number, objectId: number, category: number, operation: string): boolean
    {
        if(!this._roomEngine) return false;

        const roomObject = this._roomEngine.getRoomObject(roomId, objectId, category);

        if(!roomObject) return false;

        let _local_9 = true;

        switch(operation)
        {
            case RoomObjectOperationType.OBJECT_ROTATE_POSITIVE:
            case RoomObjectOperationType.OBJECT_ROTATE_NEGATIVE:
                if(this._roomEngine.connection)
                {
                    let direction = 0;

                    if(operation == RoomObjectOperationType.OBJECT_ROTATE_NEGATIVE)
                    {
                        direction = this.getValidRoomObjectDirection(roomObject, false);
                    }
                    else
                    {
                        direction = this.getValidRoomObjectDirection(roomObject, true);
                    }

                    const x = roomObject.getLocation().x;
                    const y = roomObject.getLocation().y;

                    if(this.isValidLocation(roomObject, new Vector3d(direction), this._roomEngine.getFurnitureStackingHeightMap(roomId)))
                    {
                        direction = Math.trunc((direction / 45));

                        if(roomObject.type === RoomObjectUserType.MONSTER_PLANT)
                        {
                            const roomSession = this._roomEngine.roomSessionManager.getSession(roomId);

                            if(roomSession)
                            {
                                const userData = roomSession.userDataManager.getUserDataByIndex(objectId);

                                if(userData)
                                {
                                    this._roomEngine.connection.send(new PetMoveComposer(userData.webID, Math.trunc(x), Math.trunc(y), direction));
                                }
                            }
                        }
                        else
                        {
                            this._roomEngine.connection.send(new FurnitureFloorUpdateComposer(objectId, x, y, direction));
                        }
                    }
                }
                break;
            case RoomObjectOperationType.OBJECT_EJECT:
            case RoomObjectOperationType.OBJECT_PICKUP:
                if(this._roomEngine.connection) this._roomEngine.connection.send(new FurniturePickupComposer(category, objectId));
                break;
            case RoomObjectOperationType.OBJECT_PICKUP_PET:
                if(this._roomEngine.connection)
                {
                    const session = this._roomEngine.roomSessionManager.getSession(roomId);

                    if(session)
                    {
                        const userData = session.userDataManager.getUserDataByIndex(objectId);

                        session.pickupPet(userData.webID);
                    }
                }
                break;
            case RoomObjectOperationType.OBJECT_PICKUP_BOT:
                if(this._roomEngine.connection)
                {
                    const session = this._roomEngine.roomSessionManager.getSession(roomId);

                    if(session)
                    {
                        const userData = session.userDataManager.getUserDataByIndex(objectId);

                        session.pickupBot(userData.webID);
                    }
                }
                break;
            case RoomObjectOperationType.OBJECT_MOVE:
                _local_9 = false;
                this.setFurnitureAlphaMultiplier(roomObject, 0.5);
                this.setSelectedRoomObjectData(roomId, roomObject.id, category, roomObject.getLocation(), roomObject.getDirection(), operation);
                this._roomEngine.setObjectMoverIconSprite(roomObject.id, category, true);
                this._roomEngine.setObjectMoverIconSpriteVisible(false);
                break;
            case RoomObjectOperationType.OBJECT_MOVE_TO: {
                const selectedData = this.getSelectedRoomObjectData(roomId);

                this.updateSelectedObjectData(roomId, selectedData.id, selectedData.category, selectedData.loc, selectedData.dir, RoomObjectOperationType.OBJECT_MOVE_TO, selectedData.typeId, selectedData.instanceData, selectedData.stuffData, selectedData.state, selectedData.animFrame, selectedData.posture);
                this.setFurnitureAlphaMultiplier(roomObject, 1);
                this._roomEngine.removeObjectMoverIconSprite();

                if(this._roomEngine.connection)
                {
                    if(category === RoomObjectCategory.FLOOR)
                    {
                        const angle = ((roomObject.getDirection().x) % 360);
                        const location = roomObject.getLocation();
                        const direction = (angle / 45);

                        this._roomEngine.connection.send(new FurnitureFloorUpdateComposer(objectId, location.x, location.y, direction));
                    }

                    else if(category === RoomObjectCategory.WALL)
                    {
                        const angle = ((roomObject.getDirection().x) % 360);
                        const wallGeometry = this._roomEngine.getLegacyWallGeometry(roomId);

                        if(wallGeometry)
                        {
                            const location = wallGeometry.getOldLocationString(roomObject.getLocation(), angle);

                            if(location) this._roomEngine.connection.send(new FurnitureWallUpdateComposer(objectId, location));
                        }
                    }

                    else if(category === RoomObjectCategory.UNIT)
                    {
                        const angle = ((roomObject.getDirection().x) % 360);
                        const location = roomObject.getLocation();
                        const direction = (angle / 45);
                        const race = parseInt(roomObject.model.getValue<string>(RoomObjectVariable.RACE));
                        const roomSession = this._roomEngine.roomSessionManager.getSession(roomId);

                        if(roomSession)
                        {
                            const userData = roomSession.userDataManager.getUserDataByIndex(objectId);

                            if(userData) this._roomEngine.connection.send(new PetMoveComposer(userData.webID, location.x, location.y, direction));
                        }
                    }
                }

                break;
            }
        }

        if(_local_9) this.resetSelectedObjectData(roomId);

        return true;
    }

    public modifyRoomObjectDataWithMap(roomId: number, objectId: number, category: number, operation: string, data: Map<string, string>): boolean
    {
        if(!this._roomEngine) return false;

        const roomObject = this._roomEngine.getRoomObject(roomId, objectId, category);

        if(!roomObject) return false;

        switch(operation)
        {
            case RoomObjectOperationType.OBJECT_SAVE_STUFF_DATA:
                if(this._roomEngine.connection)
                {
                    this._roomEngine.connection.send(new SetObjectDataMessageComposer(objectId, data));
                }
                break;
        }

        return true;
    }

    public modifyWallItemData(roomId: number, objectId: number, colorHex: string, text: string): boolean
    {
        if(!this._roomEngine || !this._roomEngine.connection) return false;

        this._roomEngine.connection.send(new SetItemDataMessageComposer(objectId, colorHex, text));

        return true;
    }

    public deleteWallItem(roomId: number, itemId: number): boolean
    {
        if(!this._roomEngine || !this._roomEngine.connection) return false;

        this._roomEngine.connection.send(new RemoveWallItemComposer(itemId));

        return true;
    }

    public getValidRoomObjectDirection(k: IRoomObjectController, _arg_2: boolean): number
    {
        if(!k || !k.model) return 0;

        let _local_6 = 0;
        let _local_7 = 0;
        let allowedDirections: number[] = [];

        if(k.type === RoomObjectUserType.MONSTER_PLANT)
        {
            allowedDirections = k.model.getValue<number[]>(RoomObjectVariable.PET_ALLOWED_DIRECTIONS);
        }
        else
        {
            allowedDirections = k.model.getValue<number[]>(RoomObjectVariable.FURNITURE_ALLOWED_DIRECTIONS);
        }

        let direction = k.getDirection().x;

        if(allowedDirections && allowedDirections.length)
        {
            _local_6 = allowedDirections.indexOf(direction);

            if(_local_6 < 0)
            {
                _local_6 = 0;
                _local_7 = 0;

                while(_local_7 < allowedDirections.length)
                {
                    if(direction <= allowedDirections[_local_7]) break;

                    _local_6++;
                    _local_7++;
                }

                _local_6 = (_local_6 % allowedDirections.length);
            }

            if(_arg_2) _local_6 = ((_local_6 + 1) % allowedDirections.length);
            else _local_6 = (((_local_6 - 1) + allowedDirections.length) % allowedDirections.length);

            direction = allowedDirections[_local_6];
        }

        return direction;
    }

    private isValidLocation(object: IRoomObject, goalDirection: IVector3D, stackingHeightMap: IFurnitureStackingHeightMap): boolean
    {
        if(!object || !object.model || !goalDirection) return false;

        const direction = object.getDirection();
        const location = object.getLocation();

        if(!direction || !location) return false;

        if((direction.x % 180) === (goalDirection.x % 180)) return true;

        let sizeX = object.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_X);
        let sizeY = object.model.getValue<number>(RoomObjectVariable.FURNITURE_SIZE_Y);

        if(sizeX < 1) sizeX = 1;

        if(sizeY < 1) sizeY = 1;

        let _local_8 = sizeX;
        let _local_9 = sizeY;

        let _local_11 = (Math.trunc((Math.trunc((goalDirection.x + 45)) % 360) / 90));

        if((_local_11 === 1) || (_local_11 === 3)) [sizeX, sizeY] = [sizeY, sizeX];

        _local_11 = (Math.trunc((Math.trunc((direction.x + 45)) % 360) / 90));

        if(((_local_11 === 1) || (_local_11 === 3))) [_local_8, _local_9] = [_local_9, _local_8];

        if(stackingHeightMap && location)
        {
            const alwaysStackable = (object.model.getValue<number>(RoomObjectVariable.FURNITURE_ALWAYS_STACKABLE) === 1);

            if(stackingHeightMap.validateLocation(location.x, location.y, sizeX, sizeY, location.x, location.y, _local_8, _local_9, alwaysStackable, location.z)) return true;
        }

        return false;
    }

    private placeObjectOnUser(roomId: number, objectId: number, category: number): void
    {
        const _local_4 = this.getSelectedRoomObjectData(roomId);

        if(!_local_4) return;

        const _local_5 = (this._roomEngine.getRoomObject(roomId, objectId, category) as IRoomObjectController);

        if(!_local_5) return;

        if(!this._roomEngine || !this._roomEngine.events) return;

        this._roomEngine.events.dispatchEvent(new RoomEngineObjectPlacedOnUserEvent(RoomEngineObjectEvent.PLACED_ON_USER, roomId, objectId, category, _local_4.id, _local_4.category));
    }

    public setSelectedObject(roomId: number, objectId: number, category: number): void
    {
        if(!this._roomEngine) return;

        const eventDispatcher = this._roomEngine.events;

        if(!eventDispatcher) return;

        switch(category)
        {
            case RoomObjectCategory.UNIT:
            case RoomObjectCategory.FLOOR:
            case RoomObjectCategory.WALL:
                if(category === RoomObjectCategory.UNIT)
                {
                    this.deselectObject(roomId);
                    this.setSelectedAvatar(roomId, objectId, true);
                }
                else
                {
                    this.setSelectedAvatar(roomId, 0, false);

                    if(objectId !== this._selectedObjectId)
                    {
                        this.deselectObject(roomId);

                        const roomObject = this._roomEngine.getRoomObject(roomId, objectId, category);

                        if(roomObject && roomObject.logic)
                        {
                            roomObject.logic.processUpdateMessage(new ObjectSelectedMessage(true));

                            this._selectedObjectId = objectId;
                            this._selectedObjectCategory = category;
                        }
                    }
                }

                eventDispatcher.dispatchEvent(new RoomEngineObjectEvent(RoomEngineObjectEvent.SELECTED, roomId, objectId, category));

                return;
        }
    }

    private deselectObject(roomId: number): void
    {
        if(this._selectedObjectId === -1) return;

        const object = this._roomEngine.getRoomObject(roomId, this._selectedObjectId, this._selectedObjectCategory);

        if(object && object.logic)
        {
            object.logic.processUpdateMessage(new ObjectSelectedMessage(false));

            this._selectedObjectId = -1;
            this._selectedObjectCategory = RoomObjectCategory.MINIMUM;
        }
    }

    public setSelectedAvatar(k: number, _arg_2: number, _arg_3: boolean): void
    {
        if(!this._roomEngine) return;

        const _local_4 = RoomObjectCategory.UNIT;
        const _local_5 = this._roomEngine.getRoomObject(k, this._selectedAvatarId, _local_4);

        if(_local_5 && _local_5.logic)
        {
            _local_5.logic.processUpdateMessage(new ObjectAvatarSelectedMessage(false));

            this._selectedAvatarId = -1;
        }

        let _local_6 = false;

        if(_arg_3)
        {
            const _local_5 = this._roomEngine.getRoomObject(k, _arg_2, _local_4);

            if(_local_5 && _local_5.logic)
            {
                _local_5.logic.processUpdateMessage(new ObjectAvatarSelectedMessage(true));

                _local_6 = true;

                this._selectedAvatarId = _arg_2;

                const location = _local_5.getLocation();

                if(location) this._roomEngine.connection.send(new RoomUnitLookComposer(~~(location.x), ~~(location.y)));
            }
        }

        const selectionArrow = this._roomEngine.getRoomObjectSelectionArrow(k);

        if(selectionArrow && selectionArrow.logic)
        {
            if(_local_6 && !this._roomEngine.isPlayingGame()) selectionArrow.logic.processUpdateMessage(new ObjectVisibilityUpdateMessage(ObjectVisibilityUpdateMessage.ENABLED));
            else selectionArrow.logic.processUpdateMessage(new ObjectVisibilityUpdateMessage(ObjectVisibilityUpdateMessage.DISABLED));
        }
    }

    private resetSelectedObjectData(roomId: number): void
    {
        if(!this._roomEngine) return;

        this._roomEngine.removeObjectMoverIconSprite();

        const selectedData = this.getSelectedRoomObjectData(roomId);

        if(selectedData)
        {
            if((selectedData.operation === RoomObjectOperationType.OBJECT_MOVE) || (selectedData.operation === RoomObjectOperationType.OBJECT_MOVE_TO))
            {
                const roomObject = this._roomEngine.getRoomObject(roomId, selectedData.id, selectedData.category);

                if(roomObject && (selectedData.operation !== RoomObjectOperationType.OBJECT_MOVE_TO))
                {
                    roomObject.setLocation(selectedData.loc);
                    roomObject.setDirection(selectedData.dir);
                }

                this.setFurnitureAlphaMultiplier(roomObject, 1);

                if(selectedData.category === RoomObjectCategory.WALL)
                {
                    this._roomEngine.updateRoomObjectMask(roomId, selectedData.id, true);
                }

                this.updateSelectedObjectData(roomId, selectedData.id, selectedData.category, selectedData.loc, selectedData.dir, RoomObjectOperationType.OBJECT_MOVE, selectedData.typeId, selectedData.instanceData, selectedData.stuffData, selectedData.state, selectedData.animFrame, selectedData.posture);
            }

            else if((selectedData.operation === RoomObjectOperationType.OBJECT_PLACE))
            {
                const objectId = selectedData.id;
                const category = selectedData.category;

                switch(category)
                {
                    case RoomObjectCategory.FLOOR:
                        this._roomEngine.removeRoomObjectFloor(roomId, objectId);
                        break;
                    case RoomObjectCategory.WALL:
                        this._roomEngine.removeRoomObjectWall(roomId, objectId);
                        break;
                    case RoomObjectCategory.UNIT:
                        this._roomEngine.removeRoomObjectUser(roomId, objectId);
                        break;
                }
            }

            this._roomEngine.setSelectedRoomObjectData(roomId, null);
        }
    }

    private getSelectedRoomObjectData(roomId: number): ISelectedRoomObjectData
    {
        if(!this._roomEngine) return null;

        return this._roomEngine.getSelectedRoomObjectData(roomId);
    }

    private setFurnitureAlphaMultiplier(object: IRoomObjectController, multiplier: number): void
    {
        if(!object || !object.model) return;

        object.model.setValue(RoomObjectVariable.FURNITURE_ALPHA_MULTIPLIER, multiplier);
    }

    private decorateModeMove(event: RoomObjectMouseEvent): boolean
    {
        return (this._roomEngine.isDecorating) && (!(event.ctrlKey || event.shiftKey));
    }

    public cancelRoomObjectPlacement(roomId: number): boolean
    {
        this.resetSelectedObjectData(roomId);

        return true;
    }

    private setSelectedRoomObjectData(roomId: number, id: number, category: number, location: IVector3D, direction: IVector3D, operation: string, typeId: number = 0, instanceData: string = null, stuffData: IObjectData = null, state: number = -1, frameNumber: number = -1, posture: string = null): void
    {
        this.resetSelectedObjectData(roomId);

        if(!this._roomEngine) return;

        const selectedData = new SelectedRoomObjectData(id, category, operation, location, direction, typeId, instanceData, stuffData, state, frameNumber, posture);

        this._roomEngine.setSelectedRoomObjectData(roomId, selectedData);
    }

    private updateSelectedObjectData(roomId: number, id: number, category: number, location: IVector3D, direction: IVector3D, operation: string, typeId: number = 0, instanceData: string = null, stuffData: IObjectData = null, state: number = -1, frameNumber: number = -1, posture: string = null): void
    {
        if(!this._roomEngine) return null;

        const selectedData = new SelectedRoomObjectData(id, category, operation, location, direction, typeId, instanceData, stuffData, state, frameNumber, posture);

        this._roomEngine.setSelectedRoomObjectData(roomId, selectedData);
    }

    private handleUserPlace(roomObject: IRoomObjectController, x: number, y: number, wallGeometry: ILegacyWallGeometry): boolean
    {
        if(!wallGeometry.isRoomTile(x, y)) return false;

        roomObject.setLocation(new Vector3d(x, y, wallGeometry.getHeight(x, y)));

        return true;
    }

    public get engine(): IRoomEngineServices
    {
        return this._roomEngine;
    }

    public get selectedAvatarId(): number
    {
        return this._selectedAvatarId;
    }
}
