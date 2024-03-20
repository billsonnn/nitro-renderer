import { IRoomGeometry, MouseEventType, NumberDataType, RoomObjectVariable } from '@nitrots/api';
import { RoomObjectHSLColorEnableEvent, RoomObjectWidgetRequestEvent, RoomSpriteMouseEvent } from '@nitrots/events';
import { ObjectDataUpdateMessage, RoomObjectUpdateMessage } from '../../../messages';
import { FurnitureMultiStateLogic } from './FurnitureMultiStateLogic';

export class FurnitureRoomBackgroundColorLogic extends FurnitureMultiStateLogic
{

    private _roomColorUpdated: boolean;

    constructor()
    {
        super();

        this._roomColorUpdated = false;
    }

    public getEventTypes(): string[]
    {
        const types = [
            RoomObjectWidgetRequestEvent.BACKGROUND_COLOR,
            RoomObjectHSLColorEnableEvent.ROOM_BACKGROUND_COLOR
        ];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public dispose(): void
    {
        if(this._roomColorUpdated)
        {
            if(this.eventDispatcher && this.object)
            {
                const realRoomObject = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT);

                if(realRoomObject === 1)
                {
                    this.eventDispatcher.dispatchEvent(new RoomObjectHSLColorEnableEvent(RoomObjectHSLColorEnableEvent.ROOM_BACKGROUND_COLOR, this.object, false, 0, 0, 0));
                }
            }

            this._roomColorUpdated = false;
        }

        super.dispose();
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if(message instanceof ObjectDataUpdateMessage)
        {
            message.data.writeRoomObjectModel(this.object.model);

            const realRoomObject = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT);

            if(realRoomObject === 1) this.processColorUpdate();
        }
    }

    private processColorUpdate(): void
    {
        if(!this.object || !this.object.model) return;

        const numberData = new NumberDataType();

        numberData.initializeFromRoomObjectModel(this.object.model);

        const state = numberData.getValue(0);
        const hue = numberData.getValue(1);
        const saturation = numberData.getValue(2);
        const lightness = numberData.getValue(3);

        if((state > -1) && (hue > -1) && (saturation > -1) && (lightness > -1))
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_ROOM_BACKGROUND_COLOR_HUE, hue);
            this.object.model.setValue(RoomObjectVariable.FURNITURE_ROOM_BACKGROUND_COLOR_SATURATION, saturation);
            this.object.model.setValue(RoomObjectVariable.FURNITURE_ROOM_BACKGROUND_COLOR_LIGHTNESS, lightness);

            this.object.setState(state, 0);

            if(this.eventDispatcher)
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectHSLColorEnableEvent(RoomObjectHSLColorEnableEvent.ROOM_BACKGROUND_COLOR, this.object, (state === 1), hue, saturation, lightness));
            }

            this._roomColorUpdated = true;
        }
    }

    public mouseEvent(event: RoomSpriteMouseEvent, geometry: IRoomGeometry): void
    {
        if(!event || !geometry || !this.object) return;

        switch(event.type)
        {
            case MouseEventType.DOUBLE_CLICK:
                (this.eventDispatcher && this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.BACKGROUND_COLOR, this.object)));
                return;
        }

        super.mouseEvent(event, geometry);
    }
}
