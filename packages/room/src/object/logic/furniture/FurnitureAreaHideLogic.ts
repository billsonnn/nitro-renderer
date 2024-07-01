import { IRoomGeometry, MouseEventType, NumberDataType, RoomObjectVariable } from '@nitrots/api';
import { RoomObjectEvent, RoomObjectStateChangedEvent, RoomObjectWidgetRequestEvent, RoomSpriteMouseEvent } from '@nitrots/events';
import { ObjectDataUpdateMessage, RoomObjectUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureAreaHideLogic extends FurnitureMultiStateLogic
{
    public getEventTypes(): string[]
    {
        const types = [RoomObjectWidgetRequestEvent.AREA_HIDE];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(!this.object) return;

        if(message instanceof ObjectDataUpdateMessage)
        {
            message.data.writeRoomObjectModel(this.object.model);

            if(this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT) === 1)
            {
                this.setupObject();
            }
        }
    }

    private setupObject(): void
    {
        if(!this.object || !this.object.model) return;

        const numberData = new NumberDataType();

        numberData.initializeFromRoomObjectModel(this.object.model);

        const state = numberData.getValue(0);
        const rootX = numberData.getValue(1);
        const rootY = numberData.getValue(2);
        const width = numberData.getValue(3);
        const length = numberData.getValue(4);
        const invisibility = (numberData.getValue(5) === 1);
        const wallItems = (numberData.getValue(6) === 1);
        const invert = (numberData.getValue(7) === 1);

        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_ROOT_X, rootX);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_ROOT_Y, rootY);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_WIDTH, width);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_LENGTH, length);
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_INVISIBILITY, ((invisibility) ? 1 : 0));
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_WALL_ITEMS, ((wallItems) ? 1 : 0));
        this.object.model.setValue(RoomObjectVariable.FURNITURE_AREA_HIDE_INVERT, ((invert) ? 1 : 0));
        this.object.setState(state, 0);
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.AREA_HIDE, this.object));
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry || !this.object) return;

        let objectEvent: RoomObjectEvent = null;

        switch(event.type)
        {
            case MouseEventType.DOUBLE_CLICK: {
                if((event.spriteTag === 'turn_on') || (event.spriteTag === 'turn_off'))
                {
                    objectEvent = new RoomObjectStateChangedEvent(RoomObjectStateChangedEvent.STATE_CHANGE, this.object);
                }
                else
                {
                    objectEvent = new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.AREA_HIDE, this.object);
                }

                if(this.eventDispatcher && objectEvent)
                {
                    this.eventDispatcher.dispatchEvent(objectEvent);

                    return;
                }
                break;
            }
        }

        super.mouseEvent(event, geometry);
    }
}
