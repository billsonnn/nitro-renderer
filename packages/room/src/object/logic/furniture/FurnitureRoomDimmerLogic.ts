import { RoomObjectVariable } from '@nitrots/api';
import { RoomObjectDimmerStateUpdateEvent, RoomObjectWidgetRequestEvent } from '@nitrots/events';
import { ObjectDataUpdateMessage, RoomObjectUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureRoomDimmerLogic extends FurnitureLogic
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
            RoomObjectWidgetRequestEvent.DIMMER,
            RoomObjectWidgetRequestEvent.WIDGET_REMOVE_DIMMER,
            RoomObjectDimmerStateUpdateEvent.DIMMER_STATE
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
                    this.eventDispatcher.dispatchEvent(new RoomObjectDimmerStateUpdateEvent(this.object, 0, 1, 1, 0xFFFFFF, 0xFF));
                    this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.WIDGET_REMOVE_DIMMER, this.object));
                }

                this._roomColorUpdated = false;
            }
        }

        super.dispose();
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        if(message instanceof ObjectDataUpdateMessage)
        {
            if(message.data)
            {
                const extra = message.data.getLegacyString();

                const realRoomObject = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT);

                if(realRoomObject === 1) this.processDimmerData(extra);

                super.processUpdateMessage(new ObjectDataUpdateMessage(this.getStateFromDimmerData(extra), message.data));
            }

            return;
        }

        super.processUpdateMessage(message);
    }

    private getStateFromDimmerData(data: string): number
    {
        if(!data) return 0;

        const parts = data.split(',');

        if(parts.length >= 5) return (parseInt(parts[0]) - 1);

        return 0;
    }

    private processDimmerData(data: string): void
    {
        if(!data) return;

        const parts = data.split(',');

        if(parts.length >= 5)
        {
            const state = this.getStateFromDimmerData(data);
            const presetId = parseInt(parts[1]);
            const effectId = parseInt(parts[2]);
            const color = parts[3];

            let colorCode = parseInt(color.substr(1), 16);
            let brightness = parseInt(parts[4]);

            if(!state)
            {
                colorCode = 0xFFFFFF;
                brightness = 0xFF;
            }

            if(this.eventDispatcher && this.object)
            {
                this.eventDispatcher.dispatchEvent(new RoomObjectDimmerStateUpdateEvent(this.object, state, presetId, effectId, colorCode, brightness));

                this._roomColorUpdated = true;
            }
        }
    }

    public useObject(): void
    {
        if(!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.DIMMER, this.object));
    }

    public update(time: number): void
    {
        super.update(time);

        // if(this.object && this.object.model)
        // {
        //     const realRoomObject = this.object.model.getValue<number>(RoomObjectVariable.FURNITURE_REAL_ROOM_OBJECT);

        //     if(realRoomObject === 1)
        //     {
        //         const data = this.object.model.getValue<string>(RoomObjectVariable.FURNITURE_DATA);

        //         if(data && data.length > 0)
        //         {
        //             this.object.model.setValue(RoomObjectVariable.FURNITURE_DATA, '');

        //             this.processDimmerData(data);
        //         }
        //     }
        // }
    }
}
