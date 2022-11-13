import { IAssetData, IRoomGeometry, IRoomObjectModel, MouseEventType, PetType, RoomObjectVariable, Vector3d } from '../../../../../api';
import { RoomObjectMouseEvent, RoomObjectMoveEvent, RoomSpriteMouseEvent } from '../../../../../events';
import { RoomObjectUpdateMessage } from '../../../../../room';
import { PetFigureData } from '../../../../avatar';
import { ObjectAvatarChatUpdateMessage, ObjectAvatarExperienceUpdateMessage, ObjectAvatarFigureUpdateMessage, ObjectAvatarPetGestureUpdateMessage, ObjectAvatarPostureUpdateMessage, ObjectAvatarSelectedMessage, ObjectAvatarSleepUpdateMessage, ObjectAvatarUpdateMessage } from '../../../messages';
import { MovingObjectLogic } from '../MovingObjectLogic';

export class PetLogic extends MovingObjectLogic
{
    private _selected: boolean;
    private _reportedLocation: Vector3d;
    private _postureIndex: number;
    private _gestureIndex: number;
    private _headDirectionDelta: number;
    private _directions: number[];

    private _talkingEndTimestamp: number;
    private _gestureEndTimestamp: number;
    private _expressionEndTimestamp: number;

    constructor()
    {
        super();

        this._selected = false;
        this._reportedLocation = null;
        this._postureIndex = 0;
        this._gestureIndex = 0;
        this._headDirectionDelta = 0;
        this._directions = [];

        this._talkingEndTimestamp = 0;
        this._gestureEndTimestamp = 0;
        this._expressionEndTimestamp = 0;
    }

    public getEventTypes(): string[]
    {
        const types = [RoomObjectMouseEvent.CLICK, RoomObjectMoveEvent.POSITION_CHANGED];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public initialize(asset: IAssetData): void
    {
        if(!asset) return;

        const model = this.object && this.object.model;

        if(!model) return;

        if(asset.logic)
        {
            if(asset.logic.model)
            {
                const directions = asset.logic.model.directions;

                if(directions && directions.length)
                {
                    for(const direction of directions) this._directions.push(direction);

                    this._directions.sort();
                }
            }
        }

        model.setValue(RoomObjectVariable.PET_ALLOWED_DIRECTIONS, this._directions);
    }

    public dispose(): void
    {
        if(this._selected && this.object)
        {
            if(this.eventDispatcher) this.eventDispatcher.dispatchEvent(new RoomObjectMoveEvent(RoomObjectMoveEvent.OBJECT_REMOVED, this.object));
        }

        this._directions = null;
        this._reportedLocation = null;
    }

    public update(totalTimeRunning: number): void
    {
        super.update(totalTimeRunning);

        if(this._selected && this.object)
        {
            if(this.eventDispatcher)
            {
                const location = this.object.getLocation();

                if(((!this._reportedLocation || (this._reportedLocation.x !== location.x)) || (this._reportedLocation.y !== location.y)) || (this._reportedLocation.z !== location.z))
                {
                    if(!this._reportedLocation) this._reportedLocation = new Vector3d();

                    this._reportedLocation.assign(location);

                    this.eventDispatcher.dispatchEvent(new RoomObjectMoveEvent(RoomObjectMoveEvent.POSITION_CHANGED, this.object));
                }
            }
        }

        if(this.object && this.object.model) this.updateModel(totalTimeRunning, this.object.model);
    }

    private updateModel(time: number, model: IRoomObjectModel): void
    {
        if((this._gestureEndTimestamp > 0) && (time > this._gestureEndTimestamp))
        {
            model.setValue(RoomObjectVariable.FIGURE_GESTURE, null);

            this._gestureEndTimestamp = 0;
        }

        if(this._talkingEndTimestamp > 0)
        {
            if(time > this._talkingEndTimestamp)
            {
                model.setValue(RoomObjectVariable.FIGURE_TALK, 0);

                this._talkingEndTimestamp = 0;
            }
        }

        if((this._expressionEndTimestamp > 0) && (time > this._expressionEndTimestamp))
        {
            model.setValue(RoomObjectVariable.FIGURE_EXPRESSION, 0);

            this._expressionEndTimestamp = 0;
        }
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        if(!message || !this.object) return;

        super.processUpdateMessage(message);

        const model = this.object && this.object.model;

        if(!model) return;

        if(message instanceof ObjectAvatarUpdateMessage)
        {
            model.setValue(RoomObjectVariable.HEAD_DIRECTION, message.headDirection);

            return;
        }

        if(message instanceof ObjectAvatarFigureUpdateMessage)
        {
            const petFigureData = new PetFigureData(message.figure);

            model.setValue(RoomObjectVariable.FIGURE, message.figure);
            model.setValue(RoomObjectVariable.RACE, message.subType);
            model.setValue(RoomObjectVariable.PET_PALETTE_INDEX, petFigureData.paletteId);
            model.setValue(RoomObjectVariable.PET_COLOR, petFigureData.color);
            model.setValue(RoomObjectVariable.PET_TYPE, petFigureData.typeId);
            model.setValue(RoomObjectVariable.PET_CUSTOM_LAYER_IDS, petFigureData.customLayerIds);
            model.setValue(RoomObjectVariable.PET_CUSTOM_PARTS_IDS, petFigureData.customPartIds);
            model.setValue(RoomObjectVariable.PET_CUSTOM_PALETTE_IDS, petFigureData.customPaletteIds);
            model.setValue(RoomObjectVariable.PET_IS_RIDING, (message.isRiding ? 1 : 0));

            return;
        }

        if(message instanceof ObjectAvatarPostureUpdateMessage)
        {
            model.setValue(RoomObjectVariable.FIGURE_POSTURE, message.postureType);

            return;
        }

        if(message instanceof ObjectAvatarChatUpdateMessage)
        {
            model.setValue(RoomObjectVariable.FIGURE_TALK, 1);

            this._talkingEndTimestamp = this.time + (message.numberOfWords * 1000);

            return;
        }

        if(message instanceof ObjectAvatarSleepUpdateMessage)
        {
            model.setValue(RoomObjectVariable.FIGURE_SLEEP, message.isSleeping ? 1 : 0);

            return;
        }

        if(message instanceof ObjectAvatarPetGestureUpdateMessage)
        {
            model.setValue(RoomObjectVariable.FIGURE_GESTURE, message.gesture);

            this._gestureEndTimestamp = this.time + 3000;

            return;
        }

        if(message instanceof ObjectAvatarSelectedMessage)
        {
            this._selected = message.selected;
            this._reportedLocation = null;

            return;
        }

        if(message instanceof ObjectAvatarExperienceUpdateMessage)
        {
            model.setValue(RoomObjectVariable.FIGURE_EXPERIENCE_TIMESTAMP, this.time);
            model.setValue(RoomObjectVariable.FIGURE_GAINED_EXPERIENCE, message.gainedExperience);

            return;
        }
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        let eventType: string = null;

        switch(event.type)
        {
            case MouseEventType.MOUSE_CLICK:
                eventType = RoomObjectMouseEvent.CLICK;
                break;
            case MouseEventType.DOUBLE_CLICK:
                break;
            case MouseEventType.MOUSE_DOWN: {
                const petType = this.object.model.getValue<number>(RoomObjectVariable.PET_TYPE);

                if(petType === PetType.MONSTERPLANT)
                {
                    if(this.eventDispatcher) this.eventDispatcher.dispatchEvent(new RoomObjectMouseEvent(RoomObjectMouseEvent.MOUSE_DOWN, this.object, event.eventId, event.altKey, event.ctrlKey, event.shiftKey, event.buttonDown));
                }
                break;
            }
        }

        if(eventType && this.eventDispatcher) this.eventDispatcher.dispatchEvent(new RoomObjectMouseEvent(eventType, this.object, event.eventId, event.altKey, event.ctrlKey, event.shiftKey, event.buttonDown));
    }
}
